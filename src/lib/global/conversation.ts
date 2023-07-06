import { analyzeDialog, analyzeGoalScore, chat, checkGoalProgress } from '$api/conversation';
import { transcribe } from '$api/transcription';
import { synthesize } from '$api/tts';
import {
	BotEmotionValues,
	type ChatBotMessage,
	type ConversationHistoryItem
} from '$lib/types/conversationData';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import { get, writable } from 'svelte/store';
import {
	chatContext,
	recapHistory,
	recapResult,
	type RecapHistory,
	type RecapResult
} from './chatbox';
import { blobToBase64 } from '$lib/utils/io';
import { round } from '$lib/utils/math';
import { completeConversationLocal } from '$lib/localdb/conversationLocal';
import { audioRecording } from './recording';
import { textAdaptor } from '$api/textProcessor';
import type { CEFRLevel } from '$lib/types/CEFRLevel';
import { graphqlClient } from '$lib/graphql';
import { RECAP_CONVERSATION_QUIZ, UPDATE_LESSON_PROGRESS } from '$gql/schema/mutations';
import userSession from '$lib/stores/userSession';
import type { ConversationRecapHistoryCreateDataInput } from '$gql/generated/graphql';

interface HistoryItem {
	role: 'user' | 'assistant';
	audioURL: string;
	transcription: string | null;
}

/** chat's history, used for display only */
export const history = writable<HistoryItem[]>([]);

/**
 * Chat history in conversation page (/conversation/play). Used for display. Only one field in each items will be non-null/undefined
 */
export const conversationHistory = writable<ConversationHistoryItem[]>([]);

/**
 * When set to true, the assistant will generate slower tts.
 */
export const isConversationFriendSpeakSlower = writable(false);

export const waitingForAIResponse = writable(false);

export const initializedConversation = writable(false);

export const transcribing = writable(false);

export const conversationFinished = writable(false);

/**
 * The recording that is shown to user before being sent or rerecord again.
 */
export const currentRecording = writable<{ data: Blob; url: string } | null>(null);
audioRecording.subscribe(currentRecording.set);

/**
 * If set to false, conversations will not be checked for goal completion. Used in pretest.
 */
export const isCheckConversationGoal = writable(true);

/**
 * If set to false, recap will not be calculated and the conversation will not be saved in user's diary. Used in pretest.
 */
export const saveCurrentConversation = writable(true);

/**
 * If the number of dialogue (pair of ai/user chat) exceed this amount,
 */
export const maxDialogueCount = writable(1000000);

/**
 * The index of the current goal that the user need to achieve.
 */
export const currentGoal = writable(0);

let finishedTime: Date;

/** an array of chatGPT's history in raw data, used for chat completion */
let gptHistory: ChatMessage[] = [];

/** The object used to collect the details of specific goal in the conversation */
let goalTracking: { goal: string; hintUsed: boolean; lastDialogueIndex: number }[] = [];

export const resetConversationData = () => {
	currentGoal.set(0);
	transcribing.set(false);
	conversationFinished.set(false);
	initializedConversation.set(false);
	waitingForAIResponse.set(false);
	history.set([]);
	goalTracking = [];
	conversationHistory.set([]);
	gptHistory = [];
};

export const initializeConversationBot = async function () {
	const ct = get(chatContext);
	if (!ct) throw new Error('required chatbox context');

	gptHistory.push({ role: 'user', content: ct.conversation.details.bot.prompt });
	gptHistory.push({
		role: 'assistant',
		content: `{"message":"${ct.conversation.details.intro}","status":"NORMAL","emotion":"neutral"}`
	});
	ct.conversation.details.learner.goal.forEach((e) => {
		goalTracking.push({ goal: e, hintUsed: false, lastDialogueIndex: 0 });
	});

	await botReply(ct.conversation.details.intro);

	// finish initialization
	initializedConversation.set(true);
	console.log('Finish init bot');
};

export const nextConversationGoal = () => {
	goalTracking[get(currentGoal)].lastDialogueIndex = get(history).length - 1;
	conversationHistory.set([...get(conversationHistory), { endOfGoal: get(currentGoal) + 1 }]);
	currentGoal.set(get(currentGoal) + 1);
};

/**
 * Check if the conversation has finished, but only check if isCheckConversationGoal is true.
 * In other words, this is a no-op when isCheckConversationGoal is false.
 */
export const checkConversationFinished = () => {
	const ct = get(chatContext);
	if (!ct) throw new Error('required chatbox context');
	if (
		(get(isCheckConversationGoal) &&
			get(currentGoal) >= ct.conversation.details.learner.goal.length) ||
		get(history).length >= 2 * get(maxDialogueCount)
	) {
		conversationFinished.set(true);
		if (get(saveCurrentConversation)) {
			finishedTime = new Date();
			computeRecap();
		}
	}
};

/**
 * Call bot to reply base on chat history
 * @param message ignore chat history if [message] is provided
 * @param targetLevel target CEFR level of bot's message
 */
const botReply = async function (message?: string, targetLevel: CEFRLevel = 'A1') {
	const ct = get(chatContext);
	if (!ct) throw new Error('required chatbox context');

	waitingForAIResponse.set(true);
	const hasMessage = !!message;

	// if no message provide, get response from chatGPT
	if (!message) {
		let data: ChatBotMessage | undefined;
		let attempt = 0;
		while (true) {
			try {
				const botResponse = await chat(gptHistory);

				// gpt will response in JSON format, parse it to object
				data = JSON.parse(botResponse);

				// ensure `data` is available and emotion is provided correctly
				if (!data) continue;
				if (!data.emotion || !BotEmotionValues.includes(data.emotion)) data.emotion = 'neutral';

				data.message = await textAdaptor(data.message, targetLevel);

				chatContext.set({ ...ct, bot: { ...ct.bot, emotion: data.emotion } });
				gptHistory.push({ role: 'assistant', content: botResponse });
				console.log(data);
				break;
			} catch (error) {
				// max attempt at 5
				if (attempt++ >= 5) break;

				gptHistory.push({ role: 'user', content: 'Reply with provided JSON scheme' });
				console.error("error: parsing bot's message, retring...");
			}
		}

		if (!data) throw new Error('Error: Bot failed to reply');
		message = data.message;
	}

	const audio = await synthesize(
		message,
		ct.conversation.details.bot.accent,
		ct.conversation.details.bot.gender
	);

	history.set([
		...get(history),
		{
			role: 'assistant',
			audioURL: await blobToBase64(audio),
			transcription: message
		}
	]);

	// prevent checking for the first time (user has not chat yet, only assistant)
	if (!hasMessage && get(isCheckConversationGoal)) {
		const passed = await checkGoalProgress(
			get(history)
				.map(
					(item) =>
						`${item.role === 'user' ? 'User' : ct.conversation.avatar.name}: ${item.transcription}`
				)
				.join('\n'),
			ct.conversation.details.learner.goal[get(currentGoal)]
		);
		console.log(passed);
		if (passed) {
			nextConversationGoal();
		}
	}

	conversationHistory.set([
		...get(conversationHistory),
		{
			chat: {
				role: 'assistant',
				audioURL: await blobToBase64(audio),
				transcription: message
			}
		}
	]);

	checkConversationFinished();

	waitingForAIResponse.set(false);
};

export const revealGoalHint = async function () {
	const ct = get(chatContext);
	if (!ct) throw new Error('required chatbox context');

	goalTracking[get(currentGoal)].hintUsed = true;
	conversationHistory.set([
		...get(conversationHistory),
		{ hint: ct.conversation.details.learner.hint[get(currentGoal)] }
	]);
};

export const submitUserReply = async function (audioRecording: { data: Blob; url: string } | null) {
	if (audioRecording !== null) {
		transcribing.set(true);

		conversationHistory.set([
			...get(conversationHistory),
			{
				chat: {
					role: 'user',
					audioURL: audioRecording.url,
					transcription: null
				}
			}
		]);

		const targetIndex = get(conversationHistory).length - 1;
		const transcription = await transcribe(audioRecording.data);
		conversationHistory.set(
			get(conversationHistory).map((v, i) =>
				i === targetIndex ? { ...v, chat: { ...v.chat!, transcription: transcription } } : v
			)
		);
		history.set([
			...get(history),
			{
				role: 'user',
				audioURL: audioRecording.url,
				transcription: transcription
			}
		]);
		gptHistory.push({ role: 'user', content: transcription });

		transcribing.set(false);

		botReply();
	}
};

const computeRecap = async () => {
	const ct = get(chatContext);
	if (!ct) throw new Error('required chatbox context');

	recapResult.set(null);

	const _history = get(history);
	const goalsResult: RecapResult[] = [];
	const promises: Promise<unknown>[] = [];
	let startDialogueIndex = 0;

	// Calculate from each completed goal
	for (let goalIndex = 0; goalIndex < goalTracking.length; goalIndex++) {
		const details = goalTracking[goalIndex];
		const pairDialogues: {
			assistant: HistoryItem;
			user: HistoryItem;
		}[] = [];

		// Create a set of dialogues in each goal session
		if (!details.hintUsed) {
			// Because the `lastDialogueIndex` is assistant message with no pair of user message, so we can skip
			for (let i = startDialogueIndex; i < details.lastDialogueIndex; i += 2) {
				// In case the index is exceed the history length
				if (i + 1 >= _history.length) break;

				// assistant will always begin first
				pairDialogues.push({
					assistant: _history[i],
					user: _history[i + 1]
				});
			}
		}
		const task = analyzeGoalScore(
			details.hintUsed,
			ct.conversation.CEFRlevel,
			ct.conversation.details.learner.mission,
			pairDialogues.map((d) => {
				return { assistant: d.assistant.transcription!, user: d.user.transcription! };
			})
		).then((result) => {
			const dialoguesResult: RecapHistory = [];
			for (let i = 0; i < result.scores.length; i++) {
				const _result = result.scores[i];
				const advancementSuggestion =
					_result.advancement.score < 80
						? 'The enhance your dialogue advancement try use the following examples\n' +
						  _result.advancement.examples.join('\n')
						: '';
				const grammarSuggestion =
					_result.grammar.score < 80
						? 'Here are the exmaple of the correct grammar dialogue\n' +
						  _result.grammar.examples.join('\n')
						: '';
				dialoguesResult.push({
					assistant: {
						role: 'assistant',
						audioURL: pairDialogues[i].assistant.audioURL,
						transcription: pairDialogues[i].assistant.transcription!
					},
					user: {
						role: 'user',
						audioURL: pairDialogues[i].user.audioURL,
						transcription: pairDialogues[i].user.transcription!
					},
					suggestion: advancementSuggestion + '\n' + grammarSuggestion,
					dialogueScore: _result,
					score: 50 + _result.advancement.score * 0.3 + _result.grammar.score * 0.2
				});
			}

			goalsResult[goalIndex] = {
				coins: result.coins,
				score: result.overall,
				history: dialoguesResult
			};
		});

		promises.push(task);
		startDialogueIndex = details.lastDialogueIndex;
	}
	await Promise.all(promises);

	let overallScore = 0,
		totalCoins = 0,
		recapDialogues: RecapHistory = [];
	goalsResult.forEach((e) => {
		totalCoins += e.coins;
		overallScore += e.score;
		recapDialogues.push(...e.history);
	});
	overallScore = overallScore / goalTracking.length;

	// TODO: find a better approach to promote/demote user's CEFR level
	// if (totalScore > 90) setCurrentCEFRLevel(ct!.conversation.CEFRlevel);

	const _recapHistory: ConversationRecapHistoryCreateDataInput[] = [];
	for (let index = 0; index < goalsResult.length; index++) {
		const e = goalsResult[index];
		_recapHistory[index] = {
			coin: e.coins,
			exp: e.score,
			goal: ct.conversation.details.learner.goal[index],
			hint: ct.conversation.details.learner.hint[index],
			dialogues: e.history.map((d) => {
				return {
					assistant: d.assistant.transcription,
					user: d.user?.transcription ?? '',
					score: {
						advancement: d.dialogueScore.advancement,
						appropriateness: d.dialogueScore.appropriateness,
						grammar: d.dialogueScore.grammar
					}
				};
			})
		};
	}

	const uid = userSession.value().accountData?.uid!;
	const reacpR = await graphqlClient
		.mutation(RECAP_CONVERSATION_QUIZ, {
			data: {
				quizCard: ct.conversation.id,
				correctPercentage: overallScore,
				history: _recapHistory
			},
			uid: uid
		})
		.toPromise();

	await graphqlClient
		.mutation(UPDATE_LESSON_PROGRESS, {
			uid: uid,
			data: {
				lessonId: ct.conversation.fromLesson!,
				quizCardId: ct.conversation.id,
				quizRecapId: reacpR.data?.conversationRecapCreate.id!,
				sectionIndex: 1
			}
		})
		.toPromise();

	// completeConversationLocal({
	// 	recap: { score: overallScore, coins: totalCoins, history: recapDialogues },
	// 	finishedTime,
	// 	conversationID: ct.conversation.id
	// });

	recapResult.set({ score: overallScore, coins: totalCoins, history: recapDialogues });
};

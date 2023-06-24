import { chat } from "$api/conversation";
import type { ChatMessage } from "$lib/types/requests/chatCompletion";
import { get, writable } from "svelte/store";

/**
 * Message that is binded to input in friends space page.
 */
export const friendsInputMessage = writable('');

/**
 * Chat history in friends group
 */
export const friendsHistory = writable<{
    role: 'user' | 'friend';
    text: string;
}[]>([{ role: 'friend', text: 'Hi everyone.' }]);

export const waitingForFriendResponse = writable(false);

// an array of chatGPT's history in raw data, used for chat completion
let gptHistory: ChatMessage[] = [];

export const resetFriendsSpaceData = () => {
    friendsInputMessage.set('');
    waitingForFriendResponse.set(false);
    friendsHistory.set([{ role: 'friend', text: 'Hi everyone.' }]);
    gptHistory = [{
        role: 'user',
        content: `Your role: I want you to act as a male student, you are friendly. You don't seem to expose yourself that much unless being ask. About yourself: Your name is Steve. You are from USA, Seattle, you are 12 years old. Your favorite color is Red.`
    }];
};

const friendReply = async function () {
    waitingForFriendResponse.set(true);
    const botResponse = await chat(gptHistory);
    gptHistory.push({ role: 'assistant', content: botResponse });

    friendsHistory.set([
        ...get(friendsHistory),
        {
            role: 'friend',
            text: botResponse
        }
    ])
    waitingForFriendResponse.set(false);
};

/**
 * Send message in friends space chat.
 */
export const sendFriendsMessage = async function () {
    friendsHistory.set([...get(friendsHistory), { role: 'user', text: get(friendsInputMessage) }]);
    gptHistory.push({ role: 'user', content: get(friendsInputMessage) });

    const promises: Promise<any>[] = [];
    promises.push(friendReply());
    friendsInputMessage.set('')

    await Promise.all(promises);
};
/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AvatarModels = {
  __typename?: 'AvatarModels';
  anger: Scalars['String']['output'];
  anticipation: Scalars['String']['output'];
  disgust: Scalars['String']['output'];
  fear: Scalars['String']['output'];
  joy: Scalars['String']['output'];
  neutral: Scalars['String']['output'];
  sadness: Scalars['String']['output'];
  surprise: Scalars['String']['output'];
  trust: Scalars['String']['output'];
};

export type AvatarModelsDataInput = {
  anger: Scalars['String']['input'];
  anticipation: Scalars['String']['input'];
  disgust: Scalars['String']['input'];
  fear: Scalars['String']['input'];
  joy: Scalars['String']['input'];
  neutral: Scalars['String']['input'];
  sadness: Scalars['String']['input'];
  surprise: Scalars['String']['input'];
  trust: Scalars['String']['input'];
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BookCreateDataInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BotAvatar = {
  __typename?: 'BotAvatar';
  accent: Scalars['String']['output'];
  avatarModels: AvatarModels;
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type BotAvatarDataInput = {
  accent: Scalars['String']['input'];
  avatarModels: AvatarModelsDataInput;
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type BotDetails = {
  __typename?: 'BotDetails';
  avatar: BotAvatar;
  intro: Scalars['String']['output'];
  prompt: Scalars['String']['output'];
};

export type BotDetailsDataInput = {
  avatar: Scalars['ID']['input'];
  intro: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
};

export type CefrLevel = {
  __typename?: 'CEFRLevel';
  communication: CefrLevelProgress;
  grammar: CefrLevelProgress;
  overall: CefrLevelProgress;
  vocabulary: CefrLevelProgress;
};

export type CefrLevelProgress = {
  __typename?: 'CEFRLevelProgress';
  level: LanguageLevel;
  progress: Scalars['Float']['output'];
};

export type ClassRoom = {
  __typename?: 'ClassRoom';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ClassroomDataInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type ConversationCard = QuizCard & {
  __typename?: 'ConversationCard';
  backgroundUrl: Scalars['String']['output'];
  bot: BotDetails;
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  learner: LearnerDetails;
  level: LanguageLevel;
  title: Scalars['String']['output'];
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type ConversationCardCreateDataInput = {
  backgroundUrl: Scalars['String']['input'];
  bot: BotDetailsDataInput;
  fromLesson: Scalars['String']['input'];
  learner: LearnerDetailsDataInput;
  level: LanguageLevel;
  title: Scalars['String']['input'];
  totalCoin: Scalars['Int']['input'];
  totalExp: Scalars['Int']['input'];
};

export type ConversationRecap = QuizRecap & {
  __typename?: 'ConversationRecap';
  coinEarned: Scalars['Int']['output'];
  correctPercentage: Scalars['Float']['output'];
  expEarned: Scalars['Int']['output'];
  fromLesson: Scalars['String']['output'];
  history: Array<ConversationRecapHistory>;
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  quizCard: QuizCard;
  type: QuizType;
};

export type ConversationRecapCreateDataInput = {
  correctPercentage: Scalars['Float']['input'];
  history: Array<ConversationRecapHistoryCreateDataInput>;
  quizCard: Scalars['ID']['input'];
};

export type ConversationRecapDialouge = {
  __typename?: 'ConversationRecapDialouge';
  assistant: Scalars['String']['output'];
  score: RecapDialogueScore;
  user: Scalars['String']['output'];
};

export type ConversationRecapDialougeCreateDataInput = {
  assistant: Scalars['String']['input'];
  score: RecapDialogueScoreCreateDataInput;
  user: Scalars['String']['input'];
};

export type ConversationRecapHistory = {
  __typename?: 'ConversationRecapHistory';
  coin: Scalars['Int']['output'];
  dialogues: Array<ConversationRecapDialouge>;
  exp: Scalars['Int']['output'];
  goal: Scalars['String']['output'];
  hint: Scalars['String']['output'];
};

export type ConversationRecapHistoryCreateDataInput = {
  coin: Scalars['Int']['input'];
  dialogues: Array<ConversationRecapDialougeCreateDataInput>;
  exp: Scalars['Int']['input'];
  goal: Scalars['String']['input'];
  hint: Scalars['String']['input'];
};

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  PreA1 = 'PRE_A1'
}

export type LearnerDetails = {
  __typename?: 'LearnerDetails';
  goal: Array<LearnerGoal>;
  mission?: Maybe<Scalars['String']['output']>;
};

export type LearnerDetailsDataInput = {
  goal: Array<LearnerGoalDataInput>;
  mission?: InputMaybe<Scalars['String']['input']>;
};

export type LearnerGoal = {
  __typename?: 'LearnerGoal';
  coin: Scalars['Int']['output'];
  exp: Scalars['Int']['output'];
  goal: Scalars['String']['output'];
  hint: Scalars['String']['output'];
};

export type LearnerGoalDataInput = {
  coin: Scalars['Int']['input'];
  exp: Scalars['Int']['input'];
  goal: Scalars['String']['input'];
  hint: Scalars['String']['input'];
};

export type LessonCard = {
  __typename?: 'LessonCard';
  ambientAudio: Scalars['String']['output'];
  backgroundUrl: Scalars['String']['output'];
  coin: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  exp: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  intro: LessonIntro;
  level: LanguageLevel;
  narratives: Array<Narrative>;
  quizeSections: Array<QuizSection>;
  title: Scalars['String']['output'];
};

export type LessonCardCreateDataInput = {
  ambientAudio: Scalars['String']['input'];
  backgroundUrl: Scalars['String']['input'];
  coin: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  exp: Scalars['Int']['input'];
  intro: LessonIntroDataInput;
  level: LanguageLevel;
  narratives: Array<NarrativeDataInput>;
  quizeSections: Array<QuizSectionDataInput>;
  title: Scalars['String']['input'];
};

export type LessonCardsQueryInput = {
  baseLevel?: InputMaybe<LanguageLevel>;
  excludeCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  includeProgressOf?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  targetLevel?: InputMaybe<LanguageLevel>;
};

export type LessonCardsQueryResult = {
  __typename?: 'LessonCardsQueryResult';
  cards: Array<PersonalizedLessonCard>;
  offset?: Maybe<Scalars['Int']['output']>;
};

export type LessonIntro = {
  __typename?: 'LessonIntro';
  bot: BotAvatar;
  message: Scalars['String']['output'];
  transcription: Scalars['String']['output'];
};

export type LessonIntroDataInput = {
  bot: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  transcription: Scalars['String']['input'];
};

export type LessonProgress = {
  __typename?: 'LessonProgress';
  currentQuiz: Scalars['Int']['output'];
  currentSection: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  latestUpdate: Scalars['Float']['output'];
  lessonId: Scalars['ID']['output'];
  ownerUid: Scalars['ID']['output'];
  progress: Scalars['Float']['output'];
  recapSection: Array<RecapSection>;
  status: LessonProgressStatus;
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
};

export enum LessonProgressStatus {
  Completed = 'COMPLETED',
  Inprogress = 'INPROGRESS'
}

export type LessonProgressUpdateDataInput = {
  lessonId: Scalars['ID']['input'];
  quizCardId: Scalars['ID']['input'];
  quizRecapId: Scalars['ID']['input'];
  sectionIndex: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bookCreate?: Maybe<Book>;
  botAvatarCreate: BotAvatar;
  conversationCardCreate: ConversationCard;
  conversationRecapCreate: ConversationRecap;
  lessonCardCreate: LessonCard;
  lessonProgressUpdate?: Maybe<LessonProgress>;
  readingCardCreate: ReadingCard;
  readingRecapCreate: ReadingRecap;
  sentenceCardCreate: SentenceCard;
  sentenceRecapCreate: SentenceRecap;
  userCreate: User;
  userProfileUpdate: ProfileData;
  vocabularyCardCreate: VocabularyCard;
  vocabularyRecapCreate: VocabularyRecap;
};


export type MutationBookCreateArgs = {
  data: BookCreateDataInput;
};


export type MutationBotAvatarCreateArgs = {
  data: BotAvatarDataInput;
};


export type MutationConversationCardCreateArgs = {
  data: ConversationCardCreateDataInput;
};


export type MutationConversationRecapCreateArgs = {
  data: ConversationRecapCreateDataInput;
  uid: Scalars['ID']['input'];
};


export type MutationLessonCardCreateArgs = {
  data: LessonCardCreateDataInput;
};


export type MutationLessonProgressUpdateArgs = {
  data: LessonProgressUpdateDataInput;
  uid: Scalars['ID']['input'];
};


export type MutationReadingCardCreateArgs = {
  data: ReadingCardCreateDataInput;
};


export type MutationReadingRecapCreateArgs = {
  data: ReadingRecapCreateDataInput;
  uid: Scalars['ID']['input'];
};


export type MutationSentenceCardCreateArgs = {
  data: SentenceCardCreateDataInput;
};


export type MutationSentenceRecapCreateArgs = {
  data: SentenceRecapCreateDataInput;
  uid: Scalars['ID']['input'];
};


export type MutationUserCreateArgs = {
  data: UserCreateDataInput;
};


export type MutationUserProfileUpdateArgs = {
  data: UserProfileUpdate;
  where: UserProfileUpdateDataWhereInput;
};


export type MutationVocabularyCardCreateArgs = {
  data: VocabularyCardCreateDataInput;
};


export type MutationVocabularyRecapCreateArgs = {
  data: VocabularyRecapCreateDataInput;
  uid: Scalars['ID']['input'];
};

export type Narrative = {
  __typename?: 'Narrative';
  illustrationUrl: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type NarrativeDataInput = {
  illustrationUrl: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type PersonalizedLessonCard = {
  __typename?: 'PersonalizedLessonCard';
  card: LessonCard;
  difficulty: Scalars['String']['output'];
  progress: Scalars['Int']['output'];
  status: LessonProgressStatus;
};

export type ProfileData = {
  __typename?: 'ProfileData';
  coverUrl?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastname: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
  botAvatar?: Maybe<BotAvatar>;
  lessonCard?: Maybe<PersonalizedLessonCard>;
  lessonCards: LessonCardsQueryResult;
  lessonProgress?: Maybe<LessonProgress>;
  quizCard?: Maybe<QuizCard>;
  quizRecap?: Maybe<QuizRecap>;
  user?: Maybe<User>;
  users: UsersQueryResult;
};


export type QueryBookArgs = {
  title: Scalars['String']['input'];
};


export type QueryBotAvatarArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLessonCardArgs = {
  baseLevel: LanguageLevel;
  id: Scalars['ID']['input'];
  includeProgressOf?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryLessonCardsArgs = {
  query?: InputMaybe<LessonCardsQueryInput>;
};


export type QueryLessonProgressArgs = {
  lessonId: Scalars['ID']['input'];
  uid: Scalars['ID']['input'];
};


export type QueryQuizCardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuizRecapArgs = {
  id: Scalars['ID']['input'];
  uid: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  uid: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  query?: InputMaybe<UsersQueryInput>;
};

export type QuizCard = {
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type QuizRecap = {
  coinEarned: Scalars['Int']['output'];
  expEarned: Scalars['Int']['output'];
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  quizCard: QuizCard;
  type: QuizType;
};

export type QuizSection = {
  __typename?: 'QuizSection';
  cards: Array<QuizCard>;
  title: Scalars['String']['output'];
  type: QuizType;
};

export type QuizSectionDataInput = {
  cards: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  type: QuizType;
};

export enum QuizType {
  Conversation = 'CONVERSATION',
  Reading = 'READING',
  Sentence = 'SENTENCE',
  Vocabulary = 'VOCABULARY'
}

export type ReadingAnswer = {
  __typename?: 'ReadingAnswer';
  answerIndex: Scalars['Int']['output'];
  correct: Scalars['Boolean']['output'];
  userAnswer: Scalars['Int']['output'];
};

export type ReadingCard = QuizCard & {
  __typename?: 'ReadingCard';
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  pages: Array<ReadingPage>;
  questions: Array<ReadingQuestion>;
  title: Scalars['String']['output'];
  topics?: Maybe<Array<Scalars['String']['output']>>;
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type ReadingCardCreateDataInput = {
  fromLesson: Scalars['String']['input'];
  level: LanguageLevel;
  pages: Array<ReadingPageDataInput>;
  questions: Array<ReadingQuestionDataInput>;
  title: Scalars['String']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
  totalCoin: Scalars['Int']['input'];
  totalExp: Scalars['Int']['input'];
};

export type ReadingPage = {
  __typename?: 'ReadingPage';
  illustrationUrl: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type ReadingPageDataInput = {
  illustrationUrl: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type ReadingQuestion = {
  __typename?: 'ReadingQuestion';
  choices: Array<Scalars['String']['output']>;
  coin: Scalars['Int']['output'];
  exp: Scalars['Int']['output'];
  question: Scalars['String']['output'];
};

export type ReadingQuestionDataInput = {
  answerIndex: Scalars['Int']['input'];
  choices: Array<Scalars['String']['input']>;
  coin: Scalars['Int']['input'];
  exp: Scalars['Int']['input'];
  question: Scalars['String']['input'];
};

export type ReadingRecap = QuizRecap & {
  __typename?: 'ReadingRecap';
  answer: Array<ReadingAnswer>;
  coinEarned: Scalars['Int']['output'];
  expEarned: Scalars['Int']['output'];
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  quizCard: QuizCard;
  totalCorrect: Scalars['Int']['output'];
  type: QuizType;
};

export type ReadingRecapCreateDataInput = {
  quizCard: Scalars['ID']['input'];
  userAnswer: Array<Scalars['Int']['input']>;
};

export type RecapDialogueScore = {
  __typename?: 'RecapDialogueScore';
  advancement?: Maybe<RecapDialogueScoreData>;
  appropriateness: Scalars['Boolean']['output'];
  grammar?: Maybe<RecapDialogueScoreData>;
};

export type RecapDialogueScoreCreateDataInput = {
  advancement?: InputMaybe<RecapDialogueScoreDataCreateDataInput>;
  appropriateness: Scalars['Boolean']['input'];
  grammar?: InputMaybe<RecapDialogueScoreDataCreateDataInput>;
};

export type RecapDialogueScoreData = {
  __typename?: 'RecapDialogueScoreData';
  examples?: Maybe<Array<Scalars['String']['output']>>;
  score: Scalars['Int']['output'];
};

export type RecapDialogueScoreDataCreateDataInput = {
  examples?: InputMaybe<Array<Scalars['String']['input']>>;
  score: Scalars['Int']['input'];
};

export type RecapSection = {
  __typename?: 'RecapSection';
  recaps: Array<QuizRecap>;
  title: Scalars['String']['output'];
  type: QuizType;
};

export type SentenceCard = QuizCard & {
  __typename?: 'SentenceCard';
  choices: Array<Scalars['String']['output']>;
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  question: Scalars['String']['output'];
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type SentenceCardCreateDataInput = {
  answerIndex: Scalars['Int']['input'];
  choices: Array<Scalars['String']['input']>;
  fromLesson: Scalars['String']['input'];
  level: LanguageLevel;
  question: Scalars['String']['input'];
  totalCoin: Scalars['Int']['input'];
  totalExp: Scalars['Int']['input'];
};

export type SentenceRecap = QuizRecap & {
  __typename?: 'SentenceRecap';
  answerIndex: Scalars['Int']['output'];
  coinEarned: Scalars['Int']['output'];
  correct: Scalars['Boolean']['output'];
  expEarned: Scalars['Int']['output'];
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  quizCard: QuizCard;
  type: QuizType;
  userAnswer: Scalars['Int']['output'];
};

export type SentenceRecapCreateDataInput = {
  quizCard: Scalars['ID']['input'];
  userAnswer: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  classRoom: ClassRoom;
  coin: Scalars['Int']['output'];
  exp: Scalars['Int']['output'];
  languageLevel?: Maybe<CefrLevel>;
  profile?: Maybe<ProfileData>;
  uid: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UserCreateDataInput = {
  classRoom: ClassroomDataInput;
  uid: Scalars['ID']['input'];
  username: Scalars['String']['input'];
};

export type UserProfileUpdate = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  firstname: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  lastname: Scalars['String']['input'];
};

export type UserProfileUpdateDataWhereInput = {
  uid: Scalars['ID']['input'];
};

export type UsersQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  targetRoomId?: InputMaybe<Scalars['ID']['input']>;
};

export type UsersQueryResult = {
  __typename?: 'UsersQueryResult';
  offset?: Maybe<Scalars['Int']['output']>;
  users: Array<User>;
};

export type VocabularyCard = QuizCard & {
  __typename?: 'VocabularyCard';
  choices: Array<VocabularyChoice>;
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  level: LanguageLevel;
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type VocabularyCardCreateDataInput = {
  answerIndex: Scalars['Int']['input'];
  choices: Array<VocabularyChoiceDataInput>;
  fromLesson: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  level: LanguageLevel;
  totalCoin: Scalars['Int']['input'];
  totalExp: Scalars['Int']['input'];
};

export type VocabularyChoice = {
  __typename?: 'VocabularyChoice';
  transcriptionUrl: Scalars['String']['output'];
  vocab: Scalars['String']['output'];
};

export type VocabularyChoiceDataInput = {
  transcriptionUrl: Scalars['String']['input'];
  vocab: Scalars['String']['input'];
};

export type VocabularyRecap = QuizRecap & {
  __typename?: 'VocabularyRecap';
  answerIndex: Scalars['Int']['output'];
  coinEarned: Scalars['Int']['output'];
  correct: Scalars['Boolean']['output'];
  expEarned: Scalars['Int']['output'];
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  quizCard: QuizCard;
  type: QuizType;
  userAnswer: Scalars['Int']['output'];
};

export type VocabularyRecapCreateDataInput = {
  quizCard: Scalars['ID']['input'];
  userAnswer: Scalars['Int']['input'];
};

export type MutationMutationVariables = Exact<{
  data: UserCreateDataInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', userCreate: { __typename?: 'User', uid: string, username: string, coin: number, exp: number, profile?: { __typename?: 'ProfileData', imageUrl?: string | null, coverUrl?: string | null, fullname: string, firstname: string, lastname: string } | null, languageLevel?: { __typename?: 'CEFRLevel', overall: { __typename?: 'CEFRLevelProgress', progress: number, level: LanguageLevel }, vocabulary: { __typename?: 'CEFRLevelProgress', progress: number, level: LanguageLevel }, grammar: { __typename?: 'CEFRLevelProgress', progress: number, level: LanguageLevel }, communication: { __typename?: 'CEFRLevelProgress', progress: number, level: LanguageLevel } } | null, classRoom: { __typename?: 'ClassRoom', id: string, name: string } } };

export type LessonCardsQueryVariables = Exact<{
  query?: InputMaybe<LessonCardsQueryInput>;
}>;


export type LessonCardsQuery = { __typename?: 'Query', lessonCards: { __typename?: 'LessonCardsQueryResult', cards: Array<{ __typename?: 'PersonalizedLessonCard', progress: number, difficulty: string, card: { __typename?: 'LessonCard', id: string, title: string, description: string, backgroundUrl: string, exp: number, intro: { __typename?: 'LessonIntro', message: string, bot: { __typename?: 'BotAvatar', accent: string, gender: string, avatarModels: { __typename?: 'AvatarModels', neutral: string } } } } }> } };

export type LessonCardQueryVariables = Exact<{
  lessonCardId: Scalars['ID']['input'];
  baseLevel: LanguageLevel;
  includeProgressOf?: InputMaybe<Scalars['ID']['input']>;
}>;


export type LessonCardQuery = { __typename?: 'Query', lessonCard?: { __typename?: 'PersonalizedLessonCard', progress: number, difficulty: string, card: { __typename?: 'LessonCard', id: string, title: string, description: string, backgroundUrl: string, exp: number, intro: { __typename?: 'LessonIntro', message: string, bot: { __typename?: 'BotAvatar', accent: string, gender: string, avatarModels: { __typename?: 'AvatarModels', neutral: string } } } } } | null };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreateDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"coverUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageLevel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overall"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vocabulary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"grammar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"communication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"coin"}},{"kind":"Field","name":{"kind":"Name","value":"exp"}},{"kind":"Field","name":{"kind":"Name","value":"classRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const LessonCardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LessonCards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonCardsQueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lessonCards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundUrl"}},{"kind":"Field","name":{"kind":"Name","value":"exp"}},{"kind":"Field","name":{"kind":"Name","value":"intro"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarModels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"neutral"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accent"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LessonCardsQuery, LessonCardsQueryVariables>;
export const LessonCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LessonCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonCardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"baseLevel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LanguageLevel"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includeProgressOf"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lessonCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonCardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"baseLevel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"baseLevel"}}},{"kind":"Argument","name":{"kind":"Name","value":"includeProgressOf"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includeProgressOf"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"intro"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarModels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"neutral"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accent"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"backgroundUrl"}},{"kind":"Field","name":{"kind":"Name","value":"exp"}}]}}]}}]}}]} as unknown as DocumentNode<LessonCardQuery, LessonCardQueryVariables>;
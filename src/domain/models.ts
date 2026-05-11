export type CardId = "fool" | "magician" | "high-priestess";
export type StoryChapterId = "chapter-fool" | "chapter-magician" | "chapter-priestess";
export type EncounterId = "fool-threshold";
export type ScreenId =
  | "home"
  | "journey"
  | "live-spread"
  | "card-of-day"
  | "dialogues"
  | "assembly"
  | "reference";

export type CardGroup = "major";
export type StoryRole = "threshold" | "tool" | "oracle";
export type JourneyPhase = "idle" | "resolved";
export type Orientation = "upright" | "reversed";

export interface TarotCard {
  id: CardId;
  name: string;
  group: CardGroup;
  keywords: string[];
  lightMeaning: string;
  shadowMeaning: string;
  advice: string;
  warning: string;
  dailyMeaning: string;
  questionToSelf: string;
  storyRole: StoryRole;
}

export interface StoryChapter {
  id: StoryChapterId;
  title: string;
  cardId: CardId;
  summary: string;
  prompt: string;
  encounterId: EncounterId | null;
}

export interface EncounterChoice {
  id: string;
  label: string;
  cardId: CardId;
  orientation: Orientation;
  xp: number;
  buttonNote: string;
  summaryOverride: string;
  adviceOverride: string;
}

export interface StoryEncounter {
  id: EncounterId;
  chapterId: StoryChapterId;
  title: string;
  situation: string;
  question: string;
  positionTitle: string;
  choices: EncounterChoice[];
}

export interface PlayerState {
  version: 1;
  xp: number;
  currentChapterId: StoryChapterId;
  currentEncounterId: EncounterId;
  journeyPhase: JourneyPhase;
  lastChoiceId: string | null;
  lastChoiceCardId: CardId | null;
  lastFeedback: string | null;
  completedEncounterIds: EncounterId[];
  updatedAt: string;
}

export interface ProgressSnapshot {
  level: number;
  xp: number;
  xpIntoLevel: number;
  xpToNextLevel: number;
  chapterTitle: string;
  chapterSummary: string;
  encounterTitle: string;
  statusLabel: string;
  lastChoiceLabel: string;
  lastChoiceCardLabel: string;
  lastSavedLabel: string;
}

export interface AppViewState {
  screen: ScreenId;
  player: PlayerState;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
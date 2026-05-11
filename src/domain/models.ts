export type CardId = string;
export type StoryChapterId = string;
export type EncounterId = string;
export type ScreenId =
  | "home"
  | "journey"
  | "live-spread"
  | "card-of-day"
  | "dialogues"
  | "assembly"
  | "reference";

export type CardGroup = "major" | "minor";
export type StoryRole = string;
export type JourneyPhase = "idle" | "resolved" | "complete";
export type Orientation = "upright" | "reversed";

export interface TarotCard {
  id: CardId;
  name: string;
  group: CardGroup;
  keywords: readonly string[];
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
  choices: readonly EncounterChoice[];
}

export interface PlayerState {
  version: 1;
  xp: number;
  currentChapterId: StoryChapterId;
  currentEncounterId: EncounterId;
  journeyPhase: JourneyPhase;
  lastChoiceId: string | null;
  lastEncounterId: EncounterId | null;
  lastChoiceCardId: CardId | null;
  lastFeedback: string | null;
  completedEncounterIds: readonly EncounterId[];
  updatedAt: string;
}

export interface ProgressSnapshot {
  level: number;
  xp: number;
  xpIntoLevel: number;
  xpToNextLevel: number;
  episodeProgressLabel: string;
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

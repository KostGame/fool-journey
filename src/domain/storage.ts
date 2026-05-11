import { cards } from "../data/cards";
import { encounters } from "../data/encounters";
import { minorArcanaEvents } from "../data/minorArcanaEvents";
import { isJourneyStepId } from "../data/journeySteps";
import { storyChapters } from "../data/storyChapters";
import { createInitialPlayerState } from "./progress";
import type {
  CardId,
  EncounterId,
  MinorArcanaEventId,
  PlayerState,
  ScreenId,
  StorageLike,
  StoryChapterId
} from "./models";

export const STORAGE_KEY = "fool-journey:player-state:v1";

export function createMemoryStorage(initialEntries: Record<string, string> = {}): StorageLike {
  const store = new Map<string, string>(Object.entries(initialEntries));

  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    }
  };
}

export function loadPlayerState(storage: StorageLike): PlayerState {
  try {
    const raw = storage.getItem(STORAGE_KEY);

    if (!raw) {
      return createInitialPlayerState();
    }

    return normalizePlayerState(JSON.parse(raw));
  } catch {
    return createInitialPlayerState();
  }
}

export function savePlayerState(storage: StorageLike, player: PlayerState): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(player));
  } catch {
    // Игнорируем ошибки storage, чтобы UI не падал в приватном режиме.
  }
}

export function resetStoredPlayerState(storage: StorageLike): void {
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // Игнорируем ошибки storage.
  }
}

export function normalizePlayerState(value: unknown): PlayerState {
  const fallback = createInitialPlayerState();

  if (!isRecord(value)) {
    return fallback;
  }

  const currentChapterId = isStoryChapterId(value.currentChapterId) ? value.currentChapterId : fallback.currentChapterId;
  const currentEncounterId = isEncounterId(value.currentEncounterId) ? value.currentEncounterId : fallback.currentEncounterId;
  const currentMinorEventId = isMinorArcanaEventId(value.currentMinorEventId) ? value.currentMinorEventId : null;
  const currentStepKind = value.currentStepKind === "minor" && currentMinorEventId ? "minor" : currentMinorEventId ? "minor" : "major";
  const lastChoiceCardId = isCardId(value.lastChoiceCardId) ? value.lastChoiceCardId : null;
  const lastChoiceId = typeof value.lastChoiceId === "string" && value.lastChoiceId.trim().length > 0 ? value.lastChoiceId : null;
  const lastEncounterId = isJourneyStepId(value.lastEncounterId)
    ? value.lastEncounterId
    : lastChoiceId
      ? currentStepKind === "minor" && currentMinorEventId
        ? currentMinorEventId
        : currentEncounterId
      : null;
  const lastFeedback = typeof value.lastFeedback === "string" && value.lastFeedback.trim().length > 0 ? value.lastFeedback : null;
  const journeyPhase = value.journeyPhase === "resolved" || value.journeyPhase === "complete" ? value.journeyPhase : "idle";

  return {
    version: 2,
    xp: normalizePositiveInteger(value.xp),
    minorXp: normalizePositiveInteger(value.minorXp),
    currentChapterId,
    currentEncounterId,
    currentStepKind,
    currentMinorEventId,
    journeyPhase,
    lastChoiceId,
    lastEncounterId,
    lastChoiceCardId,
    lastFeedback,
    completedEncounterIds: normalizeEncounterIds(value.completedEncounterIds),
    completedMinorEventIds: normalizeMinorEventIds(value.completedMinorEventIds),
    updatedAt: normalizeTimestamp(value.updatedAt)
  };
}

function normalizePositiveInteger(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }

  return Math.floor(value);
}

function normalizeTimestamp(value: unknown): string {
  if (typeof value === "string" && !Number.isNaN(Date.parse(value))) {
    return value;
  }

  return createInitialPlayerState().updatedAt;
}

function normalizeEncounterIds(value: unknown): EncounterId[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is EncounterId => isEncounterId(entry));
}

function normalizeMinorEventIds(value: unknown): MinorArcanaEventId[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is MinorArcanaEventId => isMinorArcanaEventId(entry));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCardId(value: unknown): value is CardId {
  return typeof value === "string" && cards.some((card) => card.id === value);
}

function isStoryChapterId(value: unknown): value is StoryChapterId {
  return typeof value === "string" && storyChapters.some((chapter) => chapter.id === value);
}

function isEncounterId(value: unknown): value is EncounterId {
  return typeof value === "string" && encounters.some((encounter) => encounter.id === value);
}

function isMinorArcanaEventId(value: unknown): value is MinorArcanaEventId {
  return typeof value === "string" && minorArcanaEvents.some((event) => event.id === value);
}

export function isSafeScreenId(value: unknown): value is ScreenId {
  return (
    value === "home" ||
    value === "journey" ||
    value === "live-spread" ||
    value === "card-of-day" ||
    value === "dialogues" ||
    value === "assembly" ||
    value === "reference"
  );
}

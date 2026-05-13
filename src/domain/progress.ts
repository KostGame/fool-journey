import { getCard } from "../data/cards";
import { getEncounter, getStartEncounter } from "../data/encounters";
import { getJourneyStepById } from "../data/journeySteps";
import { getMinorArcanaEvent, getMinorEventAfterChapter, minorArcanaEvents } from "../data/minorArcanaEvents";
import { getPlayableChapter, getStoryChapter, storyChapters } from "../data/storyChapters";
import type {
  CardId,
  ChoiceInventoryEffect,
  EarnedCard,
  EncounterChoice,
  EncounterId,
  InventoryCardRole,
  MinorArcanaEvent,
  MinorArcanaEventId,
  PlayerState,
  ProgressSnapshot
} from "./models";

const XP_PER_LEVEL = 2;
const DEFAULT_EARNED_ROLE: InventoryCardRole = "lesson";

interface InventoryUpdateResult {
  earnedCards: readonly EarnedCard[];
  inventoryCards: readonly CardId[];
  knownCards: readonly CardId[];
  lastEarnedCardId: CardId | null;
  lastAppliedCardId: CardId | null;
  lastHelperCardId: CardId | null;
}

function nowIso(): string {
  return new Date().toISOString();
}

function appendUniqueCardIds(base: readonly CardId[], extra: readonly CardId[]): readonly CardId[] {
  const next = new Set(base);

  for (const cardId of extra) {
    if (cardId) {
      next.add(cardId);
    }
  }

  return [...next];
}

function updateInventoryFromChoice(
  player: PlayerState,
  sourceStepId: EncounterId | MinorArcanaEventId,
  choiceCardId: CardId,
  inventoryEffect?: ChoiceInventoryEffect,
): InventoryUpdateResult {
  let earnedCards = [...player.earnedCards];
  let inventoryCards = [...player.inventoryCards];
  let knownCards = appendUniqueCardIds(player.knownCards, [choiceCardId]);

  let lastEarnedCardId: CardId | null = null;
  let lastAppliedCardId: CardId | null = null;
  let lastHelperCardId: CardId | null = null;

  if (inventoryEffect?.earnedCardId) {
    const role = inventoryEffect.earnedRole ?? DEFAULT_EARNED_ROLE;
    const cardId = inventoryEffect.earnedCardId;

    if (!earnedCards.some((entry) => entry.cardId === cardId)) {
      earnedCards = [
        ...earnedCards,
        {
          cardId,
          earnedAt: nowIso(),
          sourceStepId,
          role,
          uses: 0
        }
      ];
    }

    inventoryCards = [...appendUniqueCardIds(inventoryCards, [cardId])];
    knownCards = appendUniqueCardIds(knownCards, [cardId]);
    lastEarnedCardId = cardId;
  }

  if (inventoryEffect?.appliedCardId) {
    const cardId = inventoryEffect.appliedCardId;
    const earnedCardIndex = earnedCards.findIndex((entry) => entry.cardId === cardId);

    if (earnedCardIndex >= 0) {
      const current = earnedCards[earnedCardIndex];
      earnedCards = [
        ...earnedCards.slice(0, earnedCardIndex),
        {
          ...current,
          uses: current.uses + 1
        },
        ...earnedCards.slice(earnedCardIndex + 1)
      ];
    }

    knownCards = appendUniqueCardIds(knownCards, [cardId]);
    lastAppliedCardId = cardId;
  }

  if (inventoryEffect?.helperCardId) {
    knownCards = appendUniqueCardIds(knownCards, [inventoryEffect.helperCardId]);
    lastHelperCardId = inventoryEffect.helperCardId;
  }

  return {
    earnedCards,
    inventoryCards,
    knownCards,
    lastEarnedCardId,
    lastAppliedCardId,
    lastHelperCardId
  };
}

function formatSavedAt(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "только что";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export function createInitialPlayerState(): PlayerState {
  const chapter = getPlayableChapter();
  const encounter = getStartEncounter();

  return {
    version: 2,
    xp: 0,
    minorXp: 0,
    earnedCards: [],
    inventoryCards: [],
    knownCards: [chapter.cardId],
    currentChapterId: chapter.id,
    currentEncounterId: encounter.id,
    currentStepKind: "major",
    currentMinorEventId: null,
    journeyPhase: "idle",
    lastChoiceId: null,
    lastEncounterId: null,
    lastChoiceCardId: null,
    lastFeedback: null,
    lastEarnedCardId: null,
    lastAppliedCardId: null,
    lastHelperCardId: null,
    completedEncounterIds: [],
    completedMinorEventIds: [],
    updatedAt: nowIso()
  };
}

export function resetPlayerState(): PlayerState {
  return createInitialPlayerState();
}

export function getPlayerLevel(xp: number): number {
  return 1 + Math.floor(Math.max(0, xp) / XP_PER_LEVEL);
}

export function getXpIntoLevel(xp: number): number {
  return Math.max(0, xp) % XP_PER_LEVEL;
}

export function getXpToNextLevel(xp: number): number {
  const remainder = getXpIntoLevel(xp);
  return remainder === 0 ? XP_PER_LEVEL : XP_PER_LEVEL - remainder;
}

export function getPrimaryActionLabel(player: PlayerState): string {
  if (player.journeyPhase === "complete") {
    return "Повторить историю";
  }

  return player.journeyPhase === "resolved" ? "Посмотреть результат" : "Продолжить историю";
}

export function getHomeActionLabel(player: PlayerState): string {
  return player.journeyPhase === "complete" ? "Повторить историю" : "Продолжить историю";
}

export function getJourneyAdvanceActionLabel(player: PlayerState): string {
  return isJourneyComplete(player) ? "К главному экрану" : "Дальше";
}

export function isJourneyComplete(player: PlayerState): boolean {
  return player.journeyPhase === "complete";
}

export function getCurrentStepKindLabel(player: PlayerState): string {
  return player.currentStepKind === "minor" ? "Дорожное событие" : "Большая глава";
}

export function getMinorEventProgressLabel(player: PlayerState): string {
  return `${Math.min(player.completedMinorEventIds.length, minorArcanaEvents.length)} / ${minorArcanaEvents.length}`;
}

export function getCurrentMinorEvent(player: PlayerState): MinorArcanaEvent | undefined {
  if (player.currentStepKind !== "minor" || !player.currentMinorEventId) {
    return undefined;
  }

  return getMinorArcanaEvent(player.currentMinorEventId);
}

export function recordEncounterChoice(
  player: PlayerState,
  encounterId: EncounterId,
  choice: EncounterChoice,
  feedback: string,
  inventoryEffect?: ChoiceInventoryEffect,
): PlayerState {
  const completedEncounterIds = player.completedEncounterIds.includes(encounterId)
    ? player.completedEncounterIds
    : [...player.completedEncounterIds, encounterId];
  const inventoryUpdate = updateInventoryFromChoice(player, encounterId, choice.cardId, inventoryEffect);

  return {
    ...player,
    xp: Math.max(0, player.xp + choice.xp),
    earnedCards: inventoryUpdate.earnedCards,
    inventoryCards: inventoryUpdate.inventoryCards,
    knownCards: inventoryUpdate.knownCards,
    journeyPhase: "resolved",
    currentStepKind: "major",
    currentMinorEventId: null,
    lastChoiceId: choice.id,
    lastEncounterId: encounterId,
    lastChoiceCardId: choice.cardId,
    lastFeedback: feedback,
    lastEarnedCardId: inventoryUpdate.lastEarnedCardId,
    lastAppliedCardId: inventoryUpdate.lastAppliedCardId,
    lastHelperCardId: inventoryUpdate.lastHelperCardId,
    completedEncounterIds,
    updatedAt: nowIso()
  };
}

export function recordMinorEventChoice(
  player: PlayerState,
  minorEventId: MinorArcanaEventId,
  choice: EncounterChoice,
  feedback: string,
  inventoryEffect?: ChoiceInventoryEffect,
): PlayerState {
  const completedMinorEventIds = player.completedMinorEventIds.includes(minorEventId)
    ? player.completedMinorEventIds
    : [...player.completedMinorEventIds, minorEventId];
  const inventoryUpdate = updateInventoryFromChoice(player, minorEventId, choice.cardId, inventoryEffect);

  return {
    ...player,
    xp: Math.max(0, player.xp + choice.xp),
    minorXp: Math.max(0, player.minorXp + choice.xp),
    earnedCards: inventoryUpdate.earnedCards,
    inventoryCards: inventoryUpdate.inventoryCards,
    knownCards: inventoryUpdate.knownCards,
    journeyPhase: "resolved",
    currentStepKind: "minor",
    currentMinorEventId: minorEventId,
    lastChoiceId: choice.id,
    lastEncounterId: minorEventId,
    lastChoiceCardId: choice.cardId,
    lastFeedback: feedback,
    lastEarnedCardId: inventoryUpdate.lastEarnedCardId,
    lastAppliedCardId: inventoryUpdate.lastAppliedCardId,
    lastHelperCardId: inventoryUpdate.lastHelperCardId,
    completedMinorEventIds,
    updatedAt: nowIso()
  };
}

export function advanceJourney(player: PlayerState): PlayerState {
  if (player.journeyPhase !== "resolved") {
    return player;
  }

  if (player.currentStepKind === "minor") {
    const currentIndex = storyChapters.findIndex((chapter) => chapter.id === player.currentChapterId);
    const nextChapter = currentIndex >= 0 ? storyChapters[currentIndex + 1] : undefined;

    if (!nextChapter?.encounterId) {
      return {
        ...player,
        journeyPhase: "complete",
        currentMinorEventId: null,
        updatedAt: nowIso()
      };
    }

    return {
      ...player,
      currentChapterId: nextChapter.id,
      currentEncounterId: nextChapter.encounterId,
      currentStepKind: "major",
      currentMinorEventId: null,
      journeyPhase: "idle",
      updatedAt: nowIso()
    };
  }

  const currentChapter = getStoryChapter(player.currentChapterId) ?? getPlayableChapter();
  const minorEvent = getMinorEventAfterChapter(currentChapter.id);
  const currentIndex = storyChapters.findIndex((chapter) => chapter.id === player.currentChapterId);
  const nextChapter = currentIndex >= 0 ? storyChapters[currentIndex + 1] : undefined;

  if (minorEvent && !player.completedMinorEventIds.includes(minorEvent.id)) {
    return {
      ...player,
      currentStepKind: "minor",
      currentMinorEventId: minorEvent.id,
      journeyPhase: "idle",
      updatedAt: nowIso()
    };
  }

  if (!nextChapter?.encounterId) {
    return {
      ...player,
      journeyPhase: "complete",
      currentMinorEventId: null,
      updatedAt: nowIso()
    };
  }

  return {
    ...player,
    currentChapterId: nextChapter.id,
    currentEncounterId: nextChapter.encounterId,
    currentStepKind: "major",
    currentMinorEventId: null,
    journeyPhase: "idle",
    updatedAt: nowIso()
  };
}

export function buildProgressSnapshot(player: PlayerState): ProgressSnapshot {
  const chapter = getStoryChapter(player.currentChapterId) ?? getPlayableChapter();
  const majorEncounter = getEncounter(player.currentEncounterId) ?? getStartEncounter();
  const currentMinorEvent = getCurrentMinorEvent(player);
  const activeStep = currentMinorEvent ?? majorEncounter;
  const lastJourneyStep = player.lastEncounterId ? getJourneyStepById(player.lastEncounterId) : activeStep;
  const lastChoice = lastJourneyStep?.choices.find((choice) => choice.id === player.lastChoiceId);
  const lastChoiceCard = player.lastChoiceCardId ? getCard(player.lastChoiceCardId) : undefined;
  const episodeTotal = storyChapters.filter((chapterItem) => chapterItem.encounterId).length;
  const episodeCompleted = Math.min(player.completedEncounterIds.length, episodeTotal);
  const routeTotal = episodeTotal + minorArcanaEvents.length;
  const routeCompleted = Math.min(episodeCompleted + player.completedMinorEventIds.length, routeTotal);

  return {
    level: getPlayerLevel(player.xp),
    xp: player.xp,
    xpIntoLevel: getXpIntoLevel(player.xp),
    xpToNextLevel: getXpToNextLevel(player.xp),
    episodeProgressLabel: `${episodeCompleted} / ${episodeTotal}`,
    minorEventProgressLabel: getMinorEventProgressLabel(player),
    routeProgressLabel: `${routeCompleted} / ${routeTotal}`,
    remainingJourneyStepsLabel: `${Math.max(0, routeTotal - routeCompleted)}`,
    chapterTitle: chapter.title,
    chapterSummary: chapter.summary,
    encounterTitle: activeStep.title,
    stepKindLabel: getCurrentStepKindLabel(player),
    statusLabel:
      player.journeyPhase === "complete"
        ? "Путь старших арканов завершён"
        : player.currentStepKind === "minor"
          ? player.journeyPhase === "resolved"
            ? "Дорожное событие прожито"
            : "Короткое дорожное событие ждёт ответа"
          : player.journeyPhase === "resolved"
            ? "Сцена уже прожита"
            : "Большая глава ждёт первого шага",
    lastChoiceLabel: lastChoice?.label ?? "Пока нет выбора",
    lastChoiceCardLabel: lastChoiceCard?.name ?? "Пока нет карты",
    lastSavedLabel: formatSavedAt(player.updatedAt)
  };
}

export function getCurrentChapterCardId(player: PlayerState): CardId {
  const chapter = getStoryChapter(player.currentChapterId) ?? storyChapters[0];
  return chapter.cardId;
}

export function getCurrentChapterCard(player: PlayerState) {
  return getCard(getCurrentChapterCardId(player));
}

export function getLastChoiceCard(player: PlayerState) {
  return player.lastChoiceCardId ? getCard(player.lastChoiceCardId) : undefined;
}

export function getLastChoiceFeedback(player: PlayerState): string {
  return player.lastFeedback ?? "Пока нет ответа";
}

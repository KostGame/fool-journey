import { getCard } from "../data/cards";
import { getEncounter, getStartEncounter } from "../data/encounters";
import { getJourneyStepById } from "../data/journeySteps";
import { getMinorArcanaEvent, getMinorEventAfterChapter, minorArcanaEvents } from "../data/minorArcanaEvents";
import { getPlayableChapter, getStoryChapter, storyChapters } from "../data/storyChapters";
import type {
  CardId,
  EncounterChoice,
  EncounterId,
  MinorArcanaEvent,
  MinorArcanaEventId,
  PlayerState,
  ProgressSnapshot
} from "./models";

const XP_PER_LEVEL = 2;

function nowIso(): string {
  return new Date().toISOString();
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
    currentChapterId: chapter.id,
    currentEncounterId: encounter.id,
    currentStepKind: "major",
    currentMinorEventId: null,
    journeyPhase: "idle",
    lastChoiceId: null,
    lastEncounterId: null,
    lastChoiceCardId: null,
    lastFeedback: null,
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
): PlayerState {
  const completedEncounterIds = player.completedEncounterIds.includes(encounterId)
    ? player.completedEncounterIds
    : [...player.completedEncounterIds, encounterId];

  return {
    ...player,
    xp: Math.max(0, player.xp + choice.xp),
    journeyPhase: "resolved",
    currentStepKind: "major",
    currentMinorEventId: null,
    lastChoiceId: choice.id,
    lastEncounterId: encounterId,
    lastChoiceCardId: choice.cardId,
    lastFeedback: feedback,
    completedEncounterIds,
    updatedAt: nowIso()
  };
}

export function recordMinorEventChoice(
  player: PlayerState,
  minorEventId: MinorArcanaEventId,
  choice: EncounterChoice,
  feedback: string,
): PlayerState {
  const completedMinorEventIds = player.completedMinorEventIds.includes(minorEventId)
    ? player.completedMinorEventIds
    : [...player.completedMinorEventIds, minorEventId];

  return {
    ...player,
    xp: Math.max(0, player.xp + choice.xp),
    minorXp: Math.max(0, player.minorXp + choice.xp),
    journeyPhase: "resolved",
    currentStepKind: "minor",
    currentMinorEventId: minorEventId,
    lastChoiceId: choice.id,
    lastEncounterId: minorEventId,
    lastChoiceCardId: choice.cardId,
    lastFeedback: feedback,
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

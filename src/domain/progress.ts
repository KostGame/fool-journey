import { getCard } from "../data/cards";
import { getStartEncounter, getEncounter } from "../data/encounters";
import { getPlayableChapter, getStoryChapter, storyChapters } from "../data/storyChapters";
import type { CardId, EncounterChoice, EncounterId, PlayerState, ProgressSnapshot } from "./models";

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
    version: 1,
    xp: 0,
    currentChapterId: chapter.id,
    currentEncounterId: encounter.id,
    journeyPhase: "idle",
    lastChoiceId: null,
    lastEncounterId: null,
    lastChoiceCardId: null,
    lastFeedback: null,
    completedEncounterIds: [],
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
    return "Посмотреть итог";
  }

  return player.journeyPhase === "resolved" ? "Посмотреть результат" : "Продолжить путь";
}

export function getHomeActionLabel(player: PlayerState): string {
  return player.journeyPhase === "complete" ? "Повторить путь" : "Продолжить путь";
}

export function getJourneyAdvanceActionLabel(player: PlayerState): string {
  return isJourneyComplete(player) ? "К главному экрану" : "Продолжить путь";
}

export function isJourneyComplete(player: PlayerState): boolean {
  return player.journeyPhase === "complete";
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
    lastChoiceId: choice.id,
    lastEncounterId: encounterId,
    lastChoiceCardId: choice.cardId,
    lastFeedback: feedback,
    completedEncounterIds,
    updatedAt: nowIso()
  };
}

export function advanceJourney(player: PlayerState): PlayerState {
  if (player.journeyPhase !== "resolved") {
    return player;
  }

  const currentIndex = storyChapters.findIndex((chapter) => chapter.id === player.currentChapterId);
  const nextChapter = currentIndex >= 0 ? storyChapters[currentIndex + 1] : undefined;

  if (!nextChapter?.encounterId) {
    return {
      ...player,
      journeyPhase: "complete",
      updatedAt: nowIso()
    };
  }

  return {
    ...player,
    currentChapterId: nextChapter.id,
    currentEncounterId: nextChapter.encounterId,
    journeyPhase: "idle",
    updatedAt: nowIso()
  };
}

export function buildProgressSnapshot(player: PlayerState): ProgressSnapshot {
  const chapter = getStoryChapter(player.currentChapterId) ?? getPlayableChapter();
  const encounter = getEncounter(player.currentEncounterId) ?? getStartEncounter();
  const lastEncounter = player.lastEncounterId ? getEncounter(player.lastEncounterId) : encounter;
  const lastChoice = lastEncounter?.choices.find((choice) => choice.id === player.lastChoiceId);
  const lastChoiceCard = player.lastChoiceCardId ? getCard(player.lastChoiceCardId) : undefined;
  const episodeTotal = storyChapters.filter((chapterItem) => chapterItem.encounterId).length;
  const episodeCompleted = Math.min(player.completedEncounterIds.length, episodeTotal);

  return {
    level: getPlayerLevel(player.xp),
    xp: player.xp,
    xpIntoLevel: getXpIntoLevel(player.xp),
    xpToNextLevel: getXpToNextLevel(player.xp),
    episodeProgressLabel: `${episodeCompleted} / ${episodeTotal}`,
    chapterTitle: chapter.title,
    chapterSummary: chapter.summary,
    encounterTitle: encounter.title,
    statusLabel:
      player.journeyPhase === "complete"
        ? "Путь старших арканов завершён"
        : player.journeyPhase === "resolved"
          ? "Сцена уже прожита"
          : "Путь ждёт первого шага",
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

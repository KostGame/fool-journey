import { dialogueScenes } from "../data/dialogueScenes";
import { getCard } from "../data/cards";
import { getJourneyStepById } from "../data/journeySteps";
import { minorArcanaEvents } from "../data/minorArcanaEvents";
import { getStoryChapter, storyChapters } from "../data/storyChapters";
import type { CardId, EarnedCard, PlayerState } from "./models";
import { buildProgressSnapshot } from "./progress";

export interface JournalSummary {
  completedMajorChapters: number;
  totalMajorChapters: number;
  completedMinorEvents: number;
  totalMinorEvents: number;
  receivedCards: number;
  appliedCards: number;
  helperCards: number;
  knownCards: number;
  inventoryCards: number;
}

export interface JournalCardEntry {
  cardId: CardId;
  name: string;
  role: string;
  uses: number;
  sourceLabel: string;
  sourceStepId: string;
  summary: string;
}

export interface JournalHelperEntry {
  cardId: CardId;
  name: string;
  appearances: number;
  sceneTitles: readonly string[];
  note: string;
}

export interface JournalChapterEntry {
  chapterId: string;
  title: string;
  cardId: CardId;
  summary: string;
  prompt: string;
  status: "completed" | "current" | "upcoming";
}

export interface JournalSnapshot {
  summary: JournalSummary;
  receivedCards: readonly JournalCardEntry[];
  appliedCards: readonly JournalCardEntry[];
  helpers: readonly JournalHelperEntry[];
  chapters: readonly JournalChapterEntry[];
  progressLabel: string;
  currentChapterTitle: string;
}

function formatStepLabel(stepId: string): string {
  const step = getJourneyStepById(stepId);
  return step?.title ?? stepId;
}

function buildCardEntry(earnedCard: EarnedCard): JournalCardEntry | null {
  const card = getCard(earnedCard.cardId);

  if (!card) {
    return null;
  }

  return {
    cardId: card.id,
    name: card.name,
    role: earnedCard.role,
    uses: earnedCard.uses,
    sourceLabel: formatStepLabel(earnedCard.sourceStepId),
    sourceStepId: earnedCard.sourceStepId,
    summary: card.dailyMeaning
  };
}

export function buildJournalSnapshot(player: PlayerState): JournalSnapshot {
  const progress = buildProgressSnapshot(player);
  const receivedCards = player.earnedCards
    .map(buildCardEntry)
    .filter((entry): entry is JournalCardEntry => Boolean(entry));
  const appliedCards = receivedCards.filter((entry) => entry.uses > 0);
  const completedStepIds = new Set([...player.completedEncounterIds, ...player.completedMinorEventIds]);
  const helperMap = new Map<CardId, JournalHelperEntry & { sceneOrder: number }>();

  for (const scene of dialogueScenes) {
    if (!scene.helperCardId || !completedStepIds.has(scene.sourceStepId)) {
      continue;
    }

    const card = getCard(scene.helperCardId);

    if (!card) {
      continue;
    }

    const sceneTitle = formatStepLabel(scene.sourceStepId);
    const existing = helperMap.get(card.id);

    if (existing) {
      helperMap.set(card.id, {
        ...existing,
        appearances: existing.appearances + 1,
        sceneTitles: [...existing.sceneTitles, sceneTitle]
      });
      continue;
    }

    helperMap.set(card.id, {
      cardId: card.id,
      name: card.name,
      appearances: 1,
      sceneTitles: [sceneTitle],
      note: card.dailyMeaning,
      sceneOrder: helperMap.size
    });
  }

  const helpers = [...helperMap.values()]
    .sort((left, right) => left.sceneOrder - right.sceneOrder)
    .map(({ sceneOrder: _sceneOrder, ...entry }) => entry);
  const completedMinorEvents = player.completedMinorEventIds.length;

  const chapters = storyChapters.map((chapter) => {
    const isCompleted = chapter.encounterId ? player.completedEncounterIds.includes(chapter.encounterId) : false;
    const isCurrent = chapter.id === player.currentChapterId;

    return {
      chapterId: chapter.id,
      title: chapter.title,
      cardId: chapter.cardId,
      summary: chapter.summary,
      prompt: chapter.prompt,
      status: isCurrent ? "current" : isCompleted ? "completed" : "upcoming"
    } satisfies JournalChapterEntry;
  });

  const summary: JournalSummary = {
    completedMajorChapters: player.completedEncounterIds.length,
    totalMajorChapters: storyChapters.filter((chapter) => Boolean(chapter.encounterId)).length,
    completedMinorEvents,
    totalMinorEvents: minorArcanaEvents.length,
    receivedCards: receivedCards.length,
    appliedCards: appliedCards.length,
    helperCards: helpers.length,
    knownCards: player.knownCards.length,
    inventoryCards: player.inventoryCards.length
  };

  return {
    summary,
    receivedCards,
    appliedCards,
    helpers,
    chapters,
    progressLabel: progress.routeProgressLabel,
    currentChapterTitle: getStoryChapter(player.currentChapterId)?.title ?? progress.chapterTitle
  };
}

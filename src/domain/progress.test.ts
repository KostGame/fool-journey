import { describe, expect, it } from "vitest";
import { encounters } from "../data/encounters";
import { getMinorEventAfterChapter } from "../data/minorArcanaEvents";
import {
  advanceJourney,
  buildProgressSnapshot,
  createInitialPlayerState,
  getCurrentMinorEvent,
  getHomeActionLabel,
  getJourneyAdvanceActionLabel,
  getPlayerLevel,
  getPrimaryActionLabel,
  recordEncounterChoice,
  recordMinorEventChoice
} from "./progress";

function playThroughJourney() {
  let state = createInitialPlayerState();

  for (const encounter of encounters) {
    state = recordEncounterChoice(state, encounter.id, encounter.choices[0], `${encounter.title} done`);
    state = advanceJourney(state);

    while (state.currentStepKind === "minor") {
      const minorEvent = getMinorEventAfterChapter(state.currentChapterId);

      expect(minorEvent).toBeDefined();

      if (!minorEvent) {
        return state;
      }

      state = recordMinorEventChoice(state, minorEvent.id, minorEvent.choices[0], `${minorEvent.title} done`);
      state = advanceJourney(state);
    }
  }

  return state;
}

describe("progress helpers", () => {
  it("creates the initial player state for the Fool chapter", () => {
    const state = createInitialPlayerState();

    expect(state.version).toBe(2);
    expect(state.xp).toBe(0);
    expect(state.minorXp).toBe(0);
    expect(state.earnedCards).toEqual([]);
    expect(state.inventoryCards).toEqual([]);
    expect(state.knownCards).toContain("fool");
    expect(state.currentChapterId).toBe("chapter-fool");
    expect(state.currentEncounterId).toBe("fool-threshold");
    expect(state.currentStepKind).toBe("major");
    expect(state.currentMinorEventId).toBeNull();
    expect(state.journeyPhase).toBe("idle");
    expect(state.lastEncounterId).toBeNull();
    expect(state.completedMinorEventIds).toHaveLength(0);
    expect(state.updatedAt).toMatch(/T/);
    expect(buildProgressSnapshot(state).routeProgressLabel).toBe("0 / 31");
    expect(buildProgressSnapshot(state).remainingJourneyStepsLabel).toBe("31");
  });

  it("increments experience and records the selected choice", () => {
    const initial = createInitialPlayerState();
    const encounter = encounters[0];

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    const choice = encounter.choices[0];
    const next = recordEncounterChoice(initial, encounter.id, choice, "interpretation");

    expect(next.xp).toBe(initial.xp + choice.xp);
    expect(next.journeyPhase).toBe("resolved");
    expect(next.lastChoiceId).toBe(choice.id);
    expect(next.lastEncounterId).toBe(encounter.id);
    expect(next.lastChoiceCardId).toBe(choice.cardId);
    expect(next.lastFeedback).toBe("interpretation");
    expect(next.completedEncounterIds).toContain(encounter.id);
  });

  it("stores earned and applied cards as journey inventory", () => {
    const initial = createInitialPlayerState();
    const encounter = encounters[0];

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    const earned = recordEncounterChoice(initial, encounter.id, encounter.choices[0], "card gained", {
      earnedCardId: "2-cups",
      earnedRole: "action"
    });

    expect(earned.inventoryCards).toContain("2-cups");
    expect(earned.knownCards).toContain("2-cups");
    expect(earned.lastEarnedCardId).toBe("2-cups");
    expect(earned.earnedCards.some((entry) => entry.cardId === "2-cups" && entry.role === "action")).toBe(true);

    const applied = recordEncounterChoice(earned, encounter.id, encounter.choices[1], "card applied", {
      appliedCardId: "2-cups"
    });

    const inventoryEntry = applied.earnedCards.find((entry) => entry.cardId === "2-cups");

    expect(applied.lastAppliedCardId).toBe("2-cups");
    expect(inventoryEntry?.uses).toBe(1);
  });

  it("inserts a curated minor event between major chapters and returns to the major path", () => {
    const empressEncounter = encounters.find((encounter) => encounter.chapterId === "chapter-empress");

    expect(empressEncounter).toBeDefined();

    if (!empressEncounter) {
      return;
    }

    let state = createInitialPlayerState();

    for (const encounter of encounters) {
      if (encounter.id === empressEncounter.id) {
        break;
      }

      state = recordEncounterChoice(state, encounter.id, encounter.choices[0], `${encounter.title} done`);
      state = advanceJourney(state);

      while (state.currentStepKind === "minor") {
        const minorEvent = getMinorEventAfterChapter(state.currentChapterId);

        expect(minorEvent).toBeDefined();

        if (!minorEvent) {
          break;
        }

        state = recordMinorEventChoice(state, minorEvent.id, minorEvent.choices[0], `${minorEvent.title} done`);
        state = advanceJourney(state);
      }
    }

    state = recordEncounterChoice(state, empressEncounter.id, empressEncounter.choices[0], `${empressEncounter.title} done`);
    state = advanceJourney(state);

    const minorEvent = getCurrentMinorEvent(state);

    expect(state.currentStepKind).toBe("minor");
    expect(minorEvent?.id).toBe("empress-2-cups");
    expect(buildProgressSnapshot(state).stepKindLabel).toBe("Дорожное событие");

    if (!minorEvent) {
      return;
    }

    const chosenMinor = recordMinorEventChoice(state, minorEvent.id, minorEvent.choices[0], `${minorEvent.title} done`);

    expect(chosenMinor.xp).toBeGreaterThan(state.xp);
    expect(chosenMinor.minorXp).toBeGreaterThan(0);
    expect(chosenMinor.completedMinorEventIds).toContain(minorEvent.id);
    expect(chosenMinor.lastEncounterId).toBe(minorEvent.id);
    expect(chosenMinor.journeyPhase).toBe("resolved");

    const nextState = advanceJourney(chosenMinor);

    expect(nextState.currentStepKind).toBe("major");
    expect(nextState.currentMinorEventId).toBeNull();
    expect(nextState.journeyPhase).toBe("idle");
  });

  it("calculates player levels from experience", () => {
    expect(getPlayerLevel(0)).toBe(1);
    expect(getPlayerLevel(1)).toBe(1);
    expect(getPlayerLevel(2)).toBe(2);
    expect(getPlayerLevel(5)).toBe(3);
  });

  it("changes the primary and home action labels across the journey", () => {
    const initial = createInitialPlayerState();
    const encounter = encounters[0];

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    expect(getPrimaryActionLabel(initial)).toBe("Продолжить историю");
    expect(getHomeActionLabel(initial)).toBe("Продолжить историю");
    expect(getJourneyAdvanceActionLabel(initial)).toBe("Дальше");

    const next = recordEncounterChoice(initial, encounter.id, encounter.choices[0], "ok");
    expect(getPrimaryActionLabel(next)).toBe("Посмотреть результат");
  });

  it("marks the whole route as complete after the full major and minor journey", () => {
    const completeState = playThroughJourney();
    const snapshot = buildProgressSnapshot(completeState);

    expect(completeState.journeyPhase).toBe("complete");
    expect(getHomeActionLabel(completeState)).toBe("Повторить историю");
    expect(getJourneyAdvanceActionLabel(completeState)).toBe("К главному экрану");
    expect(snapshot.statusLabel).toBe("Путь старших арканов завершён");
    expect(snapshot.episodeProgressLabel).toBe("22 / 22");
    expect(snapshot.minorEventProgressLabel).toBe("9 / 9");
    expect(snapshot.routeProgressLabel).toBe("31 / 31");
    expect(snapshot.remainingJourneyStepsLabel).toBe("0");
  });
});

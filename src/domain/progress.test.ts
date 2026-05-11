import { describe, expect, it } from "vitest";
import { encounters } from "../data/encounters";
import {
  advanceJourney,
  createInitialPlayerState,
  getHomeActionLabel,
  getPlayerLevel,
  getPrimaryActionLabel,
  recordEncounterChoice,
} from "./progress";

describe("progress helpers", () => {
  it("creates the initial player state for the Fool chapter", () => {
    const state = createInitialPlayerState();

    expect(state.version).toBe(1);
    expect(state.xp).toBe(0);
    expect(state.currentChapterId).toBe("chapter-fool");
    expect(state.currentEncounterId).toBe("fool-threshold");
    expect(state.journeyPhase).toBe("idle");
    expect(state.lastEncounterId).toBeNull();
    expect(state.updatedAt).toMatch(/T/);
  });

  it("increments experience and records the selected choice", () => {
    const initial = createInitialPlayerState();
    const encounter = encounters[0];

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    const choice = encounter.choices[0];
    const next = recordEncounterChoice(initial, encounter.id, choice, "Проверка трактовки");

    expect(next.xp).toBe(initial.xp + choice.xp);
    expect(next.journeyPhase).toBe("resolved");
    expect(next.lastChoiceId).toBe(choice.id);
    expect(next.lastEncounterId).toBe(encounter.id);
    expect(next.lastChoiceCardId).toBe(choice.cardId);
    expect(next.lastFeedback).toBe("Проверка трактовки");
    expect(next.completedEncounterIds).toContain(encounter.id);
  });

  it("calculates player levels from experience", () => {
    expect(getPlayerLevel(0)).toBe(1);
    expect(getPlayerLevel(1)).toBe(1);
    expect(getPlayerLevel(2)).toBe(2);
    expect(getPlayerLevel(5)).toBe(3);
  });

  it("changes the primary action label after the first choice", () => {
    const initial = createInitialPlayerState();
    const encounter = encounters[0];

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    expect(getPrimaryActionLabel(initial)).toBe("Продолжить путь");

    const next = recordEncounterChoice(initial, encounter.id, encounter.choices[0], "Проверка");
    expect(getPrimaryActionLabel(next)).toBe("Посмотреть результат");
  });

  it("switches the home action to replay when the full path is complete", () => {
    const path = encounters;
    let state = createInitialPlayerState();

    for (const encounter of path) {
      state = recordEncounterChoice(state, encounter.id, encounter.choices[0], `${encounter.title} пройдена`);
      state = advanceJourney(state);
    }

    expect(state.journeyPhase).toBe("complete");
    expect(getHomeActionLabel(state)).toBe("Повторить путь");
  });

  it("advances through all 22 major arcana in order and completes on the World", () => {
    const path = encounters;
    let state = createInitialPlayerState();

    expect(path.length).toBe(22);
    expect(path[0]?.id).toBe("fool-threshold");
    expect(path[path.length - 1]?.id).toBe("world-circle");

    for (const [index, encounter] of path.entries()) {
      const previousState = state;
      state = recordEncounterChoice(state, encounter.id, encounter.choices[0], `${encounter.title} пройдена`);

      expect(state.completedEncounterIds).toContain(encounter.id);

      state = advanceJourney(state);

      if (index < path.length - 1) {
        expect(state.journeyPhase).toBe("idle");
        expect(state.currentEncounterId).toBe(path[index + 1]!.id);
      }

      if (index === path.length - 1) {
        expect(state.journeyPhase).toBe("complete");
        expect(state.currentChapterId).toBe("chapter-world");
        expect(state.currentEncounterId).toBe("world-circle");
        expect(previousState.xp).toBeGreaterThanOrEqual(0);
      }
    }

    expect(state.completedEncounterIds).toHaveLength(22);
  });
});

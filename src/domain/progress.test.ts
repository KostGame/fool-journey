import { describe, expect, it } from "vitest";
import { encounters } from "../data/encounters";
import { createInitialPlayerState, getPlayerLevel, getPrimaryActionLabel, recordEncounterChoice } from "./progress";

describe("progress helpers", () => {
  it("creates the initial player state for the Fool chapter", () => {
    const state = createInitialPlayerState();

    expect(state.version).toBe(1);
    expect(state.xp).toBe(0);
    expect(state.currentChapterId).toBe("chapter-fool");
    expect(state.currentEncounterId).toBe("fool-threshold");
    expect(state.journeyPhase).toBe("idle");
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
});


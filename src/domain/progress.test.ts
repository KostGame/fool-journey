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

  it("switches the home action to replay when the core loop is complete", () => {
    const fool = encounters[0];
    const magician = encounters[1];
    const priestess = encounters[2];

    expect(fool).toBeDefined();
    expect(magician).toBeDefined();
    expect(priestess).toBeDefined();

    if (!fool || !magician || !priestess) {
      return;
    }

    const afterFoolChoice = recordEncounterChoice(createInitialPlayerState(), fool.id, fool.choices[0], "Шут пройден");
    const afterFoolAdvance = advanceJourney(afterFoolChoice);
    const afterMagicianChoice = recordEncounterChoice(afterFoolAdvance, magician.id, magician.choices[0], "Маг пройден");
    const afterMagicianAdvance = advanceJourney(afterMagicianChoice);
    const afterPriestessChoice = recordEncounterChoice(afterMagicianAdvance, priestess.id, priestess.choices[0], "Жрица пройдена");

    expect(getHomeActionLabel(afterPriestessChoice)).toBe("Продолжить путь");
    expect(getHomeActionLabel(advanceJourney(afterPriestessChoice))).toBe("Повторить эпизод");
  });

  it("advances the core loop from Fool to Magician, then to Priestess and completion", () => {
    const fool = encounters[0];
    const magician = encounters[1];
    const priestess = encounters[2];

    expect(fool).toBeDefined();
    expect(magician).toBeDefined();
    expect(priestess).toBeDefined();

    if (!fool || !magician || !priestess) {
      return;
    }

    const afterFoolChoice = recordEncounterChoice(createInitialPlayerState(), fool.id, fool.choices[0], "Шут пройден");
    const afterFoolAdvance = advanceJourney(afterFoolChoice);

    expect(afterFoolAdvance.journeyPhase).toBe("idle");
    expect(afterFoolAdvance.currentChapterId).toBe("chapter-magician");
    expect(afterFoolAdvance.currentEncounterId).toBe(magician.id);

    const afterMagicianChoice = recordEncounterChoice(afterFoolAdvance, magician.id, magician.choices[0], "Маг пройден");
    const afterMagicianAdvance = advanceJourney(afterMagicianChoice);

    expect(afterMagicianAdvance.journeyPhase).toBe("idle");
    expect(afterMagicianAdvance.currentChapterId).toBe("chapter-priestess");
    expect(afterMagicianAdvance.currentEncounterId).toBe(priestess.id);

    const afterPriestessChoice = recordEncounterChoice(afterMagicianAdvance, priestess.id, priestess.choices[0], "Жрица пройдена");
    const completed = advanceJourney(afterPriestessChoice);

    expect(completed.journeyPhase).toBe("complete");
    expect(completed.currentChapterId).toBe("chapter-priestess");
    expect(completed.currentEncounterId).toBe(priestess.id);
    expect(completed.completedEncounterIds).toEqual([fool.id, magician.id, priestess.id]);
  });
});

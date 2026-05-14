import { describe, expect, it } from "vitest";
import { renderAppShell } from "./app";
import { getCardImageAsset } from "./data/cardImages";
import { getDialogueSceneByEncounterId } from "./data/dialogueScenes";
import { encounters } from "./data/encounters";
import { getMinorEventAfterChapter } from "./data/minorArcanaEvents";
import { buildJournalSnapshot } from "./domain/journal";
import { advanceJourney, createInitialPlayerState, recordEncounterChoice, recordMinorEventChoice } from "./domain/progress";
import type { ChoiceInventoryEffect } from "./domain/models";

type ChoiceOverrides = Record<string, string>;

function pickChoiceId(defaultChoiceId: string, stepId: string, overrides: ChoiceOverrides): string {
  return overrides[stepId] ?? defaultChoiceId;
}

function advanceToEncounter(targetEncounterId: string, overrides: ChoiceOverrides = {}) {
  let state = createInitialPlayerState();

  for (const encounter of encounters) {
    if (encounter.id === targetEncounterId) {
      return state;
    }

    const choiceId = pickChoiceId(encounter.choices[0].id, encounter.id, overrides);
    const choice = encounter.choices.find((item) => item.id === choiceId) ?? encounter.choices[0];

    const effect = resolveDialogueInventoryEffect(encounter.id, choice.id);
    state = recordEncounterChoice(state, encounter.id, choice, `${encounter.id} done`, effect);
    state = advanceJourney(state);

    while (state.currentStepKind === "minor") {
      const minorEvent = getMinorEventAfterChapter(state.currentChapterId);

      expect(minorEvent).toBeDefined();

      if (!minorEvent) {
        return state;
      }

      const minorChoiceId = pickChoiceId(minorEvent.choices[0].id, minorEvent.id, overrides);
      const minorChoice = minorEvent.choices.find((item) => item.id === minorChoiceId) ?? minorEvent.choices[0];

      const minorEffect = resolveDialogueInventoryEffect(minorEvent.id, minorChoice.id);
      state = recordMinorEventChoice(state, minorEvent.id, minorChoice, `${minorEvent.id} done`, minorEffect);
      state = advanceJourney(state);
    }
  }

  throw new Error(`Encounter not found: ${targetEncounterId}`);
}

function resolveDialogueInventoryEffect(encounterId: string, choiceId: string): ChoiceInventoryEffect | undefined {
  const scene = getDialogueSceneByEncounterId(encounterId);
  const choice = scene?.choices.find((item) => item.id === choiceId);

  if (!choice) {
    return undefined;
  }

  if (!choice.earnedCardId && !choice.appliedCardId && !choice.helperCardId) {
    return undefined;
  }

  return {
    earnedCardId: choice.earnedCardId,
    earnedRole: choice.earnedRole,
    appliedCardId: choice.appliedCardId,
    helperCardId: choice.helperCardId
  };
}

function buildJournalTestState() {
  const stateAtLovers = advanceToEncounter("lovers-crossroads", {
    "hierophant-hall": "hierophant-ask"
  });
  const encounter = encounters.find((item) => item.id === "lovers-crossroads");

  expect(encounter).toBeDefined();

  if (!encounter) {
    return stateAtLovers;
  }

  const choice = encounter.choices.find((item) => item.id === "lovers-heart") ?? encounter.choices[0];
  const effect = resolveDialogueInventoryEffect(encounter.id, choice.id);
  const resolved = recordEncounterChoice(stateAtLovers, encounter.id, choice, "lovers result", effect);

  return resolved;
}

describe("renderAppShell", () => {
  it("renders the home shell without crashing on an initial state", () => {
    const html = renderAppShell({
      screen: "home",
      player: createInitialPlayerState()
    });

    expect(html).toContain("mode-grid");
    expect(html).toContain("home-actions");
    expect(html).toContain("Дневник Шута");
    expect(html).not.toContain("choice-grid");
  });

  it("renders the journal as a separate screen from an empty state", () => {
    const html = renderAppShell({
      screen: "journal",
      player: createInitialPlayerState()
    });

    expect(html).toContain("journal-panel");
    expect(html).toContain("Дневник Шута");
    expect(html).toContain("Пока нет полученных карт");
    expect(html).toContain("Пока нет встреч помощников");
    expect(html).toContain("Путь старших арканов");
  });

  it("shows received, applied and helper cards in the journal after progress", () => {
    const state = buildJournalTestState();
    const journal = buildJournalSnapshot(state);
    const html = renderAppShell({
      screen: "journal",
      player: state
    });

    expect(journal.receivedCards.length).toBeGreaterThan(0);
    expect(journal.appliedCards.length).toBeGreaterThan(0);
    expect(journal.helpers.length).toBeGreaterThan(0);
    expect(html).toContain("Полученные карты");
    expect(html).toContain("Применённые карты");
    expect(html).toContain("Кто помог Шуту");
    expect(html).toContain("Развилка Влюблённых");
    expect(html).toContain("Получено");
    expect(html).toContain("Применено");
    expect(html).toContain("Помощник");
  });

  it("renders tarot thumbnails in scene, result and journal screens", () => {
    const initialSceneHtml = renderAppShell({
      screen: "scene",
      player: createInitialPlayerState()
    });
    const encounter = encounters[0];
    const choice = encounter.choices[0];
    const effect = resolveDialogueInventoryEffect(encounter.id, choice.id);
    const resolved = recordEncounterChoice(createInitialPlayerState(), encounter.id, choice, "thumbnail result", effect);
    const resultHtml = renderAppShell({
      screen: "result",
      player: resolved
    });
    const journalState = buildJournalTestState();
    const journal = buildJournalSnapshot(journalState);
    const journalHtml = renderAppShell({
      screen: "journal",
      player: journalState
    });

    expect(initialSceneHtml).toContain("card-art-strip");
    expect(initialSceneHtml).toContain(getCardImageAsset("fool").src ?? "");
    expect(resultHtml).toContain("card-art-strip");
    expect(resultHtml).toContain(getCardImageAsset(choice.cardId).src ?? "");
    expect(journalHtml).toContain("journal-item-layout");
    expect(journalHtml).toContain(getCardImageAsset(journal.receivedCards[0].cardId).src ?? "");
  });

  it("renders the scene screen at the start of the journey", () => {
    const html = renderAppShell({
      screen: "scene",
      player: createInitialPlayerState()
    });

    expect(html).toContain("dialogue-panel");
    expect(html).toContain("quest-layout");
    expect(html).toContain("quest-visual-panel");
    expect(html).toContain("quest-actions-panel");
    expect(html).toContain("quest-inventory-panel");
    expect(html).toContain("scene-status");
    expect(html).toContain("scene-speaker");
    expect(html).toContain("Карты Шута");
    expect(html).toContain("Как войти в новый этап без лишней тяжести?");
    expect(html).toContain("data-choice-id=\"fool-step\"");
    expect(html).toContain("choice-grid");
    expect(html).not.toContain("choice-card-name");
    expect(html).not.toContain("choice-keywords");
    expect(html).not.toContain("mode-grid");
  });

  it("renders dialogue scene for Lovers (no fallback there anymore)", () => {
    const stateAtLovers = advanceToEncounter("lovers-crossroads");
    const html = renderAppShell({
      screen: "scene",
      player: stateAtLovers
    });

    expect(html).toContain("dialogue-panel");
    expect(html).toContain("data-choice-id=\"lovers-heart\"");
    expect(html).toContain("data-choice-id=\"lovers-balance\"");
    expect(html).toContain("Можно применить:");
  });

  it("shows locked choice when required inventory card is missing", () => {
    const stateAtLovers = advanceToEncounter("lovers-crossroads", {
      "empress-2-cups": "keep-distance",
      "hierophant-hall": "hierophant-repeat"
    });
    const html = renderAppShell({
      screen: "scene",
      player: stateAtLovers
    });

    expect(html).toContain("data-choice-id=\"lovers-heart\"");
    expect(html).toContain("choice-lock-note");
    expect(html).toContain("disabled");
  });

  it("unlocks required inventory choice when the card was earned", () => {
    const stateAtLovers = advanceToEncounter("lovers-crossroads", {
      "hierophant-hall": "hierophant-ask"
    });
    const html = renderAppShell({
      screen: "scene",
      player: stateAtLovers
    });

    expect(stateAtLovers.inventoryCards).toContain("2-cups");
    expect(html).toContain("data-choice-id=\"lovers-heart\"");
    expect(html).not.toContain("choice-lock-note");
  });

  it("renders explicit result feedback and reward labels for applied/helper inventory cards", () => {
    const stateAtJustice = advanceToEncounter("justice-scales", {
      "hierophant-hall": "hierophant-ask",
      "lovers-crossroads": "lovers-balance",
      "chariot-road": "chariot-hold",
      "strength-lion": "strength-soothe",
      "hermit-path": "hermit-seek"
    });
    const encounter = encounters.find((item) => item.id === "justice-scales");

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    const choice = encounter.choices.find((item) => item.id === "justice-weigh") ?? encounter.choices[0];
    const effect = resolveDialogueInventoryEffect(encounter.id, choice.id);
    const resolved = recordEncounterChoice(stateAtJustice, encounter.id, choice, "justice result", effect);
    const html = renderAppShell({
      screen: "result",
      player: resolved
    });

    expect(html).toContain("Результат выбора");
    expect(html).toContain("Шут выбрал:");
    expect(html).toContain("result-tone");
    expect(html).toContain("Что изменилось");
    expect(html).toContain("Применено из Карт Шута");
    expect(html).toContain("Помощник пути");
    expect(html).toContain("dialogue-reaction");
    expect(html).toContain("reading-grid");
    expect(html).toContain("data-action=\"advance\"");
    expect(resolved.lastAppliedCardId).toBeTruthy();
    expect(resolved.lastHelperCardId).toBeTruthy();
  });

  it("renders explicit earned reward labels for received inventory cards", () => {
    const stateAtLovers = advanceToEncounter("lovers-crossroads", {
      "hierophant-hall": "hierophant-ask"
    });
    const encounter = encounters.find((item) => item.id === "lovers-crossroads");

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    const choice = encounter.choices.find((item) => item.id === "lovers-balance") ?? encounter.choices[0];
    const effect = resolveDialogueInventoryEffect(encounter.id, choice.id);
    const resolved = recordEncounterChoice(stateAtLovers, encounter.id, choice, "lovers result", effect);
    const html = renderAppShell({
      screen: "result",
      player: resolved
    });

    expect(html).toContain("Результат выбора");
    expect(html).toContain("Что пополнило Карты Шута");
    expect(html).toContain("Получено в Карты Шута");
    expect(html).toContain("result-tone");
    expect(html).toContain("data-action=\"advance\"");
    expect(resolved.lastEarnedCardId).toBeTruthy();
  });

  it("keeps the quest flow on separate scene and result screens", () => {
    const initial = createInitialPlayerState();
    const encounter = encounters[0];
    const choice = encounter.choices[0];
    const effect = resolveDialogueInventoryEffect(encounter.id, choice.id);

    const sceneHtml = renderAppShell({
      screen: "scene",
      player: initial
    });
    const resolved = recordEncounterChoice(initial, encounter.id, choice, "flow result", effect);
    const resultHtml = renderAppShell({
      screen: "result",
      player: resolved
    });
    const advanced = advanceJourney(resolved);
    const nextSceneHtml = renderAppShell({
      screen: "scene",
      player: advanced
    });

    expect(sceneHtml).toContain("quest-layout");
    expect(sceneHtml).toContain("quest-actions-panel");
    expect(resultHtml).toContain("Результат выбора");
    expect(resultHtml).toContain("result-tone");
    expect(resultHtml).toContain("quest-actions-panel");
    expect(resultHtml).toContain("data-action=\"advance\"");
    expect(nextSceneHtml).toContain("scene-status");
    expect(nextSceneHtml).toContain("choice-grid");
  });

  it("renders the completion screen after the World scene", () => {
    const stateAtWorld = advanceToEncounter("world-circle");
    const encounter = encounters.find((item) => item.id === "world-circle");

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    const choice = encounter.choices.find((item) => item.id === "world-integrate") ?? encounter.choices[0];
    const effect = resolveDialogueInventoryEffect(encounter.id, choice.id);
    const resolved = recordEncounterChoice(stateAtWorld, encounter.id, choice, "world result", effect);
    const completed = advanceJourney(resolved);
    const html = renderAppShell({
      screen: "result",
      player: completed
    });

    expect(completed.journeyPhase).toBe("complete");
    expect(html).toContain("Путь старших арканов завершён");
    expect(html).toContain("Карты Шута");
    expect(html).toContain("Повторить историю");
    expect(html).toContain("Открыть дневник");
  });

  it("renders dialogue flow for the Hanged Man scene", () => {
    const stateAtFallback = advanceToEncounter("hanged-man-pause");
    const html = renderAppShell({
      screen: "scene",
      player: stateAtFallback
    });

    expect(html).toContain("dialogue-panel");
    expect(html).toContain("scene-status");
    expect(html).toContain("quest-actions-panel");
    expect(html).toContain("data-choice-id=\"hanged-man-reframe\"");
    expect(html).toContain("dialogue-log");
  });

  it("renders placeholder modes without crashing", () => {
    const html = renderAppShell({
      screen: "reference",
      player: createInitialPlayerState()
    });

    expect(html).toContain("placeholder-panel");
  });
});

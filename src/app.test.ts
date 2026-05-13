import { describe, expect, it } from "vitest";
import { renderAppShell } from "./app";
import { encounters } from "./data/encounters";
import { getMinorEventAfterChapter } from "./data/minorArcanaEvents";
import { advanceJourney, createInitialPlayerState, recordEncounterChoice, recordMinorEventChoice } from "./domain/progress";

function advanceToEncounter(targetEncounterId: string) {
  let state = createInitialPlayerState();

  for (const encounter of encounters) {
    if (encounter.id === targetEncounterId) {
      return state;
    }

    state = recordEncounterChoice(state, encounter.id, encounter.choices[0], `${encounter.title} пройдена`);
    state = advanceJourney(state);

    while (state.currentStepKind === "minor") {
      const minorEvent = getMinorEventAfterChapter(state.currentChapterId);

      expect(minorEvent).toBeDefined();

      if (!minorEvent) {
        return state;
      }

      state = recordMinorEventChoice(state, minorEvent.id, minorEvent.choices[0], `${minorEvent.title} прожито`);
      state = advanceJourney(state);
    }
  }

  throw new Error(`Encounter not found: ${targetEncounterId}`);
}

describe("renderAppShell", () => {
  it("renders the home shell without crashing on an initial state", () => {
    const html = renderAppShell({
      screen: "home",
      player: createInitialPlayerState()
    });

    expect(html).toContain("Путь Шута");
    expect(html).toContain("Продолжить путь");
    expect(html).toContain("0 / 22");
    expect(html).toContain("Живой расклад");
    expect(html).toContain("0 / 31");
    expect(html).toContain("Маршрут");
  });

  it("shows a curated minor event between major chapters", () => {
    const empressEncounter = encounters.find((encounter) => encounter.chapterId === "chapter-empress");

    expect(empressEncounter).toBeDefined();

    if (!empressEncounter) {
      return;
    }

    const stateAtChapter = advanceToEncounter(empressEncounter.id);
    const afterChoice = recordEncounterChoice(
      stateAtChapter,
      empressEncounter.id,
      empressEncounter.choices[0],
      `${empressEncounter.title} пройдена`
    );
    const onMinorStep = advanceJourney(afterChoice);
    const minorEvent = getMinorEventAfterChapter(empressEncounter.chapterId);

    expect(onMinorStep.currentStepKind).toBe("minor");
    expect(minorEvent).toBeDefined();

    if (!minorEvent) {
      return;
    }

    const html = renderAppShell({
      screen: "journey",
      player: onMinorStep
    });

    expect(html).toContain("Дорожное событие");
    expect(html).toContain(minorEvent.title);
    expect(html).toContain("Продолжить путь");
  });

  it("renders the minor event result screen after a choice", () => {
    const empressEncounter = encounters.find((encounter) => encounter.chapterId === "chapter-empress");

    expect(empressEncounter).toBeDefined();

    if (!empressEncounter) {
      return;
    }

    const stateAtChapter = advanceToEncounter(empressEncounter.id);
    const afterChoice = recordEncounterChoice(
      stateAtChapter,
      empressEncounter.id,
      empressEncounter.choices[0],
      `${empressEncounter.title} пройдена`
    );
    const onMinorStep = advanceJourney(afterChoice);
    const minorEvent = getMinorEventAfterChapter(empressEncounter.chapterId);

    expect(minorEvent).toBeDefined();

    if (!minorEvent) {
      return;
    }

    const chosenMinor = recordMinorEventChoice(
      onMinorStep,
      minorEvent.id,
      minorEvent.choices[0],
      `${minorEvent.title} прожито`
    );
    const html = renderAppShell({
      screen: "journey",
      player: chosenMinor
    });

    expect(html).toContain("Дорожное событие прожито");
    expect(html).toContain("Маршрут");
    expect(html).toContain("Продолжить путь");
    expect(html).toContain("После ответа дорога вернётся к большой главе.");
  });

  it("renders the completion screen after the full major and minor journey", () => {
    let state = createInitialPlayerState();

    for (const encounter of encounters) {
      state = recordEncounterChoice(state, encounter.id, encounter.choices[0], `${encounter.title} пройдена`);
      state = advanceJourney(state);

      while (state.currentStepKind === "minor") {
        const minorEvent = getMinorEventAfterChapter(state.currentChapterId);

        expect(minorEvent).toBeDefined();

        if (!minorEvent) {
          break;
        }

        state = recordMinorEventChoice(state, minorEvent.id, minorEvent.choices[0], `${minorEvent.title} прожито`);
        state = advanceJourney(state);
      }
    }

    const html = renderAppShell({
      screen: "journey",
      player: state
    });

    expect(html).toContain("Путь старших арканов завершён");
    expect(html).toContain("22 / 22");
    expect(html).toContain("9 / 9");
    expect(html).toContain("Масти дорожных событий");
    expect(html).toContain("Повторить путь");
  });

  it("renders placeholder modes without crashing", () => {
    const html = renderAppShell({
      screen: "reference",
      player: createInitialPlayerState()
    });

    expect(html).toContain("Режим в разработке");
    expect(html).toContain("Справочник");
  });
});

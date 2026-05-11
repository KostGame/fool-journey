import { describe, expect, it } from "vitest";
import { encounters } from "./data/encounters";
import { renderAppShell } from "./app";
import { advanceJourney, createInitialPlayerState, recordEncounterChoice } from "./domain/progress";

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
  });

  it("renders the journey result screen after a choice", () => {
    const initial = createInitialPlayerState();
    const encounter = encounters[0];

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    const next = recordEncounterChoice(initial, encounter.id, encounter.choices[1], "Тестовый ответ");
    const html = renderAppShell({
      screen: "journey",
      player: next
    });

    expect(html).toContain("Ответ собран");
    expect(html).toContain("Тестовый ответ");
    expect(html).toContain("Продолжить путь");
  });

  it("renders the completion screen after the full major arcana path", () => {
    const path = encounters;

    expect(path.length).toBe(22);

    let state = createInitialPlayerState();

    for (const encounter of path) {
      const choice = encounter.choices[0];
      state = recordEncounterChoice(state, encounter.id, choice, `${encounter.title} пройдена`);
      state = advanceJourney(state);
    }

    const html = renderAppShell({
      screen: "journey",
      player: state
    });

    expect(html).toContain("Путь старших арканов завершён");
    expect(html).toContain("22 / 22");
    expect(html).toContain("Дальше в игру будут вплетаться младшие арканы");
  });

  it("keeps the journey screen readable after any intermediate choice", () => {
    const encounter = encounters[0];

    expect(encounter).toBeDefined();

    if (!encounter) {
      return;
    }

    const next = recordEncounterChoice(createInitialPlayerState(), encounter.id, encounter.choices[1], "Тестовый ответ");
    const html = renderAppShell({
      screen: "journey",
      player: next
    });

    expect(html).toContain("Ответ собран");
    expect(html).toContain("Тестовый ответ");
    expect(html).toContain("Продолжить путь");
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

import { describe, expect, it } from "vitest";
import { encounters } from "./data/encounters";
import { renderAppShell } from "./app";
import { createInitialPlayerState, recordEncounterChoice } from "./domain/progress";

describe("renderAppShell", () => {
  it("renders the home shell without crashing on an initial state", () => {
    const html = renderAppShell({
      screen: "home",
      player: createInitialPlayerState()
    });

    expect(html).toContain("Путь Шута");
    expect(html).toContain("Продолжить путь");
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
    expect(html).toContain("К главному экрану");
    expect(html).toContain("Тестовый ответ");
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


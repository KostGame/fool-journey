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
    expect(html).toContain("0 / 3");
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

  it("renders the completion screen after the three-arcana loop", () => {
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
    const completed = advanceJourney(afterPriestessChoice);
    const html = renderAppShell({
      screen: "journey",
      player: completed
    });

    expect(html).toContain("Первый круг пути пройден");
    expect(html).toContain("Получено опыта");
    expect(html).toContain("К главному экрану");
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

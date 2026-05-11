import { describe, expect, it } from "vitest";
import { encounters } from "../data/encounters";
import { cards } from "../data/cards";
import { composeEncounterInterpretation } from "./meaning";

describe("composeEncounterInterpretation", () => {
  it("combines the base card meaning with an upright choice override", () => {
    const card = cards.find((item) => item.id === "fool");
    const encounter = encounters[0];
    const choice = encounter?.choices.find((item) => item.id === "step");

    expect(card).toBeDefined();
    expect(encounter).toBeDefined();
    expect(choice).toBeDefined();

    if (!card || !encounter || !choice) {
      return;
    }

    const interpretation = composeEncounterInterpretation(card, encounter, choice);

    expect(interpretation.title).toContain("Шут");
    expect(interpretation.title).toContain("прямая");
    expect(interpretation.summary).toContain(card.lightMeaning);
    expect(interpretation.summary).toContain(choice.summaryOverride);
    expect(interpretation.advice).toContain(choice.adviceOverride);
    expect(interpretation.questionToSelf).toBe(card.questionToSelf);
  });

  it("uses shadow meaning for a reversed choice", () => {
    const card = cards.find((item) => item.id === "high-priestess");
    const encounter = encounters[0];
    const choice = encounter?.choices.find((item) => item.id === "listen");

    expect(card).toBeDefined();
    expect(encounter).toBeDefined();
    expect(choice).toBeDefined();

    if (!card || !encounter || !choice) {
      return;
    }

    const interpretation = composeEncounterInterpretation(card, encounter, choice);

    expect(interpretation.title).toContain("перевёрнутая");
    expect(interpretation.summary).toContain(card.shadowMeaning);
    expect(interpretation.advice).toContain(card.warning);
  });
});


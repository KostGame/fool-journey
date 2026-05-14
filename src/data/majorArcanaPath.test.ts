import { describe, expect, it } from "vitest";
import { majorArcanaPath } from "./majorArcanaPath";

describe("majorArcanaPath", () => {
  it("contains the full sequence of 22 major arcana", () => {
    expect(majorArcanaPath).toHaveLength(22);
    expect(majorArcanaPath[0]?.card.id).toBe("fool");
    expect(majorArcanaPath[21]?.card.id).toBe("world");
  });

  it("keeps the chapter and encounter order aligned", () => {
    const cardIds = majorArcanaPath.map((step) => step.card.id);
    const chapterCardIds = majorArcanaPath.map((step) => step.chapter.cardId);
    const encounterChapterIds = majorArcanaPath.map((step) => step.encounter.chapterId);

    expect(chapterCardIds).toEqual(cardIds);
    expect(encounterChapterIds).toEqual(majorArcanaPath.map((step) => step.chapter.id));
  });

  it("gives each major arcana a short playable encounter", () => {
    for (const step of majorArcanaPath) {
      expect(/^Как |^Какой |^Что |^На что /.test(step.encounter.question)).toBe(true);
      expect(step.encounter.choices.length).toBeGreaterThanOrEqual(2);
      for (const choice of step.encounter.choices) {
        expect(choice.cardId).toBe(step.card.id);
        expect(choice.label).not.toContain(":");
        expect(choice.label).not.toContain("·");
      }
    }
  });
});

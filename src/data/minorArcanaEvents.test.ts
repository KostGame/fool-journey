import { describe, expect, it } from "vitest";
import { getCard } from "./cards";
import { getMinorEventAfterChapter, minorArcanaEvents } from "./minorArcanaEvents";
import { minorSuits } from "./minorArcana";
import { storyChapters } from "./storyChapters";

describe("minorArcanaEvents", () => {
  it("contains the curated set of minor events", () => {
    expect(minorArcanaEvents).toHaveLength(9);
  });

  it("covers every suit at least twice", () => {
    const suitCounts = new Map(minorSuits.map((suit) => [suit, 0]));

    for (const event of minorArcanaEvents) {
      const suit = getCard(event.cardId)?.suit;

      expect(suit).toBeDefined();

      if (suit) {
        suitCounts.set(suit, (suitCounts.get(suit) ?? 0) + 1);
      }
    }

    for (const suit of minorSuits) {
      expect(suitCounts.get(suit)).toBeGreaterThanOrEqual(2);
    }
  });

  it("aligns each event with a major chapter and a playable card", () => {
    const chapterIds = new Set(storyChapters.map((chapter) => chapter.id));

    for (const event of minorArcanaEvents) {
      expect(event.question.startsWith("Как ")).toBe(true);
      expect(chapterIds.has(event.majorChapterId)).toBe(true);
      expect(getMinorEventAfterChapter(event.majorChapterId)?.id).toBe(event.id);
      expect(event.choices.length).toBeGreaterThanOrEqual(2);
      expect(getCard(event.cardId)?.group).toBe("minor");

      for (const choice of event.choices) {
        expect(choice.cardId).toBe(event.cardId);
        expect(choice.label).not.toContain(":");
        expect(choice.label).not.toContain("·");
      }
    }
  });
});

import { describe, expect, it } from "vitest";
import { minorArcanaCards, minorRanks, minorSuits } from "./minorArcana";

describe("minorArcanaCards", () => {
  it("contains all 56 minor arcana cards", () => {
    expect(minorArcanaCards).toHaveLength(56);

    const suitCounts = new Map(minorSuits.map((suit) => [suit, 0]));
    const rankCounts = new Map(minorRanks.map((rank) => [rank, 0]));

    for (const card of minorArcanaCards) {
      expect(card.group).toBe("minor");
      expect(card.elementMeaning).toBeTruthy();
      expect(card.rankMeaning).toBeTruthy();

      if (card.suit) {
        suitCounts.set(card.suit, (suitCounts.get(card.suit) ?? 0) + 1);
      }

      if (card.rank) {
        rankCounts.set(card.rank, (rankCounts.get(card.rank) ?? 0) + 1);
      }
    }

    for (const suit of minorSuits) {
      expect(suitCounts.get(suit)).toBe(14);
    }

    for (const rank of minorRanks) {
      expect(rankCounts.get(rank)).toBe(4);
    }
  });
});

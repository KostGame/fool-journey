import { describe, expect, it } from "vitest";
import { cards } from "./cards";
import { cardImageCoverage, cardImageEntries, cardImageSource, getCardImageAsset } from "./cardImages";

describe("cardImage assets", () => {
  it("covers every tarot card with a local thumbnail", () => {
    expect(cardImageCoverage).toBe(cards.length);
    expect(cardImageEntries).toHaveLength(cards.length);
    expect(cardImageEntries.every((entry) => entry.available && Boolean(entry.src))).toBe(true);
  });

  it("maps major and minor cards to the expected local asset files", () => {
    expect(getCardImageAsset("fool")).toMatchObject({
      available: true,
      src: "/assets/cards/major-00-fool.jpg"
    });

    expect(getCardImageAsset("high-priestess")).toMatchObject({
      available: true,
      src: "/assets/cards/major-02-high-priestess.jpg"
    });

    expect(getCardImageAsset("ace-cups")).toMatchObject({
      available: true,
      src: "/assets/cards/cups-01-ace.jpg"
    });

    expect(getCardImageAsset("king-wands")).toMatchObject({
      available: true,
      src: "/assets/cards/wands-14-king.jpg"
    });
  });

  it("provides a fallback when an image is missing", () => {
    const missing = getCardImageAsset("missing-card-id");

    expect(missing.available).toBe(false);
    expect(missing.src).toBeUndefined();
    expect(missing.alt).toContain("missing-card-id");
  });

  it("documents the public-domain image source", () => {
    expect(cardImageSource.sourceUrl).toContain("commons.wikimedia.org");
    expect(cardImageSource.licenseLabel).toContain("Public domain");
  });
});

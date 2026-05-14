import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const keyTextFiles = [
  "index.html",
  "README.md",
  "CHANGELOG.md",
  "docs/BETA_TRANSITION.md",
  "docs/GAME_DESIGN.md",
  "docs/CHECKS.md",
  "docs/ROADMAP.md",
  "tasks/SU/SU-013-encoding-content-quality-audit.md",
  "reports/SU-013-encoding-content-quality-audit.md",
  "src/data/majorArcanaPath.ts",
  "src/data/minorArcanaEvents.ts",
  "src/data/dialogueScenes.ts"
];

const replacementCharacter = String.fromCharCode(0xfffd);
const doubleReplacementSequence = replacementCharacter.repeat(4);

describe("encoding and content quality", () => {
  it("keeps the key text files free of replacement characters", () => {
    for (const relativePath of keyTextFiles) {
      const content = readFileSync(resolve(process.cwd(), relativePath), "utf8");

      expect(content).not.toContain(replacementCharacter);
      expect(content).not.toContain(doubleReplacementSequence);
    }
  });

  it("keeps the HTML charset declaration intact", () => {
    const content = readFileSync(resolve(process.cwd(), "index.html"), "utf8");

    expect(content).toContain('<meta charset="UTF-8" />');
  });
});

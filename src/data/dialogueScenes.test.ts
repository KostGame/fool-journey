import { describe, expect, it } from "vitest";
import { dialogueScenes, getDialogueSceneByEncounterId, getDialogueSceneByMinorEventId } from "./dialogueScenes";

describe("dialogueScenes", () => {
  it("covers the requested vertical slice", () => {
    const majorScenes = dialogueScenes.filter((scene) => scene.type === "major-scene");
    const minorScenes = dialogueScenes.filter((scene) => scene.type === "minor-event");
    const helperAppearances = dialogueScenes.filter((scene) => Boolean(scene.helperCardId));

    expect(majorScenes).toHaveLength(5);
    expect(minorScenes).toHaveLength(3);
    expect(helperAppearances).toHaveLength(3);
  });

  it("exposes dialogue scenes for the chosen early route and fallback gaps", () => {
    expect(getDialogueSceneByEncounterId("fool-threshold")).toBeDefined();
    expect(getDialogueSceneByEncounterId("magician-workshop")).toBeDefined();
    expect(getDialogueSceneByMinorEventId("empress-2-cups")).toBeDefined();
    expect(getDialogueSceneByEncounterId("lovers-crossroads")).toBeUndefined();
  });
});

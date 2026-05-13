import { describe, expect, it } from "vitest";
import { dialogueScenes, getDialogueSceneByEncounterId, getDialogueSceneByMinorEventId } from "./dialogueScenes";

describe("dialogueScenes", () => {
  it("covers the expanded SU-008 story block", () => {
    const majorScenes = dialogueScenes.filter((scene) => scene.type === "major-scene");
    const minorScenes = dialogueScenes.filter((scene) => scene.type === "minor-event");
    const helperAppearances = dialogueScenes.filter((scene) => Boolean(scene.helperCardId));

    expect(majorScenes).toHaveLength(12);
    expect(minorScenes).toHaveLength(3);
    expect(helperAppearances.length).toBeGreaterThanOrEqual(7);
  });

  it("exposes dialogue scenes for Hierophant through Justice", () => {
    expect(getDialogueSceneByEncounterId("hierophant-hall")).toBeDefined();
    expect(getDialogueSceneByEncounterId("lovers-crossroads")).toBeDefined();
    expect(getDialogueSceneByEncounterId("chariot-road")).toBeDefined();
    expect(getDialogueSceneByEncounterId("strength-lion")).toBeDefined();
    expect(getDialogueSceneByEncounterId("hermit-path")).toBeDefined();
    expect(getDialogueSceneByEncounterId("wheel-turn")).toBeDefined();
    expect(getDialogueSceneByEncounterId("justice-scales")).toBeDefined();
  });

  it("keeps fallback gaps for non-converted major scenes", () => {
    expect(getDialogueSceneByEncounterId("hanged-man-pause")).toBeUndefined();
    expect(getDialogueSceneByMinorEventId("empress-2-cups")).toBeDefined();
  });

  it("marks inventory earn/use metadata on multiple choices", () => {
    const choices = dialogueScenes.flatMap((scene) => scene.choices);
    const earnedChoices = choices.filter((choice) => Boolean(choice.earnedCardId));
    const requiredChoices = choices.filter((choice) => Boolean(choice.requiredCardId));

    expect(earnedChoices.length).toBeGreaterThanOrEqual(6);
    expect(requiredChoices.length).toBeGreaterThanOrEqual(4);
    expect(requiredChoices.every((choice) => Boolean(choice.appliedCardId))).toBe(true);
    expect(choices.every((choice) => typeof choice.feedback === "string" && choice.feedback.length > 0)).toBe(true);
    expect(choices.every((choice) => typeof choice.lesson === "string" && choice.lesson.length > 0)).toBe(true);
    expect(choices.every((choice) => choice.xp > 0)).toBe(true);
  });
});

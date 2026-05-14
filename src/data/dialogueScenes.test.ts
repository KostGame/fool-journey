import { describe, expect, it } from "vitest";
import { dialogueScenes, getDialogueSceneByEncounterId, getDialogueSceneByMinorEventId } from "./dialogueScenes";

describe("dialogueScenes", () => {
  it("covers the expanded SU-008 story block", () => {
    const majorScenes = dialogueScenes.filter((scene) => scene.type === "major-scene");
    const minorScenes = dialogueScenes.filter((scene) => scene.type === "minor-event");
    const helperAppearances = dialogueScenes.filter((scene) => Boolean(scene.helperCardId));

    expect(majorScenes).toHaveLength(22);
    expect(minorScenes).toHaveLength(3);
    expect(helperAppearances.length).toBeGreaterThanOrEqual(10);
  });

  it("exposes dialogue scenes through the full major arcana finale", () => {
    expect(getDialogueSceneByEncounterId("hierophant-hall")).toBeDefined();
    expect(getDialogueSceneByEncounterId("lovers-crossroads")).toBeDefined();
    expect(getDialogueSceneByEncounterId("chariot-road")).toBeDefined();
    expect(getDialogueSceneByEncounterId("strength-lion")).toBeDefined();
    expect(getDialogueSceneByEncounterId("hermit-path")).toBeDefined();
    expect(getDialogueSceneByEncounterId("wheel-turn")).toBeDefined();
    expect(getDialogueSceneByEncounterId("justice-scales")).toBeDefined();
    expect(getDialogueSceneByEncounterId("hanged-man-pause")).toBeDefined();
    expect(getDialogueSceneByEncounterId("death-release")).toBeDefined();
    expect(getDialogueSceneByEncounterId("temperance-flow")).toBeDefined();
    expect(getDialogueSceneByEncounterId("devil-chains")).toBeDefined();
    expect(getDialogueSceneByEncounterId("tower-shock")).toBeDefined();
    expect(getDialogueSceneByEncounterId("star-garden")).toBeDefined();
    expect(getDialogueSceneByEncounterId("moon-path")).toBeDefined();
    expect(getDialogueSceneByEncounterId("sun-field")).toBeDefined();
    expect(getDialogueSceneByEncounterId("judgment-call")).toBeDefined();
    expect(getDialogueSceneByEncounterId("world-circle")).toBeDefined();
  });

  it("keeps fallback gaps for non-converted major scenes", () => {
    expect(getDialogueSceneByMinorEventId("empress-2-cups")).toBeDefined();
  });

  it("marks inventory earn/use metadata on multiple choices", () => {
    const choices = dialogueScenes.flatMap((scene) => scene.choices);
    const earnedChoices = choices.filter((choice) => Boolean(choice.earnedCardId));
    const requiredChoices = choices.filter((choice) => Boolean(choice.requiredCardId));

    expect(earnedChoices.length).toBeGreaterThanOrEqual(10);
    expect(requiredChoices.length).toBeGreaterThanOrEqual(8);
    expect(requiredChoices.every((choice) => Boolean(choice.appliedCardId))).toBe(true);
    expect(choices.every((choice) => !choice.label.includes(":"))).toBe(true);
    expect(choices.every((choice) => !choice.label.includes("·"))).toBe(true);
    expect(choices.every((choice) => choice.buttonNote.length > 0)).toBe(true);
    expect(choices.every((choice) => typeof choice.feedback === "string" && choice.feedback.length > 0)).toBe(true);
    expect(choices.every((choice) => typeof choice.lesson === "string" && choice.lesson.length > 0)).toBe(true);
    expect(choices.every((choice) => choice.xp > 0)).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { createInitialPlayerState } from "./progress";
import { createMemoryStorage, loadPlayerState, resetStoredPlayerState, savePlayerState, STORAGE_KEY } from "./storage";

describe("storage helpers", () => {
  it("saves and loads player state", () => {
    const storage = createMemoryStorage();
    const state = createInitialPlayerState();

    savePlayerState(storage, state);

    const restored = loadPlayerState(storage);
    expect(restored).toMatchObject({
      version: 1,
      xp: 0,
      currentChapterId: "chapter-fool",
      currentEncounterId: "fool-threshold",
      journeyPhase: "idle"
    });
  });

  it("falls back to the initial state when storage is broken", () => {
    const storage = {
      getItem() {
        throw new Error("storage is blocked");
      },
      setItem() {
        throw new Error("storage is blocked");
      },
      removeItem() {
        throw new Error("storage is blocked");
      }
    };

    const restored = loadPlayerState(storage);

    expect(restored.xp).toBe(0);
    expect(restored.currentChapterId).toBe("chapter-fool");
    expect(restored.currentEncounterId).toBe("fool-threshold");
  });

  it("normalizes an empty or partial storage payload", () => {
    const storage = createMemoryStorage({
      [STORAGE_KEY]: JSON.stringify({
        xp: 4,
        journeyPhase: "resolved",
        currentChapterId: "chapter-fool",
        currentEncounterId: "fool-threshold",
        lastChoiceCardId: "magician"
      })
    });

    const restored = loadPlayerState(storage);

    expect(restored.xp).toBe(4);
    expect(restored.journeyPhase).toBe("resolved");
    expect(restored.lastChoiceCardId).toBe("magician");
  });

  it("clears stored progress", () => {
    const storage = createMemoryStorage({
      [STORAGE_KEY]: JSON.stringify(createInitialPlayerState())
    });

    resetStoredPlayerState(storage);

    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });
});


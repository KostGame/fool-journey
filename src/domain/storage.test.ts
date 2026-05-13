import { describe, expect, it } from "vitest";
import { createInitialPlayerState } from "./progress";
import { createMemoryStorage, loadPlayerState, resetStoredPlayerState, savePlayerState, STORAGE_KEY } from "./storage";

describe("storage helpers", () => {
  it("saves and loads the current player state shape", () => {
    const storage = createMemoryStorage();
    const state = createInitialPlayerState();

    savePlayerState(storage, state);

    const restored = loadPlayerState(storage);

    expect(restored).toMatchObject({
      version: 2,
      xp: 0,
      minorXp: 0,
      currentChapterId: "chapter-fool",
      currentEncounterId: "fool-threshold",
      currentStepKind: "major",
      currentMinorEventId: null,
      journeyPhase: "idle",
      earnedCards: [],
      inventoryCards: [],
      completedMinorEventIds: []
    });
  });

  it("loads an old save and fills the new inventory fields", () => {
    const storage = createMemoryStorage({
      [STORAGE_KEY]: JSON.stringify({
        version: 1,
        xp: 7,
        currentChapterId: "chapter-empress",
        currentEncounterId: "empress-garden",
        journeyPhase: "resolved",
        lastChoiceId: "empress-choice",
        lastEncounterId: "empress-garden",
        lastChoiceCardId: "empress",
        lastFeedback: "old path",
        completedEncounterIds: ["fool-threshold", "magician-workshop"],
        updatedAt: "2026-05-11T10:00:00.000Z"
      })
    });

    const restored = loadPlayerState(storage);

    expect(restored.version).toBe(2);
    expect(restored.xp).toBe(7);
    expect(restored.minorXp).toBe(0);
    expect(restored.currentChapterId).toBe("chapter-empress");
    expect(restored.currentEncounterId).toBe("empress-garden");
    expect(restored.currentStepKind).toBe("major");
    expect(restored.currentMinorEventId).toBeNull();
    expect(restored.lastEncounterId).toBe("empress-garden");
    expect(restored.earnedCards).toEqual([]);
    expect(restored.inventoryCards).toEqual([]);
    expect(restored.knownCards).toEqual([]);
    expect(restored.completedMinorEventIds).toEqual([]);
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
        lastChoiceCardId: "magician",
        completedMinorEventIds: ["empress-2-cups", "not-a-card"],
        knownCards: ["2-cups", "2-cups", "bad-id"],
        inventoryCards: ["2-cups", "bad-id"],
        earnedCards: [
          {
            cardId: "2-cups",
            earnedAt: "2026-05-12T10:00:00.000Z",
            sourceStepId: "empress-2-cups",
            role: "action",
            uses: 1
          },
          {
            cardId: "bad-id",
            earnedAt: "invalid",
            sourceStepId: "bad-step",
            role: "unknown",
            uses: -3
          }
        ]
      })
    });

    const restored = loadPlayerState(storage);

    expect(restored.xp).toBe(4);
    expect(restored.journeyPhase).toBe("resolved");
    expect(restored.lastChoiceCardId).toBe("magician");
    expect(restored.lastEncounterId).toBeNull();
    expect(restored.completedMinorEventIds).toEqual(["empress-2-cups"]);
    expect(restored.knownCards).toEqual(["2-cups"]);
    expect(restored.inventoryCards).toEqual(["2-cups"]);
    expect(restored.earnedCards).toHaveLength(1);
    expect(restored.earnedCards[0].cardId).toBe("2-cups");
    expect(restored.earnedCards[0].role).toBe("action");
  });

  it("clears stored progress", () => {
    const storage = createMemoryStorage({
      [STORAGE_KEY]: JSON.stringify(createInitialPlayerState())
    });

    resetStoredPlayerState(storage);

    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });
});

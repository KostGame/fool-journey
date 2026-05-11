export function createSeededRandom(seed: number): () => number {
  let state = Math.floor(seed) || 1;

  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function pickOne<T>(items: readonly T[], random: () => number = Math.random): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty list.");
  }

  const index = Math.floor(random() * items.length) % items.length;
  return items[index];
}

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}
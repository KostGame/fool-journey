export function createSeededRandom(seed: number): () => number {
  let value = seed % 2147483647;

  if (value <= 0) {
    value += 2147483646;
  }

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function pickOne<T>(items: readonly T[], random: () => number = Math.random): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty list.");
  }

  const index = Math.floor(random() * items.length);
  return items[index]!;
}

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const current = copy[index];
    copy[index] = copy[swapIndex]!;
    copy[swapIndex] = current!;
  }

  return copy;
}


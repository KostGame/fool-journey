import { majorArcanaPath } from "./majorArcanaPath";
import type { TarotCard } from "../domain/models";

export const cards: readonly TarotCard[] = majorArcanaPath.map((step) => step.card);

export function getCard(cardId: string): TarotCard | undefined {
  return cards.find((card) => card.id === cardId);
}

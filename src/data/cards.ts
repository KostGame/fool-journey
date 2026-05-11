import { majorArcanaPath } from "./majorArcanaPath";
import { minorArcanaCards } from "./minorArcana";
import type { TarotCard } from "../domain/models";

export const cards: readonly TarotCard[] = [
  ...majorArcanaPath.map((step) => step.card),
  ...minorArcanaCards
];

export function getCard(cardId: string): TarotCard | undefined {
  return cards.find((card) => card.id === cardId);
}

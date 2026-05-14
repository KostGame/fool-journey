import { cards } from "./cards";
import type { CardId, MinorRank, TarotCard } from "../domain/models";

export interface CardImageAsset {
  cardId: CardId;
  src?: string;
  alt: string;
  sourceLabel: string;
  sourceUrl: string;
  licenseLabel: string;
  available: boolean;
}

export const cardImageSource = {
  title: "Rider–Waite–Smith tarot deck",
  sourceLabel: "Wikimedia Commons · public domain",
  sourceUrl: "https://commons.wikimedia.org/wiki/Category:Rider-Waite-Smith_tarot_deck_(TaionWC)",
  exampleFileUrl: "https://commons.wikimedia.org/wiki/File:RWS_Tarot_00_Fool.jpg",
  licenseLabel: "Public domain / Public Domain Mark"
} as const;

const majorCardFileNames = {
  fool: "major-00-fool.jpg",
  magician: "major-01-magician.jpg",
  "high-priestess": "major-02-high-priestess.jpg",
  empress: "major-03-empress.jpg",
  emperor: "major-04-emperor.jpg",
  hierophant: "major-05-hierophant.jpg",
  lovers: "major-06-lovers.jpg",
  chariot: "major-07-chariot.jpg",
  strength: "major-08-strength.jpg",
  hermit: "major-09-hermit.jpg",
  "wheel-of-fortune": "major-10-wheel-of-fortune.jpg",
  justice: "major-11-justice.jpg",
  "hanged-man": "major-12-hanged-man.jpg",
  death: "major-13-death.jpg",
  temperance: "major-14-temperance.jpg",
  devil: "major-15-devil.jpg",
  tower: "major-16-tower.jpg",
  star: "major-17-star.jpg",
  moon: "major-18-moon.jpg",
  sun: "major-19-sun.jpg",
  judgment: "major-20-judgement.jpg",
  world: "major-21-world.jpg"
} as const;

const minorRankFileSlugs: Record<MinorRank, string> = {
  ace: "01-ace",
  "2": "02-two",
  "3": "03-three",
  "4": "04-four",
  "5": "05-five",
  "6": "06-six",
  "7": "07-seven",
  "8": "08-eight",
  "9": "09-nine",
  "10": "10-ten",
  page: "11-page",
  knight: "12-knight",
  queen: "13-queen",
  king: "14-king"
};

const cardImageMap = new Map<CardId, CardImageAsset>();

for (const card of cards) {
  cardImageMap.set(card.id, buildCardImageAsset(card));
}

export const cardImageEntries = [...cardImageMap.values()];
export const cardImageCoverage = cardImageEntries.length;

function buildCardImagePath(card: TarotCard): string | undefined {
  if (card.group === "major") {
    const fileName = majorCardFileNames[card.id as keyof typeof majorCardFileNames];
    return fileName ? `/assets/cards/${fileName}` : undefined;
  }

  if (!card.suit || !card.rank) {
    return undefined;
  }

  const rankSlug = minorRankFileSlugs[card.rank];
  return rankSlug ? `/assets/cards/${card.suit}-${rankSlug}.jpg` : undefined;
}

function buildCardImageAsset(card: TarotCard): CardImageAsset {
  const src = buildCardImagePath(card);

  return {
    cardId: card.id,
    src,
    alt: `Миниатюра карты Таро: ${card.name}`,
    sourceLabel: cardImageSource.sourceLabel,
    sourceUrl: cardImageSource.sourceUrl,
    licenseLabel: cardImageSource.licenseLabel,
    available: Boolean(src)
  };
}

function buildMissingCardImageAsset(cardId: CardId | string): CardImageAsset {
  return {
    cardId,
    alt: `Миниатюра карты недоступна: ${cardId}`,
    sourceLabel: cardImageSource.sourceLabel,
    sourceUrl: cardImageSource.sourceUrl,
    licenseLabel: cardImageSource.licenseLabel,
    available: false
  };
}

export function getCardImageAsset(cardId: CardId | string): CardImageAsset {
  return cardImageMap.get(cardId) ?? buildMissingCardImageAsset(cardId);
}

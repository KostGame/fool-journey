import type { EncounterChoice, Orientation, TarotCard, StoryEncounter } from "./models";

export interface EncounterInterpretation {
  title: string;
  summary: string;
  advice: string;
  warning: string;
  dailyMeaning: string;
  questionToSelf: string;
  keywords: readonly string[];
  orientationLabel: string;
  choiceLabel: string;
}

export function composeEncounterInterpretation(
  card: TarotCard,
  encounter: StoryEncounter,
  choice: EncounterChoice,
): EncounterInterpretation {
  const orientationLabel = choice.orientation === "upright" ? "прямая" : "перевёрнутая";
  const baseMeaning = choice.orientation === "upright" ? card.lightMeaning : card.shadowMeaning;
  const baseAdvice = choice.orientation === "upright" ? card.advice : card.warning;

  return {
    title: `${card.name} · ${orientationLabel}`,
    summary: `В позиции «${encounter.positionTitle}» ${card.name} звучит как ${baseMeaning}. ${choice.summaryOverride}`,
    advice: `${choice.adviceOverride} ${baseAdvice}`.trim(),
    warning: card.warning,
    dailyMeaning: card.dailyMeaning,
    questionToSelf: card.questionToSelf,
    keywords: card.keywords,
    orientationLabel,
    choiceLabel: choice.label
  };
}

export function orientationLabel(orientation: Orientation): string {
  return orientation === "upright" ? "прямая" : "перевёрнутая";
}

import type { StoryEncounter } from "../domain/models";

export const encounters = [
  {
    id: "fool-threshold",
    chapterId: "chapter-fool",
    title: "Порог пути",
    situation:
      "Ты стоишь у края тропы. За спиной шум привычки, впереди пустая дорога и ощущение, что этот шаг немного важнее, чем кажется.",
    question: "Как Шут входит в новый этап без лишней тяжести?",
    positionTitle: "Порог",
    choices: [
      {
        id: "step",
        label: "Сделать маленький шаг",
        cardId: "fool",
        orientation: "upright",
        xp: 2,
        buttonNote: "Шут: доверие к первому движению",
        summaryOverride:
          "Шут в этой позиции напоминает: путь открывается не через идеальный план, а через первый честный шаг.",
        adviceOverride: "Сделай одно маленькое действие и посмотри, как отзовётся дорога."
      },
      {
        id: "tool",
        label: "Собрать инструменты",
        cardId: "magician",
        orientation: "upright",
        xp: 2,
        buttonNote: "Маг: собрать волю и форму",
        summaryOverride:
          "Маг в этой позиции предлагает собрать инструменты, слова и намерение в одну линию.",
        adviceOverride: "Назови, чем ты уже располагаешь сегодня, и начни работать с этим."
      },
      {
        id: "listen",
        label: "Послушать тишину",
        cardId: "high-priestess",
        orientation: "reversed",
        xp: 2,
        buttonNote: "Жрица: увидеть скрытый слой",
        summaryOverride:
          "Жрица в перевёрнутом чтении показывает, что тишина может быть не пустотой, а местом, где вскрывается скрытое.",
        adviceOverride: "Пауза нужна не для отмены шага, а для точности шага."
      }
    ]
  }
] as const satisfies readonly StoryEncounter[];

export function getEncounter(encounterId: string): StoryEncounter | undefined {
  return encounters.find((encounter) => encounter.id === encounterId);
}

export function getStartEncounter(): StoryEncounter {
  return encounters[0];
}


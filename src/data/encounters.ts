import type { StoryEncounter } from "../domain/models";

export const encounters = [
  {
    id: "fool-threshold",
    chapterId: "chapter-fool",
    title: "Порог пути",
    situation:
      "Ты стоишь у края тропы. За спиной шум привычек, впереди пустая дорога и ощущение, что этот шаг немного важнее, чем кажется.",
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
        cardId: "fool",
        orientation: "upright",
        xp: 2,
        buttonNote: "Шут: взять с собой только нужное",
        summaryOverride:
          "Шут советует не перегружать старт. Иногда лучший шаг — взять только то, что уже есть под рукой.",
        adviceOverride: "Выбери один доступный ресурс и доверься его простоте."
      },
      {
        id: "listen",
        label: "Послушать тишину",
        cardId: "fool",
        orientation: "upright",
        xp: 2,
        buttonNote: "Шут: услышать дорогу",
        summaryOverride:
          "Шут учит не торопиться с выводом: сначала услышать, куда ведёт сама тропа.",
        adviceOverride: "Пауза нужна не для отмены шага, а для точности шага."
      }
    ]
  },
  {
    id: "magician-workshop",
    chapterId: "chapter-magician",
    title: "Мастерская форм",
    situation:
      "На столе Мага лежат заметки, инструменты и полуготовые планы. Важно не расплескать внимание и выбрать, что именно превратить в действие.",
    question: "Как Маг собирает намерение в форму?",
    positionTitle: "Инструменты",
    choices: [
      {
        id: "gather-tools",
        label: "Собрать инструменты",
        cardId: "magician",
        orientation: "upright",
        xp: 2,
        buttonNote: "Маг: фокус и форма",
        summaryOverride:
          "Маг в этой позиции напоминает: сила рождается из ясного набора инструментов и выбранной цели.",
        adviceOverride: "Назови ресурсы по имени и свяжи их в один понятный план."
      },
      {
        id: "ask-silence",
        label: "Спросить у тишины",
        cardId: "magician",
        orientation: "upright",
        xp: 2,
        buttonNote: "Маг: сначала уточнить вопрос",
        summaryOverride:
          "Маг понимает: тишина полезна, если она помогает точнее сформулировать действие.",
        adviceOverride: "Сделай короткую паузу, чтобы увидеть, какой вопрос ты действительно решаешь."
      },
      {
        id: "move-now",
        label: "Пойти без паузы",
        cardId: "magician",
        orientation: "upright",
        xp: 2,
        buttonNote: "Маг: действие уже возможно",
        summaryOverride:
          "Маг показывает, что ясное действие лучше долгого ожидания идеального момента.",
        adviceOverride: "Выбери одно действие, которое уже можно сделать сегодня."
      }
    ]
  },
  {
    id: "priestess-garden",
    chapterId: "chapter-priestess",
    title: "Сад тишины",
    situation:
      "После усилия Мага шум стихает. Остаются вода, зеркало и тонкая грань между знанием и догадкой.",
    question: "Как услышать ответ, который ещё не оформился?",
    positionTitle: "Тишина",
    choices: [
      {
        id: "listen-deeper",
        label: "Слушать глубже",
        cardId: "high-priestess",
        orientation: "upright",
        xp: 3,
        buttonNote: "Жрица: довериться глубине",
        summaryOverride:
          "Жрица в своей стихии показывает: ответ часто приходит не как мысль, а как тихое узнавание.",
        adviceOverride: "Заметь, что в тебе уже известно без слов, и не торопи этот слой."
      },
      {
        id: "name-the-answer",
        label: "Назвать увиденное",
        cardId: "high-priestess",
        orientation: "upright",
        xp: 2,
        buttonNote: "Жрица: дать ответу созреть",
        summaryOverride:
          "Жрица напоминает: не каждое знание нужно сразу выкладывать словами.",
        adviceOverride: "Собери одно короткое предложение, которое удержит твоё понимание."
      },
      {
        id: "leave-quickly",
        label: "Уйти вперёд",
        cardId: "high-priestess",
        orientation: "upright",
        xp: 2,
        buttonNote: "Жрица: не потерять глубину",
        summaryOverride:
          "Жрица предлагает не разрывать связь с тихим знанием, даже если путь уже зовёт дальше.",
        adviceOverride: "Сделай шаг вперёд, но не теряй связь с тем, что уже стало ясно."
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

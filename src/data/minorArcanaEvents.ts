import type { CardId, EncounterChoice, StoryChapterId } from "../domain/models";
import { getMinorArcanaCard } from "./minorArcana";

export interface MinorArcanaEvent {
  id: string;
  majorChapterId: StoryChapterId;
  cardId: CardId;
  title: string;
  situation: string;
  question: string;
  positionTitle: string;
  choices: readonly EncounterChoice[];
}

interface MinorChoiceInput extends Omit<EncounterChoice, "cardId" | "orientation"> {
  orientation?: EncounterChoice["orientation"];
}

interface MinorEventInput {
  id: string;
  majorChapterId: StoryChapterId;
  cardId: CardId;
  title: string;
  situation: string;
  question: string;
  positionTitle: string;
  choices: readonly MinorChoiceInput[];
}

function makeChoice(cardId: CardId, choice: MinorChoiceInput): EncounterChoice {
  return {
    ...choice,
    cardId,
    orientation: choice.orientation ?? "upright"
  };
}

function makeEvent(input: MinorEventInput): MinorArcanaEvent {
  const card = getMinorArcanaCard(input.cardId);

  if (!card) {
    throw new Error(`Unknown minor arcana card: ${input.cardId}`);
  }

  return {
    id: input.id,
    majorChapterId: input.majorChapterId,
    cardId: input.cardId,
    title: input.title,
    situation: input.situation,
    question: input.question,
    positionTitle: input.positionTitle,
    choices: input.choices.map((choice) => makeChoice(input.cardId, choice))
  };
}

export const minorArcanaEvents = [
  makeEvent({
    id: "empress-2-cups",
    majorChapterId: "chapter-empress",
    cardId: "2-cups",
    title: "Общая чаша",
    situation:
      "После Императрицы рядом возникает другой ритм. Кто-то предлагает разделить дорогу, вместо того чтобы тянуть всё одному.",
    question: "Как 2 Кубков помогает сохранить живую связь?",
    positionTitle: "Дорожная встреча",
    choices: [
      {
        id: "accept-support",
        label: "Принять поддержку",
        xp: 2,
        buttonNote: "2 Кубков: взаимность держит путь тёплым",
        summaryOverride: "Связь усиливает путь, когда в ней есть обмен, а не жёсткий контроль.",
        adviceOverride: "Скажи 'да' живому контакту и не прячься за автономией."
      },
      {
        id: "keep-distance",
        label: "Сохранить дистанцию",
        xp: 1,
        buttonNote: "2 Кубков: бережная граница",
        summaryOverride: "Карта напоминает: границы нужны, если помогают услышать себя и другого.",
        adviceOverride: "Сохрани контакт, но не растворяйся в чужом темпе."
      }
    ]
  }),
  makeEvent({
    id: "emperor-4-pentacles",
    majorChapterId: "chapter-emperor",
    cardId: "4-pentacles",
    title: "Сжатый ресурс",
    situation:
      "Когда появляется опора, хочется удержать её крепче. Но слишком плотный захват начинает тормозить движение.",
    question: "Как 4 Пентаклей помогает не превратить опору в зажим?",
    positionTitle: "Проверка опоры",
    choices: [
      {
        id: "order-resources",
        label: "Упорядочить ресурсы",
        xp: 2,
        buttonNote: "4 Пентаклей: порядок без удушья",
        summaryOverride: "Порядок полезен, когда он бережёт ресурс, а не прячет страх потери.",
        adviceOverride: "Назови, что ты удерживаешь, и оставь только нужное."
      },
      {
        id: "cling-tight",
        label: "Сжать покрепче",
        xp: 1,
        buttonNote: "4 Пентаклей: страх дефицита",
        summaryOverride: "Карта показывает, как контроль может выглядеть как безопасность, но работать как зажим.",
        adviceOverride: "Заметь, что именно ты боишься потерять, и ослабь хватку на один шаг."
      }
    ]
  }),
  makeEvent({
    id: "hierophant-page-swords",
    majorChapterId: "chapter-hierophant",
    cardId: "page-swords",
    title: "Новый вопрос",
    situation:
      "После ритуала и правил приходит короткий сигнал: нужно не повторить урок, а задать свежий вопрос.",
    question: "Как Паж Мечей помогает не пропустить свежий сигнал?",
    positionTitle: "Сигнал",
    choices: [
      {
        id: "write-note",
        label: "Сделать заметку",
        xp: 2,
        buttonNote: "Паж Мечей: поймать мысль",
        summaryOverride: "Сначала фиксируй сигнал, потом уже объясняй его.",
        adviceOverride: "Запиши или произнеси мысль коротко и без украшений."
      },
      {
        id: "ask-directly",
        label: "Спросить прямо",
        xp: 1,
        buttonNote: "Паж Мечей: уточнить смысл",
        summaryOverride: "Иногда лучший способ учиться — спросить без лишнего обхода.",
        adviceOverride: "Сформулируй один прямой вопрос и оставь место для ответа."
      }
    ]
  }),
  makeEvent({
    id: "chariot-knight-wands",
    majorChapterId: "chapter-chariot",
    cardId: "knight-wands",
    title: "Рывок",
    situation:
      "После Колесницы скорость сама просит добавить газ. Важно не перепутать вдохновение с лишним разгоном.",
    question: "Как Рыцарь Жезлов помогает двигаться без перегрева?",
    positionTitle: "Темп",
    choices: [
      {
        id: "ride-forward",
        label: "Рвануть вперёд",
        xp: 1,
        buttonNote: "Рыцарь Жезлов: быстрый старт",
        summaryOverride: "Смелость полезна, если она не сжигает курс в одном рывке.",
        adviceOverride: "Сделай решительный шаг, но не теряй дорогу из виду."
      },
      {
        id: "stabilize-speed",
        label: "Собрать темп",
        xp: 2,
        buttonNote: "Рыцарь Жезлов: держать вектор",
        summaryOverride: "Лучший темп — тот, который можно удержать до конца пути.",
        adviceOverride: "Подстрой скорость под маршрут, а не под всплеск настроения."
      }
    ]
  }),
  makeEvent({
    id: "hermit-8-swords",
    majorChapterId: "chapter-hermit",
    cardId: "8-swords",
    title: "Тесный коридор",
    situation:
      "После Отшельника мысль может слишком крепко схватить саму себя. Кажется, выходов нет, хотя они стоят рядом.",
    question: "Как 8 Мечей помогает увидеть выход из ментального коридора?",
    positionTitle: "Ограничение",
    choices: [
      {
        id: "name-fear",
        label: "Назвать страх",
        xp: 2,
        buttonNote: "8 Мечей: распутать мысль",
        summaryOverride: "Когда страх назван, у него становится меньше власти.",
        adviceOverride: "Сформулируй, чего именно ты боишься, одним честным предложением."
      },
      {
        id: "take-one-step",
        label: "Сделать один выход",
        xp: 1,
        buttonNote: "8 Мечей: маленький выход",
        summaryOverride: "Иногда хватит одного движения, чтобы коридор перестал казаться замкнутым.",
        adviceOverride: "Выбери одно безопасное действие и проверь, как меняется пространство."
      }
    ]
  }),
  makeEvent({
    id: "wheel-6-cups",
    majorChapterId: "chapter-wheel-of-fortune",
    cardId: "6-cups",
    title: "Тёплое воспоминание",
    situation:
      "Колесо Фортуны поднимает старый образ: что-то из прошлого просит не вернуть его, а понять, чему оно учит сейчас.",
    question: "Как 6 Кубков помогает не застрять в прошлом?",
    positionTitle: "Воспоминание",
    choices: [
      {
        id: "accept-memory",
        label: "Принять воспоминание",
        xp: 2,
        buttonNote: "6 Кубков: тёплая память",
        summaryOverride: "Тёплый отклик полезен, если он не отменяет настоящее.",
        adviceOverride: "Позволь воспоминанию стать поддержкой, а не заменой пути."
      },
      {
        id: "release-old-scene",
        label: "Отпустить старую сцену",
        xp: 1,
        buttonNote: "6 Кубков: не жить прошлым",
        summaryOverride: "Старое можно уважить, не делая его центром дороги.",
        adviceOverride: "Сохрани урок, но не возвращайся в прежнюю форму жизни."
      }
    ]
  }),
  makeEvent({
    id: "justice-7-pentacles",
    majorChapterId: "chapter-justice",
    cardId: "7-pentacles",
    title: "Пауза у грядки",
    situation:
      "После Справедливости хочется понять, что уже выросло. Но урожай не отвечает мгновенно, и это тоже часть баланса.",
    question: "Как 7 Пентаклей учит ждать без потери опоры?",
    positionTitle: "Проверка урожая",
    choices: [
      {
        id: "wait-calmly",
        label: "Подождать урожая",
        xp: 2,
        buttonNote: "7 Пентаклей: терпение без пустоты",
        summaryOverride: "Ожидание помогает, когда оно не отменяет заботу о поле.",
        adviceOverride: "Сделай паузу и посмотри, что уже можно оценить спокойно."
      },
      {
        id: "check-ground",
        label: "Проверить почву",
        xp: 1,
        buttonNote: "7 Пентаклей: оценить основу",
        summaryOverride: "Иногда достаточно проверить основу, чтобы ожидание стало осмысленным.",
        adviceOverride: "Потрогай реальность руками и проверь, где ещё нужна забота."
      }
    ]
  }),
  makeEvent({
    id: "death-5-pentacles",
    majorChapterId: "chapter-death",
    cardId: "5-pentacles",
    title: "Холодная дорога",
    situation:
      "После Смерти старые опоры отпадают. В этот момент особенно важно не закрыться от помощи и не замёрзнуть в одиночку.",
    question: "Как 5 Пентаклей помогает пройти через нехватку?",
    positionTitle: "Нехватка",
    choices: [
      {
        id: "ask-for-help",
        label: "Попросить о помощи",
        xp: 2,
        buttonNote: "5 Пентаклей: не тащить всё одному",
        summaryOverride: "Поддержка работает, когда её не стесняются попросить.",
        adviceOverride: "Назови, чего тебе не хватает, и позволь дороге ответить."
      },
      {
        id: "save-strength",
        label: "Сберечь силы",
        xp: 1,
        buttonNote: "5 Пентаклей: беречь тепло",
        summaryOverride: "Экономия сил полезна, если она не превращается в изоляцию.",
        adviceOverride: "Сократи лишнее и оставь только то, что помогает дойти до тепла."
      }
    ]
  }),
  makeEvent({
    id: "sun-queen-wands",
    majorChapterId: "chapter-sun",
    cardId: "queen-wands",
    title: "Яркий жест",
    situation:
      "После Солнца хочется проявиться открыто и уверенно. Но важно не выжечь всё вокруг собственным светом.",
    question: "Как Королева Жезлов показывает силу без лишнего давления?",
    positionTitle: "Проявление",
    choices: [
      {
        id: "shine-boldly",
        label: "Светить смело",
        xp: 2,
        buttonNote: "Королева Жезлов: тёплая уверенность",
        summaryOverride: "Яркость хороша, когда она поддерживает жизнь, а не подавляет её.",
        adviceOverride: "Проявись смело и держи тепло внутри, а не только снаружи."
      },
      {
        id: "protect-energy",
        label: "Беречь энергию",
        xp: 1,
        buttonNote: "Королева Жезлов: сила с мерой",
        summaryOverride: "Даже яркому свету нужна мера, чтобы не перегореть.",
        adviceOverride: "Покажи себя, но оставь часть огня для следующего шага."
      }
    ]
  })
] as const satisfies readonly MinorArcanaEvent[];

export function getMinorArcanaEvent(eventId: string): MinorArcanaEvent | undefined {
  return minorArcanaEvents.find((event) => event.id === eventId);
}

export function getMinorEventAfterChapter(chapterId: string): MinorArcanaEvent | undefined {
  return minorArcanaEvents.find((event) => event.majorChapterId === chapterId);
}

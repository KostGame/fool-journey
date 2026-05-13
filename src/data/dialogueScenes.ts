import type { DialogueChoice, DialogueLine, DialogueScene } from "../domain/models";

function makeLine(speaker: DialogueLine["speaker"], text: string, name?: string): DialogueLine {
  return { speaker, text, name };
}

function makeChoice(choice: DialogueChoice): DialogueChoice {
  return choice;
}

function makeScene(scene: DialogueScene): DialogueScene {
  return scene;
}

export const dialogueScenes = [
  makeScene({
    id: "fool-threshold",
    type: "major-scene",
    sourceStepId: "fool-threshold",
    majorCardId: "fool",
    locationTitle: "Край тропы",
    locationText: "Ветер шевелит траву, и дорога ещё кажется почти пустой.",
    narratorText: "Шут стоит у порога и слушает, как тишина зовёт вперёд.",
    speakerName: "Шут",
    speakerRole: "Аркан-порог",
    dialogueLines: [
      makeLine("narrator", "Ветер шевелит траву, и дорога ещё кажется почти пустой."),
      makeLine("arcana", "Дорога открывается не планом, а доверием.", "Шут"),
      makeLine("fool", "Тогда я беру только то, что помогает сделать первый шаг.", "Шут")
    ],
    foolThought: "Шут думает: главное не вес багажа, а честность шага.",
    choices: [
      makeChoice({
        id: "fool-step",
        label: "Сделать первый шаг",
        cardId: "fool",
        orientation: "upright",
        xp: 2,
        buttonNote: "Шут: начало через движение",
        summaryOverride: "Шут напоминает, что дорога любит движение больше сомнений.",
        adviceOverride: "Сдвинься с места и посмотри, как меняется воздух.",
        tone: "action",
        feedback: "Шут улыбается: шаг уже стал ответом.",
        lesson: "Путь открывается действием."
      }),
      makeChoice({
        id: "fool-breathe",
        label: "Собрать лёгкость",
        cardId: "fool",
        orientation: "upright",
        xp: 2,
        buttonNote: "Шут: взять только нужное",
        summaryOverride: "Лёгкость полезна, когда она не превращается в беспечность.",
        adviceOverride: "Оставь лишнее и возьми с собой только ясность.",
        tone: "feeling",
        feedback: "Шут не спорит с тишиной и идёт легче.",
        lesson: "Не тащи на старт лишний груз."
      })
    ],
    resultText: "Порог открыт, когда ты согласен начать без полной карты.",
    lessonText: "Первый шаг ценнее идеального плана.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "magician-workshop",
    type: "major-scene",
    sourceStepId: "magician-workshop",
    majorCardId: "magician",
    helperCardId: "page-wands",
    locationTitle: "Мастерская Мага",
    locationText: "На столе лежат инструменты, мел и медь. Всё просит быть названным.",
    narratorText: "Маг ждёт не обещаний, а собранного намерения.",
    speakerName: "Маг",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("narrator", "На столе лежат инструменты, мел и медь."),
      makeLine("arcana", "Назови, что у тебя уже есть, и тогда сила соберётся.", "Маг"),
      makeLine("helper", "Паж Жезлов: искра уже пришла. Её надо только заметить.", "Паж Жезлов"),
      makeLine("fool", "Я не ищу чудо. Я собираю рабочий набор.", "Шут")
    ],
    foolThought: "Шут думает: ясность любит список, а не туман.",
    helperText: "Паж Жезлов приносит новость и подталкивает к первому действию.",
    choices: [
      makeChoice({
        id: "magician-gather",
        label: "Собрать инструменты",
        cardId: "magician",
        orientation: "upright",
        xp: 2,
        buttonNote: "Маг: назвать ресурсы по имени",
        summaryOverride: "Маг показывает: сила растёт из ясного набора ресурсов.",
        adviceOverride: "Назови ресурсы по имени и свяжи их в один план.",
        tone: "resource",
        feedback: "Паж Жезлов приносит искру, а Маг собирает её в форму.",
        lesson: "Инструмент и намерение работают вместе."
      }),
      makeChoice({
        id: "magician-act",
        label: "Начать сразу",
        cardId: "magician",
        orientation: "upright",
        xp: 2,
        buttonNote: "Маг: действие уже возможно",
        summaryOverride: "Маг напоминает, что действие полезнее долгого ожидания идеального момента.",
        adviceOverride: "Сделай один понятный ход и не распыляйся.",
        tone: "action",
        feedback: "Маг кивает: форма оживает от первого действия.",
        lesson: "Ясный шаг запускает процесс."
      })
    ],
    resultText: "Маг превращает движение в осмысленную работу.",
    lessonText: "Сначала назови ресурсы, потом используй их.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "priestess-garden",
    type: "major-scene",
    sourceStepId: "priestess-garden",
    majorCardId: "high-priestess",
    helperCardId: "queen-cups",
    locationTitle: "Сад Жрицы",
    locationText: "Вода тихая, а тень кажется не пустой, а внимательной.",
    narratorText: "Жрица не торопится отвечать. Она ждёт, когда вопрос станет точнее.",
    speakerName: "Жрица",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("narrator", "Вода тихая, а тень кажется не пустой, а внимательной."),
      makeLine("arcana", "Не всё нужно говорить вслух, чтобы понять, что верно.", "Жрица"),
      makeLine("helper", "Королева Кубков: почувствуй волну, а не только смысл.", "Королева Кубков"),
      makeLine("fool", "Я слышу ответ, но хочу услышать его глубже.", "Шут")
    ],
    foolThought: "Шут думает: иногда ответ приходит как тишина, а не как слово.",
    helperText: "Королева Кубков помогает заметить чувство, которое уже знает ответ.",
    choices: [
      makeChoice({
        id: "priestess-listen",
        label: "Слушать глубже",
        cardId: "high-priestess",
        orientation: "upright",
        xp: 3,
        buttonNote: "Жрица: довериться внутреннему знанию",
        summaryOverride: "Жрица показывает, что тихое знание часто точнее громкого.",
        adviceOverride: "Замедлись и дай ответу проступить изнутри.",
        tone: "feeling",
        feedback: "Королева Кубков удерживает чувство в ясных границах.",
        lesson: "Тишина тоже умеет отвечать."
      }),
      makeChoice({
        id: "priestess-name",
        label: "Назвать увиденное",
        cardId: "high-priestess",
        orientation: "upright",
        xp: 2,
        buttonNote: "Жрица: дать форме появиться",
        summaryOverride: "Жрица напоминает: иногда ясность приходит после точного названия.",
        adviceOverride: "Сформулируй одну тихую мысль, не торопясь её объяснять.",
        tone: "thought",
        feedback: "Шут осторожно находит слова, не теряя интуиции.",
        lesson: "Сначала увидеть, потом назвать."
      })
    ],
    resultText: "Жрица учит слышать то, что ещё не оформилось в слова.",
    lessonText: "Сначала тишина, затем точный вопрос.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "empress-garden",
    type: "major-scene",
    sourceStepId: "empress-garden",
    majorCardId: "empress",
    helperCardId: "king-pentacles",
    locationTitle: "Сад Императрицы",
    locationText: "Здесь земля тёплая, и всё живое просит заботы без лишней спешки.",
    narratorText: "Императрица не требует усилий ради усилий. Она просит бережного роста.",
    speakerName: "Императрица",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("narrator", "Земля тёплая, и всё живое просит заботы без лишней спешки."),
      makeLine("arcana", "Пусть то, что растёт, получит воду, место и время.", "Императрица"),
      makeLine("helper", "Король Пентаклей: устойчивость тоже помогает расти.", "Король Пентаклей"),
      makeLine("fool", "Я могу не торопить рост, если вижу, что ему нужно.", "Шут")
    ],
    foolThought: "Шут думает: забота не шумит, но меняет всё.",
    helperText: "Король Пентаклей напоминает о ресурсе, который держит рост устойчивым.",
    choices: [
      makeChoice({
        id: "empress-water",
        label: "Покормить рост",
        cardId: "empress",
        orientation: "upright",
        xp: 2,
        buttonNote: "Императрица: поддержать живое",
        summaryOverride: "Императрица учит поддерживать рост без лишнего давления.",
        adviceOverride: "Поддержи то, что уже движется к жизни.",
        tone: "resource",
        feedback: "Король Пентаклей помогает держать устойчивый ритм.",
        lesson: "Забота делает рост возможным."
      }),
      makeChoice({
        id: "empress-give-space",
        label: "Дать место",
        cardId: "empress",
        orientation: "upright",
        xp: 2,
        buttonNote: "Императрица: пространство как забота",
        summaryOverride: "Иногда лучшая забота — не мешать тому, что уже растёт.",
        adviceOverride: "Сними лишнее давление и оставь ритму пространство.",
        tone: "feeling",
        feedback: "Шут отступает на шаг и видит, как сад дышит свободнее.",
        lesson: "Пространство тоже питает."
      })
    ],
    resultText: "Императрица показывает, как рост становится живым и ощутимым.",
    lessonText: "Забота и пространство работают вместе.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "emperor-fortress",
    type: "major-scene",
    sourceStepId: "emperor-fortress",
    majorCardId: "emperor",
    locationTitle: "Крепость Императора",
    locationText: "Камень держит форму, но не хочет стать клеткой.",
    narratorText: "Император ждёт не лозунга, а границы, которая помогает жить.",
    speakerName: "Император",
    speakerRole: "Аркан",
    dialogueLines: [
      makeLine("narrator", "Камень держит форму, но не хочет стать клеткой."),
      makeLine("arcana", "Порядок должен опираться, а не давить.", "Император"),
      makeLine("fool", "Тогда я поставлю рамку так, чтобы в ней осталось дыхание.", "Шут")
    ],
    foolThought: "Шут думает: порядок полезен, если в нём остаётся воздух.",
    choices: [
      makeChoice({
        id: "emperor-build",
        label: "Поставить рамку",
        cardId: "emperor",
        orientation: "upright",
        xp: 2,
        buttonNote: "Император: ясная опора",
        summaryOverride: "Император показывает, что простая рамка может стать поддержкой.",
        adviceOverride: "Определи одну границу и держи её спокойно.",
        tone: "resource",
        feedback: "Император одобряет спокойную и ясную опору.",
        lesson: "Форма помогает, когда она проста."
      }),
      makeChoice({
        id: "emperor-rule",
        label: "Не пережать",
        cardId: "emperor",
        orientation: "upright",
        xp: 2,
        buttonNote: "Император: не задушить форму",
        summaryOverride: "Порядок теряет смысл, если в нём исчезает живое движение.",
        adviceOverride: "Сохрани дисциплину, но не закрывай ею дорогу.",
        tone: "thought",
        feedback: "Шут удерживает форму, не превращая её в клетку.",
        lesson: "Граница нужна, чтобы беречь движение."
      })
    ],
    resultText: "Император учит держать форму без лишней жёсткости.",
    lessonText: "Граница нужна для опоры, а не для страха.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "empress-2-cups",
    type: "minor-event",
    sourceStepId: "empress-2-cups",
    minorCardId: "2-cups",
    locationTitle: "Дорожная встреча",
    locationText: "После Императрицы рядом возникает тёплый обмен, который не хочется ломать.",
    narratorText: "Две чаши помогают понять, что связь держится на взаимности.",
    speakerName: "Две Чаши",
    speakerRole: "Дорожное событие",
    dialogueLines: [
      makeLine("narrator", "После Императрицы рядом возникает тёплый обмен."),
      makeLine("arcana", "Связь живёт, когда в ней есть ответ с обеих сторон.", "Две Чаши"),
      makeLine("fool", "Я не хочу брать всё себе. Я хочу разделить путь.", "Шут")
    ],
    foolThought: "Шут думает: поддержка важнее привычки тянуть всё одному.",
    choices: [
      makeChoice({
        id: "accept-support",
        label: "Принять поддержку",
        cardId: "2-cups",
        orientation: "upright",
        xp: 2,
        buttonNote: "2 Кубков: взаимность держит путь",
        summaryOverride: "Связь усиливается, когда в ней есть обмен, а не контроль.",
        adviceOverride: "Скажи «да» живому контакту и не прячься за автономией.",
        tone: "feeling",
        feedback: "Две Чаши становятся мостом, а не просто знаком.",
        lesson: "Взаимность делает дорогу теплее."
      }),
      makeChoice({
        id: "keep-distance",
        label: "Сохранить дистанцию",
        cardId: "2-cups",
        orientation: "upright",
        xp: 1,
        buttonNote: "2 Кубков: бережная граница",
        summaryOverride: "Граница нужна, если она помогает слышать и себя, и другого.",
        adviceOverride: "Не отрезай контакт, но оставь себе место для дыхания.",
        tone: "thought",
        feedback: "Шут сохраняет контакт, не растворяясь в нём.",
        lesson: "Граница и связь могут жить рядом."
      })
    ],
    resultText: "Краткая встреча учит строить связь без лишнего напряжения.",
    lessonText: "Взаимность может быть мягкой.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "emperor-4-pentacles",
    type: "minor-event",
    sourceStepId: "emperor-4-pentacles",
    minorCardId: "4-pentacles",
    locationTitle: "Проверка опоры",
    locationText: "Когда порядок уже есть, возникает соблазн сжать его слишком крепко.",
    narratorText: "Четыре Пентакля проверяют, умеешь ли ты держать без зажима.",
    speakerName: "Четыре Пентакля",
    speakerRole: "Дорожное событие",
    dialogueLines: [
      makeLine("narrator", "Когда порядок уже есть, возникает соблазн сжать его слишком крепко."),
      makeLine("arcana", "Опора полезна, пока она не становится страхом потери.", "Четыре Пентакля"),
      makeLine("fool", "Я могу держать бережно, а не судорожно.", "Шут")
    ],
    foolThought: "Шут думает: беречь ресурсы и прятать их — не одно и то же.",
    choices: [
      makeChoice({
        id: "order-resources",
        label: "Упорядочить ресурсы",
        cardId: "4-pentacles",
        orientation: "upright",
        xp: 2,
        buttonNote: "4 Пентаклей: порядок без зажима",
        summaryOverride: "Порядок полезен, если он не замораживает движение.",
        adviceOverride: "Разложи ресурсы по местам и оставь им рабочий запас.",
        tone: "resource",
        feedback: "Император и Четыре Пентакля находят общий язык.",
        lesson: "Опора не должна душить."
      }),
      makeChoice({
        id: "cling-tight",
        label: "Сжать покрепче",
        cardId: "4-pentacles",
        orientation: "upright",
        xp: 1,
        buttonNote: "4 Пентаклей: страх дефицита",
        summaryOverride: "Слишком крепкий хват быстро превращает опору в зажим.",
        adviceOverride: "Заметь, что именно ты боишься потерять, и ослабь хват.",
        tone: "thought",
        feedback: "Шут замечает, как страх делает руки напряжённее.",
        lesson: "Зажим не равен безопасности."
      })
    ],
    resultText: "Четыре Пентакля помогают увидеть разницу между опорой и хваткой.",
    lessonText: "Ресурс полезно держать бережно.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "hierophant-page-swords",
    type: "minor-event",
    sourceStepId: "hierophant-page-swords",
    minorCardId: "page-swords",
    locationTitle: "Новый вопрос",
    locationText: "После урока приходит свежий сигнал. Его не нужно повторять, его нужно услышать.",
    narratorText: "Паж Мечей приносит вопрос, который режет туман.",
    speakerName: "Паж Мечей",
    speakerRole: "Дорожное событие",
    dialogueLines: [
      makeLine("narrator", "После урока приходит свежий сигнал."),
      makeLine("helper", "Паж Мечей: задай вопрос короче, чем привычка сомневаться.", "Паж Мечей"),
      makeLine("fool", "Тогда я спрошу прямо и без лишних украшений.", "Шут")
    ],
    foolThought: "Шут думает: свежий вопрос иногда полезнее старого ответа.",
    choices: [
      makeChoice({
        id: "write-note",
        label: "Сделать заметку",
        cardId: "page-swords",
        orientation: "upright",
        xp: 2,
        buttonNote: "Паж Мечей: поймать мысль",
        summaryOverride: "Сначала зафиксируй сигнал, потом уже объясняй его.",
        adviceOverride: "Запиши коротко то, что прозвучало, и не усложняй формулировку.",
        tone: "thought",
        feedback: "Паж Мечей держит мысль на острие.",
        lesson: "Сигнал лучше ловить сразу."
      }),
      makeChoice({
        id: "ask-directly",
        label: "Спросить прямо",
        cardId: "page-swords",
        orientation: "upright",
        xp: 1,
        buttonNote: "Паж Мечей: прояснить без обхода",
        summaryOverride: "Прямой вопрос экономит силы, если он задан без нападения.",
        adviceOverride: "Сформулируй один ясный вопрос и оставь место для ответа.",
        tone: "action",
        feedback: "Шут не прячется за туманом и говорит прямо.",
        lesson: "Честный вопрос открывает путь быстрее."
      })
    ],
    resultText: "Паж Мечей показывает, как короткий сигнал превращается в ясное действие.",
    lessonText: "Вопрос может быть действием.",
    nextStepLabel: "Продолжить историю"
  })
] as const satisfies readonly DialogueScene[];

export function getDialogueSceneBySourceStepId(sourceStepId: string): DialogueScene | undefined {
  return dialogueScenes.find((scene) => scene.sourceStepId === sourceStepId);
}

export function getDialogueSceneByEncounterId(encounterId: string): DialogueScene | undefined {
  return getDialogueSceneBySourceStepId(encounterId);
}

export function getDialogueSceneByMinorEventId(minorEventId: string): DialogueScene | undefined {
  return getDialogueSceneBySourceStepId(minorEventId);
}

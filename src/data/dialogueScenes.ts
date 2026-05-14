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
    locationText: "Ветер шевелит траву, и дорога просит не идеального плана, а первого шага.",
    narratorText: "Шут слушает тишину и выбирает, как начать путь.",
    speakerName: "Шут",
    speakerRole: "Аркан-порог",
    dialogueLines: [
      makeLine("narrator", "На пороге всегда страшнее стоять, чем идти."),
      makeLine("arcana", "Путь откроется в ответ на действие, а не на сомнение.", "Шут"),
      makeLine("fool", "Тогда я начну с шага, который могу сделать прямо сейчас.", "Шут")
    ],
    foolThought: "Первый шаг не обязан быть громким. Он должен быть честным.",
    choices: [
      makeChoice({
        id: "fool-step",
        label: "Сделать первый шаг",
        cardId: "fool",
        orientation: "upright",
        xp: 2,
        buttonNote: "Начать движение",
        summaryOverride: "Шут подтверждает начало действия.",
        adviceOverride: "Сдвинься с места и увидь, как откликнется путь.",
        tone: "action",
        feedback: "Шут делает шаг и слышит, как дорога отвечает.",
        lesson: "Начало любит действие."
      }),
      makeChoice({
        id: "fool-breathe",
        label: "Собрать лёгкость",
        cardId: "fool",
        orientation: "upright",
        xp: 2,
        buttonNote: "Оставить лишнее",
        summaryOverride: "Лёгкость помогает двигаться без перегруза.",
        adviceOverride: "Оставь лишний вес и сохрани ясность шага.",
        tone: "feeling",
        feedback: "Шут идёт легче и не тащит лишнюю тяжесть.",
        lesson: "Лёгкость поддерживает путь."
      })
    ],
    resultText: "Порог открыт: путь принял первый шаг.",
    lessonText: "Лучше честный старт, чем бесконечная подготовка.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "magician-workshop",
    type: "major-scene",
    sourceStepId: "magician-workshop",
    majorCardId: "magician",
    helperCardId: "page-wands",
    locationTitle: "Мастерская Мага",
    locationText: "На столе Мага инструменты ждут, пока их свяжут в рабочий набор.",
    narratorText: "Маг просит назвать ресурсы и выбрать первый практичный ход.",
    speakerName: "Маг",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Сила начинается там, где ты называешь то, чем уже владеешь.", "Маг"),
      makeLine("helper", "Искра есть. Ей нужен вектор.", "Паж Жезлов"),
      makeLine("fool", "Я не жду идеальный момент. Я собираю рабочий набор.", "Шут")
    ],
    foolThought: "Фокус сильнее суеты.",
    helperText: "Паж Жезлов напоминает, что энергия должна получить направление.",
    choices: [
      makeChoice({
        id: "magician-gather",
        label: "Собрать инструменты",
        cardId: "magician",
        orientation: "upright",
        xp: 2,
        buttonNote: "Собрать опору",
        summaryOverride: "Маг связывает ресурсы в форму.",
        adviceOverride: "Назови ресурсы и задай им порядок.",
        tone: "resource",
        feedback: "Маг кивает: у действия появился каркас.",
        lesson: "Инструмент и намерение должны работать вместе."
      }),
      makeChoice({
        id: "magician-act",
        label: "Начать сразу",
        cardId: "magician",
        orientation: "upright",
        xp: 2,
        buttonNote: "Запустить процесс",
        summaryOverride: "Первый ход запускает форму быстрее ожидания.",
        adviceOverride: "Сделай один понятный шаг и не распыляйся.",
        tone: "action",
        feedback: "Шут запускает движение и видит, как форма оживает.",
        lesson: "Ясный старт быстрее долгой подготовки."
      })
    ],
    resultText: "Маг собирает намерение в рабочий вектор.",
    lessonText: "Сначала настрой инструмент, потом усиливай темп.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "priestess-garden",
    type: "major-scene",
    sourceStepId: "priestess-garden",
    majorCardId: "high-priestess",
    helperCardId: "queen-cups",
    locationTitle: "Сад Жрицы",
    locationText: "Тихая вода отражает то, что не слышно в шуме действий.",
    narratorText: "Жрица просит не спешить с выводами и уточнить вопрос.",
    speakerName: "Жрица",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Сначала услышать, потом назвать.", "Жрица"),
      makeLine("helper", "Чувство может быть точным, если его не заглушать.", "Королева Кубков"),
      makeLine("fool", "Я дам тишине договорить.", "Шут")
    ],
    foolThought: "Не каждый ответ рождается в словах.",
    helperText: "Королева Кубков помогает услышать внутренний отклик без паники.",
    choices: [
      makeChoice({
        id: "priestess-listen",
        label: "Слушать глубже",
        cardId: "high-priestess",
        orientation: "upright",
        xp: 3,
        buttonNote: "Пауза ради ясности",
        summaryOverride: "Жрица удерживает тишину, пока не проявится смысл.",
        adviceOverride: "Замедлись и дай вопросу созреть.",
        tone: "feeling",
        feedback: "Шут слышит ответ до того, как формулирует его.",
        lesson: "Тишина может быть источником точности."
      }),
      makeChoice({
        id: "priestess-name",
        label: "Назвать увиденное",
        cardId: "high-priestess",
        orientation: "upright",
        xp: 2,
        buttonNote: "Собрать мысль",
        summaryOverride: "Точная формулировка закрепляет интуицию.",
        adviceOverride: "Собери одну ясную фразу и не спорь с ней раньше времени.",
        tone: "thought",
        feedback: "Шут называет суть коротко и без лишнего шума.",
        lesson: "Названное знание легче применить."
      })
    ],
    resultText: "Жрица учит слышать глубину до решения.",
    lessonText: "Ясный вопрос рождается после паузы.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "empress-garden",
    type: "major-scene",
    sourceStepId: "empress-garden",
    majorCardId: "empress",
    helperCardId: "king-pentacles",
    locationTitle: "Сад Императрицы",
    locationText: "Здесь всё растёт через внимание, ритм и бережный уход.",
    narratorText: "Императрица просит не ускорять рост насильно.",
    speakerName: "Императрица",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Рост любит заботу, а не рывок.", "Императрица"),
      makeLine("helper", "Устойчивость тоже форма заботы.", "Король Пентаклей"),
      makeLine("fool", "Я поддержу то, что уже живое.", "Шут")
    ],
    foolThought: "Забота тиха, но она меняет путь.",
    helperText: "Король Пентаклей напоминает о ресурсе и устойчивом темпе.",
    choices: [
      makeChoice({
        id: "empress-water",
        label: "Поддержать рост",
        cardId: "empress",
        orientation: "upright",
        xp: 2,
        buttonNote: "Полить то, что растёт",
        summaryOverride: "Поддержка усиливает живое движение.",
        adviceOverride: "Дай делу питание и время.",
        tone: "resource",
        feedback: "Шут поддерживает рост и не ломает его ритм.",
        lesson: "Забота строит долгий результат."
      }),
      makeChoice({
        id: "empress-give-space",
        label: "Дать место",
        cardId: "empress",
        orientation: "upright",
        xp: 2,
        buttonNote: "Не давить на рост",
        summaryOverride: "Пространство иногда важнее давления.",
        adviceOverride: "Убери лишний контроль и оставь дыхание процессу.",
        tone: "feeling",
        feedback: "Шут отступает на шаг и видит, как рост ускоряется сам.",
        lesson: "Пространство тоже питает."
      })
    ],
    resultText: "Императрица показывает ритм бережного роста.",
    lessonText: "Результат крепнет, когда его не подгоняют.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "emperor-fortress",
    type: "major-scene",
    sourceStepId: "emperor-fortress",
    majorCardId: "emperor",
    locationTitle: "Крепость Императора",
    locationText: "Камень держит форму, но не должен душить движение.",
    narratorText: "Император проверяет, умеет ли Шут задавать границы без жестокости.",
    speakerName: "Император",
    speakerRole: "Аркан",
    dialogueLines: [
      makeLine("arcana", "Порядок должен опираться, а не давить.", "Император"),
      makeLine("fool", "Я выберу рамку, в которой есть воздух.", "Шут")
    ],
    foolThought: "Граница полезна, когда она поддерживает путь.",
    choices: [
      makeChoice({
        id: "emperor-build",
        label: "Поставить рамку",
        cardId: "emperor",
        orientation: "upright",
        xp: 2,
        buttonNote: "Ясная граница",
        summaryOverride: "Форма даёт опору и защищает маршрут.",
        adviceOverride: "Определи одну границу и держи её спокойно.",
        tone: "resource",
        feedback: "Император принимает спокойную и ясную опору.",
        lesson: "Форма сильна, когда не превращается в клетку."
      }),
      makeChoice({
        id: "emperor-rule",
        label: "Не пережимать",
        cardId: "emperor",
        orientation: "upright",
        xp: 2,
        buttonNote: "Гибкая дисциплина",
        summaryOverride: "Дисциплина должна сохранять движение.",
        adviceOverride: "Сохрани порядок, но не убивай инициативу.",
        tone: "thought",
        feedback: "Шут удерживает рамку и оставляет место для жизни.",
        lesson: "Жёсткость без смысла ломает путь."
      })
    ],
    resultText: "Император учит держать структуру без зажима.",
    lessonText: "Граница нужна для опоры, а не для страха.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "hierophant-hall",
    type: "major-scene",
    sourceStepId: "hierophant-hall",
    majorCardId: "hierophant",
    helperCardId: "queen-swords",
    locationTitle: "Зал Иерофанта",
    locationText: "Своды хранят ритуалы и вопросы, которые пережили много поколений.",
    narratorText: "Иерофант проверяет, умеет ли Шут учиться не вслепую.",
    speakerName: "Иерофант",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Традиция жива, пока ты понимаешь её смысл.", "Иерофант"),
      makeLine("helper", "Назови суть прямо, без тумана и позы.", "Королева Мечей"),
      makeLine("fool", "Я не повторяю слова, пока не пойму, зачем они нужны.", "Шут")
    ],
    foolThought: "Урок работает, когда его можно применить в пути.",
    helperText: "Королева Мечей помогает отличить живой смысл от пустой формулы.",
    choices: [
      makeChoice({
        id: "hierophant-ask",
        label: "Спросить о смысле и услышать другого",
        cardId: "2-cups",
        orientation: "upright",
        xp: 2,
        buttonNote: "2 Кубков: связь через вопрос",
        summaryOverride: "Вопрос открывает живой контакт и уточняет правило.",
        adviceOverride: "Сначала спроси, потом спорь.",
        tone: "action",
        feedback: "Иерофант отвечает мягче: Шут выбрал путь диалога.",
        lesson: "Смысл традиции раскрывается через живую связь.",
        earnedCardId: "2-cups",
        earnedRole: "action"
      }),
      makeChoice({
        id: "hierophant-repeat",
        label: "Закрепить правило как опору",
        cardId: "4-pentacles",
        orientation: "upright",
        xp: 2,
        buttonNote: "4 Пентаклей: каркас и ресурс",
        summaryOverride: "Правило даёт устойчивость, когда не становится тюрьмой.",
        adviceOverride: "Оставь правило там, где оно защищает ресурс.",
        tone: "resource",
        feedback: "Шут получает рабочую рамку и не теряет гибкость.",
        lesson: "Опора полезна, если в ней остаётся место для движения.",
        earnedCardId: "4-pentacles",
        earnedRole: "resource"
      })
    ],
    resultText: "Иерофант переводит урок из ритуала в практику пути.",
    lessonText: "Правило должно помогать действию, а не заменять его.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "lovers-crossroads",
    type: "major-scene",
    sourceStepId: "lovers-crossroads",
    majorCardId: "lovers",
    helperCardId: "page-cups",
    locationTitle: "Развилка Влюблённых",
    locationText: "Две дороги спорят не о скорости, а о качестве выбора.",
    narratorText: "Влюблённые спрашивают, как Шут выбирает, когда вовлечены чувства и ответственность.",
    speakerName: "Влюблённые",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Выбор не про удобство, а про согласованность сердца и действия.", "Влюблённые"),
      makeLine("helper", "Сначала услышь другого, прежде чем доказывать своё.", "Паж Кубков"),
      makeLine("fool", "Я выберу так, чтобы не разрушить связь с собой и другим.", "Шут")
    ],
    foolThought: "Честный выбор держит и направление, и отношения.",
    helperText: "Паж Кубков даёт мягкую подсказку: слышать важнее, чем побеждать спор.",
    choices: [
      makeChoice({
        id: "lovers-heart",
        label: "Применить 2 Кубков: сначала услышать другого",
        cardId: "2-cups",
        orientation: "upright",
        xp: 2,
        buttonNote: "Связь перед решением",
        summaryOverride: "Контакт снижает конфликт и делает выбор точнее.",
        adviceOverride: "Сначала повтори позицию другого своими словами.",
        tone: "feeling",
        feedback: "Напряжение спадает: Шут выбирает через связь, а не через давление.",
        lesson: "Слышать другого не значит терять себя.",
        requiredCardId: "2-cups",
        appliedCardId: "2-cups"
      }),
      makeChoice({
        id: "lovers-balance",
        label: "Удержать позицию без нападения",
        cardId: "7-wands",
        orientation: "upright",
        xp: 2,
        buttonNote: "7 Жезлов: граница без войны",
        summaryOverride: "Граница может быть твёрдой и уважительной одновременно.",
        adviceOverride: "Сформулируй свою позицию коротко и спокойно.",
        tone: "thought",
        feedback: "Шут удерживает линию и не сжигает мосты.",
        lesson: "Защита позиции не обязана быть агрессией.",
        earnedCardId: "7-wands",
        earnedRole: "action"
      })
    ],
    resultText: "Влюблённые делают выбор практикой зрелости.",
    lessonText: "Выбор становится сильнее, когда в нём есть связь и границы.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "chariot-road",
    type: "major-scene",
    sourceStepId: "chariot-road",
    majorCardId: "chariot",
    helperCardId: "knight-wands",
    locationTitle: "Дорога Колесницы",
    locationText: "Темп растёт, и путь требует не только силы, но и управления вектором.",
    narratorText: "Колесница проверяет, удержит ли Шут направление на скорости.",
    speakerName: "Колесница",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Скорость полезна, если ты держишь курс.", "Колесница"),
      makeLine("helper", "Рывок хорош, когда он не сжигает маршрут.", "Рыцарь Жезлов"),
      makeLine("fool", "Я выберу темп, который доведёт до конца, а не только разгонит.", "Шут")
    ],
    foolThought: "Темп без курса превращается в блуждание.",
    helperText: "Рыцарь Жезлов подталкивает к движению, но предупреждает о перегреве.",
    choices: [
      makeChoice({
        id: "chariot-hold",
        label: "Применить 7 Жезлов: держать направление под давлением",
        cardId: "7-wands",
        orientation: "upright",
        xp: 2,
        buttonNote: "Удержать курс",
        summaryOverride: "Стабильная позиция помогает не сбиться на скорости.",
        adviceOverride: "Сохрани один главный ориентир и возвращайся к нему.",
        tone: "action",
        feedback: "Колесница идёт ровно: Шут удержал вектор.",
        lesson: "Направление важнее импульсивного рывка.",
        requiredCardId: "7-wands",
        appliedCardId: "7-wands",
        earnedCardId: "6-swords",
        earnedRole: "action"
      }),
      makeChoice({
        id: "chariot-dash",
        label: "Рвануть на одном вдохе",
        cardId: "knight-wands",
        orientation: "upright",
        xp: 2,
        buttonNote: "Риск перегрева",
        summaryOverride: "Рывок даёт результат, но повышает риск потери курса.",
        adviceOverride: "Если ускоряешься, сразу отметь точку торможения.",
        tone: "action",
        feedback: "Шут чувствует силу рывка, но учится вовремя сбрасывать скорость.",
        lesson: "Смелость работает лучше рядом с самоконтролем."
      })
    ],
    resultText: "Колесница учит соединять силу и управление.",
    lessonText: "Ускорение полезно, если курс остаётся ясным.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "strength-lion",
    type: "major-scene",
    sourceStepId: "strength-lion",
    majorCardId: "strength",
    helperCardId: "queen-swords",
    locationTitle: "Лев Силы",
    locationText: "Перед Шутом не враг, а мощная живая сила, которую нельзя подавить криком.",
    narratorText: "Сила проверяет, умеет ли Шут управлять собой раньше, чем управлять ситуацией.",
    speakerName: "Сила",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Истинная сила спокойна и точна.", "Сила"),
      makeLine("helper", "Ясность помогает держать границы без жестокости.", "Королева Мечей"),
      makeLine("fool", "Я выберу управление через ритм, а не через давление.", "Шут")
    ],
    foolThought: "Сдержанная сила дольше держит путь.",
    helperText: "Королева Мечей помогает назвать границы прямо и без лишнего нажима.",
    choices: [
      makeChoice({
        id: "strength-soothe",
        label: "Успокоить и направить",
        cardId: "8-pentacles",
        orientation: "upright",
        xp: 2,
        buttonNote: "8 Пентаклей: устойчивый ритм",
        summaryOverride: "Повторяемый ритм укрощает хаос лучше грубой силы.",
        adviceOverride: "Сделай короткий и устойчивый шаг, затем повтори.",
        tone: "resource",
        feedback: "Лев замедляется: Шут держит ритм и не теряет контакт.",
        lesson: "Сила растёт из устойчивой практики.",
        earnedCardId: "8-pentacles",
        earnedRole: "resource"
      }),
      makeChoice({
        id: "strength-force",
        label: "Подавить силой",
        cardId: "5-swords",
        orientation: "upright",
        xp: 2,
        buttonNote: "5 Мечей: спор ценой связи",
        summaryOverride: "Жёсткий нажим даёт быстрый эффект, но ослабляет связь.",
        adviceOverride: "Если давишь, сразу проверяй цену этого выигрыша.",
        tone: "thought",
        feedback: "Шут видит: победа без связи оставляет пустоту.",
        lesson: "Не каждый выигрыш укрепляет путь."
      })
    ],
    resultText: "Сила переводит мощь в управление и ритм.",
    lessonText: "Спокойная устойчивость сильнее мгновенного давления.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "hermit-path",
    type: "major-scene",
    sourceStepId: "hermit-path",
    majorCardId: "hermit",
    helperCardId: "king-pentacles",
    locationTitle: "Тропа Отшельника",
    locationText: "Свет фонаря не освещает весь путь, но показывает следующий честный шаг.",
    narratorText: "Отшельник проверяет, умеет ли Шут выбирать ясность вместо шума.",
    speakerName: "Отшельник",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Не всё видно сразу. Но достаточно видеть следующий шаг.", "Отшельник"),
      makeLine("helper", "Опора в ресурсе защищает от паники в тумане.", "Король Пентаклей"),
      makeLine("fool", "Я выберу действие, которое сохраняет ясность и ресурс.", "Шут")
    ],
    foolThought: "Точный шаг в тумане ценнее красивого рывка.",
    helperText: "Король Пентаклей напоминает: спокойная опора лучше поспешного шума.",
    choices: [
      makeChoice({
        id: "hermit-seek",
        label: "Применить 6 Мечей: сменить точку зрения",
        cardId: "6-swords",
        orientation: "upright",
        xp: 2,
        buttonNote: "Переход к ясности",
        summaryOverride: "Смена ракурса снижает ментальный шум и возвращает направление.",
        adviceOverride: "Сделай шаг в сторону и переопредели вопрос.",
        tone: "thought",
        feedback: "Фонарь Отшельника светит дальше: Шут вышел из старого угла зрения.",
        lesson: "Иногда путь открывается после смены ракурса.",
        requiredCardId: "6-swords",
        appliedCardId: "6-swords",
        earnedCardId: "queen-swords",
        earnedRole: "helper",
        helperCardId: "queen-swords"
      }),
      makeChoice({
        id: "hermit-hide",
        label: "Спрятаться в сомнениях",
        cardId: "8-swords",
        orientation: "upright",
        xp: 2,
        buttonNote: "Узкий коридор мыслей",
        summaryOverride: "Изоляция усиливает тревогу и сужает выбор.",
        adviceOverride: "Если закрываешься, задай один проверочный вопрос реальности.",
        tone: "feeling",
        feedback: "Шут замечает, как тишина без ясности превращается в ловушку.",
        lesson: "Тишина полезна только рядом с честным вопросом."
      })
    ],
    resultText: "Отшельник укрепляет навык идти через ясность.",
    lessonText: "Малый ясный шаг лучше большого неясного рывка.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "wheel-turn",
    type: "major-scene",
    sourceStepId: "wheel-turn",
    majorCardId: "wheel-of-fortune",
    helperCardId: "knight-wands",
    locationTitle: "Поворот Колеса",
    locationText: "Ситуация меняется быстрее, чем привычки успевают перестроиться.",
    narratorText: "Колесо Фортуны проверяет, умеет ли Шут использовать перемены как ресурс.",
    speakerName: "Колесо Фортуны",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Поворот не спрашивает, готов ли ты. Он предлагает выбрать ответ.", "Колесо Фортуны"),
      makeLine("helper", "Лови момент, но не теряй управление.", "Рыцарь Жезлов"),
      makeLine("fool", "Я отвечу действием, которое можно повторить и удержать.", "Шут")
    ],
    foolThought: "Удача помогает тем, кто держит ритм в переменах.",
    helperText: "Рыцарь Жезлов напоминает: импульс полезен, если у него есть руль.",
    choices: [
      makeChoice({
        id: "wheel-ride",
        label: "Применить 8 Пентаклей: удержать ритм в повороте",
        cardId: "8-pentacles",
        orientation: "upright",
        xp: 2,
        buttonNote: "Ритм в переменах",
        summaryOverride: "Повторяемый шаг превращает случайность в устойчивое движение.",
        adviceOverride: "Сохрани один рабочий ритуал, даже когда всё меняется.",
        tone: "resource",
        feedback: "Шут держит темп, и поворот работает в его пользу.",
        lesson: "Стабильный ритм помогает пройти через случайность.",
        requiredCardId: "8-pentacles",
        appliedCardId: "8-pentacles"
      }),
      makeChoice({
        id: "wheel-resist",
        label: "Сдержать риск через опору",
        cardId: "4-pentacles",
        orientation: "upright",
        xp: 2,
        buttonNote: "Опора в турбулентности",
        summaryOverride: "Опора снижает хаос, если не превращается в застой.",
        adviceOverride: "Держи минимум стабильности и не блокируй движение целиком.",
        tone: "thought",
        feedback: "Шут проходит поворот без паники и без зажима.",
        lesson: "Опора и гибкость должны работать вместе.",
        requiredCardId: "4-pentacles",
        appliedCardId: "4-pentacles"
      })
    ],
    resultText: "Колесо Фортуны учит работать с переменой, а не воевать с ней.",
    lessonText: "Поворот пути становится ресурсом при ясном ритме.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "justice-scales",
    type: "major-scene",
    sourceStepId: "justice-scales",
    majorCardId: "justice",
    helperCardId: "queen-swords",
    locationTitle: "Весы Справедливости",
    locationText: "Здесь нельзя спрятаться за красивыми словами: весы просят точную меру.",
    narratorText: "Справедливость просит назвать цену выбора и взять ответственность.",
    speakerName: "Справедливость",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Назови правду о выборе: что ты защищаешь и чем платишь.", "Справедливость"),
      makeLine("helper", "Говори ясно. Честность не требует жестокости.", "Королева Мечей"),
      makeLine("fool", "Я назову цену прямо и не спрячусь за туманом.", "Шут")
    ],
    foolThought: "Ответственность начинается там, где заканчиваются отговорки.",
    helperText: "Королева Мечей помогает назвать правду точно и без лишнего удара.",
    choices: [
      makeChoice({
        id: "justice-weigh",
        label: "Позвать Королеву Мечей и назвать цену выбора",
        cardId: "queen-swords",
        orientation: "upright",
        xp: 2,
        buttonNote: "Ясность и границы",
        summaryOverride: "Точная формулировка снимает лишний туман с решения.",
        adviceOverride: "Назови в одном предложении, что ты выбираешь и почему.",
        tone: "thought",
        feedback: "Весы выравниваются: Шут отвечает честно и ровно.",
        lesson: "Честная ясность укрепляет выбор.",
        requiredCardId: "queen-swords",
        appliedCardId: "queen-swords",
        helperCardId: "queen-swords"
      }),
      makeChoice({
        id: "justice-avoid",
        label: "Уйти в удобные объяснения",
        cardId: "5-swords",
        orientation: "upright",
        xp: 2,
        buttonNote: "Избежать меры",
        summaryOverride: "Уклонение от меры оставляет решение тяжёлым и непрозрачным.",
        adviceOverride: "Если уходишь от ответа, зафиксируй, где именно начинаются отговорки.",
        tone: "action",
        feedback: "Шут замечает, как удобная версия лишает решение опоры.",
        lesson: "Без честной меры выбор быстро теряет устойчивость."
      })
    ],
    resultText: "Справедливость завершает первый поворот пути зрелым ответом.",
    lessonText: "Первый поворот пройден: Шут научился выбирать и отвечать за последствия.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "hanged-man-pause",
    type: "major-scene",
    sourceStepId: "hanged-man-pause",
    majorCardId: "hanged-man",
    helperCardId: "page-swords",
    locationTitle: "Пауза Повешенного",
    locationText: "Путь замирает не для наказания, а чтобы Шут увидел мир под другим углом.",
    narratorText: "Повешенный просит не торопиться и замечает, что пауза тоже меняет дорогу.",
    speakerName: "Повешенный",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Иногда путь становится ясным только тогда, когда ты перестаёшь его дёргать.", "Повешенный"),
      makeLine("helper", "Сначала смотри, потом называй. Новый угол даёт новый смысл.", "Паж Мечей"),
      makeLine("fool", "Я не убегаю от паузы. Я смотрю, что она мне показывает.", "Шут")
    ],
    foolThought: "Пауза не отменяет движение. Она иногда собирает его в новый смысл.",
    helperText: "Паж Мечей помогает заметить, где взгляд уже стал слишком узким.",
    choices: [
      makeChoice({
        id: "hanged-man-reframe",
        label: "Повернуть взгляд",
        cardId: "hanged-man",
        orientation: "upright",
        xp: 3,
        buttonNote: "Пауза меняет угол",
        summaryOverride: "Повешенный показывает, что задержка может раскрыть скрытую опору пути.",
        adviceOverride: "Сделай паузу и назови, что стало видно иначе.",
        tone: "thought",
        feedback: "Шут не дёргается и начинает видеть скрытую опору.",
        lesson: "Пауза раскрывает новый ракурс.",
        earnedCardId: "page-wands",
        earnedRole: "lesson",
        helperCardId: "page-swords"
      }),
      makeChoice({
        id: "hanged-man-loosen",
        label: "Ослабить хватку",
        cardId: "hanged-man",
        orientation: "upright",
        xp: 2,
        buttonNote: "Отпустить лишнее",
        summaryOverride: "Освободиться можно только после того, как признан собственный захват.",
        adviceOverride: "Отпусти один лишний аргумент и не держи его ради привычки.",
        tone: "action",
        feedback: "Шут снимает напряжение и освобождает движение.",
        lesson: "Отпускание возвращает воздух.",
        requiredCardId: "4-pentacles",
        appliedCardId: "4-pentacles"
      })
    ],
    resultText: "Повешенный меняет угол зрения и открывает Шуту первый скрытый ресурс.",
    lessonText: "Пауза может быть действием, если она честно меняет взгляд.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "death-release",
    type: "major-scene",
    sourceStepId: "death-release",
    majorCardId: "death",
    helperCardId: "knight-cups",
    locationTitle: "Река Смерти",
    locationText: "Здесь старое не ругают. Его просто отпускают, чтобы оно перестало тянуть назад.",
    narratorText: "Смерть не отнимает путь, а освобождает его от того, что уже завершилось.",
    speakerName: "Смерть",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Отпускание становится легче, когда ты сам признаёшь конец формы.", "Смерть"),
      makeLine("helper", "Не спорь с уходящим. Проводи его без шума и без страха.", "Рыцарь Кубков"),
      makeLine("fool", "Я отпускаю старое, чтобы не тащить его в следующий шаг.", "Шут")
    ],
    foolThought: "Конец формы освобождает место для следующей жизни движения.",
    helperText: "Рыцарь Кубков напоминает: переход можно пройти бережно, не ломая сердце.",
    choices: [
      makeChoice({
        id: "death-release-old",
        label: "Проводить старое",
        cardId: "death",
        orientation: "upright",
        xp: 3,
        buttonNote: "Переход без застревания",
        summaryOverride: "Смерть освобождает дорогу, когда старое завершено честно и без удержания.",
        adviceOverride: "Назови, что завершилось, и позволь этому уйти.",
        tone: "action",
        feedback: "Шут отпускает старую форму и не тащит её дальше.",
        lesson: "Конец одной формы освобождает место новой.",
        requiredCardId: "page-wands",
        appliedCardId: "page-wands",
        earnedCardId: "queen-cups",
        earnedRole: "resource",
        helperCardId: "knight-cups"
      }),
      makeChoice({
        id: "death-stand-still",
        label: "Остаться в знакомом",
        cardId: "death",
        orientation: "upright",
        xp: 2,
        buttonNote: "Не кормить страх",
        summaryOverride: "Сопротивление продлевает распад и делает переход тяжелее.",
        adviceOverride: "Заметь, чего ты боишься отпустить, и не делай этот страх главным.",
        tone: "thought",
        feedback: "Шут видит, как привычка цепляется за уже завершённое.",
        lesson: "Отрицание не отменяет перемены."
      })
    ],
    resultText: "Смерть проводит Шута через завершение и оставляет в руках более мягкую силу.",
    lessonText: "Отпускание работает как очистка пути, а не как потеря себя.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "temperance-flow",
    type: "major-scene",
    sourceStepId: "temperance-flow",
    majorCardId: "temperance",
    helperCardId: "queen-cups",
    locationTitle: "Поток Умеренности",
    locationText: "Две чаши удерживают движение между крайностями, чтобы оно стало живым и ровным.",
    narratorText: "Умеренность учит не ускорять всё сразу, а смешивать ритм и тишину в один поток.",
    speakerName: "Умеренность",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Сила становится точной, когда её не расплескивают.", "Умеренность"),
      makeLine("helper", "Держи меру. Тепло и ритм работают лучше спешки.", "Королева Кубков"),
      makeLine("fool", "Я смешаю движение и покой так, чтобы они не спорили.", "Шут")
    ],
    foolThought: "Мера не гасит силу. Она делает её пригодной для пути.",
    helperText: "Королева Кубков помогает не терять чувствительность в попытке всё успеть.",
    choices: [
      makeChoice({
        id: "temperance-mix",
        label: "Смешать ритм и покой",
        cardId: "temperance",
        orientation: "upright",
        xp: 3,
        buttonNote: "Мягкий баланс",
        summaryOverride: "Умеренность связывает разрозненное в тёплый и посильный поток.",
        adviceOverride: "Возьми ровно столько, сколько можно удержать без спешки.",
        tone: "feeling",
        feedback: "Шут находит меру и не расплескивает силы.",
        lesson: "Баланс растёт из мягкого смешения.",
        requiredCardId: "queen-cups",
        appliedCardId: "queen-cups",
        earnedCardId: "knight-wands",
        earnedRole: "action",
        helperCardId: "queen-cups"
      }),
      makeChoice({
        id: "temperance-push",
        label: "Добавить ещё огня",
        cardId: "temperance",
        orientation: "upright",
        xp: 2,
        buttonNote: "Не расплескать темп",
        summaryOverride: "Если добавить слишком много огня, поток становится шумом.",
        adviceOverride: "Сохрани одну меру и не подгоняй всё сразу.",
        tone: "action",
        feedback: "Шут замечает, где спешка начинает ломать ритм.",
        lesson: "Мера удерживает движение живым."
      })
    ],
    resultText: "Умеренность превращает усилие в ровный поток, а не в рывок.",
    lessonText: "Когда ритм и чувство согласованы, путь идёт легче.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "devil-chains",
    type: "major-scene",
    sourceStepId: "devil-chains",
    majorCardId: "devil",
    helperCardId: "queen-swords",
    locationTitle: "Цепи Дьявола",
    locationText: "В этой сцене привычка показывает себя честно: как то, что уже слишком сильно держит.",
    narratorText: "Дьявол не обвиняет. Он просто показывает, где Шут сам согласился на цепь.",
    speakerName: "Дьявол",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Цепь крепче всего там, где её не называют.", "Дьявол"),
      makeLine("helper", "Честная формулировка ослабляет лишний крючок.", "Королева Мечей"),
      makeLine("fool", "Я не украшаю привычку. Я смотрю на неё прямо.", "Шут")
    ],
    foolThought: "Честность не лечит всё сразу, но она убирает туман вокруг крючка.",
    helperText: "Королева Мечей помогает увидеть механизм привязки без лишней драмы.",
    choices: [
      makeChoice({
        id: "devil-name-chain",
        label: "Назвать цепь",
        cardId: "devil",
        orientation: "upright",
        xp: 3,
        buttonNote: "Честная проверка",
        summaryOverride: "Дьявол слабеет, когда привычка перестаёт прятаться за удобными словами.",
        adviceOverride: "Назови привычку прямо и без оправданий.",
        tone: "action",
        feedback: "Шут видит механизм искушения и ослабляет его.",
        lesson: "Признание уменьшает власть цепи.",
        requiredCardId: "knight-wands",
        appliedCardId: "knight-wands",
        earnedCardId: "queen-swords",
        earnedRole: "helper",
        helperCardId: "queen-swords"
      }),
      makeChoice({
        id: "devil-refuse-feed",
        label: "Не кормить тень",
        cardId: "devil",
        orientation: "upright",
        xp: 2,
        buttonNote: "Остановить реакцию",
        summaryOverride: "Тень ослабевает, когда её перестают подпитывать автоматическими ответами.",
        adviceOverride: "Не спорь с тенью, просто не добавляй ей силы.",
        tone: "thought",
        feedback: "Шут отступает от крючка и не даёт привычке пищи.",
        lesson: "Тень слабеет без подпитки."
      })
    ],
    resultText: "Дьявол показывает крючок привычки, и у Шута уже есть честные слова для ответа.",
    lessonText: "Привычка теряет власть, когда её механизм назван вслух.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "tower-shock",
    type: "major-scene",
    sourceStepId: "tower-shock",
    majorCardId: "tower",
    helperCardId: "king-cups",
    locationTitle: "Удар Башни",
    locationText: "Ложная стена трещит, чтобы путь больше не опирался на то, что уже не держит.",
    narratorText: "Башня ломает иллюзию, но не саму дорогу. Она освобождает место для живого шага.",
    speakerName: "Башня",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Когда стена трескается, полезно выйти не героем, а вовремя.", "Башня"),
      makeLine("helper", "Сохрани то, что можно удержать мягко. Эмоция тоже может стать опорой.", "Король Кубков"),
      makeLine("fool", "Я не спорю с трещиной. Я выбираю живой шаг.", "Шут")
    ],
    foolThought: "Ломается не путь, а ложная форма пути.",
    helperText: "Король Кубков помогает не паниковать, когда старое уже нельзя удержать.",
    choices: [
      makeChoice({
        id: "tower-step-aside",
        label: "Шагнуть в сторону",
        cardId: "tower",
        orientation: "upright",
        xp: 3,
        buttonNote: "Пробуждение без обломков",
        summaryOverride: "Башня даёт шанс выжить, если не держаться за уже рухнувшую стену.",
        adviceOverride: "Не держись за трещину, если она уже не опора.",
        tone: "action",
        feedback: "Шут спасает себя своевременным движением.",
        lesson: "Живой шаг важнее ложной стены.",
        requiredCardId: "queen-swords",
        appliedCardId: "queen-swords",
        earnedCardId: "king-cups",
        earnedRole: "resource",
        helperCardId: "king-cups"
      }),
      makeChoice({
        id: "tower-hold-wall",
        label: "Остаться под стеной",
        cardId: "tower",
        orientation: "upright",
        xp: 2,
        buttonNote: "Не кормить обрушение",
        summaryOverride: "Удержание рухнувшего только продлевает напряжение и шум.",
        adviceOverride: "Позволь старой конструкции закончиться без лишнего сопротивления.",
        tone: "thought",
        feedback: "Шут видит, что удерживать обломок бессмысленно.",
        lesson: "Иногда лучше выйти, чем держать шум."
      })
    ],
    resultText: "Башня снимает ложную опору, а Шут забирает с собой только живое.",
    lessonText: "Срыв формы не равен провалу пути, если шаг сделать вовремя.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "star-garden",
    type: "major-scene",
    sourceStepId: "star-garden",
    majorCardId: "star",
    helperCardId: "king-cups",
    locationTitle: "Сад Звезды",
    locationText: "После громкого падения здесь снова слышно небо и спокойную воду.",
    narratorText: "Звезда возвращает надежду без шума, чтобы Шут мог снова видеть направление.",
    speakerName: "Звезда",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Свет не всегда громкий. Иногда он просто помогает снова увидеть берег.", "Звезда"),
      makeLine("helper", "Не торопись. Тихая надежда держит лучше, чем громкое обещание.", "Король Кубков"),
      makeLine("fool", "Я беру свет как ориентир, а не как повод спешить.", "Шут")
    ],
    foolThought: "Надежда не отменяет реальность. Она возвращает ей направление.",
    helperText: "Король Кубков помогает удержать мягкую надежду после резкого перелома.",
    choices: [
      makeChoice({
        id: "star-trust",
        label: "Принять надежду",
        cardId: "star",
        orientation: "upright",
        xp: 3,
        buttonNote: "Тихий свет",
        summaryOverride: "Звезда возвращает направление не громко, а мягко и уверенно.",
        adviceOverride: "Заметь один тёплый знак и удержи его.",
        tone: "feeling",
        feedback: "Шут снова видит путь без спешки.",
        lesson: "Надежда работает как ориентир.",
        requiredCardId: "king-cups",
        appliedCardId: "king-cups",
        earnedCardId: "page-cups",
        earnedRole: "lesson",
        helperCardId: "king-cups"
      }),
      makeChoice({
        id: "star-hide-light",
        label: "Спрятать свет",
        cardId: "star",
        orientation: "upright",
        xp: 2,
        buttonNote: "Не гасить ориентир",
        summaryOverride: "Если закрыть свет, путь снова станет труднее различим.",
        adviceOverride: "Не спеши отказываться от надежды только из усталости.",
        tone: "thought",
        feedback: "Шут замечает, что отказ от света не делает ночь короче.",
        lesson: "Надежда становится сильнее, когда её не стыдятся."
      })
    ],
    resultText: "Звезда возвращает тихую опору, а Шут снова различает направление.",
    lessonText: "Надежда после кризиса работает как ясный берег в темноте.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "moon-path",
    type: "major-scene",
    sourceStepId: "moon-path",
    majorCardId: "moon",
    helperCardId: "page-cups",
    locationTitle: "Тропа Луны",
    locationText: "Туман не исчезает, но в нём можно отличить чувство от тревоги.",
    narratorText: "Луна предлагает идти медленно и проверять, где в темноте живой отклик, а где страх.",
    speakerName: "Луна",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Если путь туманен, не спеши верить первому шороху.", "Луна"),
      makeLine("helper", "Чувство можно проверить. Тревогу — тоже.", "Паж Кубков"),
      makeLine("fool", "Я пойду медленно и сверю шаг с тем, что действительно откликается.", "Шут")
    ],
    foolThought: "Страх и интуиция иногда звучат похоже. Проверка возвращает различие.",
    helperText: "Паж Кубков приносит мягкий эмоциональный сигнал, который проще заметить в тумане.",
    choices: [
      makeChoice({
        id: "moon-check-fear",
        label: "Проверить страх",
        cardId: "moon",
        orientation: "upright",
        xp: 3,
        buttonNote: "Туман под проверкой",
        summaryOverride: "Луна учит отличать чувство от выдумки и не верить первому испугу.",
        adviceOverride: "Иди медленно и перепроверь, что ты слышишь.",
        tone: "thought",
        feedback: "Шут перестаёт подчиняться первому страху.",
        lesson: "Проверка очищает туман.",
        requiredCardId: "page-cups",
        appliedCardId: "page-cups",
        earnedCardId: "queen-wands",
        earnedRole: "action",
        helperCardId: "page-cups"
      }),
      makeChoice({
        id: "moon-follow-panic",
        label: "Поддаться тревоге",
        cardId: "moon",
        orientation: "upright",
        xp: 2,
        buttonNote: "Тревога не равна истине",
        summaryOverride: "Страх легко подменяет ориентир, если верить ему без проверки.",
        adviceOverride: "Остановись и отличи чувство от фантазии.",
        tone: "feeling",
        feedback: "Шут замечает, как тревога начинает рисовать лишнее.",
        lesson: "Не всякое волнение — подсказка."
      })
    ],
    resultText: "Луна оставляет Шуту практику проверки, а не слепого доверия страху.",
    lessonText: "Туман проходим, если отличать живой отклик от тревожной картинки.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "sun-field",
    type: "major-scene",
    sourceStepId: "sun-field",
    majorCardId: "sun",
    helperCardId: "queen-wands",
    locationTitle: "Поле Солнца",
    locationText: "Туман остаётся позади, и простая ясность делает путь удивительно живым.",
    narratorText: "Солнце ничего не объясняет лишний раз. Оно просто делает видимым то, что уже стало ясным.",
    speakerName: "Солнце",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Свет крепнет, когда им делятся без лишнего пафоса.", "Солнце"),
      makeLine("helper", "Уверенность может быть мягкой. Её не нужно кричать.", "Королева Жезлов"),
      makeLine("fool", "Я не прячу ясность. Я позволяю ей согреть дорогу.", "Шут")
    ],
    foolThought: "Простая радость иногда сильнее любой сложной победы.",
    helperText: "Королева Жезлов помогает держать свет без напряжённой демонстрации.",
    choices: [
      makeChoice({
        id: "sun-share-light",
        label: "Поделиться светом",
        cardId: "sun",
        orientation: "upright",
        xp: 3,
        buttonNote: "Простая радость",
        summaryOverride: "Солнце делает ясность общей, а не только личной.",
        adviceOverride: "Скажи о своём успехе просто и тепло.",
        tone: "action",
        feedback: "Шут перестаёт прятать ясность.",
        lesson: "Радость крепнет, когда её разделяют.",
        requiredCardId: "queen-wands",
        appliedCardId: "queen-wands",
        earnedCardId: "king-pentacles",
        earnedRole: "resource",
        helperCardId: "queen-wands"
      }),
      makeChoice({
        id: "sun-hide-joy",
        label: "Спрятать радость",
        cardId: "sun",
        orientation: "upright",
        xp: 2,
        buttonNote: "Не гасить ясность",
        summaryOverride: "Если закрыть свет, он не исчезает, но им становится труднее жить.",
        adviceOverride: "Не бойся простоты, она не делает смысл меньше.",
        tone: "thought",
        feedback: "Шут замечает, что скрытая радость становится тише.",
        lesson: "Ясность легче держать открытой."
      })
    ],
    resultText: "Солнце закрепляет ясность, и Шут больше не прячет то, что уже стало светом.",
    lessonText: "Когда свет разделён, он не уменьшается, а распространяется дальше.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "judgment-call",
    type: "major-scene",
    sourceStepId: "judgment-call",
    majorCardId: "judgment",
    helperCardId: "queen-swords",
    locationTitle: "Зов Суда",
    locationText: "Издалека слышен отклик на уже прожитый путь. Это не наказание, а приглашение ответить честно.",
    narratorText: "Суд собирает прошлое и зовёт Шута к ясному ответу без страха и самоосуждения.",
    speakerName: "Суд",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Зов слышен тем яснее, чем честнее ты отвечаешь ему.", "Суд"),
      makeLine("helper", "Скажи, что готово завершиться, а что готово начаться.", "Королева Мечей"),
      makeLine("fool", "Я отвечу на зов прямо, не пряча готовность.", "Шут")
    ],
    foolThought: "Отклик завершает старый круг и делает место новому.",
    helperText: "Королева Мечей помогает отделить зов от страха оценки.",
    choices: [
      makeChoice({
        id: "judgment-answer-call",
        label: "Ответить на зов",
        cardId: "judgment",
        orientation: "upright",
        xp: 3,
        buttonNote: "Собранный ответ",
        summaryOverride: "Суд завершает старый круг и открывает новый отклик.",
        adviceOverride: "Ответь честно и без паники.",
        tone: "action",
        feedback: "Шут принимает зов и не прячется от него.",
        lesson: "Зов требует честного ответа.",
        requiredCardId: "king-pentacles",
        appliedCardId: "king-pentacles",
        earnedCardId: "king-swords",
        earnedRole: "resource",
        helperCardId: "queen-swords"
      }),
      makeChoice({
        id: "judgment-delay",
        label: "Сделать вид, что не слышно",
        cardId: "judgment",
        orientation: "upright",
        xp: 2,
        buttonNote: "Не уходить от зова",
        summaryOverride: "Отложенный отклик всё равно остаётся слышен и только усиливает напряжение.",
        adviceOverride: "Не прячься от того, что уже зовёт.",
        tone: "thought",
        feedback: "Шут замечает, что зов не исчезает от молчания.",
        lesson: "Отклик лучше отложенного страха."
      })
    ],
    resultText: "Суд собирает завершение в честный ответ и готовит последний круг.",
    lessonText: "Когда зов услышан, путь перестаёт расплываться и становится собранным.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "world-circle",
    type: "major-scene",
    sourceStepId: "world-circle",
    majorCardId: "world",
    helperCardId: "king-swords",
    locationTitle: "Круг Мира",
    locationText: "Круг не стирает путь. Он собирает его в целую форму, которую можно удержать и прожить снова.",
    narratorText: "Мир завершает круг не как конец, а как полноту, в которой всё уже на своём месте.",
    speakerName: "Мир",
    speakerRole: "Аркан и помощник",
    dialogueLines: [
      makeLine("arcana", "Целое не требует спешки. Оно просит признания.", "Мир"),
      makeLine("helper", "Собери всё сказанное, всё сделанное и всё пройденное в одну форму.", "Король Мечей"),
      makeLine("fool", "Я вижу весь путь сразу и могу удержать его как завершённый круг.", "Шут")
    ],
    foolThought: "Завершение не отменяет движение. Оно даёт ему форму.",
    helperText: "Король Мечей помогает собрать итог в ясную и устойчивую рамку.",
    choices: [
      makeChoice({
        id: "world-integrate",
        label: "Собрать опыт",
        cardId: "world",
        orientation: "upright",
        xp: 4,
        buttonNote: "Целое уже здесь",
        summaryOverride: "Мир собирает разрозненные шаги в цельную форму и держит её спокойно.",
        adviceOverride: "Признай путь завершённым и удержи его целиком.",
        tone: "resource",
        feedback: "Шут видит всю дорогу целиком и не теряет её форму.",
        lesson: "Целостность не отменяет движение, а завершает его.",
        requiredCardId: "king-swords",
        appliedCardId: "king-swords",
        helperCardId: "king-swords"
      }),
      makeChoice({
        id: "world-scatter",
        label: "Разбросать итог",
        cardId: "world",
        orientation: "upright",
        xp: 2,
        buttonNote: "Не распадаться обратно",
        summaryOverride: "Если не собрать путь, его части снова растворяются в шуме.",
        adviceOverride: "Не теряй собранность, когда круг закрывается.",
        tone: "thought",
        feedback: "Шут замечает, что цельность требует удержания, а не случайности.",
        lesson: "Собранность не даёт пути распасться."
      })
    ],
    resultText: "Мир завершает путь и оставляет Шуту собранную целостность.",
    lessonText: "Финал пути не стирает дорогу. Он делает её целым опытом, который можно прожить снова.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "empress-2-cups",
    type: "minor-event",
    sourceStepId: "empress-2-cups",
    minorCardId: "2-cups",
    locationTitle: "Дорожная встреча",
    locationText: "Короткая встреча между главами проверяет, умеет ли Шут держать живой контакт.",
    narratorText: "Две Чаши напоминают о взаимности и бережной связи.",
    speakerName: "Две Чаши",
    speakerRole: "Дорожное событие",
    dialogueLines: [
      makeLine("arcana", "Связь держится обменом, а не контролем.", "2 Кубков"),
      makeLine("fool", "Я выберу контакт, который не стирает границы.", "Шут")
    ],
    foolThought: "Связь помогает идти, если в ней есть взаимность.",
    choices: [
      makeChoice({
        id: "accept-support",
        label: "Принять поддержку",
        cardId: "2-cups",
        orientation: "upright",
        xp: 2,
        buttonNote: "Взаимность",
        summaryOverride: "Обмен усиливает путь и снижает одиночную перегрузку.",
        adviceOverride: "Прими помощь и ответь взаимностью.",
        tone: "feeling",
        feedback: "Шут принимает поддержку и двигается теплее.",
        lesson: "Взаимность экономит силы.",
        earnedCardId: "2-cups",
        earnedRole: "action"
      }),
      makeChoice({
        id: "keep-distance",
        label: "Сохранить дистанцию",
        cardId: "2-cups",
        orientation: "upright",
        xp: 1,
        buttonNote: "Границы",
        summaryOverride: "Дистанция полезна, когда она не разрушает контакт.",
        adviceOverride: "Сохрани границу и не обрывай связь полностью.",
        tone: "thought",
        feedback: "Шут остаётся в контакте и бережёт свои границы.",
        lesson: "Граница и связь могут работать вместе."
      })
    ],
    resultText: "Дорожная встреча укрепляет навык взаимности.",
    lessonText: "Тёплая связь делает путь устойчивее.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "emperor-4-pentacles",
    type: "minor-event",
    sourceStepId: "emperor-4-pentacles",
    minorCardId: "4-pentacles",
    locationTitle: "Проверка опоры",
    locationText: "Когда опора уже есть, важно не превратить её в зажим.",
    narratorText: "Четыре Пентакля проверяют баланс между порядком и гибкостью.",
    speakerName: "Четыре Пентакля",
    speakerRole: "Дорожное событие",
    dialogueLines: [
      makeLine("arcana", "Держать бережно — не значит держать мёртвой хваткой.", "4 Пентаклей"),
      makeLine("fool", "Я сохраню опору, не замораживая движение.", "Шут")
    ],
    foolThought: "Опора нужна для движения, а не вместо него.",
    choices: [
      makeChoice({
        id: "order-resources",
        label: "Упорядочить ресурсы",
        cardId: "4-pentacles",
        orientation: "upright",
        xp: 2,
        buttonNote: "Ресурсный каркас",
        summaryOverride: "Порядок снижает хаос и поддерживает темп.",
        adviceOverride: "Оставь только рабочую опору, убрав лишний контроль.",
        tone: "resource",
        feedback: "Шут укрепляет ресурс и не зажимает маршрут.",
        lesson: "Порядок полезен, когда он живой.",
        earnedCardId: "4-pentacles",
        earnedRole: "resource"
      }),
      makeChoice({
        id: "cling-tight",
        label: "Сжать покрепче",
        cardId: "4-pentacles",
        orientation: "upright",
        xp: 1,
        buttonNote: "Страх потери",
        summaryOverride: "Жёсткий контроль быстро превращает опору в тормоз.",
        adviceOverride: "Ослабь хватку там, где страх притворяется дисциплиной.",
        tone: "thought",
        feedback: "Шут видит, как зажим крадёт гибкость.",
        lesson: "Контроль без доверия сужает путь."
      })
    ],
    resultText: "Короткая проверка учит бережной устойчивости.",
    lessonText: "Опора и гибкость должны идти рядом.",
    nextStepLabel: "Продолжить историю"
  }),
  makeScene({
    id: "hierophant-page-swords",
    type: "minor-event",
    sourceStepId: "hierophant-page-swords",
    minorCardId: "page-swords",
    helperCardId: "page-swords",
    locationTitle: "Новый вопрос",
    locationText: "После урока приходит короткий сигнал: время для точного вопроса.",
    narratorText: "Паж Мечей приносит свежий угол зрения.",
    speakerName: "Паж Мечей",
    speakerRole: "Дорожное событие и помощник",
    dialogueLines: [
      makeLine("helper", "Сформулируй вопрос короче, чем привычка сомневаться.", "Паж Мечей"),
      makeLine("fool", "Я задам вопрос прямо и без лишних украшений.", "Шут")
    ],
    foolThought: "Иногда один точный вопрос меняет весь маршрут.",
    helperText: "Паж Мечей показывает, как короткая ясность разрезает туман.",
    choices: [
      makeChoice({
        id: "write-note",
        label: "Сделать заметку",
        cardId: "page-swords",
        orientation: "upright",
        xp: 2,
        buttonNote: "Зафиксировать сигнал",
        summaryOverride: "Записанный сигнал легче превратить в действие.",
        adviceOverride: "Поймай мысль короткой фразой без усложнения.",
        tone: "thought",
        feedback: "Шут фиксирует сигнал, пока он ещё живой.",
        lesson: "Короткая фиксация сохраняет ясность.",
        earnedCardId: "page-swords",
        earnedRole: "lesson",
        helperCardId: "page-swords"
      }),
      makeChoice({
        id: "ask-directly",
        label: "Спросить прямо",
        cardId: "page-swords",
        orientation: "upright",
        xp: 1,
        buttonNote: "Честный вопрос",
        summaryOverride: "Прямой вопрос экономит путь к ответу.",
        adviceOverride: "Спроси одну вещь так, чтобы на неё можно было ответить честно.",
        tone: "action",
        feedback: "Шут выбирает прямоту и сокращает путь до сути.",
        lesson: "Ясный вопрос — тоже действие."
      })
    ],
    resultText: "Паж Мечей укрепляет привычку к точному вопросу.",
    lessonText: "Честная формулировка ускоряет обучение в пути.",
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

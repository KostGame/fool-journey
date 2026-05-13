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

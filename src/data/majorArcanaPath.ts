import type { TarotCard, StoryChapter, StoryEncounter } from "../domain/models";

export interface MajorArcanaStep {
  card: TarotCard;
  chapter: StoryChapter;
  encounter: StoryEncounter;
}

export const majorArcanaPath = [
  {
    card: {
      id: "fool",
      name: "Шут",
      group: "major",
      keywords: ["первый шаг", "свобода", "доверие", "путь"],
      lightMeaning: "открытость к дороге, лёгкость и готовность учиться в движении",
      shadowMeaning: "хаос, поспешность и риск не заметить край тропы",
      advice: "сделай один маленький шаг и не требуй от себя полного плана",
      warning: "не подменяй смелость беспечностью",
      dailyMeaning: "сегодня полезно выбрать простое действие, которое запускает движение",
      questionToSelf: "какой первый шаг уже достаточно честный, чтобы его можно было сделать сегодня?",
      storyRole: "threshold"
    },
    chapter: {
      id: "chapter-fool",
      title: "Порог Шута",
      cardId: "fool",
      summary: "Первая глава знакомит с дорогой, где важны доверие, движение и мягкая смелость.",
      prompt: "Как войти в новый этап без лишней тяжести?",
      encounterId: "fool-threshold"
    },
    encounter: {
      id: "fool-threshold",
      chapterId: "chapter-fool",
      title: "Порог пути",
      situation:
        "Ты стоишь у края тропы. За спиной шум привычек, впереди пустая дорога и ощущение, что этот шаг немного важнее, чем кажется.",
      question: "Как Шут входит в новый этап без лишней тяжести?",
      positionTitle: "Порог",
      choices: [
        {
          id: "fool-step",
          label: "Сделать первый шаг",
          cardId: "fool",
          orientation: "upright",
          xp: 2,
          buttonNote: "Шут: доверие к первому движению",
          summaryOverride:
            "Шут в этой позиции напоминает: путь открывается не через идеальный план, а через первый честный шаг.",
          adviceOverride: "Сделай одно маленькое действие и посмотри, как отзовётся дорога."
        },
        {
          id: "fool-breathe",
          label: "Собрать лёгкость",
          cardId: "fool",
          orientation: "upright",
          xp: 2,
          buttonNote: "Шут: взять с собой только нужное",
          summaryOverride:
            "Шут советует не перегружать старт. Иногда лучший шаг — взять только то, что уже есть под рукой.",
          adviceOverride: "Выбери один доступный ресурс и доверься его простоте."
        }
      ]
    }
  },
  {
    card: {
      id: "magician",
      name: "Маг",
      group: "major",
      keywords: ["инструменты", "воля", "фокус", "действие"],
      lightMeaning: "собранность, ясная цель и умение превратить намерение в действие",
      shadowMeaning: "распыление, манипуляция и обещания без формы",
      advice: "назови, чем ты уже располагаешь, и начни работать с этим",
      warning: "не путай эффектность с мастерством",
      dailyMeaning: "сегодня полезно собрать ресурсы в один понятный список",
      questionToSelf: "что уже лежит у меня на столе, но ещё не названо своим именем?",
      storyRole: "tool"
    },
    chapter: {
      id: "chapter-magician",
      title: "Мастерская Мага",
      cardId: "magician",
      summary: "Вторая глава про сборку намерения, языка и действий в одну ясную форму.",
      prompt: "Что помогает собрать волю в форму?",
      encounterId: "magician-workshop"
    },
    encounter: {
      id: "magician-workshop",
      chapterId: "chapter-magician",
      title: "Стол инструментов",
      situation:
        "На столе Мага лежат заметки, инструменты и полуготовые планы. Важно не расплескать внимание и выбрать, что именно превратить в действие.",
      question: "Как Маг собирает намерение в форму?",
      positionTitle: "Инструменты",
      choices: [
        {
          id: "magician-gather",
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
          id: "magician-act",
          label: "Начать сразу",
          cardId: "magician",
          orientation: "upright",
          xp: 2,
          buttonNote: "Маг: действие уже возможно",
          summaryOverride:
            "Маг показывает, что ясное действие лучше долгого ожидания идеального момента.",
          adviceOverride: "Выбери одно действие, которое уже можно сделать сегодня."
        }
      ]
    }
  },
  {
    card: {
      id: "high-priestess",
      name: "Жрица",
      group: "major",
      keywords: ["тишина", "тайна", "наблюдение", "интуиция"],
      lightMeaning: "глубина, внутреннее знание и способность услышать то, что ещё не оформилось",
      shadowMeaning: "молчание, которое прячет ответ, и туман вместо ясности",
      advice: "пауза нужна не для отмены шага, а для точности шага",
      warning: "не перепутай интуицию со страхом",
      dailyMeaning: "сегодня полезно на минуту замедлиться и заметить скрытый слой",
      questionToSelf: "что я уже чувствую, но пока не решаюсь признать вслух?",
      storyRole: "oracle"
    },
    chapter: {
      id: "chapter-priestess",
      title: "Сад Жрицы",
      cardId: "high-priestess",
      summary: "Третья глава core loop про паузу, наблюдение и внутренний слух.",
      prompt: "Как услышать скрытый слой ответа?",
      encounterId: "priestess-garden"
    },
    encounter: {
      id: "priestess-garden",
      chapterId: "chapter-priestess",
      title: "Тихая вода",
      situation:
        "После усилия Мага шум стихает. Остаются вода, зеркало и тонкая грань между знанием и догадкой.",
      question: "Как услышать ответ, который ещё не оформился?",
      positionTitle: "Тишина",
      choices: [
        {
          id: "priestess-listen",
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
          id: "priestess-name",
          label: "Назвать увиденное",
          cardId: "high-priestess",
          orientation: "upright",
          xp: 2,
          buttonNote: "Жрица: дать ответу созреть",
          summaryOverride:
            "Жрица напоминает: не каждое знание нужно сразу выкладывать словами.",
          adviceOverride: "Собери одно короткое предложение, которое удержит твоё понимание."
        }
      ]
    }
  },
  {
    card: {
      id: "empress",
      name: "Императрица",
      group: "major",
      keywords: ["рост", "плод", "забота", "изобилие"],
      lightMeaning: "плодородие, забота и естественный рост того, что получило внимание",
      shadowMeaning: "избыточность, зависимость от комфорта и расплывчатая опека",
      advice: "поддержи то, что уже растёт, не торопя его",
      warning: "не путай заботу с чрезмерным контролем",
      dailyMeaning: "сегодня полезно вложить внимание в одно живое дело",
      questionToSelf: "что во мне или вокруг меня просит бережного роста?",
      storyRole: "growth"
    },
    chapter: {
      id: "chapter-empress",
      title: "Сад Императрицы",
      cardId: "empress",
      summary: "Третья по счёту глава учит растить смысл, а не только двигаться вперёд.",
      prompt: "Что стоит взрастить сейчас?",
      encounterId: "empress-garden"
    },
    encounter: {
      id: "empress-garden",
      chapterId: "chapter-empress",
      title: "Земля и рост",
      situation:
        "Тропа входит в плодородный сад. Всё вокруг просит внимания, воды и терпения, чтобы не перепутать рост с суетой.",
      question: "Как Императрица поддерживает жизнь без лишней спешки?",
      positionTitle: "Рост",
      choices: [
        {
          id: "empress-water",
          label: "Полить росток",
          cardId: "empress",
          orientation: "upright",
          xp: 2,
          buttonNote: "Императрица: поддержать рост",
          summaryOverride:
            "Императрица напоминает, что внимание и забота помогают делу дозреть естественно.",
          adviceOverride: "Поддержи один живой процесс и не требуй мгновенного результата."
        },
        {
          id: "empress-give-space",
          label: "Дать место",
          cardId: "empress",
          orientation: "upright",
          xp: 2,
          buttonNote: "Императрица: пространство тоже забота",
          summaryOverride:
            "Императрица учит: иногда лучшая забота — не мешать тому, что уже растёт.",
          adviceOverride: "Сними лишнее давление и позволь росту идти своим ритмом."
        }
      ]
    }
  },
  {
    card: {
      id: "emperor",
      name: "Император",
      group: "major",
      keywords: ["опора", "форма", "порядок", "границы"],
      lightMeaning: "ясная структура, ответственность и спокойная сила опоры",
      shadowMeaning: "жёсткость, подавление и контроль ради контроля",
      advice: "поставь простую рамку, которая помогает делу держаться",
      warning: "не превращай порядок в клетку",
      dailyMeaning: "сегодня полезно навести ясность в одном вопросе",
      questionToSelf: "где нужна опора, а где уже достаточно свободы?",
      storyRole: "structure"
    },
    chapter: {
      id: "chapter-emperor",
      title: "Крепость Императора",
      cardId: "emperor",
      summary: "Глава о форме, границах и спокойной ответственности.",
      prompt: "Как поставить опору без жёсткости?",
      encounterId: "emperor-fortress"
    },
    encounter: {
      id: "emperor-fortress",
      chapterId: "chapter-emperor",
      title: "Каменный порядок",
      situation:
        "Перед тобой простая крепость. Она держится не силой, а тем, что у каждой вещи есть своё место.",
      question: "Как Император создаёт порядок, который не душит?",
      positionTitle: "Граница",
      choices: [
        {
          id: "emperor-build",
          label: "Поставить рамку",
          cardId: "emperor",
          orientation: "upright",
          xp: 2,
          buttonNote: "Император: ясная опора",
          summaryOverride:
            "Император показывает: порядок становится поддержкой, когда он прост и понятен.",
          adviceOverride: "Определи одну границу и удержи её спокойно."
        },
        {
          id: "emperor-rule",
          label: "Слишком ужесточить",
          cardId: "emperor",
          orientation: "upright",
          xp: 2,
          buttonNote: "Император: не перегнуть опору",
          summaryOverride:
            "Император предупреждает: порядок теряет смысл, если в нём не остаётся воздуха.",
          adviceOverride: "Оставь в системе место для живого движения."
        }
      ]
    }
  },
  {
    card: {
      id: "hierophant",
      name: "Иерофант",
      group: "major",
      keywords: ["традиция", "учение", "смысл", "передача"],
      lightMeaning: "знание, которое передаётся через форму, урок и общий язык",
      shadowMeaning: "слепое следование правилу без понимания его смысла",
      advice: "спроси, какой урок здесь действительно передаётся",
      warning: "не путай традицию с привычкой",
      dailyMeaning: "сегодня полезно вспомнить правило, которое помогает тебе жить проще",
      questionToSelf: "какой смысл я хочу сохранить, а не просто повторить?",
      storyRole: "teacher"
    },
    chapter: {
      id: "chapter-hierophant",
      title: "Урок Иерофанта",
      cardId: "hierophant",
      summary: "Здесь карта говорит о знании, которое становится опорой через урок и ритуал.",
      prompt: "Как закрепить смысл в форме?",
      encounterId: "hierophant-hall"
    },
    encounter: {
      id: "hierophant-hall",
      chapterId: "chapter-hierophant",
      title: "Зал урока",
      situation:
        "В зале тихо, как перед началом урока. Важнее не повторить слова, а понять, какой смысл они несут.",
      question: "Какой урок Иерофант помогает услышать?",
      positionTitle: "Передача",
      choices: [
        {
          id: "hierophant-ask",
          label: "Спросить о смысле",
          cardId: "hierophant",
          orientation: "upright",
          xp: 2,
          buttonNote: "Иерофант: урок через вопрос",
          summaryOverride:
            "Иерофант помогает не заучить форму, а понять, зачем она нужна.",
          adviceOverride: "Сформулируй один вопрос, который действительно проясняет правило."
        },
        {
          id: "hierophant-repeat",
          label: "Повторить ритуал",
          cardId: "hierophant",
          orientation: "upright",
          xp: 2,
          buttonNote: "Иерофант: форма удерживает смысл",
          summaryOverride:
            "Иерофант напоминает: привычный ритуал работает, когда ты понимаешь его внутреннюю логику.",
          adviceOverride: "Повтори полезную форму осознанно, а не автоматически."
        }
      ]
    }
  },
  {
    card: {
      id: "lovers",
      name: "Влюблённые",
      group: "major",
      keywords: ["выбор", "союз", "резонанс", "сердце"],
      lightMeaning: "выбор, который соединяет ценности, желание и живой отклик",
      shadowMeaning: "раздвоение, компромисс ради страха и чужая воля вместо своей",
      advice: "выбери то, что действительно звучит в тебе",
      warning: "не принимай удобство за близость к себе",
      dailyMeaning: "сегодня полезно заметить, где выбор поддерживает тебя, а где уводит от себя",
      questionToSelf: "какой выбор на самом деле мой, а какой просто выглядит правильным?",
      storyRole: "choice"
    },
    chapter: {
      id: "chapter-lovers",
      title: "Развилка Влюблённых",
      cardId: "lovers",
      summary: "Глава о выборе, который соединяет сердце, ценности и действие.",
      prompt: "Какой союз или выбор действительно твой?",
      encounterId: "lovers-crossroads"
    },
    encounter: {
      id: "lovers-crossroads",
      chapterId: "chapter-lovers",
      title: "Выбор сердца",
      situation:
        "Перед тобой две дороги. Одна обещает безопасность, другая требует честности с собой.",
      question: "Как Влюблённые помогают выбрать без самообмана?",
      positionTitle: "Союз",
      choices: [
        {
          id: "lovers-heart",
          label: "Слушать сердце",
          cardId: "lovers",
          orientation: "upright",
          xp: 2,
          buttonNote: "Влюблённые: резонанс важен",
          summaryOverride:
            "Влюблённые учат: верный выбор ощущается как согласие внутри, а не только как удобство снаружи.",
          adviceOverride: "Выбери то, что поддерживает твоё живое согласие."
        },
        {
          id: "lovers-balance",
          label: "Сравнить варианты",
          cardId: "lovers",
          orientation: "upright",
          xp: 2,
          buttonNote: "Влюблённые: сравнение тоже помогает",
          summaryOverride:
            "Влюблённые напоминают: полезно увидеть, где выбор совпадает с твоими ценностями.",
          adviceOverride: "Сверь решение с тем, что для тебя по-настоящему важно."
        }
      ]
    }
  },
  {
    card: {
      id: "chariot",
      name: "Колесница",
      group: "major",
      keywords: ["движение", "курс", "воля", "управление"],
      lightMeaning: "собранное движение, где воля и направление идут в одном курсе",
      shadowMeaning: "рывок без курса, упрямство и стремление нестись вместо движения",
      advice: "выбери направление и держи его спокойно",
      warning: "не путай скорость с управлением",
      dailyMeaning: "сегодня полезно отметить один ясный курс и не распыляться",
      questionToSelf: "куда я действительно хочу вести своё движение?",
      storyRole: "movement"
    },
    chapter: {
      id: "chapter-chariot",
      title: "Дорога Колесницы",
      cardId: "chariot",
      summary: "Карта учит держать курс, когда движение уже началось.",
      prompt: "Как удержать направление?",
      encounterId: "chariot-road"
    },
    encounter: {
      id: "chariot-road",
      chapterId: "chapter-chariot",
      title: "Курс вперёд",
      situation:
        "Дорога ускоряется. Всё вокруг зовёт либо рвануть вперёд, либо потерять курс в шуме движения.",
      question: "Как Колесница помогает не потерять направление?",
      positionTitle: "Курс",
      choices: [
        {
          id: "chariot-hold",
          label: "Держать курс",
          cardId: "chariot",
          orientation: "upright",
          xp: 2,
          buttonNote: "Колесница: держать курс",
          summaryOverride:
            "Колесница напоминает: сила движения раскрывается, когда курс ясен и не дрожит.",
          adviceOverride: "Сохраняй одно направление и не распыляй внимание."
        },
        {
          id: "chariot-dash",
          label: "Погнаться за скоростью",
          cardId: "chariot",
          orientation: "upright",
          xp: 2,
          buttonNote: "Колесница: скорость без курса",
          summaryOverride:
            "Колесница предупреждает: быстрый рывок не заменяет ясного управления.",
          adviceOverride: "Замедлись ровно настолько, чтобы снова увидеть путь."
        }
      ]
    }
  },
  {
    card: {
      id: "strength",
      name: "Сила",
      group: "major",
      keywords: ["мягкость", "мужество", "терпение", "приручение"],
      lightMeaning: "спокойная мощь, которая удерживает себя мягкостью, а не нажимом",
      shadowMeaning: "давление, подавление импульса и борьба с собственной природой",
      advice: "успокой силу, чтобы она стала союзником",
      warning: "не ломай то, что можно приручить",
      dailyMeaning: "сегодня полезно ответить мягко там, где хочется нажать",
      questionToSelf: "как удержать силу, не подавив живое?",
      storyRole: "strength"
    },
    chapter: {
      id: "chapter-strength",
      title: "Тихая Сила",
      cardId: "strength",
      summary: "Глава о том, как мягкость удерживает мощь и делает её полезной.",
      prompt: "Как мягкость удерживает силу?",
      encounterId: "strength-lion"
    },
    encounter: {
      id: "strength-lion",
      chapterId: "chapter-strength",
      title: "Лев и ладонь",
      situation:
        "Перед тобой не враг, а живая сила, которую нельзя победить нажимом. Её нужно успокоить и понять.",
      question: "Как Сила проявляется без грубого давления?",
      positionTitle: "Мягкость",
      choices: [
        {
          id: "strength-soothe",
          label: "Успокоить дыханием",
          cardId: "strength",
          orientation: "upright",
          xp: 2,
          buttonNote: "Сила: мягкая рука",
          summaryOverride:
            "Сила показывает, что уважительное отношение к напряжению помогает его приручить.",
          adviceOverride: "Сначала успокой внутренний импульс, потом действуй."
        },
        {
          id: "strength-force",
          label: "Нажать сильнее",
          cardId: "strength",
          orientation: "upright",
          xp: 2,
          buttonNote: "Сила: не давить на силу",
          summaryOverride:
            "Сила предупреждает: прямое давление часто только усиливает сопротивление.",
          adviceOverride: "Сохрани твёрдость, но убери лишний нажим."
        }
      ]
    }
  },
  {
    card: {
      id: "hermit",
      name: "Отшельник",
      group: "major",
      keywords: ["поиск", "фонарь", "зрелость", "тишина"],
      lightMeaning: "вдумчивый поиск, который освещает путь изнутри",
      shadowMeaning: "изоляция, недоверие к миру и потеря связи с людьми",
      advice: "смотри не дальше одного шага, но внимательно",
      warning: "не прячься в одиночество от самого вопроса",
      dailyMeaning: "сегодня полезно убрать шум и увидеть один честный ориентир",
      questionToSelf: "что я увижу, если пойду медленнее, но внимательнее?",
      storyRole: "lantern"
    },
    chapter: {
      id: "chapter-hermit",
      title: "Тропа Отшельника",
      cardId: "hermit",
      summary: "Глава про зрелый поиск, который не спешит, но светит точно.",
      prompt: "Что нужно осветить в одиночестве?",
      encounterId: "hermit-path"
    },
    encounter: {
      id: "hermit-path",
      chapterId: "chapter-hermit",
      title: "Фонарь в тумане",
      situation:
        "Тропа уводит в тихий туман. Здесь не нужен громкий ответ, нужен честный свет на один следующий шаг.",
      question: "Как Отшельник помогает не заблудиться?",
      positionTitle: "Свет",
      choices: [
        {
          id: "hermit-seek",
          label: "Идти с фонарём",
          cardId: "hermit",
          orientation: "upright",
          xp: 2,
          buttonNote: "Отшельник: свет на шаг",
          summaryOverride:
            "Отшельник напоминает: достаточно увидеть следующий шаг, чтобы идти уверенно.",
          adviceOverride: "Освети ближайшее, а не всё сразу."
        },
        {
          id: "hermit-hide",
          label: "Спрятаться в туман",
          cardId: "hermit",
          orientation: "upright",
          xp: 2,
          buttonNote: "Отшельник: не терять связь",
          summaryOverride:
            "Отшельник предупреждает: одиночество полезно, пока не превращается в отказ от пути.",
          adviceOverride: "Не теряй контакт с целью, даже если идёшь в тишине."
        }
      ]
    }
  },
  {
    card: {
      id: "wheel-of-fortune",
      name: "Колесо Фортуны",
      group: "major",
      keywords: ["поворот", "цикл", "шанс", "изменение"],
      lightMeaning: "естественная смена цикла, которая приносит новый шанс",
      shadowMeaning: "ощущение случайности, когда ты перестаёшь видеть закономерность",
      advice: "заметь поворот и подстройся, а не замирай",
      warning: "не цепляйся за старую фазу, если колесо уже повернулось",
      dailyMeaning: "сегодня полезно заметить один повторяющийся цикл и как он меняется",
      questionToSelf: "какой поворот уже начался, даже если я его ещё не признал?",
      storyRole: "turn"
    },
    chapter: {
      id: "chapter-wheel-of-fortune",
      title: "Колесо Фортуны",
      cardId: "wheel-of-fortune",
      summary: "Глава учит замечать смену цикла и не бороться с движением жизни.",
      prompt: "Как принять смену цикла?",
      encounterId: "wheel-turn"
    },
    encounter: {
      id: "wheel-turn",
      chapterId: "chapter-wheel-of-fortune",
      title: "Поворот",
      situation:
        "Колесо делает оборот, и старая уверенность внезапно становится новой возможностью.",
      question: "Как отреагировать на поворот цикла?",
      positionTitle: "Поворот",
      choices: [
        {
          id: "wheel-ride",
          label: "Сесть на ход",
          cardId: "wheel-of-fortune",
          orientation: "upright",
          xp: 2,
          buttonNote: "Колесо: вместе с циклом",
          summaryOverride:
            "Колесо Фортуны показывает: удача лучше раскрывается, когда ты подстраиваешься к ритму перемен.",
          adviceOverride: "Прими смену фазы и используй её как опору."
        },
        {
          id: "wheel-resist",
          label: "Удержать старое",
          cardId: "wheel-of-fortune",
          orientation: "upright",
          xp: 2,
          buttonNote: "Колесо: не застывать",
          summaryOverride:
            "Колесо Фортуны предупреждает: прежняя фаза уже ушла, если ты пытаешься удержать её руками.",
          adviceOverride: "Отпусти старую инерцию и посмотри, что открывается."
        }
      ]
    }
  },
  {
    card: {
      id: "justice",
      name: "Справедливость",
      group: "major",
      keywords: ["мера", "весы", "честность", "баланс"],
      lightMeaning: "точная мера, ясность и выбор, который выдерживает проверку",
      shadowMeaning: "формальная правота без живой правды и холодная оценка",
      advice: "взвесь факты и не подменяй меру эмоцией",
      warning: "не делай вид, что справедливость равна строгости",
      dailyMeaning: "сегодня полезно назвать одну вещь честно и без лишнего украшения",
      questionToSelf: "что здесь требует честной меры, а не удобного оправдания?",
      storyRole: "balance"
    },
    chapter: {
      id: "chapter-justice",
      title: "Зал Справедливости",
      cardId: "justice",
      summary: "Глава о мере, честности и ясном балансе.",
      prompt: "Что здесь требует точной меры?",
      encounterId: "justice-scales"
    },
    encounter: {
      id: "justice-scales",
      chapterId: "chapter-justice",
      title: "Весы и мера",
      situation:
        "В зале тихо звенят весы. Здесь не нужно громко править мир, нужно назвать его точно и без перекосов.",
      question: "Как Справедливость помогает увидеть меру?",
      positionTitle: "Мера",
      choices: [
        {
          id: "justice-weigh",
          label: "Взвесить честно",
          cardId: "justice",
          orientation: "upright",
          xp: 2,
          buttonNote: "Справедливость: честный вес",
          summaryOverride:
            "Справедливость учит: ясная мера снимает лишний туман с решения.",
          adviceOverride: "Скажи вслух, что здесь правда, а что только удобная версия."
        },
        {
          id: "justice-avoid",
          label: "Уйти от ответа",
          cardId: "justice",
          orientation: "upright",
          xp: 2,
          buttonNote: "Справедливость: не обходить меру",
          summaryOverride:
            "Справедливость предупреждает: уклонение от меры оставляет вопрос открытым и тяжёлым.",
          adviceOverride: "Не прячь решение за формальностью."
        }
      ]
    }
  },
  {
    card: {
      id: "hanged-man",
      name: "Повешенный",
      group: "major",
      keywords: ["пауза", "новый взгляд", "отпускание", "сдвиг"],
      lightMeaning: "готовность остановиться и увидеть ситуацию иначе",
      shadowMeaning: "застревание, жертвенность без смысла и отказ от движения",
      advice: "позволь картине перевернуться в голове",
      warning: "не путай паузу с бессилием",
      dailyMeaning: "сегодня полезно задержаться на мгновение и посмотреть иначе",
      questionToSelf: "что меняется, если я перестану давить на ситуацию?",
      storyRole: "suspension"
    },
    chapter: {
      id: "chapter-hanged-man",
      title: "Пауза Повешенного",
      cardId: "hanged-man",
      summary: "Глава учит видеть сдвиг смысла через паузу и новый угол зрения.",
      prompt: "Что видно, если остановиться?",
      encounterId: "hanged-man-pause"
    },
    encounter: {
      id: "hanged-man-pause",
      chapterId: "chapter-hanged-man",
      title: "Другой ракурс",
      situation:
        "Мир ненадолго замирает. То, что казалось тупиком, может оказаться полезной паузой для нового взгляда.",
      question: "Как Повешенный меняет угол зрения?",
      positionTitle: "Пауза",
      choices: [
        {
          id: "hanged-man-pause",
          label: "Остановиться",
          cardId: "hanged-man",
          orientation: "upright",
          xp: 2,
          buttonNote: "Повешенный: пауза ради смысла",
          summaryOverride:
            "Повешенный напоминает: остановка может открыть то, чего не видно в рывке.",
          adviceOverride: "Сделай паузу и позволь смыслу перестроиться."
        },
        {
          id: "hanged-man-struggle",
          label: "Вырываться",
          cardId: "hanged-man",
          orientation: "upright",
          xp: 2,
          buttonNote: "Повешенный: не торопить сдвиг",
          summaryOverride:
            "Повешенный предупреждает: сопротивление паузе часто только усиливает напряжение.",
          adviceOverride: "Не трать силы на борьбу с моментом остановки."
        }
      ]
    }
  },
  {
    card: {
      id: "death",
      name: "Смерть",
      group: "major",
      keywords: ["переход", "завершение", "обновление", "очищение"],
      lightMeaning: "естественное завершение, которое открывает место для нового",
      shadowMeaning: "страх конца и попытка удержать то, что уже завершилось",
      advice: "отпусти завершённое, чтобы не нести его лишним грузом",
      warning: "не превращай переход в драму, если он уже назрел",
      dailyMeaning: "сегодня полезно закрыть один устаревший хвост",
      questionToSelf: "что уже завершилось и просит быть отпущенным?",
      storyRole: "transformation"
    },
    chapter: {
      id: "chapter-death",
      title: "Переход Смерти",
      cardId: "death",
      summary: "Глава о завершении, которое не пугает, а освобождает место.",
      prompt: "Что пора отпустить, чтобы началось новое?",
      encounterId: "death-gate"
    },
    encounter: {
      id: "death-gate",
      chapterId: "chapter-death",
      title: "Старый слой",
      situation:
        "Перед тобой закрытая дверь. Она не угрожает, а просто напоминает, что какой-то слой уже отслужил своё.",
      question: "Как Смерть помогает завершить без лишней тяжести?",
      positionTitle: "Переход",
      choices: [
        {
          id: "death-release",
          label: "Отпустить старое",
          cardId: "death",
          orientation: "upright",
          xp: 3,
          buttonNote: "Смерть: завершение открывает новое",
          summaryOverride:
            "Смерть учит: ясное завершение освобождает энергию для следующего шага.",
          adviceOverride: "Признай, что этап закончен, и не тащи его дальше."
        },
        {
          id: "death-cling",
          label: "Держаться за старое",
          cardId: "death",
          orientation: "upright",
          xp: 2,
          buttonNote: "Смерть: не задерживать переход",
          summaryOverride:
            "Смерть предупреждает: удержание завершённого только замедляет обновление.",
          adviceOverride: "Отпусти то, что уже не несёт тебе жизни."
        }
      ]
    }
  },
  {
    card: {
      id: "temperance",
      name: "Умеренность",
      group: "major",
      keywords: ["мера", "смешение", "мост", "течение"],
      lightMeaning: "спокойное соединение разных сил без потери ритма",
      shadowMeaning: "разбалансированность, усталость и потеря золотой середины",
      advice: "смешивай мягко и слушай, как реагирует целое",
      warning: "не спеши смешать всё в одно без меры",
      dailyMeaning: "сегодня полезно сгладить крайность и вернуть меру",
      questionToSelf: "что может соединиться без лишнего усилия?",
      storyRole: "balance"
    },
    chapter: {
      id: "chapter-temperance",
      title: "Мост Умеренности",
      cardId: "temperance",
      summary: "Глава о том, как соединить разное без потери внутреннего ритма.",
      prompt: "Как соединить несхожее без потери меры?",
      encounterId: "temperance-bridge"
    },
    encounter: {
      id: "temperance-bridge",
      chapterId: "chapter-temperance",
      title: "Смешение потоков",
      situation:
        "На мосту встречаются два потока. Если спешить, они спорят; если слушать, возникает новый ритм.",
      question: "Как Умеренность соединяет разное?",
      positionTitle: "Мера",
      choices: [
        {
          id: "temperance-blend",
          label: "Смешать осторожно",
          cardId: "temperance",
          orientation: "upright",
          xp: 2,
          buttonNote: "Умеренность: мягкий мост",
          summaryOverride:
            "Умеренность напоминает: соединение работает, когда ты не теряешь чувство меры.",
          adviceOverride: "Собери процесс медленно и проверь, не нарушен ли ритм."
        },
        {
          id: "temperance-spill",
          label: "Смешать всё сразу",
          cardId: "temperance",
          orientation: "upright",
          xp: 2,
          buttonNote: "Умеренность: не терять ритм",
          summaryOverride:
            "Умеренность предупреждает: слишком резкое смешение сбивает поток и качество формы.",
          adviceOverride: "Сбавь темп и вернись к спокойной мере."
        }
      ]
    }
  },
  {
    card: {
      id: "devil",
      name: "Дьявол",
      group: "major",
      keywords: ["цепи", "привычка", "искушение", "материя"],
      lightMeaning: "честное распознавание того, что держит слишком крепко",
      shadowMeaning: "зависимость, самообман и добровольные цепи привычки",
      advice: "назови цепь, чтобы увидеть её размер",
      warning: "не прикрывай привязанность красивым словом",
      dailyMeaning: "сегодня полезно заметить одну привычку, которая управляет тобой слишком сильно",
      questionToSelf: "что удерживает меня сильнее, чем я готов признать?",
      storyRole: "binding"
    },
    chapter: {
      id: "chapter-devil",
      title: "Тень Дьявола",
      cardId: "devil",
      summary: "Глава о привычках и цепях, которые можно увидеть только честно.",
      prompt: "Что держит слишком крепко?",
      encounterId: "devil-chains"
    },
    encounter: {
      id: "devil-chains",
      chapterId: "chapter-devil",
      title: "Цепи привычки",
      situation:
        "В тени заметны цепи, которые можно было не замечать из удобства. Здесь важна честность, а не осуждение.",
      question: "Как Дьявол помогает увидеть зависимость?",
      positionTitle: "Искушение",
      choices: [
        {
          id: "devil-name",
          label: "Назвать цепь",
          cardId: "devil",
          orientation: "upright",
          xp: 2,
          buttonNote: "Дьявол: увидеть связь",
          summaryOverride:
            "Дьявол помогает: признание цепи уже ослабляет её власть.",
          adviceOverride: "Назови привычку прямо и без украшения."
        },
        {
          id: "devil-deny",
          label: "Сделать вид, что всё нормально",
          cardId: "devil",
          orientation: "upright",
          xp: 2,
          buttonNote: "Дьявол: не прятать зависимость",
          summaryOverride:
            "Дьявол предупреждает: отрицание только продлевает влияние привычки.",
          adviceOverride: "Не отводи взгляд от того, что реально удерживает тебя."
        }
      ]
    }
  },
  {
    card: {
      id: "tower",
      name: "Башня",
      group: "major",
      keywords: ["разрушение", "пробуждение", "срыв", "освобождение"],
      lightMeaning: "внезапное очищение от ложной опоры и честное пробуждение",
      shadowMeaning: "шок, сопротивление и страх потерять привычную конструкцию",
      advice: "не цепляйся за то, что уже треснуло",
      warning: "не путай крушение иллюзии с крушением себя",
      dailyMeaning: "сегодня полезно отпустить то, что уже не держит",
      questionToSelf: "что во мне требует пересборки, даже если это неприятно?",
      storyRole: "break"
    },
    chapter: {
      id: "chapter-tower",
      title: "Удар Башни",
      cardId: "tower",
      summary: "Глава о честном разрушении ложной опоры и новом дыхании.",
      prompt: "Что освобождается, когда опора рушится?",
      encounterId: "tower-shock"
    },
    encounter: {
      id: "tower-shock",
      chapterId: "chapter-tower",
      title: "Треснувшая стена",
      situation:
        "Стена, на которую все опирались, вдруг трескается. Это неприятно, но уже невозможно назвать её надёжной.",
      question: "Как Башня помогает пережить крушение?",
      positionTitle: "Пробуждение",
      choices: [
        {
          id: "tower-step-out",
          label: "Сделать шаг в сторону",
          cardId: "tower",
          orientation: "upright",
          xp: 3,
          buttonNote: "Башня: выйти из разрушения",
          summaryOverride:
            "Башня показывает: когда старая форма рушится, свободный шаг в сторону спасает больше, чем попытка удержать стену.",
          adviceOverride: "Не держись за обломок, если он уже не опора."
        },
        {
          id: "tower-cling",
          label: "Держать стену",
          cardId: "tower",
          orientation: "upright",
          xp: 2,
          buttonNote: "Башня: не спорить с реальностью",
          summaryOverride:
            "Башня предупреждает: удержание рухнувшего только продлевает напряжение.",
          adviceOverride: "Позволь старой конструкции закончиться."
        }
      ]
    }
  },
  {
    card: {
      id: "star",
      name: "Звезда",
      group: "major",
      keywords: ["надежда", "ясность", "вдохновение", "вода"],
      lightMeaning: "спокойная надежда и чувство, что путь снова виден",
      shadowMeaning: "мечта без движения и ожидание чуда без участия",
      advice: "смотри на небо, но оставайся у воды",
      warning: "не растворяйся в мечте, забыв про шаг",
      dailyMeaning: "сегодня полезно заметить один источник тихой надежды",
      questionToSelf: "что возвращает мне веру без лишнего шума?",
      storyRole: "hope"
    },
    chapter: {
      id: "chapter-star",
      title: "Сад Звезды",
      cardId: "star",
      summary: "Глава о мягкой надежде, которая возвращает ясность после кризиса.",
      prompt: "Как вернуть надежду без спешки?",
      encounterId: "star-garden"
    },
    encounter: {
      id: "star-garden",
      chapterId: "chapter-star",
      title: "Ночная вода",
      situation:
        "После шума башни остаётся тихая вода и ясное небо. Здесь не надо доказывать, достаточно снова увидеть свет.",
      question: "Как Звезда возвращает надежду?",
      positionTitle: "Надежда",
      choices: [
        {
          id: "star-trust",
          label: "Довериться свету",
          cardId: "star",
          orientation: "upright",
          xp: 2,
          buttonNote: "Звезда: тихая надежда",
          summaryOverride:
            "Звезда напоминает: надежда не громкая, но она возвращает направление.",
          adviceOverride: "Заметь хотя бы один тёплый знак, который поддерживает тебя."
        },
        {
          id: "star-dim",
          label: "Погасить мечту",
          cardId: "star",
          orientation: "upright",
          xp: 2,
          buttonNote: "Звезда: не отказываться от света",
          summaryOverride:
            "Звезда предупреждает: если заранее выключить свет, путь снова станет неразличим.",
          adviceOverride: "Не спеши отказываться от надежды только из усталости."
        }
      ]
    }
  },
  {
    card: {
      id: "moon",
      name: "Луна",
      group: "major",
      keywords: ["сновидение", "неясность", "интуиция", "туман"],
      lightMeaning: "способность идти через неясность, доверяя чувствованию и памяти",
      shadowMeaning: "страх, самообман и потеря ориентира в собственных тенях",
      advice: "иди медленно и проверяй, что тебе действительно откликается",
      warning: "не принимай тревогу за интуицию",
      dailyMeaning: "сегодня полезно проверить, где ты додумываешь вместо того, чтобы чувствовать",
      questionToSelf: "что я вижу в тумане, а что просто дорисовываю?",
      storyRole: "dream"
    },
    chapter: {
      id: "chapter-moon",
      title: "Тропа Луны",
      cardId: "moon",
      summary: "Глава о дороге через туман, где важно различать чувство и страх.",
      prompt: "Как идти, когда путь неясен?",
      encounterId: "moon-path"
    },
    encounter: {
      id: "moon-path",
      chapterId: "chapter-moon",
      title: "Туман и следы",
      situation:
        "Ночь стала густой, и путь видно лишь фрагментами. Здесь легко принять тревогу за подсказку и наоборот.",
      question: "Как Луна помогает пройти через неясность?",
      positionTitle: "Туман",
      choices: [
        {
          id: "moon-feel",
          label: "Идти по ощущению",
          cardId: "moon",
          orientation: "upright",
          xp: 2,
          buttonNote: "Луна: чувствовать путь",
          summaryOverride:
            "Луна помогает довериться тихому ощущению, если не спешить с выводами.",
          adviceOverride: "Проверяй шаги и не торопи смысл."
        },
        {
          id: "moon-panic",
          label: "Поддаться тревоге",
          cardId: "moon",
          orientation: "upright",
          xp: 2,
          buttonNote: "Луна: тревога не равна истине",
          summaryOverride:
            "Луна предупреждает: страх легко подменяет ориентир, если ты ему веришь без проверки.",
          adviceOverride: "Остановись и отличи чувство от фантазии."
        }
      ]
    }
  },
  {
    card: {
      id: "sun",
      name: "Солнце",
      group: "major",
      keywords: ["ясность", "радость", "тепло", "простота"],
      lightMeaning: "ясная жизнь, где многое становится простым и тёплым",
      shadowMeaning: "ослепляющая самоуверенность и отказ видеть тень рядом со светом",
      advice: "покажи светлую сторону дела без лишнего пафоса",
      warning: "не путай ясность с вседозволенностью",
      dailyMeaning: "сегодня полезно назвать одну простую радость",
      questionToSelf: "что становится проще, когда я перестаю усложнять?",
      storyRole: "radiance"
    },
    chapter: {
      id: "chapter-sun",
      title: "Свет Солнца",
      cardId: "sun",
      summary: "Глава о ясности, тепле и живой простоте, которая приходит после тумана.",
      prompt: "Что становится ясным и живым?",
      encounterId: "sun-field"
    },
    encounter: {
      id: "sun-field",
      chapterId: "chapter-sun",
      title: "Тёплый день",
      situation:
        "Туман расступается, и мир вдруг становится простым. Свет не требует объяснений, только внимания и живого участия.",
      question: "Как Солнце раскрывает ясность?",
      positionTitle: "Свет",
      choices: [
        {
          id: "sun-share",
          label: "Поделиться светом",
          cardId: "sun",
          orientation: "upright",
          xp: 2,
          buttonNote: "Солнце: простая радость",
          summaryOverride:
            "Солнце учит: ясность лучше всего работает, когда её можно разделить с кем-то ещё.",
          adviceOverride: "Скажи о своём успехе просто и тепло."
        },
        {
          id: "sun-hide",
          label: "Спрятать радость",
          cardId: "sun",
          orientation: "upright",
          xp: 2,
          buttonNote: "Солнце: не прятать ясность",
          summaryOverride:
            "Солнце предупреждает: если закрыть свет, он не перестанет быть светом, но станет труднее жить.",
          adviceOverride: "Не бойся простоты, она не делает смысл меньше."
        }
      ]
    }
  },
  {
    card: {
      id: "judgment",
      name: "Суд",
      group: "major",
      keywords: ["зов", "пробуждение", "итог", "отклик"],
      lightMeaning: "момент, когда прошлое отзывается и зовёт к обновлённому действию",
      shadowMeaning: "самоосуждение, страх оценки и отказ ответить на зов",
      advice: "услышь зов и ответь честно",
      warning: "не путай пробуждение с наказанием",
      dailyMeaning: "сегодня полезно завершить старый отклик и открыть новый",
      questionToSelf: "на какой зов я давно готов ответить, но медлю?",
      storyRole: "reckoning"
    },
    chapter: {
      id: "chapter-judgment",
      title: "Зов Суда",
      cardId: "judgment",
      summary: "Глава о пробуждении, когда прошлое само зовёт к новому шагу.",
      prompt: "К чему ты готов отозваться сейчас?",
      encounterId: "judgment-call"
    },
    encounter: {
      id: "judgment-call",
      chapterId: "chapter-judgment",
      title: "Ответный голос",
      situation:
        "Издалека звучит зов, который трудно игнорировать. Это не приговор, а приглашение отозваться на собственную готовность.",
      question: "Как Суд помогает пробудиться?",
      positionTitle: "Отклик",
      choices: [
        {
          id: "judgment-answer",
          label: "Ответить на зов",
          cardId: "judgment",
          orientation: "upright",
          xp: 3,
          buttonNote: "Суд: услышать отклик",
          summaryOverride:
            "Суд показывает: ответ на зов завершает старый круг и открывает новый.",
          adviceOverride: "Ответь честно и без лишнего страха."
        },
        {
          id: "judgment-postpone",
          label: "Отложить отклик",
          cardId: "judgment",
          orientation: "upright",
          xp: 2,
          buttonNote: "Суд: не отдаляться от зова",
          summaryOverride:
            "Суд предупреждает: отклик, который всё время откладывают, со временем слышится только громче.",
          adviceOverride: "Не прячься от того, что уже зовёт."
        }
      ]
    }
  },
  {
    card: {
      id: "world",
      name: "Мир",
      group: "major",
      keywords: ["целостность", "завершение", "пространство", "танец"],
      lightMeaning: "целостность, когда путь собран и может быть прожит свободно",
      shadowMeaning: "боязнь завершить цикл и рассыпаться обратно в незавершённость",
      advice: "признай завершение и сделай шаг в целое",
      warning: "не отказывайся от целостности из страха перемен",
      dailyMeaning: "сегодня полезно завершить одно дело и заметить его целостность",
      questionToSelf: "что стало целым после пройденного пути?",
      storyRole: "integration"
    },
    chapter: {
      id: "chapter-world",
      title: "Круг Мира",
      cardId: "world",
      summary: "Финальная глава собирает путь в целостность и готовит место для следующего круга.",
      prompt: "Как собрать опыт в целое?",
      encounterId: "world-circle"
    },
    encounter: {
      id: "world-circle",
      chapterId: "chapter-world",
      title: "Завершение пути",
      situation:
        "Круг замыкается не как конец, а как полная форма, которая может снова открыться в новом цикле.",
      question: "Как Мир собирает весь путь в целое?",
      positionTitle: "Целостность",
      choices: [
        {
          id: "world-integrate",
          label: "Собрать опыт",
          cardId: "world",
          orientation: "upright",
          xp: 3,
          buttonNote: "Мир: целое уже здесь",
          summaryOverride:
            "Мир показывает: завершение превращает разрозненные шаги в целостный опыт.",
          adviceOverride: "Признай путь завершённым и удержи его целиком."
        },
        {
          id: "world-scatter",
          label: "Разбросать итог",
          cardId: "world",
          orientation: "upright",
          xp: 2,
          buttonNote: "Мир: не распадаться обратно",
          summaryOverride:
            "Мир предупреждает: если не собрать путь, его части снова распадутся в шум.",
          adviceOverride: "Не теряй собранность, когда цикл закрывается."
        }
      ]
    }
  }
] as const satisfies readonly MajorArcanaStep[];

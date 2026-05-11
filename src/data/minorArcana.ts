import type { MinorRank, MinorSuit, TarotCard } from "../domain/models";

export const minorSuits = ["wands", "cups", "swords", "pentacles"] as const;

export const minorRanks = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "page",
  "knight",
  "queen",
  "king"
] as const;

export interface MinorArcanaCard extends TarotCard {
  suit: MinorSuit;
  rank: MinorRank;
  elementMeaning: string;
  rankMeaning: string;
}

interface SuitDefinition {
  id: MinorSuit;
  name: string;
  keywords: readonly string[];
  elementMeaning: string;
  lightMeaning: string;
  shadowMeaning: string;
  advice: string;
  warning: string;
  dailyMeaning: string;
  questionToSelf: string;
  storyRole: string;
}

interface RankDefinition {
  id: MinorRank;
  name: string;
  keywords: readonly string[];
  rankMeaning: string;
  lightMeaning: string;
  shadowMeaning: string;
  advice: string;
  warning: string;
  dailyMeaning: string;
  questionToSelf: string;
  storyRole: string;
}

const suitData: Record<MinorSuit, SuitDefinition> = {
  wands: {
    id: "wands",
    name: "Жезлы",
    keywords: ["энергия", "импульс", "действие", "воля"],
    elementMeaning: "огонь импульса, движения и инициативы",
    lightMeaning: "энергия масти быстро превращает намерение в живое движение",
    shadowMeaning: "спешка, перегрев и выгорание сбивают ритм масти",
    advice: "выбери один импульс и дай ему разгореться",
    warning: "не сжигай внимание на одном всплеске",
    dailyMeaning: "сегодня полезно разогнать инерцию маленьким действием",
    questionToSelf: "какой импульс уже просится в движение?",
    storyRole: "impulse"
  },
  cups: {
    id: "cups",
    name: "Кубки",
    keywords: ["чувства", "связь", "настроение", "эмпатия"],
    elementMeaning: "вода чувств, отношений и внутреннего отклика",
    lightMeaning: "масть помогает услышать сердце и сохранить тёплый контакт",
    shadowMeaning: "размытые границы, переполнение и зависимость от настроения мешают ясности",
    advice: "заметь чувство и не спеши его обесценить",
    warning: "не путай заботу с растворением в другом",
    dailyMeaning: "сегодня полезно беречь живой контакт и не торопить эмоции",
    questionToSelf: "что сейчас на самом деле чувствует сердце?",
    storyRole: "feeling"
  },
  swords: {
    id: "swords",
    name: "Мечи",
    keywords: ["мысли", "слова", "ясность", "решение"],
    elementMeaning: "воздух мысли, речи и выбора",
    lightMeaning: "масть даёт ясный взгляд, точное слово и смелое решение",
    shadowMeaning: "жёсткость, тревога и ментальный шум режут пространство выбора",
    advice: "назови проблему прямо и коротко",
    warning: "не делай вывод раньше, чем увидишь картину целиком",
    dailyMeaning: "сегодня полезно очистить мысли от лишнего шума",
    questionToSelf: "какая мысль нуждается в честной формулировке?",
    storyRole: "clarity"
  },
  pentacles: {
    id: "pentacles",
    name: "Пентакли",
    keywords: ["тело", "ресурс", "быт", "устойчивость"],
    elementMeaning: "земля тела, денег, времени и результата",
    lightMeaning: "масть помогает собирать результат в устойчивую форму",
    shadowMeaning: "дефицит, цепкость и тяжёлая инерция забирают свободу",
    advice: "проверь опору, а не только идею",
    warning: "не удерживай ресурс ценой живого движения",
    dailyMeaning: "сегодня полезно навести порядок в одном практическом месте",
    questionToSelf: "какая опора сейчас действительно нужна?",
    storyRole: "stability"
  }
} as const;

const rankData: Record<MinorRank, RankDefinition> = {
  ace: {
    id: "ace",
    name: "Туз",
    keywords: ["начало", "зерно", "импульс", "сигнал"],
    rankMeaning: "первый искренний сигнал масти",
    lightMeaning: "даёт чистый старт и простую точку входа",
    shadowMeaning: "остаётся сырым импульсом без формы",
    advice: "заметь начало и не усложняй его",
    warning: "не откладывай зерно до идеального часа",
    dailyMeaning: "сегодня важно увидеть свежий сигнал",
    questionToSelf: "что только что попросило о старте?",
    storyRole: "seed"
  },
  "2": {
    id: "2",
    name: "Двойка",
    keywords: ["баланс", "выбор", "пара", "настройка"],
    rankMeaning: "баланс двух сил и первая настройка ритма",
    lightMeaning: "помогает удержать две стороны в одном движении",
    shadowMeaning: "колебание и зависание между вариантами",
    advice: "поставь две силы в один ритм",
    warning: "не зависай между да и нет",
    dailyMeaning: "сегодня важна тонкая настройка",
    questionToSelf: "что я сейчас балансирую?",
    storyRole: "balance"
  },
  "3": {
    id: "3",
    name: "Тройка",
    keywords: ["рост", "первые плоды", "взаимодействие", "движение"],
    rankMeaning: "первые плоды и расширение через контакт",
    lightMeaning: "даёт рост через обмен и поддержку",
    shadowMeaning: "рассеивание усилий и хрупкий результат",
    advice: "позволь делу выйти за пределы старта",
    warning: "не распыляй рост на лишние ветки",
    dailyMeaning: "сегодня полезно заметить первый результат",
    questionToSelf: "что уже начало приносить плод?",
    storyRole: "growth"
  },
  "4": {
    id: "4",
    name: "Четвёрка",
    keywords: ["опора", "структура", "рамка", "фиксация"],
    rankMeaning: "структура, которая удерживает форму",
    lightMeaning: "даёт безопасную рамку и спокойную опору",
    shadowMeaning: "зажим, застой и слишком жёсткая фиксация",
    advice: "поставь простую рамку для дела",
    warning: "не превращай опору в клетку",
    dailyMeaning: "сегодня полезно укрепить один устойчивый контур",
    questionToSelf: "какую опору пора сделать видимой?",
    storyRole: "structure"
  },
  "5": {
    id: "5",
    name: "Пятёрка",
    keywords: ["трение", "испытание", "напряжение", "сбой"],
    rankMeaning: "напряжение, которое проверяет устойчивость",
    lightMeaning: "показывает слабое место и зовёт к честной правке",
    shadowMeaning: "спор, потеря и излишняя борьба за контроль",
    advice: "прими трение как сигнал к перенастройке",
    warning: "не трать силы на лишний конфликт",
    dailyMeaning: "сегодня полезно увидеть узкое место без драматизации",
    questionToSelf: "что именно сейчас требует честной правки?",
    storyRole: "trial"
  },
  "6": {
    id: "6",
    name: "Шестёрка",
    keywords: ["восстановление", "обмен", "равновесие", "движение"],
    rankMeaning: "восстановление после напряжения",
    lightMeaning: "помогает вернуться к мягкому обмену и равновесию",
    shadowMeaning: "застревание в долгах, старых связях или чужом ритме",
    advice: "открой путь для обмена и движения",
    warning: "не замыкайся в старом напряжении",
    dailyMeaning: "сегодня полезно восстановить баланс через простой обмен",
    questionToSelf: "что помогает мне вернуться в равновесие?",
    storyRole: "restoration"
  },
  "7": {
    id: "7",
    name: "Семёрка",
    keywords: ["проверка", "стратегия", "защита", "выбор"],
    rankMeaning: "внутренний экзамен и проверка стратегии",
    lightMeaning: "даёт стойкость и точный выбор позиции",
    shadowMeaning: "оборонительная тревога и лишняя настороженность",
    advice: "выбери стратегию и держись её спокойно",
    warning: "не путай защиту с закрытостью",
    dailyMeaning: "сегодня полезно проверить, что именно ты защищаешь",
    questionToSelf: "какую позицию стоит удержать без напряжения?",
    storyRole: "test"
  },
  "8": {
    id: "8",
    name: "Восьмёрка",
    keywords: ["ритм", "дисциплина", "процесс", "ускорение"],
    rankMeaning: "ритм, повторение и ускорение процесса",
    lightMeaning: "учит двигаться через практику и повторение",
    shadowMeaning: "механичность, усталость и потеря живого смысла",
    advice: "повтори нужное действие без лишней драмы",
    warning: "не выжимай себя до пустоты",
    dailyMeaning: "сегодня полезно поддержать ритм, а не героизм",
    questionToSelf: "какой повтор сейчас даст лучший результат?",
    storyRole: "rhythm"
  },
  "9": {
    id: "9",
    name: "Девятка",
    keywords: ["зрелость", "предел", "опыт", "одиночество"],
    rankMeaning: "зрелость на границе нового цикла",
    lightMeaning: "даёт тихую уверенность и собранный опыт",
    shadowMeaning: "усталость, изоляция и закрытость от мира",
    advice: "признай накопленный опыт и не спеши дальше",
    warning: "не закрывайся от поддержки",
    dailyMeaning: "сегодня полезно уважить предел своих сил",
    questionToSelf: "что я уже умею по-настоящему?",
    storyRole: "maturity"
  },
  "10": {
    id: "10",
    name: "Десятка",
    keywords: ["завершение", "нагрузка", "итог", "переход"],
    rankMeaning: "завершение цикла и видимый итог",
    lightMeaning: "помогает собрать результат перед новым этапом",
    shadowMeaning: "перегрузка и ощущение, что ноша слишком тяжела",
    advice: "доведи цикл до конца и отпусти лишнее",
    warning: "не тащи старый груз в следующий круг",
    dailyMeaning: "сегодня полезно завершить одно дело до конца",
    questionToSelf: "что уже пора завершить без сожаления?",
    storyRole: "cycle"
  },
  page: {
    id: "page",
    name: "Паж",
    keywords: ["ученик", "первый контакт", "сигнал", "интерес"],
    rankMeaning: "первый контакт и живой интерес к новому",
    lightMeaning: "приносит свежий сигнал и готовность учиться",
    shadowMeaning: "наивность, суета и неустойчивое внимание",
    advice: "отнесись к новому как к учебному сообщению",
    warning: "не строй выводов на первом любопытстве",
    dailyMeaning: "сегодня полезно заметить один новый сигнал",
    questionToSelf: "что я только что узнал впервые?",
    storyRole: "apprentice"
  },
  knight: {
    id: "knight",
    name: "Рыцарь",
    keywords: ["движение", "риск", "темп", "вектор"],
    rankMeaning: "движение с выбранным вектором",
    lightMeaning: "даёт смелый темп и живой импульс к действию",
    shadowMeaning: "поспешность, рывок и потеря ориентира",
    advice: "двигайся смело, но не теряй курс",
    warning: "не разгоняйся сильнее смысла",
    dailyMeaning: "сегодня полезно сделать решительный, но не лишний шаг",
    questionToSelf: "куда именно я сейчас мчусь?",
    storyRole: "motion"
  },
  queen: {
    id: "queen",
    name: "Королева",
    keywords: ["внутреннее владение", "уверенность", "собранность", "зрелость"],
    rankMeaning: "зрелое внутреннее владение мастью",
    lightMeaning: "даёт спокойную силу и уверенное присутствие",
    shadowMeaning: "самодовольство, контроль и эмоциональная закрытость",
    advice: "держи центр внутри, а не снаружи",
    warning: "не путай уверенность с давлением",
    dailyMeaning: "сегодня полезно действовать из тихой уверенности",
    questionToSelf: "как я могу держать центр мягко и твёрдо?",
    storyRole: "mastery"
  },
  king: {
    id: "king",
    name: "Король",
    keywords: ["ответственность", "рамка", "управление", "зрелость"],
    rankMeaning: "внешняя рамка, ответственность и управление",
    lightMeaning: "помогает держать масштаб и отвечать за форму",
    shadowMeaning: "жёсткий контроль, власть ради власти и потеря гибкости",
    advice: "задай рамку и держи слово спокойно",
    warning: "не превращай управление в давление",
    dailyMeaning: "сегодня полезно взять ответственность за один результат",
    questionToSelf: "за что я готов отвечать уже сейчас?",
    storyRole: "authority"
  }
} as const;

function buildMinorArcanaCard(suit: MinorSuit, rank: MinorRank): MinorArcanaCard {
  const suitDefinition = suitData[suit];
  const rankDefinition = rankData[rank];

  return {
    id: `${rank}-${suit}`,
    name: `${rankDefinition.name} ${suitDefinition.name}`,
    group: "minor",
    suit,
    rank,
    keywords: [...suitDefinition.keywords, ...rankDefinition.keywords],
    elementMeaning: suitDefinition.elementMeaning,
    rankMeaning: rankDefinition.rankMeaning,
    lightMeaning: `${rankDefinition.lightMeaning}. ${suitDefinition.lightMeaning}`,
    shadowMeaning: `${rankDefinition.shadowMeaning}. ${suitDefinition.shadowMeaning}`,
    advice: `${rankDefinition.advice}. ${suitDefinition.advice}`,
    warning: `${rankDefinition.warning}. ${suitDefinition.warning}`,
    dailyMeaning: `${suitDefinition.dailyMeaning}. ${rankDefinition.dailyMeaning}`,
    questionToSelf: `${rankDefinition.questionToSelf} ${suitDefinition.questionToSelf}`,
    storyRole: `${suitDefinition.storyRole}-${rankDefinition.storyRole}`
  };
}

export const minorArcanaCards: readonly MinorArcanaCard[] = minorSuits.flatMap((suit) =>
  minorRanks.map((rank) => buildMinorArcanaCard(suit, rank))
);

export function getMinorArcanaCard(cardId: string): MinorArcanaCard | undefined {
  return minorArcanaCards.find((card) => card.id === cardId);
}

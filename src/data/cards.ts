import type { TarotCard } from "../domain/models";

export const cards = [
  {
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
  {
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
  {
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
  }
] as const satisfies readonly TarotCard[];

export function getCard(cardId: string): TarotCard | undefined {
  return cards.find((card) => card.id === cardId);
}
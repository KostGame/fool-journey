import type { StoryChapter } from "../domain/models";

export const storyChapters = [
  {
    id: "chapter-fool",
    title: "Порог Шута",
    cardId: "fool",
    summary: "Первая глава знакомит с дорогой, где важны доверие, движение и мягкая смелость.",
    prompt: "Как войти в новый этап без лишней тяжести?",
    encounterId: "fool-threshold"
  },
  {
    id: "chapter-magician",
    title: "Мастерская Мага",
    cardId: "magician",
    summary: "Вторая глава про сборку намерения, языка и действий в одну ясную форму.",
    prompt: "Что помогает собрать волю в форму?",
    encounterId: "magician-workshop"
  },
  {
    id: "chapter-priestess",
    title: "Сад Жрицы",
    cardId: "high-priestess",
    summary: "Финальная глава core loop про паузу, наблюдение и внутренний слух.",
    prompt: "Как услышать скрытый слой ответа?",
    encounterId: "priestess-garden"
  }
] as const satisfies readonly StoryChapter[];

export function getStoryChapter(chapterId: string): StoryChapter | undefined {
  return storyChapters.find((chapter) => chapter.id === chapterId);
}

export function getPlayableChapter(): StoryChapter {
  return storyChapters[0];
}

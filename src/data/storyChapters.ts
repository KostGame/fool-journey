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
    title: "Инструменты Мага",
    cardId: "magician",
    summary: "Следующая глава будет про сборку намерения, языка и действий.",
    prompt: "Что помогает собрать волю в форму?",
    encounterId: null
  },
  {
    id: "chapter-priestess",
    title: "Тишина Жрицы",
    cardId: "high-priestess",
    summary: "Третья глава будущих обновлений будет про паузу, наблюдение и внутренний слух.",
    prompt: "Как услышать скрытый слой ответа?",
    encounterId: null
  }
] as const satisfies readonly StoryChapter[];

export function getStoryChapter(chapterId: string): StoryChapter | undefined {
  return storyChapters.find((chapter) => chapter.id === chapterId);
}

export function getPlayableChapter(): StoryChapter {
  return storyChapters[0];
}


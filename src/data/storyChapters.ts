import { majorArcanaPath } from "./majorArcanaPath";
import type { StoryChapter } from "../domain/models";

export const storyChapters: readonly StoryChapter[] = majorArcanaPath.map((step) => step.chapter);

export function getStoryChapter(chapterId: string): StoryChapter | undefined {
  return storyChapters.find((chapter) => chapter.id === chapterId);
}

export function getPlayableChapter(): StoryChapter {
  return storyChapters[0];
}

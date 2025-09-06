import type { Lesson } from "./types";
import { lesson1 } from "./lesson1";

export const lessons: Lesson[] = [lesson1];
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id);
}

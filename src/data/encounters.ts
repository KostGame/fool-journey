import { majorArcanaPath } from "./majorArcanaPath";
import type { StoryEncounter } from "../domain/models";

export const encounters: readonly StoryEncounter[] = majorArcanaPath.map((step) => step.encounter);

export function getEncounter(encounterId: string): StoryEncounter | undefined {
  return encounters.find((encounter) => encounter.id === encounterId);
}

export function getStartEncounter(): StoryEncounter {
  return encounters[0];
}

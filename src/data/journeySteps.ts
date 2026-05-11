import { encounters, getEncounter } from "./encounters";
import { minorArcanaEvents, getMinorArcanaEvent } from "./minorArcanaEvents";

export function getJourneyStepById(stepId: string) {
  return getEncounter(stepId) ?? getMinorArcanaEvent(stepId);
}

export function isJourneyStepId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    (encounters.some((encounter) => encounter.id === value) || minorArcanaEvents.some((event) => event.id === value))
  );
}

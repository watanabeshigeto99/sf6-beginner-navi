import type { AppData, Answers, RankedCharacter } from "@/types";

export function rankCharacters(
  appData: AppData,
  answers: Answers
): RankedCharacter[] {
  const { characters, diagnosis } = appData;

  const totals: Record<string, number> = {};
  for (const c of characters) totals[c.id] = 0;

  for (const q of diagnosis.questions) {
    if (!answers[q.id]) continue;
    const addMap = diagnosis.scoreYesOnly[q.id] ?? {};
    for (const [charId, add] of Object.entries(addMap)) {
      totals[charId] += add ?? 0;
    }
  }

  const ranked: RankedCharacter[] = characters.map((c) => ({
    id: c.id,
    name: c.name,
    concept: c.concept,
    score: totals[c.id]
  }));

  ranked.sort(
    (a, b) => b.score - a.score || a.name.localeCompare(b.name, "ja")
  );

  return ranked;
}

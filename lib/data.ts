import rawData from "@/data/characters.json";
import { AppDataSchema } from "@/lib/schema";
import type { AppDataValidated } from "@/lib/schema";
import type { Character } from "@/types";

function prettyZodError(e: unknown) {
  if (e && typeof e === "object" && "issues" in e) return e;
  return e;
}

export function getAppData(): AppDataValidated {
  const parsed = AppDataSchema.safeParse(rawData);

  if (!parsed.success) {
    // VS Code / ターミナルに「どこが壊れたか」を見やすく出す
    console.error("❌ characters.json スキーマエラー");
    console.error(parsed.error.format());
    throw new Error("characters.json がスキーマに一致しません（詳細はコンソールを見てください）");
  }

  return parsed.data;
}

export function getAllCharacters(): Character[] {
  return getAppData().characters;
}

export function getCharacterById(id: string): Character | undefined {
  return getAllCharacters().find((c) => c.id === id);
}




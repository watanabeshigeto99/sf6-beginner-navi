import { z } from "zod";

// 5つ技
export const MinimalKitItemSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  input: z.string().min(1),
  note: z.string().min(1)
});

// 勝ち筋
export const WinPlanSchema = z.object({
  baseRange: z.string().min(1),
  do3: z.array(z.string().min(1)).min(1),
  onHit: z.string().min(1),
  closeRule: z.string().min(1),
  farRule: z.string().min(1),
  vsJumps: z.string().min(1),
  ng: z.array(z.string().min(1)).min(1),
  goalWeek1: z.string().min(1)
});

// 試合中ナビ
export const MatchNavSchema = z.object({
  far: z.array(z.string().min(1)).min(1),
  mid: z.array(z.string().min(1)).min(1),
  close: z.array(z.string().min(1)).min(1),
  defense: z.array(z.string().min(1)).min(1)
});

// 7日
export const TrainingDaySchema = z.object({
  day: z.number().int().min(1),
  training: z.string().min(1),
  match: z.string().min(1),
  review: z.string().min(1)
});

// キャラ
export const CharacterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  concept: z.string().min(1),
  minimalKit: z.array(MinimalKitItemSchema).length(5),
  winPlan: WinPlanSchema,
  matchNav: MatchNavSchema,
  training7days: z.array(TrainingDaySchema).length(7),
  warnings: z.array(z.string().min(1)).min(1)
});

// 診断
export const DiagnosisQuestionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1)
});

export const DiagnosisSchema = z.object({
  questions: z.array(DiagnosisQuestionSchema).min(1),
  // QID -> { characterId: score }
  scoreYesOnly: z.record(z.string(), z.record(z.string(), z.number()))

});

// 全体
export const AppDataSchema = z.object({
  version: z.string().optional(),
  controlType: z.string().optional(),
  characters: z.array(CharacterSchema).min(1).superRefine((chars, ctx) => {
    const seen = new Set<string>();
    for (const c of chars) {
      if (seen.has(c.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `characters の id が重複しています: ${c.id}`
        });
      }
      seen.add(c.id);
    }
  }),
  diagnosis: DiagnosisSchema
});


export type AppDataValidated = z.infer<typeof AppDataSchema>;

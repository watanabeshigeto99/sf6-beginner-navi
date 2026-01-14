// 診断
export type DiagnosisQuestion = {
  id: string;
  text: string;
};

export type Diagnosis = {
  questions: DiagnosisQuestion[];
  scoreYesOnly: Record<string, Record<string, number>>;
};

// キャラ
export type MinimalKitItem = {
  key: string;
  label: string;
  input: string;
  note: string;
};

export type WinPlan = {
  baseRange: string;
  do3: string[];
  onHit: string;
  closeRule: string;
  farRule: string;
  vsJumps: string;
  ng: string[];
  goalWeek1: string;
};

export type MatchNav = {
  far: string[];
  mid: string[];
  close: string[];
  defense: string[];
};

export type TrainingDay = {
  day: number;
  training: string;
  match: string;
  review: string;
};

export type Character = {
  id: string;
  name: string;
  concept: string;
  emergencyLine: string;
  minimalKit: MinimalKitItem[];
  winPlan: WinPlan;
  matchNav: MatchNav;
  training7days: TrainingDay[];
  warnings: string[];
};

// アプリ全体
export type AppData = {
  characters: Character[];
  diagnosis: Diagnosis;
};

// 診断結果用
export type Answers = Record<string, boolean>;

export type RankedCharacter = {
  id: string;
  name: string;
  concept: string;
  score: number;
};

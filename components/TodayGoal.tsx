"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { Card, CardTitle, Divider } from "@/components/ui/Card";

type Day = { day: number; training: string; match: string; review: string };
type Progress = Record<number, boolean>;

function todayISO(): string {
  // ローカル日付で YYYY-MM-DD を作る（時差事故を避ける）
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function diffDays(fromISO: string, toISO: string): number {
  // YYYY-MM-DD を 00:00 として日数差を出す
  const [fy, fm, fd] = fromISO.split("-").map(Number);
  const [ty, tm, td] = toISO.split("-").map(Number);
  const from = new Date(fy, fm - 1, fd).getTime();
  const to = new Date(ty, tm - 1, td).getTime();
  return Math.floor((to - from) / (1000 * 60 * 60 * 24));
}

export default function TodayGoal({
  characterId,
  days
}: {
  characterId: string;
  days: Day[];
}) {
  const startKey = `sf6_start_${characterId}`;
  const progressKey = `sf6_training_${characterId}`;

  const [startDate, setStartDate] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>({});

  // 初回：開始日が無ければ今日にする
  useEffect(() => {
    const stored = localStorage.getItem(startKey);
    const start = stored ?? todayISO();
    if (!stored) localStorage.setItem(startKey, start);
    setStartDate(start);
  }, [startKey]);

  // 進捗読み込み
  useEffect(() => {
    const raw = localStorage.getItem(progressKey);
    if (!raw) return;
    try {
      setProgress(JSON.parse(raw));
    } catch {}
  }, [progressKey]);

  const today = useMemo(() => todayISO(), []);
  const dayIndex = useMemo(() => {
    if (!startDate) return 0;
    const offset = diffDays(startDate, today); // 0ならDay1
    const idx = Math.max(0, Math.min(6, offset));
    return idx;
  }, [startDate, today]);

  const day = days[dayIndex] ?? days[0];
  const done = !!progress[day.day];

  function toggleDone() {
    const next = { ...progress, [day.day]: !done };
    setProgress(next);
    localStorage.setItem(progressKey, JSON.stringify(next));
  }

  function resetWeek() {
    const t = todayISO();
    localStorage.setItem(startKey, t);
    setStartDate(t);
    // 進捗は消したいならここで消す（今回は任意）
  }

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <CardTitle>今日の目標（自動）</CardTitle>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span
            style={{
              fontSize: 12,
              border: "1px solid #ddd",
              borderRadius: 999,
              padding: "4px 10px",
              opacity: 0.8
            }}
          >
            Day {day.day} / 7
          </span>
          <Button variant="ghost" onClick={resetWeek}>
            週をリセット
          </Button>
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 20, fontWeight: 950, lineHeight: 1.35 }}>
        ✅ トレモ：{day.training}
      </div>

      <div style={{ marginTop: 8, fontSize: 16, lineHeight: 1.6 }}>
        <div><b>実戦：</b>{day.match}</div>
        <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>
          <b>振り返り：</b>{day.review}
        </div>
      </div>

      <Divider />

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Button onClick={toggleDone} full style={{ fontSize: 16, padding: "14px 16px", borderRadius: 14 }}>
          {done ? "✅ 今日の分は完了（取り消す）" : "⬜ 今日の分を完了にする"}
        </Button>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
        ※ 開始日はキャラごとに自動保存（{startDate ?? "..." }）
      </div>
    </Card>
  );
}

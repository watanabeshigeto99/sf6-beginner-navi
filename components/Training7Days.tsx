"use client";

import { useEffect, useState } from "react";

type Day = { day: number; training: string; match: string; review: string };
type Progress = Record<number, boolean>;

export default function Training7Days({
  characterId,
  days
}: {
  characterId: string;
  days: Day[];
}) {
  const key = `sf6_training_${characterId}`;
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (!raw) return;
    try {
      setProgress(JSON.parse(raw));
    } catch {}
  }, [key]);

  function toggle(day: number) {
    const next = { ...progress, [day]: !progress[day] };
    setProgress(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h2 style={{ marginTop: 0 }}>7日メニュー</h2>
        <span style={{ fontSize: 12, opacity: 0.7 }}>チェックは端末に保存</span>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {days.map((d) => (
          <div key={d.day} style={{ border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 900 }}>Day {d.day}</div>
              <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12 }}>
                <input
                  type="checkbox"
                  checked={!!progress[d.day]}
                  onChange={() => toggle(d.day)}
                />
                完了
              </label>
            </div>
            <div style={{ marginTop: 8 }}><b>トレモ：</b>{d.training}</div>
            <div style={{ marginTop: 6 }}><b>実戦：</b>{d.match}</div>
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}><b>振り返り：</b>{d.review}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

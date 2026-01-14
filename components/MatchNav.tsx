"use client";

import { useState } from "react";

type MatchNav = {
  far: string[];
  mid: string[];
  close: string[];
  defense: string[];
};

type Tab = "far" | "mid" | "close" | "defense";

const labels: Record<Tab, string> = {
  far: "遠い",
  mid: "中",
  close: "近い",
  defense: "守り"
};

export default function MatchNav({ matchNav }: { matchNav: MatchNav }) {
  const [tab, setTab] = useState<Tab>("mid");
  const lines = matchNav[tab];

  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>試合中ナビ（距離）</h2>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {(Object.keys(labels) as Tab[]).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: tab === k ? "#111" : "#fff",
              color: tab === k ? "#fff" : "#111",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            {labels[k]}
          </button>
        ))}
      </div>

      <ul style={{ marginTop: 12 }}>
        {lines.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </section>
  );
}

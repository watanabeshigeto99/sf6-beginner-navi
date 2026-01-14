"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAllCharacters, getCharacterById } from "@/lib/data";
import Container from "@/components/ui/Container";
import { Card, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TodayGoal from "@/components/TodayGoal";


type TabKey = "far" | "mid" | "close" | "defense";
const labels: Record<TabKey, string> = {
  far: "遠い",
  mid: "中",
  close: "近い",
  defense: "守り"
};

export default function MatchPage() {
  const params = useSearchParams();

  const initialId =
    params.get("id") ??
    (typeof window !== "undefined"
      ? localStorage.getItem("sf6_last_character_id")
      : null) ??
    "ryu";


  const characters = useMemo(() => getAllCharacters(), []);
  const [charId, setCharId] = useState(initialId);
  const [tab, setTab] = useState<TabKey>("mid");

    // ✅ STEP3：初回表示時＆変更時に保存
  useEffect(() => {
    if (charId) {
      localStorage.setItem("sf6_last_character_id", charId);
    }
  }, [charId]);


  const character = getCharacterById(charId);
  const nav = character?.matchNav;

  if (!character || !nav) {
    return (
      <Container>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950 }}>試合中ナビ</h1>
        <Card>キャラが見つかりません。</Card>
        <Link href="/"><Button variant="ghost">トップへ</Button></Link>
      </Container>
    );
  }

  const lines = nav[tab] ?? [];
  const headline = lines[0] ?? "（指示がありません）";
  const rest = lines.slice(1);

  return (
    <Container>
      {/* ヘッダー */}
      <div style={{ display: "grid", gap: 6 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950 }}>試合中ナビ</h1>
        <div style={{ opacity: 0.75 }}>
          片手で押せる大ボタン / まずは1行目だけ見る
        </div>
      </div>

      {/* キャラ選択（大きめ） */}
      <Card>
        <CardTitle>キャラ</CardTitle>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <select
            value={charId}
            onChange={(e) => {
              const id = e.target.value;
              setCharId(id);
              localStorage.setItem("sf6_last_character_id", id);
        }}

            style={{
              padding: "14px 12px",
              borderRadius: 12,
              border: "1px solid #ddd",
              fontSize: 16,
              fontWeight: 800,
              width: 260,
              maxWidth: "100%"
            }}
          >
            {characters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <Link href={`/character/${character.id}`}>
            <Button variant="ghost">キャラ詳細</Button>
          </Link>
        </div>
      </Card>

      <TodayGoal characterId={character.id} days={character.training7days} />


      {/* 距離タブ（大ボタン） */}
      <Card>
        <CardTitle>距離</CardTitle>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 10
          }}
        >
          {(Object.keys(labels) as TabKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: "16px 12px",
                borderRadius: 14,
                border: "1px solid #ddd",
                background: tab === k ? "#111" : "#fff",
                color: tab === k ? "#fff" : "#111",
                cursor: "pointer",
                fontWeight: 950,
                fontSize: 18
              }}
            >
              {labels[k]}
            </button>
          ))}
        </div>
      </Card>

      {/* ここが“試合中に見る本体” */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontSize: 14, opacity: 0.75 }}>
            {character.name} / {labels[tab]}
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText(lines.join("\n"))}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 800
            }}
          >
            コピー
          </button>
        </div>

        {/* 1行目：最重要（大きく太く） */}
        <div style={{ marginTop: 12, fontSize: 22, fontWeight: 950, lineHeight: 1.35 }}>
          ✅ {headline}
        </div>

        {/* 残り：補助 */}
        {rest.length > 0 && (
          <ul style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, paddingLeft: 18 }}>
            {rest.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}

        {/* 緊急ボタン：守りへ */}
        {tab !== "defense" && (
          <div style={{ marginTop: 14 }}>
            <Button full onClick={() => setTab("defense")}>
              🛡️ ピンチ → 守りを見る
            </Button>
          </div>
        )}
      </Card>

      {/* 下部ナビ */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/result"><Button variant="ghost">診断結果</Button></Link>
        <Link href="/"><Button variant="ghost">トップ</Button></Link>
      </div>
    </Container>
  );
}

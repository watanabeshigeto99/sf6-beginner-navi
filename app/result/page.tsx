"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAppData } from "@/lib/data";
import { rankCharacters } from "@/lib/diagnosis";
import Container from "@/components/ui/Container";
import { Card, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { Answers } from "@/types";

export default function ResultPage() {
  const appData = useMemo(() => getAppData(), []);
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("sf6_answers_v1");
    if (!raw) return setAnswers(null);
    try {
      setAnswers(JSON.parse(raw));
    } catch {
      setAnswers(null);
    }
  }, []);

  if (!answers) {
    return (
      <Container>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950 }}>診断結果</h1>
          <p style={{ marginTop: 6, opacity: 0.75 }}>
            回答データがありません。先に診断してください。
          </p>
        </div>

        <Link href="/diagnosis"><Button>診断へ行く</Button></Link>
      </Container>
    );
  }

  const ranked = rankCharacters(appData, answers);
  const top3 = ranked.slice(0, 3);
  const best = ranked[0];


  return (
    <Container>
      <div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950 }}>おすすめキャラ</h1>
        <Card>
  <CardTitle>まずやること（最短）</CardTitle>

  <div style={{ display: "grid", gap: 10 }}>
    <Link href={`/match?id=${best.id}`} style={{ textDecoration: "none" }}>
      <Button full style={{ fontSize: 16, padding: "14px 16px", borderRadius: 14 }}>
        ▶ 1位「{best.name}」で試合中ナビへ
      </Button>
    </Link>

    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Link href={`/character/${best.id}`}>
        <Button variant="ghost">キャラ詳細を見る</Button>
      </Link>

      <Link href="/diagnosis">
        <Button variant="ghost">診断を続ける</Button>
      </Link>
    </div>

    <div style={{ fontSize: 12, opacity: 0.75 }}>
      ※ 試合中は「1行目だけ見る」→ 迷いが消えます
    </div>
  </div>
</Card>

        <p style={{ marginTop: 6, opacity: 0.75 }}>
          まずは <b>1位のキャラを1週間固定</b> が一番上達が早いです。
        </p>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {top3.map((c, idx) => (
          <Link key={c.id} href={`/character/${c.id}`} style={{ textDecoration: "none" }}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ fontSize: 18, fontWeight: 950 }}>#{idx + 1} {c.name}</div>
                <div style={{ fontSize: 12, border: "1px solid #ddd", borderRadius: 999, padding: "4px 10px" }}>
                  score: {c.score}
                </div>
              </div>
              <div style={{ marginTop: 6, opacity: 0.8 }}>{c.concept}</div>
            </Card>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.removeItem("sf6_answers_v1");
            location.href = "/diagnosis";
          }}
        >
          もう一度診断
        </Button>

        <Link href="/"><Button variant="ghost">トップ</Button></Link>
      </div>
    </Container>
  );
}

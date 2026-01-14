"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAppData } from "@/lib/data";
import Container from "@/components/ui/Container";
import { Card, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DiagnosisPage() {
  const router = useRouter();
  const appData = useMemo(() => getAppData(), []);
  const questions = appData.diagnosis.questions;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const q = questions[index];

  function answer(value: boolean) {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);

    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      localStorage.setItem("sf6_answers_v1", JSON.stringify(next));
      router.push("/result");
    } else {
      setIndex(nextIndex);
    }
  }

  function reset() {
    setAnswers({});
    setIndex(0);
  }

  return (
    <Container>
      <div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950 }}>キャラ診断</h1>
        <p style={{ marginTop: 6, opacity: 0.75 }}>
          質問 {index + 1} / {questions.length}
        </p>
      </div>

      <Card>
        <CardTitle>{q.text}</CardTitle>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button onClick={() => answer(true)}>はい</Button>
          <Button variant="ghost" onClick={() => answer(false)}>いいえ</Button>
          <div style={{ flex: 1 }} />
          <Button variant="ghost" onClick={reset}>最初から</Button>
        </div>
      </Card>
    </Container>
  );
}

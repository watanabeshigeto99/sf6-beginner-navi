import Link from "next/link";
import { getCharacterById } from "@/lib/data";
import Container from "@/components/ui/Container";
import { Card, CardTitle, Divider } from "@/components/ui/Card";
import MinimalKit from "@/components/MinimalKit";
import WinPlan from "@/components/WinPlan";
import MatchNav from "@/components/MatchNav";
import Training7Days from "@/components/Training7Days";
import Button from "@/components/ui/Button";

export default async function CharacterPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = getCharacterById(id);

  if (!character) {
    return (
      <Container>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950 }}>キャラが見つかりません</h1>
          <p style={{ marginTop: 6, opacity: 0.75 }}>URLのIDが間違っている可能性があります。</p>
        </div>

        <Link href="/result"><Button>結果に戻る</Button></Link>
      </Container>
    );
  }

  return (
    <Container>
      {/* ヘッダー */}
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>{character.name}</h1>
            <p style={{ marginTop: 6, opacity: 0.75 }}>{character.concept}</p>
          </div>

          {/* どこにいても押せる：試合中ナビ */}
          <Link href={`/match?id=${character.id}`}>
            <Button style={{ fontSize: 16, padding: "14px 16px", borderRadius: 14 }}>
              ▶ 試合中ナビへ
            </Button>
          </Link>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/result"><Button variant="ghost">診断結果</Button></Link>
          <Link href="/diagnosis"><Button variant="ghost">診断やり直し</Button></Link>
          <Link href="/"><Button variant="ghost">トップ</Button></Link>
        </div>
      </div>

      {/* 注意 */}
      <Card>
        <CardTitle>注意（超重要）</CardTitle>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {character.warnings.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <Divider />

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/match?id=${character.id}`}>
            <Button full>🕹️ いますぐ試合中ナビを開く</Button>
          </Link>
        </div>
      </Card>

      {/* 最低限の技セット */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <CardTitle>最低限の技セット（5つだけ）</CardTitle>
          <Link href={`/match?id=${character.id}`}>
            <Button variant="ghost">試合中ナビ</Button>
          </Link>
        </div>
        <MinimalKit items={character.minimalKit} />
      </Card>

      {/* 勝ち筋 */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <CardTitle>勝ち筋（初心者用）</CardTitle>
          <Link href={`/match?id=${character.id}`}>
            <Button variant="ghost">試合中ナビ</Button>
          </Link>
        </div>
        <WinPlan winPlan={character.winPlan} />
      </Card>

      {/* 試合中ナビ（キャラ詳細内の簡易版） */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <CardTitle>試合中ナビ（簡易）</CardTitle>
          <Link href={`/match?id=${character.id}`}>
            <Button>▶ フル画面で開く</Button>
          </Link>
        </div>
        <p style={{ marginTop: 0, opacity: 0.75 }}>
          ※ 試合中はフル画面版が押しやすいです
        </p>
        <MatchNav matchNav={character.matchNav} />
      </Card>

      {/* 7日メニュー */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <CardTitle>7日メニュー</CardTitle>
          <Link href={`/match?id=${character.id}`}>
            <Button variant="ghost">試合中ナビ</Button>
          </Link>
        </div>
        <Training7Days characterId={character.id} days={character.training7days} />
      </Card>

      {/* フッター導線 */}
      <div style={{ display: "grid", gap: 10 }}>
        <Link href={`/match?id=${character.id}`}>
          <Button full style={{ fontSize: 16, padding: "14px 16px", borderRadius: 14 }}>
            ▶ 試合中ナビへ（片手用）
          </Button>
        </Link>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/result"><Button variant="ghost">結果に戻る</Button></Link>
          <Link href="/"><Button variant="ghost">トップ</Button></Link>
        </div>
      </div>
    </Container>
  );
}

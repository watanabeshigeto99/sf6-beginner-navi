import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>スト6 初心者ナビ</h1>
      <p>キャラ選び・練習・戦い方を迷わず進めるアプリ</p>

      <div style={{ marginTop: 16 }}>
        <Link href="/diagnosis">▶ 診断を始める</Link>
      </div>

      <ul style={{ marginTop: 16 }}>
        <li>① キャラ診断</li>
        <li>② 7日間の練習メニュー</li>
        <li>③ 試合中ナビ</li>
      </ul>
    </main>
  );
}

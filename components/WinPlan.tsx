export default function WinPlan({ winPlan }: { winPlan: any }) {
  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>勝ち筋（初心者用）</h2>
      <div style={{ display: "grid", gap: 8 }}>
        <div><b>基本距離：</b>{winPlan.baseRange}</div>
        <div>
          <b>やること3つ：</b>
          <ul>
            {winPlan.do3.map((t: string, i: number) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div><b>当たったらこれ：</b>{winPlan.onHit}</div>
        <div><b>近い時のルール：</b>{winPlan.closeRule}</div>
        <div><b>遠い時のルール：</b>{winPlan.farRule}</div>
        <div><b>相手が飛ぶなら：</b>{winPlan.vsJumps}</div>
        <div>
          <b>NG：</b>
          <ul>
            {winPlan.ng.map((t: string, i: number) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div><b>1週間目標：</b>{winPlan.goalWeek1}</div>
      </div>
    </section>
  );
}

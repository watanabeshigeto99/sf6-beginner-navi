export default function MinimalKit({
  items
}: {
  items: { key: string; label: string; input: string; note: string }[];
}) {
  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>最低限の技セット（5つだけ）</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((it) => (
          <div key={it.key} style={{ border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
            <div style={{ fontWeight: 800 }}>{it.label}</div>
            <div style={{ marginTop: 4 }}>{it.input}</div>
            <div style={{ marginTop: 4, opacity: 0.75, fontSize: 12 }}>{it.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

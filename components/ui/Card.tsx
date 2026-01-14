import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 14,
        padding: 16,
        background: "#fff",
        color: "#111"
      }}
    >
      {children}
    </section>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 10 }}>
      {children}
    </div>
  );
}

export function Divider() {
  return <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "14px 0" }} />;
}

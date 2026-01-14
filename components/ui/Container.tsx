import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 16,
        display: "grid",
        gap: 14,
        color: "#fff"
      }}
    >
      {children}
    </main>
  );
}

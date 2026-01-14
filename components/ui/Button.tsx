"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  full?: boolean;
};

export default function Button({ variant = "primary", full = false, ...props }: Props) {
  const base: React.CSSProperties = {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #ddd",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 14,
    width: full ? "100%" : undefined
  };

  const theme: Record<string, React.CSSProperties> = {
    primary: { background: "#111", color: "#fff", borderColor: "#111" },
    ghost: { background: "#fff", color: "#111" }
  };

  return <button {...props} style={{ ...base, ...theme[variant], ...(props.style ?? {}) }} />;
}

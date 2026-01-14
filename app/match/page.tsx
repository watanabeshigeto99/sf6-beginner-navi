import { Suspense } from "react";
import MatchClient from "./MatchClient";

export const dynamic = "force-dynamic"; // ✅ 事前レンダリング回避（安全）

export default function MatchPage() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>
      <MatchClient />
    </Suspense>
  );
}

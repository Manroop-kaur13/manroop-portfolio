"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { InvitationCard } from "@/components/landing/invitation-card";
import { LoadingScreen } from "@/components/loading/loading-screen";

/*
 * Keep the full WhatsApp portfolio out of the
 * initial landing-page JavaScript.
 */
const WhatsAppLayout = dynamic(
  () =>
    import(
      "@/components/whatsapp/whatsapp-layout"
    ).then((mod) => mod.WhatsAppLayout),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

type Stage =
  | "landing"
  | "loading"
  | "workspace";

export default function Home() {
  const [stage, setStage] =
    useState<Stage>("landing");

  useEffect(() => {
    if (stage !== "loading") return;

    const timer = window.setTimeout(() => {
      setStage("workspace");
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [stage]);

  if (stage === "loading") {
    return <LoadingScreen />;
  }

  if (stage === "workspace") {
    return <WhatsAppLayout />;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050606] px-6">
      {/* Background Glow */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[220px]" />
      </div>

      <InvitationCard
        onAccept={() => setStage("loading")}
      />
    </main>
  );
}
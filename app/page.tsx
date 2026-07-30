"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useState,
} from "react";

import { InvitationCard } from "@/components/landing/invitation-card";
import { LoadingScreen } from "@/components/loading/loading-screen";

const WhatsAppLayout = dynamic(
  () =>
    import(
      "@/components/whatsapp/whatsapp-layout"
    ).then(
      (mod) => mod.WhatsAppLayout
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

type Stage =
  | "landing"
  | "loading"
  | "workspace";

type PortfolioHistoryState =
  | {
      portfolioStage: "landing";
    }
  | {
      portfolioStage: "workspace";
      portfolioView: "list";
    };

export default function Home() {
  const [stage, setStage] =
    useState<Stage>("landing");

  /*
   * Mark initial history entry as landing.
   */
  useEffect(() => {
    const currentState =
      window.history.state ?? {};

    if (currentState.portfolioStage) {
      return;
    }

    const state: PortfolioHistoryState = {
      portfolioStage: "landing",
    };

    window.history.replaceState(
      {
        ...currentState,
        ...state,
      },
      ""
    );
  }, []);

  /*
   * Handle browser Back / iPhone swipe.
   */
  useEffect(() => {
    const handlePopState = (
      event: PopStateEvent
    ) => {
      const state =
        event.state as
          | PortfolioHistoryState
          | null;

      if (
        state?.portfolioStage ===
        "landing"
      ) {
        setStage("landing");
        return;
      }

      if (
        state?.portfolioStage ===
        "workspace"
      ) {
        setStage("workspace");
      }
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  /*
   * Loading transition.
   */
  useEffect(() => {
    if (stage !== "loading") {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setStage("workspace");
      }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [stage]);

  /*
   * Accept Invitation.
   */
  const handleAccept = () => {
    sessionStorage.removeItem(
  "portfolio-mobile-typing-hint-shown"
);
    const state: PortfolioHistoryState = {
      portfolioStage: "workspace",
      portfolioView: "list",
    };

    window.history.pushState(
      state,
      ""
    );

    setStage("loading");
  };

  if (stage === "loading") {
    return <LoadingScreen />;
  }

  if (stage === "workspace") {
    return <WhatsAppLayout />;
  }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#050606] px-6 py-8">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.08] blur-[160px]" />
      </div>

      <InvitationCard
        onAccept={handleAccept}
      />
    </main>
  );
}
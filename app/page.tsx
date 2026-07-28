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
   * Mark the initial browser entry as
   * the Invitation screen.
   */
  useEffect(() => {
    const currentState =
      window.history.state ?? {};

    if (
      currentState.portfolioStage
    ) {
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
   * Handle browser Back / iPhone swipe
   * when returning from Chats to the
   * Invitation screen.
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
   *
   * Create a NEW history entry for
   * the workspace.
   *
   * Therefore:
   *
   * Invitation
   *      ↓
   * Chats
   *
   * and browser Back from Chats
   * returns to Invitation.
   */
  const handleAccept = () => {
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050606] px-6">
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[220px]" />
      </div>

      <InvitationCard
        onAccept={handleAccept}
      />
    </main>
  );
}
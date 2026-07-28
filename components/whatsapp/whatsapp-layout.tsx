"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Sidebar } from "./sidebar";
import { ChatWindow } from "./chat-window";
import { ThemeScreen } from "./theme-screen";
import { ProfileScreen } from "./profile-screen";

import type { FeatureType } from "./feature-nav";
import type { ChatType } from "@/types/chat";

type MobileViewState =
  | {
      portfolioView: "list";
    }
  | {
      portfolioView: "chat";
      chat: ChatType;
    }
  | {
      portfolioView: "feature";
      feature: FeatureType;
    };

export function WhatsAppLayout() {
  const [selectedChat, setSelectedChat] =
    useState<ChatType | null>(null);

  const [mobileChatOpen, setMobileChatOpen] =
    useState(false);

  const [openedTimes, setOpenedTimes] = useState<
    Partial<Record<ChatType, string>>
  >({});

  const [recentChats, setRecentChats] =
    useState<ChatType[]>([]);

  const [isReopeningChat, setIsReopeningChat] =
    useState(false);

  const [activeFeature, setActiveFeature] =
    useState<FeatureType | null>(null);

  /*
   * Prevent history initialization from running
   * more than once.
   */
  const historyInitialized = useRef(false);

  /*
   * Check whether we're currently on mobile.
   */
  const isMobile = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(
      "(max-width: 767px)"
    ).matches;
  }, []);

  /*
   * Initialize a portfolio "chat list" history
   * state when the workspace first opens.
   *
   * This does NOT create another history entry.
   * It labels the current entry so future chat
   * and feature entries can return here.
   */
  useEffect(() => {
    if (!isMobile()) {
      return;
    }

    if (historyInitialized.current) {
      return;
    }

    historyInitialized.current = true;

    const currentState =
      window.history.state ?? {};

    window.history.replaceState(
      {
        ...currentState,
        portfolioView: "list",
      } satisfies MobileViewState,
      ""
    );
  }, [isMobile]);

  /*
   * Handle browser Back and iPhone Safari/
   * Chrome edge-swipe navigation.
   */
  useEffect(() => {
    const handlePopState = (
      event: PopStateEvent
    ) => {
      if (!isMobile()) {
        return;
      }

      const state = event.state as
        | MobileViewState
        | null;

      /*
       * Back to main Chats screen.
       */
      if (
        !state ||
        state.portfolioView === "list"
      ) {
        setActiveFeature(null);
        setMobileChatOpen(false);
        return;
      }

      /*
       * Restore a chat if browser history
       * moves to a chat entry.
       */
      if (state.portfolioView === "chat") {
        setActiveFeature(null);
        setSelectedChat(state.chat);
        setMobileChatOpen(true);

        /*
         * It has already been opened if it exists
         * in browser history.
         */
        setIsReopeningChat(true);

        return;
      }

      /*
       * Restore Theme/Profile feature screen.
       */
      if (state.portfolioView === "feature") {
        setMobileChatOpen(false);
        setActiveFeature(state.feature);
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
  }, [isMobile]);

  /*
   * Open a portfolio chat.
   */
  const handleChatSelect = (
    chat: ChatType
  ) => {
    const alreadyOpened =
      Boolean(openedTimes[chat]);

    setIsReopeningChat(alreadyOpened);
    setSelectedChat(chat);
    setActiveFeature(null);

    /*
     * IMPORTANT:
     * Only a chat being opened for the FIRST
     * time moves to the top of Recent Chats.
     *
     * Reopening an existing chat keeps its
     * current position.
     */
    if (!alreadyOpened) {
      setRecentChats((prev) => [
        chat,
        ...prev.filter(
          (id) => id !== chat
        ),
      ]);
    }

    /*
     * Save first-open time only once.
     */
    if (!alreadyOpened) {
      const time =
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

      setOpenedTimes((prev) => ({
        ...prev,
        [chat]: time,
      }));
    }

    /*
     * Mobile:
     * create a browser-history entry for
     * this chat.
     *
     * Browser Back / iPhone swipe-back will
     * therefore return to the chat list.
     */
    if (isMobile()) {
      const state: MobileViewState = {
        portfolioView: "chat",
        chat,
      };

      window.history.pushState(
        state,
        ""
      );
    }

    setMobileChatOpen(true);
  };

  /*
   * Open Theme/Profile/etc.
   */
  const handleFeatureSelect = (
    feature: FeatureType
  ) => {
    setActiveFeature(feature);
    setMobileChatOpen(false);

    /*
     * Add feature screen to mobile history.
     */
    if (isMobile()) {
      const state: MobileViewState = {
        portfolioView: "feature",
        feature,
      };

      window.history.pushState(
        state,
        ""
      );
    }
  };

  /*
   * Chat header Back button.
   *
   * Mobile uses browser history so the same
   * navigation path works for:
   *
   * - header back arrow
   * - browser Back
   * - iPhone edge swipe
   */
  const handleMobileChatBack = () => {
    if (isMobile()) {
      window.history.back();
      return;
    }

    setMobileChatOpen(false);
  };

  /*
   * Theme/Profile Back button.
   */
  const handleFeatureBack = () => {
    if (isMobile()) {
      window.history.back();
      return;
    }

    setActiveFeature(null);
  };

  /*
   * Shared Sidebar.
   */
  const sidebar = (
    <Sidebar
      selectedChat={selectedChat}
      onSelect={handleChatSelect}
      onFeatureSelect={
        handleFeatureSelect
      }
      openedTimes={openedTimes}
      recentChats={recentChats}
    />
  );

  /*
   * Desktop right-side content.
   */
  const desktopContent =
    activeFeature === "theme" ? (
      <ThemeScreen
        onBack={handleFeatureBack}
      />
    ) : activeFeature === "profile" ? (
      <ProfileScreen
        onBack={handleFeatureBack}
      />
    ) : selectedChat ? (
     <ChatWindow
  chat={selectedChat}
  onBack={() => {}}
  isReopening={isReopeningChat}
  onFeatureSelect={handleFeatureSelect}
/>
    ) : (
      <main className="flex min-w-0 flex-1 items-center justify-center bg-[var(--wa-chat-bg)]">
        <div className="max-w-md px-8 text-center">
          <div className="mb-5 text-5xl">
            💬
          </div>

          <h2 className="text-2xl font-semibold text-[var(--wa-text-primary)]">
            Manroop&apos;s Portfolio
          </h2>

          <p className="mt-3 text-sm leading-6 text-[var(--wa-text-secondary)]">
            Select a chat to start
            exploring.
          </p>
        </div>
      </main>
    );

  return (
    <div className="h-[100dvh] min-h-[100dvh] overflow-hidden bg-[var(--wa-app-bg)]">
      {/* =========================
          DESKTOP
          ========================= */}

      <div className="hidden h-full md:flex">
        {sidebar}

        {desktopContent}
      </div>

      {/* =========================
          MOBILE
          ========================= */}

      <div className="h-full min-h-0 md:hidden">
        {activeFeature === "theme" ? (
          <ThemeScreen
            onBack={handleFeatureBack}
          />
        ) : activeFeature ===
          "profile" ? (
          <ProfileScreen
            onBack={handleFeatureBack}
          />
        ) : mobileChatOpen &&
          selectedChat ? (
         <ChatWindow
  chat={selectedChat}
  onBack={handleMobileChatBack}
  isReopening={isReopeningChat}
  onFeatureSelect={handleFeatureSelect}
/>
        ) : (
          sidebar
        )}
      </div>
    </div>
  );
}
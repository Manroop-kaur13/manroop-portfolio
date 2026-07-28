"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Sidebar } from "./sidebar";
import { ChatWindow } from "./chat-window";
import { ProfileScreen } from "./profile-screen";

import type { FeatureType } from "./feature-nav";
import type { ChatType } from "@/types/chat";

type MobileViewState =
  | {
      portfolioStage: "workspace";
      portfolioView: "list";
    }
  | {
      portfolioStage: "workspace";
      portfolioView: "chat";
      chat: ChatType;
    }
  | {
      portfolioStage: "workspace";
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

  const historyInitialized = useRef(false);

  const isMobile = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(
      "(max-width: 767px)"
    ).matches;
  }, []);

  /*
   * The workspace history entry is created by
   * app/page.tsx when Accept Invitation is pressed.
   *
   * Here we only make sure that the current
   * workspace entry is labelled as the chat list.
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
        portfolioStage: "workspace",
        portfolioView: "list",
      },
      ""
    );
  }, [isMobile]);

  /*
   * Browser Back / iPhone edge swipe.
   */
  useEffect(() => {
    const handlePopState = (
      event: PopStateEvent
    ) => {
      if (!isMobile()) {
        return;
      }

      const state =
        event.state as MobileViewState | null;

      /*
       * app/page.tsx handles returning from
       * workspace to the Invitation screen.
       */
      if (
        !state ||
        state.portfolioStage !== "workspace"
      ) {
        return;
      }

      /*
       * Chats list.
       */
      if (state.portfolioView === "list") {
        setActiveFeature(null);
        setMobileChatOpen(false);
        return;
      }

      /*
       * Chat.
       */
      if (state.portfolioView === "chat") {
        setActiveFeature(null);
        setSelectedChat(state.chat);
        setMobileChatOpen(true);
        setIsReopeningChat(true);

        return;
      }

      /*
       * Profile.
       */
      if (
        state.portfolioView === "feature"
      ) {
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
   * Open chat.
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
     * Only FIRST open moves the chat
     * to the top.
     */
    if (!alreadyOpened) {
      setRecentChats((prev) => [
        chat,
        ...prev.filter(
          (id) => id !== chat
        ),
      ]);

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

    if (isMobile()) {
      const state: MobileViewState = {
        portfolioStage: "workspace",
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
   * Profile.
   *
   * Theme is NOT handled here anymore.
   * FeatureNav toggles it directly.
   */
  const handleFeatureSelect = (
    feature: FeatureType
  ) => {
    setActiveFeature(feature);
    setMobileChatOpen(false);

    if (isMobile()) {
      const state: MobileViewState = {
        portfolioStage: "workspace",
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
   * Chat Back button.
   */
  const handleMobileChatBack = () => {
    if (isMobile()) {
      window.history.back();
      return;
    }

    setMobileChatOpen(false);
  };

  /*
   * Profile Back button.
   */
  const handleFeatureBack = () => {
    if (isMobile()) {
      window.history.back();
      return;
    }

    setActiveFeature(null);
  };

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
   * Desktop content.
   */
  const desktopContent =
    activeFeature === "profile" ? (
      <ProfileScreen
        onBack={handleFeatureBack}
      />
    ) : selectedChat ? (
      <ChatWindow
        chat={selectedChat}
        onBack={() => {}}
        isReopening={isReopeningChat}
        onFeatureSelect={
          handleFeatureSelect
        }
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
      {/* DESKTOP */}
      <div className="hidden h-full md:flex">
        {sidebar}

        {desktopContent}
      </div>

      {/* MOBILE */}
      <div className="h-full min-h-0 md:hidden">
        {activeFeature === "profile" ? (
          <ProfileScreen
            onBack={handleFeatureBack}
          />
        ) : mobileChatOpen &&
          selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onBack={
              handleMobileChatBack
            }
            isReopening={
              isReopeningChat
            }
            onFeatureSelect={
              handleFeatureSelect
            }
          />
        ) : (
          sidebar
        )}
      </div>
    </div>
  );
}
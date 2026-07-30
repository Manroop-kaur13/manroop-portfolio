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

  /*
   * Tracks when a chat was FIRST opened.
   *
   * Used for:
   * - recent chat ordering
   * - timestamps in sidebar
   *
   * IMPORTANT:
   * Opening a chat does NOT mean its
   * interaction has been completed.
   */
  const [openedTimes, setOpenedTimes] = useState<
    Partial<Record<ChatType, string>>
  >({});

  const [recentChats, setRecentChats] =
    useState<ChatType[]>([]);

  /*
   * Tracks whether the chat has been opened
   * before.
   *
   * This is separate from completedChats.
   */
  const [isReopeningChat, setIsReopeningChat] =
    useState(false);

  /*
   * A chat becomes completed only when its
   * recruiter interaction is actually sent/
   * completed.
   */
  const [completedChats, setCompletedChats] =
    useState<
      Partial<Record<ChatType, boolean>>
    >({});

  const [activeFeature, setActiveFeature] =
    useState<FeatureType | null>(null);

  /*
   * Mobile composer guide.
   *
   * This state lives here instead of inside
   * ChatWindow so changing/reopening chats
   * does not show the guide again.
   */
  const [mobileGuideShown, setMobileGuideShown] =
    useState(false);

  const handleMobileGuideShown =
    useCallback(() => {
      setMobileGuideShown(true);
    }, []);

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
   * Workspace history entry is created by
   * app/page.tsx when Accept Invitation
   * is pressed.
   *
   * Here we label that workspace entry as
   * the chat list.
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
       * app/page.tsx handles leaving the
       * workspace and returning to Invitation.
       */
      if (
        !state ||
        state.portfolioStage !== "workspace"
      ) {
        return;
      }

      /*
       * Main Chats list.
       */
      if (state.portfolioView === "list") {
        setActiveFeature(null);
        setMobileChatOpen(false);
        return;
      }

      /*
       * Restore chat.
       */
      if (state.portfolioView === "chat") {
        setActiveFeature(null);
        setSelectedChat(state.chat);
        setMobileChatOpen(true);

        /*
         * The chat has existed in history,
         * therefore it has been opened before.
         *
         * Whether its conversation was completed
         * is determined separately by
         * completedChats.
         */
        setIsReopeningChat(true);

        return;
      }

      /*
       * Restore Profile/feature.
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

    /*
     * Mobile browser history.
     */
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
   * Called by ChatWindow when the recruiter
   * has actually completed/sent the interaction.
   */
  const handleChatComplete = (
    chat: ChatType
  ) => {
    setCompletedChats((prev) => {
      if (prev[chat]) {
        return prev;
      }

      return {
        ...prev,
        [chat]: true,
      };
    });
  };

  /*
   * Profile / features.
   *
   * Theme continues to toggle directly
   * through FeatureNav / ChatWindow.
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
   * Chat header Back button.
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

  /*
   * Shared sidebar.
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
    activeFeature === "profile" ? (
      <ProfileScreen
        onBack={handleFeatureBack}
      />
    ) : selectedChat ? (
      <ChatWindow
        chat={selectedChat}
        onBack={() => {}}
        isReopening={isReopeningChat}
        isCompleted={
          Boolean(
            completedChats[selectedChat]
          )
        }
        onComplete={() =>
          handleChatComplete(
            selectedChat
          )
        }
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
            Select a chat to start exploring.
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
            isCompleted={
              Boolean(
                completedChats[
                  selectedChat
                ]
              )
            }
            onComplete={() =>
              handleChatComplete(
                selectedChat
              )
            }
            onFeatureSelect={
              handleFeatureSelect
            }
            showMobileGuide={
              !mobileGuideShown
            }
            onMobileGuideShown={
              handleMobileGuideShown
            }
          />
        ) : (
          sidebar
        )}
      </div>
    </div>
  );
}
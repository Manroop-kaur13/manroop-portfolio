"use client";

import { useState } from "react";

import { Sidebar } from "./sidebar";
import { ChatWindow } from "./chat-window";
import { ThemeScreen } from "./theme-screen";
import { ProfileScreen } from "./profile-screen";

import type { FeatureType } from "./feature-nav";
import type { ChatType } from "@/types/chat";

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

  /*
   * Header feature currently open.
   * Available features:
   * - Theme
   * - Profile
   */
  const [activeFeature, setActiveFeature] =
    useState<FeatureType | null>(null);

  /*
   * Open a portfolio chat.
   */
  const handleChatSelect = (chat: ChatType) => {
    const alreadyOpened = Boolean(openedTimes[chat]);

    setIsReopeningChat(alreadyOpened);
    setSelectedChat(chat);

    /*
     * Close Theme/Profile when opening a chat.
     */
    setActiveFeature(null);

    /*
     * Move the opened chat to the top.
     */
    setRecentChats((prev) => [
      chat,
      ...prev.filter((id) => id !== chat),
    ]);

    /*
     * Save the first-open time.
     */
    if (!alreadyOpened) {
      const time = new Date().toLocaleTimeString([], {
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
     * On mobile, switch from chat list
     * to the selected conversation.
     */
    setMobileChatOpen(true);
  };

  /*
   * Open Theme or Profile.
   */
  const handleFeatureSelect = (
    feature: FeatureType
  ) => {
    setActiveFeature(feature);

    /*
     * Feature screens replace the current
     * conversation on mobile.
     */
    setMobileChatOpen(false);
  };

  /*
   * Close Theme/Profile.
   */
  const handleFeatureBack = () => {
    setActiveFeature(null);
  };

  /*
   * Shared sidebar.
   */
  const sidebar = (
    <Sidebar
      selectedChat={selectedChat}
      onSelect={handleChatSelect}
      onFeatureSelect={handleFeatureSelect}
      openedTimes={openedTimes}
      recentChats={recentChats}
    />
  );

  /*
   * Right-side desktop content.
   */
  const desktopContent =
    activeFeature === "theme" ? (
      <ThemeScreen onBack={handleFeatureBack} />
    ) : activeFeature === "profile" ? (
      <ProfileScreen onBack={handleFeatureBack} />
    ) : selectedChat ? (
      <ChatWindow
        chat={selectedChat}
        onBack={() => {}}
        isReopening={isReopeningChat}
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
        {activeFeature === "theme" ? (
          <ThemeScreen
            onBack={handleFeatureBack}
          />
        ) : activeFeature === "profile" ? (
          <ProfileScreen
            onBack={handleFeatureBack}
          />
        ) : mobileChatOpen && selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onBack={() =>
              setMobileChatOpen(false)
            }
            isReopening={isReopeningChat}
          />
        ) : (
          sidebar
        )}
      </div>
    </div>
  );
}
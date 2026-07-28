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

  const [activeFeature, setActiveFeature] =
    useState<FeatureType | null>(null);

  const handleChatSelect = (chat: ChatType) => {
    const alreadyOpened = Boolean(openedTimes[chat]);

    setIsReopeningChat(alreadyOpened);
    setSelectedChat(chat);
    setActiveFeature(null);

   if (!alreadyOpened) {
  setRecentChats((prev) => [
    chat,
    ...prev.filter((id) => id !== chat),
  ]);
}

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

    setMobileChatOpen(true);
  };

  const handleFeatureSelect = (
    feature: FeatureType
  ) => {
    /*
     * Camera / Guided are no longer active features.
     */
    if (
      feature !== "theme" &&
      feature !== "profile"
    ) {
      return;
    }

    setActiveFeature(feature);
    setMobileChatOpen(false);
  };

  const handleFeatureBack = () => {
    setActiveFeature(null);
  };

  const handleMobileChatBack = () => {
    setMobileChatOpen(false);
  };

  const sidebar = (
    <Sidebar
      selectedChat={selectedChat}
      onSelect={handleChatSelect}
      onFeatureSelect={handleFeatureSelect}
      openedTimes={openedTimes}
      recentChats={recentChats}
    />
  );

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
        onFeatureSelect={handleFeatureSelect}
      />
    ) : (
      <main className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-[var(--wa-chat-bg)]">
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
    <div className="wa-app-shell bg-[var(--wa-app-bg)]">
      {/* Desktop */}
      <div className="hidden h-full min-h-0 md:flex">
        {sidebar}
        {desktopContent}
      </div>

      {/* Mobile */}
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
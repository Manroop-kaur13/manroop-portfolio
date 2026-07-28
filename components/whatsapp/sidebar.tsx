"use client";

import Image from "next/image";
import { Search, X } from "lucide-react";
import { useState } from "react";

import {
  FeatureNav,
  type FeatureType,
} from "./feature-nav";

import type { ChatType } from "@/types/chat";

interface SidebarProps {
  selectedChat: ChatType | null;
  onSelect: (chat: ChatType) => void;
  onFeatureSelect: (feature: FeatureType) => void;
  openedTimes: Partial<Record<ChatType, string>>;
  recentChats: ChatType[];
}

const chats: {
  id: ChatType;
  title: string;
  preview: string;
  avatar: string;
}[] = [
  {
    id: "about",
    title: "About Me",
    preview: "Hey there! 👋",
    avatar: "/images/avatars/about.jpg",
  },
  {
    id: "education",
    title: "Education",
    preview: "Academic Journey",
    avatar: "/images/avatars/education.jpg",
  },
  {
    id: "skills",
    title: "Skills",
    preview: "React • Next.js • Python • C++",
    avatar: "/images/avatars/skills.jpeg",
  },
  {
    id: "projects",
    title: "Projects",
    preview: "Driver Safety AI & more...",
    avatar: "/images/avatars/projects.jpg",
  },
  {
    id: "experience",
    title: "Experience",
    preview: "Roles • Internships • Impact",
    avatar: "/images/avatars/experience-avatar.jpg",
  },
  {
    id: "achievements",
    title: "Achievements",
    preview: "Hackathons • Awards • Leadership",
    avatar: "/images/avatars/achievements.jpg",
  },
  {
    id: "certificates",
    title: "Certificates",
    preview: "View all certifications",
    avatar: "/images/avatars/certificate.jpg",
  },
  {
    id: "resume",
    title: "Resume",
    preview: "Download Resume",
    avatar: "/images/avatars/resume.jpg",
  },
  {
    id: "contact",
    title: "Contact",
    preview: "Let's connect!",
    avatar: "/images/avatars/contact.jpeg",
  },
];

export function Sidebar({
  selectedChat,
  onSelect,
  onFeatureSelect,
  openedTimes,
  recentChats,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const orderedChats = [...chats].sort((a, b) => {
    const aIndex = recentChats.indexOf(a.id);
    const bIndex = recentChats.indexOf(b.id);

    if (aIndex === -1 && bIndex === -1) {
      return 0;
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });

  const filteredChats = orderedChats.filter((chat) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      chat.title.toLowerCase().includes(query) ||
      chat.preview.toLowerCase().includes(query) ||
      chat.id.toLowerCase().includes(query)
    );
  });

  return (
    <aside className="flex h-full w-full flex-col border-r border-[var(--wa-border)] bg-[var(--wa-sidebar-bg)] md:w-[380px] md:min-w-[380px]">
      {/* Header */}
      <div className="flex min-h-[72px] items-center justify-between gap-2 border-b border-[var(--wa-border)] px-4 py-3 sm:px-5">
        <h1 className="shrink-0 text-2xl font-bold tracking-tight text-[var(--wa-text-primary)]">
          Chats
        </h1>

        <FeatureNav onSelect={onFeatureSelect} />
      </div>

      {/* Search */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[var(--wa-search-bg)] px-4 py-3">
          <Search
            size={18}
            className="shrink-0 text-[var(--wa-text-secondary)]"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search"
            aria-label="Search chats"
            className="min-w-0 w-full bg-transparent text-base text-[var(--wa-text-primary)] outline-none placeholder:text-[var(--wa-text-secondary)]"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="shrink-0 text-[var(--wa-text-secondary)] transition hover:text-[var(--wa-text-primary)]"
            >
              <X size={17} />
            </button>
          )}
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const isAboutUnread =
            chat.id === "about" &&
            !openedTimes.about;

          return (
            <button
              key={chat.id}
              type="button"
              onClick={() => onSelect(chat.id)}
              className={`flex w-full items-center gap-3 border-b border-[var(--wa-border)] px-4 py-3 text-left transition-colors duration-200 sm:gap-4 sm:px-5 sm:py-4 ${
                selectedChat === chat.id
                  ? "bg-[var(--wa-selected-bg)]"
                  : "hover:bg-[var(--wa-hover-bg)]"
              }`}
            >
              {/* Avatar */}
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--wa-search-bg)] sm:h-14 sm:w-14">
                <Image
                  src={chat.avatar}
                  alt={`${chat.title} avatar`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`truncate text-[16px] tracking-tight text-[var(--wa-text-primary)] sm:text-[17px] ${
                      isAboutUnread
                        ? "font-bold"
                        : "font-semibold"
                    }`}
                  >
                    {chat.title}
                  </h3>

                  {isAboutUnread ? (
                    <span className="shrink-0 text-xs font-medium text-[var(--wa-green)]">
                      New
                    </span>
                  ) : (
                    <span className="shrink-0 text-xs text-[var(--wa-text-secondary)]">
                      {openedTimes[chat.id] ?? ""}
                    </span>
                  )}
                </div>

                <div className="mt-1 flex items-center justify-between gap-3">
                  <p
                    className={`min-w-0 truncate text-sm ${
                      isAboutUnread
                        ? "font-medium text-[var(--wa-text-primary)]"
                        : "text-[var(--wa-text-secondary)]"
                    }`}
                  >
                    {chat.preview}
                  </p>

                  {isAboutUnread && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#25D366] px-1.5 text-[11px] font-bold text-[#111B21]">
                      7
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {filteredChats.length === 0 && (
          <div className="px-6 py-10 text-center">
            <Search
              size={26}
              className="mx-auto mb-3 text-[var(--wa-text-secondary)]"
            />

            <p className="text-sm text-[var(--wa-text-secondary)]">
              No chats found
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
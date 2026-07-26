"use client";

import Image from "next/image";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Mail,
  ArrowLeft,
  MoreVertical,
  FileText,
} from "lucide-react";

import { SiLeetcode } from "react-icons/si";

import {
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import { projects } from "@/data/projects";
import { portfolio } from "@/data/portfolio";

import { MessageRenderer } from "./message-renderer";

import type { ChatType } from "@/types/chat";

interface Props {
  chat: ChatType;
  onBack: () => void;
  isReopening: boolean;
}

const chatAvatars: Record<ChatType, string> = {
  about: "/images/avatars/about.jpg",
  education: "/images/avatars/education.jpg",
  skills: "/images/avatars/skills.jpeg",
  projects: "/images/avatars/projects.jpg",
  experience: "/images/avatars/experience-avatar.jpg",
  achievements: "/images/avatars/achievements.jpg",
  certificates: "/images/avatars/certificate.jpg",
  resume: "/images/avatars/resume.jpg",
  contact: "/images/avatars/contact.jpeg",
};

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function ChatWindow({
  chat,
  onBack,
  isReopening,
}: Props) {
  const currentChat = portfolio[chat];

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [visibleMessages, setVisibleMessages] =
    useState(0);

  const [isTyping, setIsTyping] =
    useState(false);

  const [selectedProjectId, setSelectedProjectId] =
    useState<string | null>(null);

  const [messageTimes, setMessageTimes] = useState<
    Record<number, string>
  >({});

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const projectStartRef =
    useRef<HTMLDivElement | null>(null);

  const selectedProject = useMemo(
    () =>
      projects.find(
        (project) =>
          project.id === selectedProjectId
      ),
    [selectedProjectId]
  );

  /*
   * Message reveal system
   *
   * First open:
   * - recruiter message -> typing indicator -> message
   * - my message -> short natural pause -> message
   *
   * Reopen:
   * - show everything instantly
   */
  useEffect(() => {
    setSelectedProjectId(null);
    setIsTyping(false);

    const messages = currentChat.messages;

    if (messages.length === 0) {
      setVisibleMessages(0);
      setMessageTimes({});
      return;
    }

    /*
     * Reopened chat:
     * everything has already been read.
     */
    if (isReopening) {
      setVisibleMessages(messages.length);
      return;
    }

    /*
     * First opening.
     */
    setVisibleMessages(0);
    setMessageTimes({});

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const wait = (duration: number) =>
      new Promise<void>((resolve) => {
        timeoutId = setTimeout(resolve, duration);
      });

    const revealConversation = async () => {
      /*
       * Small pause after opening the chat
       * before conversation starts.
       */
      await wait(450);

      for (
        let index = 0;
        index < messages.length;
        index += 1
      ) {
        if (cancelled) return;

        const message = messages[index];

        /*
         * Recruiter / other person is typing.
         */
        if (message.sender === "other") {
          setIsTyping(true);

          await wait(1000);

          if (cancelled) return;

          setIsTyping(false);
        } else {
          /*
           * Natural pause before my next message.
           */
          await wait(700);

          if (cancelled) return;
        }

        setMessageTimes((prev) => ({
          ...prev,
          [message.id]: getCurrentTime(),
        }));

        setVisibleMessages(index + 1);

        /*
         * Small pause before next message.
         */
        await wait(300);
      }
    };

    revealConversation();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      setIsTyping(false);
    };
  }, [
    chat,
    currentChat.messages,
    isReopening,
  ]);

  /*
   * Auto-scroll while first-time messages appear.
   */
  useEffect(() => {
    if (visibleMessages === 0) return;

    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: isReopening
          ? "instant"
          : "smooth",
        block: "end",
      });
    }, isReopening ? 0 : 80);

    return () => clearTimeout(timeout);
  }, [
    visibleMessages,
    isReopening,
    chat,
  ]);

  /*
   * Keep typing bubble visible.
   */
  useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [isTyping]);

  /*
   * Reopened chat:
   * jump directly to bottom.
   */
  useEffect(() => {
    if (!isReopening) return;

    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [chat, isReopening]);

  /*
   * Project selected:
   * scroll to beginning of selected project.
   */
  useEffect(() => {
    if (!selectedProjectId) return;

    const timeout = setTimeout(() => {
      projectStartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [selectedProjectId]);

  const icons = {
    email: <Mail size={20} />,
    github: <FaGithub size={20} />,
    linkedin: <FaLinkedin size={20} />,
    leetcode: <SiLeetcode size={20} />,
  };

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-[var(--wa-chat-bg)]">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-[var(--wa-border)] bg-[var(--wa-header-bg)] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {/* Mobile Back */}
          <button
            type="button"
            onClick={onBack}
            className="shrink-0 md:hidden"
            aria-label="Back to chats"
          >
            <ArrowLeft
              className="text-[var(--wa-text-primary)]"
              size={22}
            />
          </button>

          {/* Chat Avatar */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--wa-search-bg)] sm:h-11 sm:w-11">
            <Image
              src={chatAvatars[chat]}
              alt={`${currentChat.title} avatar`}
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </div>

          {/* Chat Info */}
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-[var(--wa-text-primary)]">
              {currentChat.title}
            </h2>

            <p
              className={`truncate text-xs ${
                isTyping
                  ? "text-[var(--wa-green)]"
                  : "text-[var(--wa-text-secondary)]"
              }`}
            >
              {isTyping
                ? "typing..."
                : currentChat.subtitle}
            </p>
          </div>
        </div>

        {/* More Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--wa-text-primary)] transition hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="More options"
            aria-expanded={menuOpen}
          >
            <MoreVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-50 w-[210px] overflow-hidden rounded-lg bg-[var(--wa-header-bg)] py-2 shadow-xl ring-1 ring-black/10 dark:ring-white/10">
              {/* Back */}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onBack();
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[var(--wa-text-primary)] transition hover:bg-[var(--wa-hover-bg)] md:hidden"
              >
                <ArrowLeft size={17} />
                Back to Chats
              </button>

              {/* Resume */}
              <a
                href="/resume/Manroop_Kaur_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[var(--wa-text-primary)] transition hover:bg-[var(--wa-hover-bg)]"
              >
                <FileText size={17} />
                View Resume
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/manroop-kaur13"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[var(--wa-text-primary)] transition hover:bg-[var(--wa-hover-bg)]"
              >
                <FaLinkedin size={17} />
                LinkedIn
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Manroop-kaur13"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[var(--wa-text-primary)] transition hover:bg-[var(--wa-hover-bg)]"
              >
                <FaGithub size={17} />
                GitHub
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Messages */}
      <div
        data-chat-scroll
        className="chat-wallpaper min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-6 sm:py-6"
      >
        {/* Today */}
        <div className="mb-6 flex justify-center sm:mb-8">
          <span className="rounded-lg bg-[var(--wa-system-message-bg)] px-3 py-1 text-xs text-[var(--wa-text-secondary)] shadow-sm">
            Today
          </span>
        </div>

        {/* About unread divider */}
        {chat === "about" &&
          !isReopening && (
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--wa-border)]" />

              <span className="whitespace-nowrap text-xs font-medium text-[var(--wa-green)] sm:text-sm">
                {currentChat.messages.length} unread messages
              </span>

              <div className="h-px flex-1 bg-[var(--wa-border)]" />
            </div>
          )}

        {/* Normal Messages */}
        {currentChat.messages
          .slice(0, visibleMessages)
          .map((message) => (
            <MessageRenderer
              key={message.id}
              message={{
                ...message,
                time:
                  messageTimes[message.id] ??
                  message.time,
              }}
              icons={icons}
              onProjectSelect={
                setSelectedProjectId
              }
            />
          ))}

        {/* Typing Bubble */}
        {isTyping && (
          <div className="mb-3 flex justify-start">
            <div className="flex h-9 items-center gap-1 rounded-lg rounded-tl-sm bg-[var(--wa-bubble-other)] px-4 shadow-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--wa-text-secondary)] [animation-delay:-0.3s]" />

              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--wa-text-secondary)] [animation-delay:-0.15s]" />

              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--wa-text-secondary)]" />
            </div>
          </div>
        )}

        {/* Selected Project */}
        {selectedProject && (
          <div ref={projectStartRef}>
            {selectedProject.sections.map(
              (section, index) => (
                <MessageRenderer
                  key={`${selectedProject.id}-${index}`}
                  message={{
                    id: index,
                    type: "project-section",
                    sender: "me",
                    time: getCurrentTime(),
                    section,
                  }}
                  icons={icons}
                  onProjectSelect={
                    setSelectedProjectId
                  }
                />
              )
            )}
          </div>
        )}

        {/* Auto-scroll target */}
        <div
          ref={messagesEndRef}
          className="h-px"
          aria-hidden="true"
        />
      </div>
    </main>
  );
}
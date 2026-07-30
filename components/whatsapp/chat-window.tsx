"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  FileText,
  Mail,
  Moon,
  MoreVertical,
  Send,
  Smile,
  Sun,
  UserRound,
} from "lucide-react";

import { SiLeetcode } from "react-icons/si";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { projects } from "@/data/projects";
import { portfolio } from "@/data/portfolio";

import { MessageRenderer } from "./message-renderer";

import type { FeatureType } from "./feature-nav";
import type { ChatType } from "@/types/chat";

interface Props {
  chat: ChatType;
  onBack: () => void;
  isReopening: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onFeatureSelect: (
    feature: FeatureType
  ) => void;
}

const chatAvatars: Record<
  ChatType,
  string
> = {
  about: "/images/avatars/about.jpg",
  education:
    "/images/avatars/education.jpg",
  skills: "/images/avatars/skills.jpeg",
  projects:
    "/images/avatars/projects.jpg",
  experience:
    "/images/avatars/experience-avatar.jpg",
  achievements:
    "/images/avatars/achievements.jpg",
  certificates:
    "/images/avatars/certificates-new.jpg",
  resume: "/images/avatars/resume.jpg",
  contact: "/images/avatars/contact.jpeg",
};

const recruiterPrompts: Record<
  ChatType,
  string
> = {
  about: "Tell me about yourself!",
  education:
    "Tell me about your education.",
  skills:
    "What technologies do you work with?",
  projects:
    "Can you show me your projects?",
  experience:
    "What experience do you have?",
  achievements:
    "What are you most proud of?",
  certificates:
    "Can you show me your certifications?",
  resume:
    "Can I see your resume?",
  contact:
    "How can I reach you?",
};

const MOBILE_HINT_KEY =
  "portfolio-mobile-typing-hint-shown";

function getCurrentTime() {
  return new Date().toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
}

export function ChatWindow({
  chat,
  onBack,
  isReopening,
  isCompleted,
  onComplete,
  onFeatureSelect,
}: Props) {
  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  const isDark =
    resolvedTheme !== "light";

  const toggleTheme = () => {
    setTheme(
      isDark ? "light" : "dark"
    );
  };

  const currentChat =
    portfolio[chat];

  const recruiterPrompt =
    recruiterPrompts[chat];

  /*
   * The old portfolio data contains both
   * recruiter-style and Manroop messages.
   *
   * Recruiter interaction is now generated
   * separately, so only Manroop's original
   * content is used for the response sequence.
   */
  const conversationMessages = useMemo(
    () =>
      portfolio[chat].messages.filter(
        (message) =>
          message.sender === "me"
      ),
    [chat]
  );

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    visibleMessages,
    setVisibleMessages,
  ] = useState(0);

  const [isTyping, setIsTyping] =
    useState(false);

  const [
    selectedProjectId,
    setSelectedProjectId,
  ] = useState<string | null>(
    null
  );

  const [
    messageTimes,
    setMessageTimes,
  ] = useState<
    Record<number, string>
  >({});

  const [
    typedPrompt,
    setTypedPrompt,
  ] = useState("");

  const [
    recruiterMessageSent,
    setRecruiterMessageSent,
  ] = useState(false);

  const [
    recruiterMessageTime,
    setRecruiterMessageTime,
  ] = useState("");

  const [
    promptReady,
    setPromptReady,
  ] = useState(false);

  const [
    promptTypingStarted,
    setPromptTypingStarted,
  ] = useState(false);

  /*
   * Mobile onboarding hint.
   */
  const [
    showMobileHint,
    setShowMobileHint,
  ] = useState(false);

  const [
    mobileHintText,
    setMobileHintText,
  ] = useState("");

  /*
   * Snapshot whether the chat was already
   * completed when this visit began.
   */
  const completedOnEntryRef =
    useRef(false);

  const previousChatRef =
    useRef<ChatType | null>(null);

  if (
    previousChatRef.current !== chat
  ) {
    previousChatRef.current = chat;

    completedOnEntryRef.current =
      isCompleted;
  }

  const restoreCompletedChat =
    isReopening &&
    completedOnEntryRef.current;

  const scrollContainerRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const projectStartRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const inputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const userScrolledAwayRef =
    useRef(false);

  const selectedProject = useMemo(
    () =>
      projects.find(
        (project) =>
          project.id ===
          selectedProjectId
      ),
    [selectedProjectId]
  );

  const scrollToBottom = (
    behavior: ScrollBehavior = "auto"
  ) => {
    const container =
      scrollContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  };

  const handleScroll = () => {
    const container =
      scrollContainerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    userScrolledAwayRef.current =
      distanceFromBottom > 120;
  };

  /*
   * =====================================================
   * INITIAL RECRUITER STATE
   * =====================================================
   */
  useEffect(() => {
    if (restoreCompletedChat) {
      setTypedPrompt(
        recruiterPrompt
      );

      setPromptReady(true);
      setPromptTypingStarted(false);

      setRecruiterMessageSent(true);

      setRecruiterMessageTime(
        getCurrentTime()
      );

      return;
    }

    if (
      isReopening &&
      !completedOnEntryRef.current
    ) {
      setTypedPrompt(
        recruiterPrompt
      );

      setPromptReady(true);
      setPromptTypingStarted(false);

      setRecruiterMessageSent(false);
      setRecruiterMessageTime("");

      return;
    }

    setTypedPrompt("");
    setPromptReady(false);
    setPromptTypingStarted(false);

    setRecruiterMessageSent(false);
    setRecruiterMessageTime("");

    const isMobile =
      window.matchMedia(
        "(max-width: 767px)"
      ).matches;

    /*
     * Desktop starts automatically.
     *
     * Mobile waits for a genuine user tap so
     * the native keyboard can open.
     */
    if (!isMobile) {
      setPromptTypingStarted(true);
    }
  }, [
    chat,
    recruiterPrompt,
    isReopening,
    restoreCompletedChat,
  ]);

  /*
   * =====================================================
   * MOBILE FIRST-USE HINT
   * =====================================================
   *
   * Mobile only.
   * Shows once per browser tab/session.
   * Appears 500ms after the first chat loads.
   * Types its instruction letter by letter.
   * Hides when composer is tapped or after
   * roughly six seconds.
   */
  /*
 * =====================================================
 * MOBILE FIRST-USE HINT
 * =====================================================
 */
useEffect(() => {
  const isMobile = window.matchMedia(
    "(max-width: 767px)"
  ).matches;

  if (!isMobile) {
    return;
  }

  const alreadyShown =
    sessionStorage.getItem(
      MOBILE_HINT_KEY
    );

  if (alreadyShown === "true") {
    return;
  }

  const hint =
    "Tap the message bar to start typing";

  let characterIndex = 0;

  const showTimer = setTimeout(() => {
    setShowMobileHint(true);
    setMobileHintText("");

    sessionStorage.setItem(
      MOBILE_HINT_KEY,
      "true"
    );
  }, 500);

  const typingTimer = setInterval(() => {
    characterIndex += 1;

    setMobileHintText(
      hint.slice(0, characterIndex)
    );

    if (
      characterIndex >= hint.length
    ) {
      clearInterval(typingTimer);
    }
  }, 35);

  const hideTimer = setTimeout(() => {
    setShowMobileHint(false);
  }, 6500);

  return () => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    clearInterval(typingTimer);
  };
}, []);

  /*
   * =====================================================
   * RECRUITER PROMPT TYPING
   * =====================================================
   */
  useEffect(() => {
    if (!promptTypingStarted) {
      return;
    }

    if (isReopening) {
      return;
    }

    if (completedOnEntryRef.current) {
      return;
    }

    if (recruiterMessageSent) {
      return;
    }

    let cancelled = false;

    const timers = new Set<
      ReturnType<typeof setTimeout>
    >();

    const wait = (
      duration: number
    ) =>
      new Promise<void>(
        (resolve) => {
          const timer = setTimeout(
            () => {
              timers.delete(timer);
              resolve();
            },
            duration
          );

          timers.add(timer);
        }
      );

    const typePrompt = async () => {
      await wait(150);

      if (cancelled) {
        return;
      }

      for (
        let index = 1;
        index <=
        recruiterPrompt.length;
        index += 1
      ) {
        if (cancelled) {
          return;
        }

        setTypedPrompt(
          recruiterPrompt.slice(
            0,
            index
          )
        );

        const character =
          recruiterPrompt[
            index - 1
          ];

        const isPunctuation =
          character === "." ||
          character === "?" ||
          character === "!";

        const delay =
          isPunctuation
            ? 100
            : character === " "
              ? 75
              : index % 4 === 0
                ? 60
                : 42;

        await wait(delay);
      }

      if (cancelled) {
        return;
      }

      setPromptReady(true);
    };

    void typePrompt();

    return () => {
      cancelled = true;

      timers.forEach((timer) => {
        clearTimeout(timer);
      });

      timers.clear();
    };
  }, [
    chat,
    recruiterPrompt,
    promptTypingStarted,
    isReopening,
    recruiterMessageSent,
  ]);

  /*
   * =====================================================
   * MANROOP'S RESPONSES
   * =====================================================
   */
  useEffect(() => {
    const messages =
      conversationMessages;

    setSelectedProjectId(null);
    setMenuOpen(false);
    setIsTyping(false);

    userScrolledAwayRef.current =
      false;

    if (messages.length === 0) {
      setVisibleMessages(0);
      setMessageTimes({});
      return;
    }

    if (restoreCompletedChat) {
      setVisibleMessages(
        messages.length
      );

      setMessageTimes({});

      return;
    }

    /*
     * No response appears until recruiter
     * actually sends the scripted prompt.
     */
    if (!recruiterMessageSent) {
      setVisibleMessages(0);
      setMessageTimes({});
      return;
    }

    let cancelled = false;

    const timers = new Set<
      ReturnType<typeof setTimeout>
    >();

    const wait = (
      duration: number
    ) =>
      new Promise<void>(
        (resolve) => {
          const timer = setTimeout(
            () => {
              timers.delete(timer);
              resolve();
            },
            duration
          );

          timers.add(timer);
        }
      );

    const revealMessages =
      async () => {
        await wait(500);

        for (
          let index = 0;
          index < messages.length;
          index += 1
        ) {
          if (cancelled) {
            return;
          }

          setIsTyping(true);

          await wait(
            index === 0
              ? 1100
              : 800
          );

          if (cancelled) {
            return;
          }

          setIsTyping(false);

          await wait(140);

          if (cancelled) {
            return;
          }

          const message =
            messages[index];

          setMessageTimes(
            (prev) => ({
              ...prev,
              [message.id]:
                getCurrentTime(),
            })
          );

          setVisibleMessages(
            index + 1
          );

          await wait(650);
        }
      };

    void revealMessages();

    return () => {
      cancelled = true;
      setIsTyping(false);

      timers.forEach((timer) => {
        clearTimeout(timer);
      });

      timers.clear();
    };
  }, [
    chat,
    conversationMessages,
    restoreCompletedChat,
    recruiterMessageSent,
  ]);

  /*
   * Auto-scroll when messages appear.
   */
  useEffect(() => {
    if (
      visibleMessages === 0
    ) {
      return;
    }

    if (
      userScrolledAwayRef.current
    ) {
      return;
    }

    const timeout = setTimeout(
      () => {
        scrollToBottom(
          restoreCompletedChat
            ? "auto"
            : "smooth"
        );
      },
      restoreCompletedChat
        ? 0
        : 80
    );

    return () =>
      clearTimeout(timeout);
  }, [
    visibleMessages,
    restoreCompletedChat,
  ]);

  /*
   * Keep typing indicator visible.
   */
  useEffect(() => {
    if (!isTyping) {
      return;
    }

    if (
      userScrolledAwayRef.current
    ) {
      return;
    }

    const timeout = setTimeout(
      () => {
        scrollToBottom("smooth");
      },
      50
    );

    return () =>
      clearTimeout(timeout);
  }, [isTyping]);

  /*
   * Scroll after recruiter sends.
   */
  useEffect(() => {
    if (!recruiterMessageSent) {
      return;
    }

    userScrolledAwayRef.current =
      false;

    const timeout = setTimeout(
      () => {
        scrollToBottom(
          restoreCompletedChat
            ? "auto"
            : "smooth"
        );
      },
      restoreCompletedChat
        ? 0
        : 80
    );

    return () =>
      clearTimeout(timeout);
  }, [
    recruiterMessageSent,
    restoreCompletedChat,
  ]);

  /*
   * Completed reopen begins at bottom.
   */
  useEffect(() => {
    if (!restoreCompletedChat) {
      return;
    }

    userScrolledAwayRef.current =
      false;

    const timeout = setTimeout(
      () => {
        scrollToBottom("auto");
      },
      50
    );

    return () =>
      clearTimeout(timeout);
  }, [
    chat,
    restoreCompletedChat,
  ]);

  /*
   * Scroll selected project into view.
   */
  useEffect(() => {
    if (!selectedProjectId) {
      return;
    }

    const timeout = setTimeout(
      () => {
        const container =
          scrollContainerRef.current;

        const projectElement =
          projectStartRef.current;

        if (
          !container ||
          !projectElement
        ) {
          return;
        }

        const containerRect =
          container.getBoundingClientRect();

        const projectRect =
          projectElement.getBoundingClientRect();

        const targetTop =
          container.scrollTop +
          projectRect.top -
          containerRect.top -
          16;

        container.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
      },
      150
    );

    return () =>
      clearTimeout(timeout);
  }, [selectedProjectId]);

  /*
   * Mobile genuine focus:
   *
   * - removes onboarding hint
   * - starts scripted prompt typing
   * - native keyboard remains controlled by
   *   the real input focus
   */
  const handleComposerFocus = () => {
    setShowMobileHint(false);

    if (recruiterMessageSent) {
      return;
    }

    if (isReopening) {
      return;
    }

    if (promptTypingStarted) {
      return;
    }

    setPromptTypingStarted(true);
  };

  /*
   * Send via button OR Enter.
   */
  const handleRecruiterSend = () => {
    if (!promptReady) {
      return;
    }

    if (recruiterMessageSent) {
      return;
    }

    setShowMobileHint(false);

    setRecruiterMessageTime(
      getCurrentTime()
    );

    setRecruiterMessageSent(true);

    onComplete();

    /*
     * Mobile keyboard closes after send.
     */
    inputRef.current?.blur();

    userScrolledAwayRef.current =
      false;
  };

  /*
   * Global Enter shortcut.
   *
   * Kept from the working implementation so
   * Enter reliably sends even with the visual
   * / invisible composer architecture.
   */
  useEffect(() => {
    const handleEnterToSend = (
      event: KeyboardEvent
    ) => {
      if (event.key !== "Enter") {
        return;
      }

      if (event.isComposing) {
        return;
      }

      if (!promptReady) {
        return;
      }

      if (recruiterMessageSent) {
        return;
      }

      event.preventDefault();

      handleRecruiterSend();
    };

    window.addEventListener(
      "keydown",
      handleEnterToSend
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEnterToSend
      );
    };
  }, [
    promptReady,
    recruiterMessageSent,
  ]);

  const icons = {
    email: <Mail size={20} />,
    github: <FaGithub size={20} />,
    linkedin:
      <FaLinkedin size={20} />,
    leetcode:
      <SiLeetcode size={20} />,
  };

  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[var(--wa-chat-bg)]">
      {/* ================= HEADER ================= */}

      <header className="flex shrink-0 items-center justify-between border-b border-[var(--wa-border)] bg-[var(--wa-header-bg)] px-3 py-3 sm:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--wa-text-primary)] md:hidden"
            aria-label="Back to chats"
          >
            <ArrowLeft size={22} />
          </button>

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

          <div className="min-w-0 flex-1">
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

        <div className="ml-1 flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            title={
              isDark
                ? "Light Mode"
                : "Dark Mode"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--wa-text-primary)] transition hover:bg-[var(--wa-hover-bg)] md:hidden"
          >
            {isDark ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              onFeatureSelect(
                "profile"
              )
            }
            aria-label="Profile"
            title="Profile"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--wa-text-primary)] transition hover:bg-[var(--wa-hover-bg)] md:hidden"
          >
            <UserRound size={19} />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (prev) => !prev
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--wa-text-primary)] transition hover:bg-[var(--wa-hover-bg)]"
              aria-label="More options"
              aria-expanded={menuOpen}
            >
              <MoreVertical size={20} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 z-50 w-[210px] overflow-hidden rounded-lg bg-[var(--wa-header-bg)] py-2 shadow-xl ring-1 ring-black/10 dark:ring-white/10">
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
        </div>
      </header>

      {/* ================= MESSAGES ================= */}

      <div
        ref={scrollContainerRef}
        data-chat-scroll
        onScroll={handleScroll}
        className="chat-wallpaper min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-5 sm:px-6 sm:py-6"
      >
        <div className="mb-6 flex justify-center sm:mb-8">
          <span className="rounded-lg bg-[var(--wa-system-message-bg)] px-3 py-1 text-xs text-[var(--wa-text-secondary)] shadow-sm">
            Today
          </span>
        </div>

        {!recruiterMessageSent &&
          !completedOnEntryRef.current && (
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--wa-border)]" />

              <span className="whitespace-nowrap text-xs font-medium text-[var(--wa-green)] sm:text-sm">
                Start a conversation
              </span>

              <div className="h-px flex-1 bg-[var(--wa-border)]" />
            </div>
          )}

       {/* Recruiter = RIGHT / GREEN */}
{recruiterMessageSent && (
  <div className="mb-3 flex justify-end">
    <div className="relative max-w-[85%] rounded-lg rounded-tr-sm bg-[var(--wa-bubble-me)] px-3 pb-2 pt-2 shadow-sm sm:max-w-[72%]">
      <p className="text-[14px] leading-5 text-[var(--wa-text-primary)] sm:text-[15px]">
        {recruiterPrompt}

        {/* Space reserved only at the end of the final line */}
        <span className="inline-block w-[72px]" />
      </p>

      <div className="absolute bottom-[6px] right-2 flex items-center gap-1 whitespace-nowrap text-[10px] leading-none text-[var(--wa-text-secondary)]">
        <span>
          {recruiterMessageTime ||
            getCurrentTime()}
        </span>

        <span className="text-[#53BDEB]">
          ✓✓
        </span>
      </div>
    </div>
  </div>
)}

        {/* Manroop = LEFT / INCOMING */}
        {conversationMessages
          .slice(
            0,
            visibleMessages
          )
          .map((message) => {
            const renderedMessage = {
              ...message,
              sender:
                "other" as const,
              time:
                messageTimes[
                  message.id
                ] ??
                message.time,
            };

            return (
              <MessageRenderer
                key={message.id}
                message={renderedMessage}
                icons={icons}
                onProjectSelect={
                  setSelectedProjectId
                }
              />
            );
          })}

        {/* Manroop typing = LEFT */}
        {isTyping && (
          <div className="mb-3 flex justify-start">
            <div className="flex h-9 items-center gap-1 rounded-lg rounded-tl-sm bg-[var(--wa-bubble-other)] px-4 shadow-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--wa-text-secondary)] [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--wa-text-secondary)] [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--wa-text-secondary)]" />
            </div>
          </div>
        )}

        {/* Selected project details */}
        {selectedProject && (
          <div ref={projectStartRef}>
            {selectedProject.sections.map(
              (
                section,
                index
              ) => (
                <MessageRenderer
                  key={`${selectedProject.id}-${index}`}
                  message={{
                    id: index,
                    type: "project-section",
                    sender: "other",
                    time:
                      getCurrentTime(),
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

        <div
          className="h-1"
          aria-hidden="true"
        />
      </div>

      {/* ================= COMPOSER ================= */}

      <div className="relative shrink-0 border-t border-[var(--wa-border)] bg-[var(--wa-header-bg)] px-2 py-2 sm:px-3">
        {/* MOBILE ONE-TIME HINT */}
        {showMobileHint && (
          <div
            className="
              absolute bottom-[64px] left-1/2 z-[100]
              -translate-x-1/2
              whitespace-nowrap
              rounded-lg
              bg-[#202C33]
              px-3.5 py-2.5
              font-mono
              text-[12px] font-medium
              text-white
              shadow-xl
              md:hidden
            "
          >
            <span>
              {mobileHintText}
            </span>

            <span className="ml-[2px] inline-block animate-pulse">
              |
            </span>

            <span className="ml-1">
              ↓
            </span>

            <span
              className="
                absolute left-1/2 top-full
                -translate-x-1/2
                border-x-[7px]
                border-t-[7px]
                border-x-transparent
                border-t-[#202C33]
              "
            />
          </div>
        )}

        <div className="mx-auto flex w-full max-w-5xl items-end gap-2">
          <div className="relative flex min-h-11 min-w-0 flex-1 items-center rounded-[22px] bg-[var(--wa-search-bg)] px-4">
            <Smile
  size={21}
  className="pointer-events-none mr-2.5 shrink-0 text-[var(--wa-text-secondary)]"
  aria-hidden="true"
/>
            <input
              ref={inputRef}
              type="text"
              onFocus={
                handleComposerFocus
              }
              inputMode="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label={`${currentChat.title} recruiter message`}
              className="absolute inset-0 z-10 h-full w-full bg-transparent px-4 text-transparent caret-transparent outline-none"
            />

            {/* Visual text + visual caret */}
            <div
              className="pointer-events-none flex min-w-0 items-center text-[16px]"
              aria-hidden="true"
            >
              {recruiterMessageSent ? (
                <>
                  {/* | Message */}
                  <span className="mr-[2px] inline-block h-[19px] w-[1.5px] animate-pulse bg-[var(--wa-text-primary)]" />

                  <span className="text-[var(--wa-text-secondary)]">
                    Message
                  </span>
                </>
              ) : typedPrompt ? (
                <>
                  <span className="text-[var(--wa-text-primary)]">
                    {typedPrompt}
                  </span>

                  {/* Prompt| */}
                  <span className="ml-[1px] inline-block h-[19px] w-[1.5px] animate-pulse bg-[var(--wa-text-primary)]" />
                </>
              ) : (
                <>
                  <span className="text-[var(--wa-text-secondary)]">
                    Message
                  </span>

                  {promptTypingStarted && (
                    <span className="ml-[1px] inline-block h-[19px] w-[1.5px] animate-pulse bg-[var(--wa-text-primary)]" />
                  )}
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={
              handleRecruiterSend
            }
            disabled={
              !promptReady ||
              recruiterMessageSent
            }
            aria-label="Send message"
            title={
              recruiterMessageSent
                ? "Message sent"
                : promptReady
                  ? "Send"
                  : "Typing..."
            }
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
              promptReady &&
              !recruiterMessageSent
                ? "bg-[var(--wa-green)] text-white hover:brightness-105 active:scale-95"
                : "cursor-default bg-[var(--wa-green)]/40 text-white/60"
            }`}
          >
            <Send
              size={19}
              className="-translate-x-[1px] rotate-45"
            />
          </button>
        </div>
      </div>
    </main>
  );
}
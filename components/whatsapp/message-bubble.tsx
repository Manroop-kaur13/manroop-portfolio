"use client";

import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  text: string;
  time?: string;
  isOwn?: boolean;
}

export function MessageBubble({
  text,
  time = "",
  isOwn = true,
}: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`mb-2 flex ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[68%] rounded-2xl px-4 py-3 shadow-md ${
          isOwn
            ? "rounded-br-md bg-[var(--wa-bubble-me)]"
            : "rounded-bl-md bg-[var(--wa-bubble-other)]"
        }`}
      >
        {/* Message */}
        <div className="max-w-none text-[var(--wa-text-primary)]">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="whitespace-pre-wrap text-[15px] leading-6 text-[var(--wa-text-primary)]">
                  {children}
                </p>
              ),

              strong: ({ children }) => (
                <strong className="font-bold text-[var(--wa-text-primary)]">
                  {children}
                </strong>
              ),

              ul: ({ children }) => (
                <ul className="list-disc pl-5 text-[var(--wa-text-primary)]">
                  {children}
                </ul>
              ),

              li: ({ children }) => (
                <li className="text-[var(--wa-text-primary)]">
                  {children}
                </li>
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        </div>

        {/* Time + ticks */}
        <div className="mt-2 flex items-center justify-end gap-1">
          <span className="text-[11px] text-[var(--wa-text-secondary)]">
            {time}
          </span>

          {isOwn && (
            <CheckCheck
              size={14}
              className="text-[#53BDEB]"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
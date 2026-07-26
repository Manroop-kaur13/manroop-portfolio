"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectSelectorCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const statusStyles = {
  Completed: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    label: "🟢 Completed",
  },
  Live: {
    bg: "bg-sky-500/15",
    text: "text-sky-400",
    label: "🔵 Live",
  },
  Building: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-400",
    label: "🚧 Building",
  },
};

export default function ProjectSelectorCard({
  project,
  onOpen,
}: ProjectSelectorCardProps) {
  const status = statusStyles[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        borderColor: "#25D366",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpen(project)}
      className="w-full max-w-md cursor-pointer overflow-hidden rounded-2xl border border-[#3A4A54] bg-[#202C33] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between p-5">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2A3942] text-3xl">
            {project.emoji}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {project.title}
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-gray-400">
              {project.tagline}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#31424D]" />

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4 text-sm text-gray-400">
        <span className="flex items-center gap-2">
          💬 Tap to open conversation
        </span>

        <ChevronRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </motion.div>
  );
}
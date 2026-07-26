"use client";

import type { ReactNode } from "react";
import type { ChatMessage } from "@/types/chat";

import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import ResumeCard from "@/components/cards/resume-card";
import ExperienceCard from "@/components/cards/experience-card";
import { ContactCard } from "@/components/cards/contact-card";
import AchievementImageCard from "@/components/cards/achievement-image-card";
import AchievementGallery from "@/components/cards/achievement-gallery";
import SkillCard from "@/components/cards/skill-card";
import EducationCard from "@/components/cards/education-card";

import { ProjectSelector } from "@/components/projects/project-selector";
import { ProjectSectionRenderer } from "@/components/projects/project-section-renderer";

import { MessageBubble } from "./message-bubble";

interface Props {
  message: ChatMessage;
  icons: Record<string, ReactNode>;
  onProjectSelect?: (projectId: string) => void;
}

export function MessageRenderer({
  message,
  icons,
  onProjectSelect,
}: Props) {
  switch (message.type) {
    case "text":
      return (
        <MessageBubble
          text={message.text ?? ""}
          time={message.time}
          isOwn={message.sender === "me"}
        />
      );

    case "contact":
      return (
        <div
          className={`mb-3 flex ${
            message.sender === "me"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <ContactCard
            icon={icons[message.icon!]}
            title={message.title!}
            value={message.value!}
            url={message.url}
            copy={message.copy}
            buttonText={message.buttonText!}
          />
        </div>
      );

    case "project-selector":
      return (
        <ProjectSelector
          onSelect={onProjectSelect}
        />
      );

    case "project-section":
      return (
        <ProjectSectionRenderer
          section={message.section!}
        />
      );

    case "skill-card":
      return (
        <div
          className={`mb-3 flex ${
            message.sender === "me"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <SkillCard
            title={message.title!}
            emoji={message.emoji!}
            skills={message.skills!}
          />
        </div>
      );

    case "education":
      return (
        <div
          className={`mb-3 flex ${
            message.sender === "me"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <EducationCard
            title={message.title!}
            institution={message.institution!}
            duration={message.duration!}
            percentage={message.percentage}
            board={message.board}
            subjects={message.subjects}
            cgpa={message.cgpa}
            coursework={message.coursework}
          />
        </div>
      );

    case "achievement-image":
      return (
        <div
          className={`mb-3 flex ${
            message.sender === "me"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <AchievementImageCard
            image={message.image!}
            caption={message.caption ?? ""}
          />
        </div>
      );

    case "achievement-gallery":
      return (
        <div
          className={`mb-3 flex ${
            message.sender === "me"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <AchievementGallery
            title={message.title ?? "Gallery"}
            images={message.images ?? []}
          />
        </div>
      );

    case "resume":
      return (
        <div
          className={`mb-3 flex ${
            message.sender === "me"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <ResumeCard
            preview={message.preview!}
            file={message.file!}
          />
        </div>
      );

    case "certificate-gallery":
      return <CertificateGallery />;

    case "experience-card":
      return (
        <div
          className={`mb-4 flex ${
            message.sender === "me"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <ExperienceCard
            role={message.title!}
            organization={message.organization!}
            duration={message.duration!}
            description={message.description}
            highlights={message.highlights!}
            tags={message.tags}
          />
        </div>
      );

    default:
      return null;
  }
}
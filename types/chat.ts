import type { ProjectSection } from "./project";

export type ChatType =
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "achievements"
  | "experience"
  | "certificates"
  | "resume"
  | "contact";

export type MessageType =
  | "text"
  | "contact"
  | "experience-card"
  | "project-selector"
  | "project-section"
  | "skill-card"
  | "achievement-image"
  | "achievement-gallery"
  | "resume"
  | "certificate-gallery"
  | "education";

export interface ChatMessage {
  id: number;

  type: MessageType;

  sender: "me" | "other";

  time: string;

  emoji?: string;
  preview?: string;

  file?: string;

  skills?: string[];

  organization?: string;
  description?: string;
  highlights?: string[];
  tags?: string[];

  // Achievement media
  image?: string;
  images?: string[];
  caption?: string;

  // Education
  percentage?: string;
  board?: string;
  subjects?: string[];
  cgpa?: string;
  coursework?: string[];

  // Text
  text?: string;

  // Shared card information
  title?: string;
  institution?: string;
  duration?: string;

  // Contact
  value?: string;
  url?: string;
  buttonText?: string;
  copy?: boolean;

  // Projects
  section?: ProjectSection;
  projectId?: string;

  icon?: "email" | "github" | "linkedin" | "leetcode";
}
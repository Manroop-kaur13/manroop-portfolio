export type ProjectStatus = "Building" | "Live" | "Completed";

export interface ArchitectureSection {
  type: "architecture";
  title: string;
  image: string;
  description?: string;
}

export interface PublicationSection {
  type: "publication";
  title: string;
  status: string;
  description: string;
}
export type ProjectLinkIcon =
  | "github"
  | "linkedin"
  | "demo"
  | "live";

export interface ProjectLink {
  label: string;
  url: string;
  icon: ProjectLinkIcon;
}

export interface OverviewSection {
  type: "overview";
  title: string;
  description: string;
}

export interface TechStackSection {
  type: "tech-stack";
  title: string;
  technologies: string[];
}

export interface HardwareSection {
  type: "hardware";
  title: string;
  hardware: string[];
}

export interface FeaturesSection {
  type: "features";
  title: string;
  features: string[];
}
export interface PipelineSection {
  type: "pipeline";

  title: string;

  steps: string[];
}

export interface ContributionsSection {
  type: "contributions";
  title: string;
  contributions: string[];
}
export interface ResultsSection {
  type: "results";

  title: string;

  results: string[];
}

export interface GallerySection {
  type: "gallery";
  title: string;
  images: string[];
}

export interface VideoSection {
  type: "video";
  title: string;
  video: string;
  thumbnail?: string;
}

export interface LinksSection {
  type: "links";
  title: string;
  links: ProjectLink[];
}

export type ProjectSection =
  | OverviewSection
  | TechStackSection
  | HardwareSection
  | FeaturesSection
  | PipelineSection
  | ContributionsSection
  | ResultsSection
  | ArchitectureSection
  | PublicationSection
  | GallerySection
  | VideoSection
  | LinksSection;

export interface Project {
  id: string;

  title: string;

  emoji: string;

  tagline: string;

  status: ProjectStatus;

  heroImage: string;

  sections: ProjectSection[];
}
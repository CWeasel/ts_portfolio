export type Portfolio = {
    profile: {
        name: string;
        title: string;
        summary: string;
    },
    sections: Array< {
        id: string;
        type: "text";
        title: string;
        content: string;
    }|{
        id: string;
        type: "list";
        title: string;
        items: string[];
    } >;
};
export type BlockType =
  | "hero"
  | "skills"
  | "projects"
  | "experience";

export interface Block {
  id: string;
  type: BlockType;
  position: number;
  config: Record<string, unknown>;
  data: unknown; // we’ll refine this later
}

export interface Page {
  slug: string;
  title: string;
  blocks: Block[];
}

export type HeroContent = {
  title: string;
  subtitle: string;
};

export type SkillsContent = {
  skills: string[]; // will later reference real skill IDs/names
};

export type ProjectItem = {
  id: string;
  name: string;
  url?: string | null;
};

export type ProjectsContent = {
  projects: ProjectItem[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  from: string;      // ISO date
  to?: string | null;
  description?: string | null;
};

export type ExperienceContent = {
  items: ExperienceItem[];
};

export type BlockContent =
  | { type: "hero"; content: HeroContent }
  | { type: "skills"; content: SkillsContent }
  | { type: "projects"; content: ProjectsContent }
  | { type: "experience"; content: ExperienceContent };
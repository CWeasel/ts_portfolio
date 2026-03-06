import type { Block } from "../types";
import { HeroBlock } from "./blocks/HeroBlock";
import { SkillsBlock } from "./blocks/SkillsBlock";
import { ProjectsBlock } from "./blocks/ProjectsBlock";
import { ExperienceBlock } from "./blocks/ExperienceBlock";

interface Props {
  block: Block;
}

export function BlockRenderer({ block }: Props) {
  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.data} />;

    case "skills":
      return <SkillsBlock data={block.config} />;

    case "projects":
      return <ProjectsBlock data={block.data} />;

    case "experience":
      return <ExperienceBlock data={block.data} />;

    default:
      return null;
  }
}

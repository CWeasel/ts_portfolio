export type BlockType =
  | "hero"
  | "skills"
  | "projects"
  | "experience";

export interface Block {
  id: string;
  type: BlockType;
  position: number;
  config: Record<string, any>;
}

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

import { SectionRenderer } from "./SectionRenderer";

type Section =
  | {
      id: string;
      type: "text";
      title: string;
      content: string;
    }
  | {
      id: string;
      type: "list";
      title: string;
      items: string[];
    };

type SectionsProps = {
  sections: Section[];
};

export function Sections({ sections }: SectionsProps) {
  return (
    <div>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}

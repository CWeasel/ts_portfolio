import { TextSection } from "./sections/TextSection";
import { ListSection } from "./sections/ListSection";

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
type SectionsRendererProps = {
  section: Section;
};

export function SectionRenderer({ section }: SectionsRendererProps) {
  switch (section.type) {
    case "text":
      return (
        <TextSection
          id={section.id}
          title={section.title}
          content={section.content}
        />
      );
    case "list":
      return (
        <ListSection
          id={section.id}
          title={section.title}
          items={section.items}
        />
      );
    default:
      return (
        <section>
          <h2>Unsupported Type</h2>
        </section>
      );
  }
}

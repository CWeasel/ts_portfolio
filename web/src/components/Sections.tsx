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

function renderSection(section: Section): JSX.Element {
  switch (section.type) {
    case "text":
      return (
        <section key={section.id} id={section.id}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </section>
      );
    case "list":
      return (
        <section key={section.id} id={section.id}>
          <h2>{section.title}</h2>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      );
    default:
      return (
        <section>
          <h2>Unsupported Type</h2>
        </section>
      );
  }
}

export function Sections({ sections }: SectionsProps) {
  return <div>{sections.map((s) => renderSection(s))}</div>;
}

type ListSectionProp = {
  id: string;
  title: string;
  items: string[];
};

export function ListSection({ id, title, items }: ListSectionProp) {
  return (
    <section key={id} id={id}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

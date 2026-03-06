type TextSectionProp = {
  id: string;
  title: string;
  content: string;
};

export function TextSection({ id, title, content }: TextSectionProp) {
  return (
    <section key={id} id={id}>
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
}

interface Skill {
  id: string;
  name: string;
  category?: string;
  proficiency?: number | null;
}

interface SkillsData {
  title: string;
  skills: Skill[];
}

export function SkillsBlock({ data }: { data: SkillsData }) {
  return (
    <section>
      <h2>{data.title}</h2>
      <ul>
        {data.skills.map((s) => (
          <li key={s.id}>
            {s.name}
            {s.proficiency ? ` — ${s.proficiency}/5` : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  start_date: string;
  end_date?: string | null;
  description?: string | null;
}

interface ExperienceData {
  title: string;
  experience: ExperienceItem[];
}

export function ExperienceBlock({ data }: { data: ExperienceData }) {
  return (
    <section>
      <h2>{data.title}</h2>

      {data.experience.map((exp) => (
        <article key={exp.id}>
          <h3>
            {exp.title} — {exp.company}
          </h3>
          <p>
            {new Date(exp.start_date).toLocaleDateString()}{" "}
            —{" "}
            {exp.end_date
              ? new Date(exp.end_date).toLocaleDateString()
              : "Present"}
          </p>
          {exp.description && <p>{exp.description}</p>}
        </article>
      ))}
    </section>
  );
}

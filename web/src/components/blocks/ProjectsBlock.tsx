interface Project {
  id: string;
  name: string;
  summary: string;
  url?: string | null;
  repo_url?: string | null;
}

interface ProjectsData {
  title: string;
  projects: Project[];
}

export function ProjectsBlock({ data }: { data: ProjectsData }) {
  return (
    <section>
      <h2>{data.title}</h2>
      {data.projects.map((p) => (
        <article key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.summary}</p>
          {p.url && (
            <p>
              <a href={p.url} target="_blank" rel="noreferrer">
                View project
              </a>
            </p>
          )}
        </article>
      ))}
    </section>
  );
}

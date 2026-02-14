import type { Project } from "../../../api/projectsApi";
import { ProjectRow } from "./ProjectRow";

export function ProjectsList({
  projects,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Featured</th>
      <th>Name</th>
      <th>Summary</th>
      <th>Description</th>
      <th>Start date</th>
      <th>End date</th>
      <th>URL</th>
      <th>Repo URL</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

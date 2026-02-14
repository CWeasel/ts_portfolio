import type { Project } from "../../../api/projectsApi";

export function ProjectRow({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="project-row">
      <td>{project.featured ? "Featured" : "Not Featured"}</td>
      <td>{project.name}</td>
      <td>{project.summary}</td>
      <td>{project.description}</td>
      <td>{project.start_date}</td>
      <td>{project.end_date}</td>
      <td>{project.url}</td>
      <td>{project.repo_url}</td>
      <td>
        <button onClick={() => onEdit(project.id)}>Edit</button>
        <button onClick={() => onDelete(project.id)}>Delete</button>
      </td>
    </tr>
  );
}

import { GenericAdminManager } from "../GenericAdminManager";
import type { ModelSchema } from "../../../types/admin";

interface Project {
  id: string;
  name: string;
  summary: string;
  description?: string;
  url?: string;
  repo_url?: string;
  start_date?: string;
  end_date?: string;
  featured?: boolean;
};

const ProjectSchema: ModelSchema<Project> = {
  name: "project",
  endpoint: "http://localhost:3000/api/admin/projects",
  fields: [
    {key:"name", label:"Project Name", type:"text", required: true },
    {key:"summary", label:"Project Summary", type:"text", required: true },
    {key:"description", label:"Project Description", type:"text", required: false },
    {key:"url", label:"Project URL", type:"text", required: false },
    {key:"repo_url", label:"Project Repository URL", type:"text", required: false },
    {key:"start_date", label:"Project Start Date", type:"date", required: false },
    {key:"end_date", label:"Project End Date", type:"date", required: false },
    {key:"featured", label:"Featured Project?", type:"boolean", required: false },
  ]
}

export const ProjectsAdmin = () => <GenericAdminManager schema={ProjectSchema} />

// import { useState } from "react";
// import { useProjects } from "../../../hooks/useProjects";
// import { ProjectsList } from "./ProjectsList";
// import { ProjectForm } from "./ProjectForm";

// export function ProjectsPage() {
//   const { projects, loading, error, create, update, remove } = useProjects();

//   const [editing, setEditing] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState<string | null>(null);

// if (loading) return <p>Loading projects…</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   const projectToEdit = projects.find((s) => s.id === editing) || null;
//   const projectToDelete = projects.find((s) => s.id === deleting) || null;
//   return (
//     <div>
//       <h1>Manage Projects</h1>

//       <ProjectForm
//         key={editing || "new"}
//         project={projectToEdit}
//         onCancel={() => setEditing(null)}
//         onSubmit={async (data) => {
//           if (editing) {
//             await update(editing, data);
//           } else {
//             await create(data);
//           }
//           setEditing(null);
//         }}
//       />

//       <ProjectsList
//         projects={projects}
//         onEdit={(id) => setEditing(id)}
//         onDelete={(id) => setDeleting(id)}
//       />

//       {projectToDelete && (
//         <div style={{ border: "1px solid red", padding: "1rem" }}>
//           <p>
//             Are you sure you want to delete <strong>{projectToDelete.name}</strong>?
//           </p>
//           <button
//             onClick={async () => {
//               await remove(projectToDelete.id);
//               setDeleting(null);
//             }}
//           >
//             Yes, delete
//           </button>
//           <button onClick={() => setDeleting(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }

import { GenericAdminManager } from "../GenericAdminManager";
import type { ModelSchema } from "../../../types/admin";

interface Skill {
  id: string;
  name: string;
  proficiency?: number | null;
  category?: string | null;
}

const SkillSchema: ModelSchema<Skill> = {
  name: "Skill",
  endpoint: "http://localhost:3000/api/admin/skills",
  fields: [
    { key: "name", label: "Skill Name", type: "text", required: true },
    {
      key: "proficiency",
      label: "Skill Proficiency",
      type: "number",
      required: true,
    },
    { key: "category", label: "Skill Category", type: "text", required: true },
  ],
};

export const SkillsAdmin = () => <GenericAdminManager schema={SkillSchema} />
// import { useState } from "react";
// import { useSkills } from "../../../hooks/useSkills";
// import { SkillsList } from "./SkillsList";
// import { SkillForm } from "./SkillForm";
// import { ConfirmDelete } from "../ConfirmDelete";

// export function SkillsPage() {
//   const { skills, loading, error, create, update, remove } =
//     useSkills();

//   const [editing, setEditing] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState<string | null>(null);

//   if (loading) return <p>Loading skills…</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   const skillToEdit = skills.find((s) => s.id === editing) || null;
//   const skillToDelete =
//     skills.find((s) => s.id === deleting) || null;

//   return (
//     <div>
//       <h1>Manage Skills</h1>

//       <SkillForm
//         key={editing || "new"}
//         skill={skillToEdit}
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

//       <SkillsList
//         skills={skills}
//         onEdit={(id) => setEditing(id)}
//         onDelete={(id) => setDeleting(id)}
//       />

//       {skillToDelete && (
//         <ConfirmDelete
//           skill={skillToDelete}
//           onCancel={() => setDeleting(null)}
//           onConfirm={async () => {
//             await remove(skillToDelete.id);
//             setDeleting(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

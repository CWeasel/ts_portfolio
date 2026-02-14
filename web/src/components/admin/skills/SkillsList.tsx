import type { Skill } from "../../../api/skillsApi";
import { SkillRow } from "./SkillRow";

export function SkillsList({
  skills,
  onEdit,
  onDelete,
}: {
  skills: Skill[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((s) => (
          <SkillRow
            key={s.id}
            skill={s}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

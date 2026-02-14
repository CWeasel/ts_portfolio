import type { Skill } from "../../../api/skillsApi";

export function SkillRow({
  skill,
  onEdit,
  onDelete,
}: {
  skill: Skill;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr>
      <td>{skill.name}</td>
      <td>{skill.proficiency ?? "—"}</td>
      <td>{skill.category ?? "—"}</td>
      <td>
        <button onClick={() => onEdit(skill.id)}>Edit</button>
        <button onClick={() => onDelete(skill.id)}>Delete</button>
      </td>
    </tr>
  );
}

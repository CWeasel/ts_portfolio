import type { Skill } from "../../api/skillsApi";

export function ConfirmDelete({
  skill,
  onConfirm,
  onCancel,
}: {
  skill: Skill;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <div style={{ border: "1px solid red", padding: "1rem" }}>
      <p>
        Are you sure you want to delete <strong>{skill.name}</strong>?
      </p>
      <button onClick={onConfirm}>Yes, delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

import { useState } from "react";
import type { Skill } from "../../../api/skillsApi";

export function SkillForm({
  skill,
  onSubmit,
  onCancel,
}: {
  skill: Skill | null;
  onSubmit: (data: Omit<Skill, "id">) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(skill?.name ?? "");
  const [level, setLevel] = useState<number | "">(
    skill?.proficiency ?? ""
  );
  const [category, setCategory] = useState(
    skill?.category ?? ""
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    await onSubmit({
      name,
      proficiency: level === "" ? null : Number(level),
      category: category || null,
    });

    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{skill ? "Edit Skill" : "New Skill"}</h2>

      <input
        placeholder="Skill name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        min={1}
        max={5}
        placeholder="Level (1-5)"
        value={level}
        onChange={(e) =>
          setLevel(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <div>
        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : skill ? "Update" : "Create"}
        </button>
        {skill && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

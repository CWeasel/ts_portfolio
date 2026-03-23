"use client";

import type { ModelSchema } from "@/types/admin-types";
import TableComponent from "./table-component";
import { useResource } from "@/hooks/use-admin";
import FormComponent from "./form-component";
import { useState } from "react";
import ConfirmDelete from "./confirm-delete-component";

type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
};

const SkillSchema: ModelSchema<Skill> = {
  name: "Skill",
  endpoint: "/skills",
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

export function AdminSkillsSection() {
  const {
    items: skills,
    loading,
    error,
    create,
    update,
    remove,
  } = useResource<Skill>(SkillSchema.endpoint);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [deleting, setDeleting] = useState<Skill | null>(null);

  if (loading) return <p>Loading skills…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const handleSubmit = async (data: Partial<Skill>) => {
    console.log("Submitting skill data:", data);
    if (data.id) {
      await update(data.id, data);
    } else {
      await create(data);
    }
    setEditing(null);
  };
  const handleCancel = () => setEditing(null);

  return (
    <section
      id="admin-skills"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <h1 className="text-2xl font-bold mb-6">Admin Skills Management</h1>
        <div className="mb-4">
          {deleting && (
          <ConfirmDelete
            item={deleting}
            onConfirm={async () => {
              await remove(deleting.id);
              setDeleting(null);
            }}
            onCancel={() => setDeleting(null)}
          />
        )}
        </div>
        <TableComponent
          schema={SkillSchema}
          data={skills}
          setEditing={setEditing}
          setDeleting={setDeleting}
        />
        <FormComponent
          schema={SkillSchema}
          data={editing}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

      </div>
    </section>
  );
}

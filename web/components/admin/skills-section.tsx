"use client";

import type { ModelSchema } from "@/types/admin-types";
import TableComponent from "./table-component";
import { useResource } from "@/hooks/use-admin";
import FormComponent from "./form-component";

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
  if (loading) return <p>Loading skills…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const handleSubmit = async (data: Partial<Skill>) => {
    if (data.id) {
      await update(data.id, data);
    } else {
      await create(data);
    }
  };

  return (
    <section
      id="admin-skills"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <h1 className="text-2xl font-bold mb-6">Admin Skills Management</h1>
        <TableComponent schema={SkillSchema} data={skills} />
        <FormComponent
          schema={SkillSchema}
          data={{ id: "", name: "", category: "", proficiency: 0 }}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}

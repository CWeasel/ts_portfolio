"use client";

import type { ModelSchema } from "@/types/admin-types";
import AdminSection from "./admin-section";

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

export const AdminSkillsSection = () => <AdminSection schema={SkillSchema} />

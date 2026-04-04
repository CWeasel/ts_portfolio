import AdminSection from "./admin-section";
import type { ModelSchema } from "@/types/admin-types";

interface Role {
  id: string;
  company_id: string;
  skill_ids?: string[];
  title: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

const RoleSchema: ModelSchema<Role> = {
  name: "role",
  endpoint: "/admin/roles",
  fields: [
    { key: "company", label: "Company ID", type: "select", required: true, optionsEndpoint: "/admin/companies", optionLabelKey: "name" },
    { key: "skills", label: "Skills", type: "select", required: false, optionsEndpoint: "/admin/skills", optionLabelKey: "name", multiple: true },
    { key: "title", label: "Role Title", type: "text", required: true },
    { key: "start_date", label: "Start Date", type: "date", required: true },
    { key: "end_date", label: "End Date", type: "date", required: false },
    { key: "description", label: "Role Description", type: "text", required: false },
  ],
};

export const RolesAdminSection = () => <AdminSection schema={RoleSchema} />
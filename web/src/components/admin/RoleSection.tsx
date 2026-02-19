import { GenericAdminManager } from "./GenericAdminManager";
import type { ModelSchema } from "../../types/admin";

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
  endpoint: "http://localhost:3000/api/admin/roles",
  fields: [
    { key: "company_id", label: "Company ID", type: "select", required: true, optionsEndpoint: "http://localhost:3000/api/admin/companies", optionLabelKey: "name" },
    { key: "skill_ids", label: "Skills", type: "select", required: false, optionsEndpoint: "http://localhost:3000/api/admin/skills", optionLabelKey: "name", multiple: true },
    { key: "title", label: "Role Title", type: "text", required: true },
    { key: "start_date", label: "Start Date", type: "date", required: true },
    { key: "end_date", label: "End Date", type: "date", required: false },
    { key: "description", label: "Role Description", type: "text", required: false },
  ],
};

export const RolesAdmin = () => <GenericAdminManager schema={RoleSchema} />;
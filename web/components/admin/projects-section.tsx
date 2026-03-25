import AdminSection from "./admin-section";
import type { ModelSchema } from "@/types/admin-types";

interface Project {
  id: string;
  name: string;
  summary: string;
  description?: string;
  url?: string;
  repo_url?: string;
  start_date?: string;
  end_date?: string;
  skill_ids?: string[];
  featured?: boolean;
};

const ProjectSchema: ModelSchema<Project> = {
  name: "project",
  endpoint: "/admin/projects",
  fields: [
  { key: "skill_ids", label: "Skills", type: "select", required: false, optionsEndpoint: "/admin/skills", optionLabelKey: "name", multiple: true },
    {key:"name", label:"Project Name", type:"text", required: true },
    {key:"summary", label:"Project Summary", type:"text", required: true },
    {key:"description", label:"Project Description", type:"text", required: false },
    {key:"url", label:"Project URL", type:"text", required: false },
    {key:"repo_url", label:"Project Repository URL", type:"text", required: false },
    {key:"start_date", label:"Project Start Date", type:"date", required: false },
    {key:"end_date", label:"Project End Date", type:"date", required: false },
    {key:"featured", label:"Featured Project?", type:"boolean", required: false },
  ]
}

export const AdminProjectsSection = () => <AdminSection schema={ProjectSchema} />
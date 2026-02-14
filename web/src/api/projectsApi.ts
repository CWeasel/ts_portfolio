import { createCrudApi } from "./createCrudApi";

export type Project = {
  id: string;
  name: string;
  summary: string;
  description?: string;
  url?: string;
  repo_url?: string;
  start_date?: string;
  end_date?: string;
  featured?: boolean;
};

const BASE_URL = "http://localhost:3000/api/admin/projects";

export const projectsApi = createCrudApi<Project>(BASE_URL);

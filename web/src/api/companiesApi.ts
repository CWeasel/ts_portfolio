import { createCrudApi } from "./createCrudApi";

export type Company = {
  id: string;
  name: string;
  website?: string | null;
};

const BASE_URL = "http://localhost:3000/api/admin/companies";

export const companiesApi = createCrudApi<Company>(BASE_URL);

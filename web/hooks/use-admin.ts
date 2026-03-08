import { fetchData } from "./use-shared";

export async function loginAdmin(email: string, password: string) {
    return fetchData("/admin/login", "POST", { email, password });
};
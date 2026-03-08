import { fetchData } from "./use-shared";

export async function getSkills<T>() {
  return fetchData<T>("/skills");
}

export async function getProjects<T>() {
    const data = await fetchData<T[]>("/projects");
    return data;
}

export async function getExperiences<T>() {
    const data = await fetchData<T>("/roles");
    return data;
}

export async function getProfile<T>() {
    const data = await fetchData<T>("/profile");
    return data;
}
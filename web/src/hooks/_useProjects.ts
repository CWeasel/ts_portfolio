import { useResource } from "./useResource";
import { projectsApi, type Project } from "../api/projectsApi";

export function useProjects() {
  const { items, loading, error, reload, create, update, remove } = useResource<Project>(projectsApi as any);

  return {
    projects: items,
    loading,
    error,
    reload,
    create,
    update,
    remove,
  } as const;
}

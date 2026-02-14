import { useResource } from "./useResource";
import { skillsApi, type Skill } from "../api/skillsApi";

export function useSkills() {
  const { items, loading, error, reload, create, update, remove } = useResource<Skill>(skillsApi as any);

  return {
    skills: items,
    loading,
    error,
    reload,
    create,
    update,
    remove,
  };
}

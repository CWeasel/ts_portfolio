import { useResource } from "./useResource";
import { companiesApi, type Company } from "../api/companiesApi";

export function useCompanies() {
  const { items, loading, error, reload, create, update, remove } = useResource<Company>(companiesApi as any);

  return {
    companies: items,
    loading,
    error,
    reload,
    create,
    update,
    remove,
  } as const;
}

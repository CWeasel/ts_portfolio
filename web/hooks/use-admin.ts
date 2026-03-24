import { fetchData } from "./use-shared";
import { useEffect, useState } from "react";

export async function loginAdmin<T>(creds: T) {

  return fetchData<T>("/auth/login", "POST", creds);
}

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetchData<{ authenticated: boolean }>("/auth/me")
      .then((data: { authenticated: boolean }) => setAuthenticated(data.authenticated));
  }, []);

  return authenticated;
}

export function useResource<T extends { id: string }>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  endpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  endpoint = endpoint.startsWith("/admin") ? endpoint : `/admin${endpoint}`;

  async function load() {
    try {
      setLoading(true);
      const data: T[] = await fetchData(endpoint, "GET");
      setItems(data);
    } catch (error) {
      console.error("Error fetching resource:", error);
      setError("Error fetching resource");
    } finally {
      setLoading(false);
    }
  }

  async function create(data: Partial<T>) {
    try {
      const created: T = await fetchData(endpoint, "POST", data);
      setItems((prev) => [...prev, created]);
      return created;
    } catch (error) {
      console.error("Error creating resource:", error);
      setError("Error creating resource");
    }
  }

  async function update(id: string, data: Partial<T>) {
    try {
      const updated: T = await fetchData(`${endpoint}/${id}`, "PUT", data);
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      return updated;
    } catch (error) {
      console.error("Error updating resource:", error);
      setError("Error updating resource");
    }
  }

  async function remove(id: string) {
    try {
      await fetchData(`${endpoint}/${id}`, "DELETE");
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting resource:", error);
      setError("Error deleting resource");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, loading, error, reload: load, create, update, remove } as const;
}

import { useEffect, useState } from "react";

type CrudApi<T> = {
  list: () => Promise<T[]>;
  get?: (id: string) => Promise<T>;
  create: (data: any) => Promise<T>;
  update: (id: string, data: any) => Promise<T>;
  remove: (id: string) => Promise<void>;
};

export function useResource<T>(api: CrudApi<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.list();
      setItems(data);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load items");
    } finally {
      setLoading(false);
    }
  }

  async function create(data: any) {
    const created = await api.create(data);
    setItems((prev) => [...prev, created]);
    return created;
  }

  async function update(id: string, updates: Partial<T>) {
    const updated = await api.update(id, updates);
    setItems((prev) => prev.map((i: any) => (i.id === id ? updated : i)));
    return updated;
  }

  async function remove(id: string) {
    await api.remove(id);
    setItems((prev) => prev.filter((i: any) => i.id !== id));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    items,
    loading,
    error,
    reload: load,
    create,
    update,
    remove,
  } as const;
}

export function createCrudApi<T extends { id?: string }>(baseUrl: string) {
  const url = baseUrl.replace(/\/+$/g, "");

  return {
    async list(): Promise<T[]> {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch list");
      return res.json();
    },

    async get(id: string): Promise<T> {
      const res = await fetch(`${url}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch item");
      return res.json();
    },

    async create(data: Omit<T, "id">): Promise<T> {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        try {
          const err = await res.json();
          throw new Error(err?.error || "Failed to create item");
        } catch (e) {
          throw new Error("Failed to create item");
        }
      }
      return res.json();
    },

    async update(id: string, data: Partial<Omit<T, "id">>): Promise<T> {
      const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        try {
          const err = await res.json();
          throw new Error(err?.error || "Failed to update item");
        } catch (e) {
          throw new Error("Failed to update item");
        }
      }
      return res.json();
    },

    async remove(id: string): Promise<void> {
      const res = await fetch(`${url}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
    },
  };
}

export type Skill = {
  id: string;
  name: string;
  proficiency?: number | null;
  category?: string | null;
};

const BASE_URL = "http://localhost:3000/api/admin/skills";

export const skillsApi = {
  async list(): Promise<Skill[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
  },

  async get(id: string): Promise<Skill> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch skill");
    return res.json();
  },

  async create(data: Omit<Skill, "id">): Promise<Skill> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create skill");
    }

    return res.json();
  },

  async update(id: string, data: Partial<Omit<Skill, "id">>): Promise<Skill> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update skill");
    }

    return res.json();
  },

  async remove(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete skill");
  },
};

import type { FastifyInstance } from "fastify";

export const getSkills = async (app: FastifyInstance, id: string | null = null) => {
  if (!id) {
    const { rows } = await app.pg.query(`
      SELECT id, name, category, proficiency, created_at, updated_at
      FROM skills
      ORDER BY category, name
    `);
    return rows;
  } else {
    const { rows } = await app.pg.query(
      `
        SELECT id, name, category, proficiency, created_at, updated_at
        FROM skills
        WHERE id = $1
        `,
      [id],
    );
    return rows;
  }
};

export const createSkill = async (
  app: FastifyInstance,
  name: string,
  proficiency?: number,
  category?: string,
) => {
  if (!name || name.trim() === "") {
    throw new Error("Skill name is required.");
  }

  if (proficiency !== undefined && (proficiency < 1 || proficiency > 5)) {
    throw new Error("Proficiency must be between 1 and 5.");
  }

  const { rows } = await app.pg.query(
    `
        INSERT INTO skills (name, proficiency, category)
        VALUES ($1, $2, $3)
        RETURNING id, name, category, proficiency, created_at, updated_at
        `,
    [name.trim(), proficiency ?? null, category?.trim() || null],
  );

  return rows[0];
};

export const deleteSkill = async (app: FastifyInstance, id: string) => {
  // Check if skill exists
  const existingSkills = await getSkills(app, id);
  if (existingSkills.length === 0) {
    throw new Error("Skill not found.");
  }

  const { rows } = await app.pg.query(
    `
        DELETE FROM skills
        WHERE id = $1
        RETURNING id, name, category, proficiency, created_at, updated_at
      `,
    [id],
  );
  return rows[0];
};
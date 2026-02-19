import type { FastifyInstance } from "fastify";
import { get } from "node:http";

export const getProjects = async (
  app: FastifyInstance,
  id: string | null = null,
) => {
  if (!id) {
    const { rows } = await app.pg.query(`
      select id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
      from projects
      order by start_date desc
    `);
    return rows;
  } else {
    const { rows } = await app.pg.query(
      `
        select id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
        from projects
        where id = $1
        `,
      [id],
    );
    if (rows.length === 0) {
      throw new Error("Project not found.");
    }
    return rows;
  }
};

export const createProject = async (
  app: FastifyInstance,
  name: string,
  summary: string,
  description?: string,
  url?: string,
  repo_url?: string,
  start_date?: string,
  end_date?: string,
  featured?: boolean,
) => {
  const { rows } = await app.pg.query(
    `
        insert into projects (name, summary, description, url, repo_url, start_date, end_date, featured)
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
        `,
    [
      name.trim(),
      summary.trim(),
      description?.trim() || null,
      url?.trim() || null,
      repo_url?.trim() || null,
      start_date || null,
      end_date || null,
      featured || false,
    ],
  );

  return rows[0];
};

export const updateProject = async (
  app: FastifyInstance,
  id: string,
  name?: string,
  summary?: string,
  description?: string,
  url?: string,
  repo_url?: string,
  start_date?: string,
  end_date?: string,
  featured?: boolean,
) => {
  // Check if project exists
  const existingRows = await getProjects(app, id);

  // Build update query dynamically
  const updates: string[] = [];
  const values: (string | boolean | null)[] = [];
  let paramCount = 1;

  if (name !== undefined) {
    updates.push(`name = $${paramCount}`);
    values.push(name.trim());
    paramCount++;
  }

  if (summary !== undefined) {
    updates.push(`summary = $${paramCount}`);
    values.push(summary.trim());
    paramCount++;
  }

  if        (description !== undefined) {
    updates.push(`description = $${paramCount}`);
    values.push(description.trim() || null);
    paramCount++;
  }

  if (url !== undefined) {
    updates.push(`url = $${paramCount}`);
    values.push(url.trim() || null);
    paramCount++;
  }

  if (repo_url !== undefined) {
    updates.push(`repo_url = $${paramCount}`);
    values.push(repo_url.trim() || null);
    paramCount++;
  }

  if (start_date !== undefined) {
    updates.push(`start_date = $${paramCount}`);
    values.push(start_date || null);
    paramCount++;
  }

  if (end_date !== undefined) {
    updates.push(`end_date = $${paramCount}`);
    values.push(end_date || null);
    paramCount++;
  }

  if (featured !== undefined) {
    updates.push(`featured = $${paramCount}`);
    values.push(featured);
    paramCount++;
  }

  if (updates.length === 0) {
    throw new Error("No fields to update.");
  }

  updates.push(`updated_at = now()`);
  values.push(id);

  const query = `
    UPDATE projects
    SET ${updates.join(", ")}
    WHERE id = $${paramCount}
    RETURNING id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
  `;

  const { rows } = await app.pg.query(query, values);

  if (rows.length === 0) {
    throw new Error("Project not found.");
  }

  return rows[0];
};

export const deleteProject = async (app: FastifyInstance, id: string) => {
  // Check if project exists
  const { rows: existingRows } = await app.pg.query(
    `select id from projects where id = $1`,
    [id],
  );

  if (existingRows.length === 0) {
    throw new Error("Project not found.");
  }

  const { rows } = await app.pg.query(
    `
        delete from projects
        where id = $1
        returning id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
        `,
    [id],
  );

  return rows[0];
};
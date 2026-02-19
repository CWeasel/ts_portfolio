import type { FastifyInstance } from "fastify";
import { getCompanies } from "../../controllers/admin/companies";

const endpoint: string = "/roles";

export const getRoles = async (
  app: FastifyInstance,
  id: string | null = null,
) => {
  if (!id) {
    const { rows } = await app.pg.query(`
      SELECT id, company_id, title, start_date, end_date, description
      FROM roles
      ORDER BY start_date DESC
    `);
    return rows;
  } else {
    const { rows } = await app.pg.query(
      `
        SELECT id, company_id, title, start_date, end_date, description
        FROM roles
        WHERE id = $1
        `,
      [id],
    );
    return rows;
  }
};

export const createRole = async (
  app: FastifyInstance,
  company_id: string,
  title: string,
  start_date: string,
  end_date?: string,
  description?: string,
) => {
  // Validate company exists
  const companyExists = await getCompanies(app, company_id.trim());
  if (companyExists.length === 0) {
    throw new Error("Company not found.");
  }
  const { rows } = await app.pg.query(
    `
        INSERT INTO roles (company_id, title, start_date, end_date, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, company_id, title, start_date, end_date, description
        `,
    [
      company_id.trim(),
      title.trim(),
      start_date.trim(),
      end_date?.trim() || null,
      description?.trim() || null,
    ],
  );

  return rows[0];
};

export const updateRole = async (
  app: FastifyInstance,
  id: string,
  company_id?: string,
  title?: string,
  start_date?: string,
  end_date?: string,
  description?: string,
) => {
  // Check if role exists
  const existingRows = await getRoles(app, id);

  if (existingRows.length === 0) {
    throw new Error("Role not found.");
  }

  // If company_id is being updated, validate the new company exists
  if (company_id) {
    const companyExists = await getCompanies(app, company_id.trim());
    if (companyExists.length === 0) {
      throw new Error("Company not found.");
    }
  }

  // Build update query dynamically
  const updates: string[] = [];
  const values: (string | null)[] = [];
  let paramCount = 1;

  if (company_id !== undefined) {
    updates.push(`company_id = $${paramCount}`);
    values.push(company_id.trim());
    paramCount++;
  }

  if (title !== undefined) {
    updates.push(`title = $${paramCount}`);
    values.push(title.trim());
    paramCount++;
  }

  if (start_date !== undefined) {
    updates.push(`start_date = $${paramCount}`);
    values.push(start_date.trim());
    paramCount++;
  }

  if (end_date !== undefined) {
    updates.push(`end_date = $${paramCount}`);
    values.push(end_date.trim());
    paramCount++;
  }

  if (description !== undefined) {
    updates.push(`description = $${paramCount}`);
    values.push(description.trim());
    paramCount++;
  }

  if (updates.length === 0) {
    throw new Error("No fields to update.");
  }

  updates.push(`updated_at = now()`);
  values.push(id);

  const { rows } = await app.pg.query(
    `
        UPDATE roles
        SET ${updates.join(", ")}
        WHERE id = $${paramCount}
        RETURNING id, company_id, title, start_date, end_date, description
        `,
    values,
  );

  return rows[0];
};

export const deleteRole = async (app: FastifyInstance, id: string) => {
  // Check if role exists
  const existingRows = await getRoles(app, id);
  if (existingRows.length === 0) {
    throw new Error("Role not found.");
  }

  const { rows } = await app.pg.query(
    `
        DELETE FROM roles
        WHERE id = $1
        RETURNING id, company_id, title, start_date, end_date, description, created_at, updated_at
      `,
    [id],
  );
  return rows[0];
};

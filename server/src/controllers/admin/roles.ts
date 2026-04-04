import type { FastifyInstance } from "fastify";
import { getCompanies } from "../../controllers/admin/companies.js";
import { updateSkillForRole } from "./role_skill.js";

const endpoint: string = "/roles";

export const getRoles = async (
  app: FastifyInstance,
  id: string | null = null,
) => {
  let query = `
    SELECT r.id, r.title, r.start_date, r.end_date, r.description,
      COALESCE(
        json_agg(
          json_build_object('id', s.id, 'name', s.name)
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS skills,
      json_build_object('id', c.id, 'name', c.name) AS company
    FROM roles r
    LEFT JOIN role_skills rs ON r.id = rs.role_id
    LEFT JOIN skills s ON rs.skill_id = s.id
    LEFT JOIN companies c ON r.company_id = c.id
    GROUP BY r.id, c.id
  `;
  if(id){
    query += ` WHERE r.id = $1 `;
  }
  const { rows } = await app.pg.query(query, id ? [id] : []);
  return rows;
};

export const createRole = async (
  app: FastifyInstance,
  company_id: string,
  title: string,
  start_date: string,
  end_date?: string,
  description?: string,
  skill_ids?: string[],
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

  const roleSkills = await updateSkillForRole(app, rows[0].id, skill_ids || []);

  return { ...rows[0], skills: roleSkills };
};

export const updateRole = async (
  app: FastifyInstance,
  id: string,
  company_id?: string,
  title?: string,
  start_date?: string,
  end_date?: string,
  description?: string,
  skill_ids?: string[],
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
  const roleSkills = await updateSkillForRole(app, rows[0].id, skill_ids || []);

  return { ...rows[0], skills: roleSkills };
};

export const deleteRole = async (app: FastifyInstance, id: string) => {
  // Check if role exists
  const existingRows = await getRoles(app, id);
  if (existingRows.length === 0) {
    throw new Error("Role not found.");
  }

  const emptySkills = await updateSkillForRole(app, id, []);

  const { rows } = await app.pg.query(
    `
        DELETE FROM roles
        WHERE id = $1
        RETURNING id, company_id, title, start_date, end_date, description, created_at, updated_at
      `,
    [id],
  );
  return { ...rows[0], skills: emptySkills };
};

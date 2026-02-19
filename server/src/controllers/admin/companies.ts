import type { FastifyInstance } from "fastify";

export const getCompanies = async (
  app: FastifyInstance,
  id: string | null = null,
) => {
  if (!id) {
    const { rows } = await app.pg.query(`
      select id, name, website, created_at, updated_at
      from companies
      order by created_at desc
    `);
    return rows;
  } else {
    const { rows } = await app.pg.query(
      `
        select id, name, website, created_at, updated_at
        from companies
        where id = $1
        `,
      [id],
    );
    return rows;
  }
};

export const createCompany = async (
  app: FastifyInstance,
  name: string,
  website?: string,
) => {
  const { rows } = await app.pg.query(
    `
        insert into companies (name, website)
        values ($1, $2)
        returning id, name, website, created_at, updated_at
        `,
    [name.trim(), website?.trim() || null],
  );

  return rows[0];
};

export const updateCompany = async (
  app: FastifyInstance,
  id: string,
  name?: string,
  website?: string,
) => {
  // Check if company exists
  const { rows: existingRows } = await app.pg.query(
    `select id from companies where id = $1`,
    [id],
  );

  if (existingRows.length === 0) {
    throw new Error("Company not found.");
  }

  // Build update query dynamically
  const updates: string[] = [];
  const values: (string | null)[] = [];
  let paramCount = 1;

  if (name !== undefined) {
    updates.push(`name = $${paramCount}`);
    values.push(name.trim());
    paramCount++;
  }

  if (website !== undefined) {
    updates.push(`website = $${paramCount}`);
    values.push(website.trim() || null);
    paramCount++;
  }

  if (updates.length === 0) {
    throw new Error("No changes found.");
  }

  updates.push(`updated_at = now()`);
  values.push(id);

  const { rows } = await app.pg.query(
    `
        update companies
        set ${updates.join(", ")}
        where id = $${paramCount}
        returning id, name, website, created_at, updated_at
        `,
    values,
  );
};

export const deleteCompany = async (app: FastifyInstance, id: string) => {
  const { rows } = await app.pg.query(
    `
        delete from companies
        where id = $1
        returning id, name, website, created_at, updated_at
        `,
    [id],
  );
  return rows[0];
};

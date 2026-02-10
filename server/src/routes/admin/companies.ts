import type { FastifyInstance } from "fastify";

export async function companyRoutes(app: FastifyInstance) {
  // GET all companies
  app.get("/companies", async (req, res) => {
    const { rows } = await app.pg.query(`
      select id, name, website, created_at, updated_at
      from companies
      order by created_at desc
    `);
    return rows;
  });

  // GET single company by id
  app.get<{ Params: { id: string } }>(
    "/companies/:id",
    async (req, res) => {
      const { id } = req.params;
      const { rows } = await app.pg.query(
        `
        select id, name, website, created_at, updated_at
        from companies
        where id = $1
        `,
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).send({ error: "Company not found" });
      }
      return rows[0];
    }
  );

  // POST create new company
  app.post<{ Body: { name: string; website?: string } }>(
    "/companies",
    async (req, res) => {
      const { name, website } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).send({ error: "Company name is required" });
      }

      const { rows } = await app.pg.query(
        `
        insert into companies (name, website)
        values ($1, $2)
        returning id, name, website, created_at, updated_at
        `,
        [name.trim(), website?.trim() || null]
      );

      return rows[0];
    }
  );

  // PUT update company
  app.put<{ Params: { id: string }; Body: { name?: string; website?: string } }>(
    "/companies/:id",
    async (req, res) => {
      const { id } = req.params;
      const { name, website } = req.body;

      // Check if company exists
      const { rows: existingRows } = await app.pg.query(
        `select id from companies where id = $1`,
        [id]
      );

      if (existingRows.length === 0) {
        return res.status(404).send({ error: "Company not found" });
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
        return res.status(400).send({ error: "No fields to update" });
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
        values
      );

      return rows[0];
    }
  );

  // DELETE company
  app.delete<{ Params: { id: string } }>(
    "/companies/:id",
    async (req, res) => {
      const { id } = req.params;

      const { rows } = await app.pg.query(
        `
        delete from companies
        where id = $1
        returning id, name, website, created_at, updated_at
        `,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).send({ error: "Company not found" });
      }

      return rows[0];
    }
  );
}
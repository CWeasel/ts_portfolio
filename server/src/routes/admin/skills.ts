import type { FastifyInstance } from "fastify";

export async function skillRoutes(app: FastifyInstance) {
  // GET all skills
  app.get("/skills", async (req, res) => {
    const { rows } = await app.pg.query(`
      select id, name, category, proficiency, created_at, updated_at
      from skills
      order by category, name
    `);
    return rows;
  });

  // GET single skill by id
  app.get<{ Params: { id: string } }>(
    "/skills/:id",
    async (req, res) => {
      const { id } = req.params;
      const { rows } = await app.pg.query(
        `
        select id, name, category, proficiency, created_at, updated_at
        from skills
        where id = $1
        `,
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).send({ error: "Skill not found" });
      }
      return rows[0];
    }
  );

  // POST create new skill
  app.post<{ Body: { name: string; proficiency?: number; category?: string } }>(
    "/skills",
    async (req, res) => {
      const { name, proficiency, category } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).send({ error: "Skill name is required" });
      }

      if (proficiency !== undefined && (proficiency < 1 || proficiency > 5)) {
        return res.status(400).send({ error: "Proficiency must be between 1 and 5" });
      }

      const { rows } = await app.pg.query(
        `
        insert into skills (name, proficiency, category)
        values ($1, $2, $3)
        returning id, name, category, proficiency, created_at, updated_at
        `,
        [name.trim(), proficiency ?? null, category?.trim() || null]
      );

      return res.status(201).send(rows[0]);
    }
  );

  // PUT update skill
  app.put<{
    Params: { id: string };
    Body: { name?: string; proficiency?: number; category?: string };
  }>(
    "/skills/:id",
    async (req, res) => {
      const { id } = req.params;
      const { name, proficiency, category } = req.body;

      // Check if skill exists
      const { rows: existingRows } = await app.pg.query(
        `select id from skills where id = $1`,
        [id]
      );

      if (existingRows.length === 0) {
        return res.status(404).send({ error: "Skill not found" });
      }

      if (proficiency !== undefined && (proficiency < 1 || proficiency > 5)) {
        return res.status(400).send({ error: "Proficiency must be between 1 and 5" });
      }

      // Build update query dynamically
      const updates: string[] = [];
      const values: (string | number | null)[] = [];
      let paramCount = 1;

      if (name !== undefined) {
        updates.push(`name = $${paramCount}`);
        values.push(name.trim());
        paramCount++;
      }

      if (proficiency !== undefined) {
        updates.push(`proficiency = $${paramCount}`);
        values.push(proficiency);
        paramCount++;
      }

      if (category !== undefined) {
        updates.push(`category = $${paramCount}`);
        values.push(category.trim() || null);
        paramCount++;
      }

      if (updates.length === 0) {
        return res.status(400).send({ error: "No fields to update" });
      }

      updates.push(`updated_at = now()`);
      values.push(id);

      const { rows } = await app.pg.query(
        `
        update skills
        set ${updates.join(", ")}
        where id = $${paramCount}
        returning id, name, category, proficiency, created_at, updated_at
        `,
        values
      );

      return rows[0];
    }
  );

  // DELETE skill
  app.delete<{ Params: { id: string } }>(
    "/skills/:id",
    async (req, res) => {
      const { id } = req.params;

      const { rows } = await app.pg.query(
        `
        delete from skills
        where id = $1
        returning id, name, category, proficiency, created_at, updated_at
        `,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).send({ error: "Skill not found" });
      }

      return rows[0];
    }
  );
}

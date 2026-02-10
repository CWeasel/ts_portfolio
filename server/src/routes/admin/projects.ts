import type { FastifyInstance } from "fastify";

export async function projectRoutes(app: FastifyInstance) {
  // GET all projects
  app.get("/projects", async (req, res) => {
    const { rows } = await app.pg.query(`
      select id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
      from projects
      order by start_date desc
    `);
    return rows;
  });

  // GET single project by id
  app.get<{ Params: { id: string } }>(
    "/projects/:id",
    async (req, res) => {
      const { id } = req.params;
      const { rows } = await app.pg.query(
        `
        select id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
        from projects
        where id = $1
        `,
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).send({ error: "Project not found" });
      }
      return rows[0];
    }
  );

  // POST create new project
  app.post<{
    Body: {
      name: string;
      summary: string;
      description?: string;
      url?: string;
      repo_url?: string;
      start_date?: string;
      end_date?: string;
      featured?: boolean;
    };
  }>(
    "/projects",
    async (req, res) => {
      const { name, summary, description, url, repo_url, start_date, end_date, featured } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).send({ error: "Project name is required" });
      }

      if (!summary || summary.trim() === "") {
        return res.status(400).send({ error: "Project summary is required" });
      }

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
          featured ?? false,
        ]
      );

      return rows[0];
    }
  );

  // PUT update project
  app.put<{
    Params: { id: string };
    Body: {
      name?: string;
      summary?: string;
      description?: string;
      url?: string;
      repo_url?: string;
      start_date?: string;
      end_date?: string;
      featured?: boolean;
    };
  }>(
    "/projects/:id",
    async (req, res) => {
      const { id } = req.params;
      const { name, summary, description, url, repo_url, start_date, end_date, featured } = req.body;

      // Check if project exists
      const { rows: existingRows } = await app.pg.query(
        `select id from projects where id = $1`,
        [id]
      );

      if (existingRows.length === 0) {
        return res.status(404).send({ error: "Project not found" });
      }

      // Build update query dynamically
      const updates: string[] = [];
      const values: (string | number | boolean | null)[] = [];
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

      if (description !== undefined) {
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
        return res.status(400).send({ error: "No fields to update" });
      }

      updates.push(`updated_at = now()`);
      values.push(id);

      const { rows } = await app.pg.query(
        `
        update projects
        set ${updates.join(", ")}
        where id = $${paramCount}
        returning id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
        `,
        values
      );

      return rows[0];
    }
  );

  // DELETE project
  app.delete<{ Params: { id: string } }>(
    "/projects/:id",
    async (req, res) => {
      const { id } = req.params;

      const { rows } = await app.pg.query(
        `
        delete from projects
        where id = $1
        returning id, name, summary, description, url, repo_url, start_date, end_date, featured, created_at, updated_at
        `,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).send({ error: "Project not found" });
      }

      return rows[0];
    }
  );
}
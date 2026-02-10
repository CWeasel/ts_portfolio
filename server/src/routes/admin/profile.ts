import type { FastifyInstance } from "fastify";

export async function profileRoutes(app: FastifyInstance) {
  // GET profile (singleton - only one profile exists)
  app.get("/profile", async (req, res) => {
    const { rows } = await app.pg.query(`
      select id, full_name, headline, summary, location, email, github_url, linkedin_url, photo_url, created_at, updated_at
      from profile
      limit 1
    `);
    if (rows.length === 0) {
      return res.status(404).send({ error: "Profile not found" });
    }
    return rows[0];
  });

  // PUT update profile (singleton - always updates the one profile)
  app.put<{
    Body: {
      full_name?: string;
      headline?: string;
      summary?: string;
      location?: string;
      email?: string;
      github_url?: string;
      linkedin_url?: string;
      photo_url?: string;
    };
  }>(
    "/profile",
    async (req, res) => {
      const { full_name, headline, summary, location, email, github_url, linkedin_url, photo_url } = req.body;

      // Check if profile exists
      const { rows: existingRows } = await app.pg.query(
        `select id from profile limit 1`
      );

      if (existingRows.length === 0) {
        return res.status(404).send({ error: "Profile not found" });
      }

      // Build update query dynamically
      const updates: string[] = [];
      const values: (string | null)[] = [];
      let paramCount = 1;

      if (full_name !== undefined) {
        updates.push(`full_name = $${paramCount}`);
        values.push(full_name.trim());
        paramCount++;
      }

      if (headline !== undefined) {
        updates.push(`headline = $${paramCount}`);
        values.push(headline.trim());
        paramCount++;
      }

      if (summary !== undefined) {
        updates.push(`summary = $${paramCount}`);
        values.push(summary.trim() || null);
        paramCount++;
      }

      if (location !== undefined) {
        updates.push(`location = $${paramCount}`);
        values.push(location.trim() || null);
        paramCount++;
      }

      if (email !== undefined) {
        updates.push(`email = $${paramCount}`);
        values.push(email.trim() || null);
        paramCount++;
      }

      if (github_url !== undefined) {
        updates.push(`github_url = $${paramCount}`);
        values.push(github_url.trim() || null);
        paramCount++;
      }

      if (linkedin_url !== undefined) {
        updates.push(`linkedin_url = $${paramCount}`);
        values.push(linkedin_url.trim() || null);
        paramCount++;
      }

      if (photo_url !== undefined) {
        updates.push(`photo_url = $${paramCount}`);
        values.push(photo_url.trim() || null);
        paramCount++;
      }

      if (updates.length === 0) {
        return res.status(400).send({ error: "No fields to update" });
      }

      updates.push(`updated_at = now()`);

      const { rows } = await app.pg.query(
        `
        update profile
        set ${updates.join(", ")}
        returning id, full_name, headline, summary, location, email, github_url, linkedin_url, photo_url, created_at, updated_at
        `,
        values
      );

      return rows[0];
    }
  );
}
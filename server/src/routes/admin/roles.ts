import type { FastifyInstance } from "fastify";

export async function roleRoutes(app: FastifyInstance) {
  app.get("/roles", async (req, res) => {
    const { rows } = await app.pg.query(
      `
            SELECT title, start_date, end_date, description
            FROM roles
            `,
    );
    return rows;
  });

  app.get<{ Params: { id: string } }>("/roles/:id", async (req, res) => {
    const { id } = req.params;
    const { rows } = await app.pg.query(
      `
            SELECT title, start_date, end_date, description
            FROM roles
            WHERE id = $1
        `,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).send({ error: "Role not found" });
    }

    return rows[0];
  });

  app.post<{
    Body: {
      title: string;
      start_date: string;
      end_date?: string;
      description?: string;
    };
  }>("/roles", async (req, res) => {
    const { title, start_date, end_date, description } = req.body;
    
    if (!title || title.trim() === "") {
      return res.status(400).send({ error: "Role title is required" });
    }

    if (!start_date || start_date.trim() === "") {
      return res.status(400).send({ error: "Role start date is required" });
    }

    const { rows } = await app.pg.query(
        `
        INSERT into roles (title, start_date, end_date, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, start_date, end_date, description, created_at, updated_at
        `,[
            title.trim(),
            start_date,
            end_date || null,
            description?.trim() || null
        ]
    );

    if (rows.length === 0){
        return res.status(404).send({error: "Role not found"});
    }

    return rows[0];
  });
}

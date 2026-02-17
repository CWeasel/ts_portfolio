import type { FastifyInstance } from "fastify";

async function validateCompanyExists(
  app: FastifyInstance,
  companyId: string,
): Promise<boolean> {
  const { rows } = await app.pg.query(
    `SELECT id FROM companies WHERE id = $1`,
    [companyId],
  );
  return rows.length > 0;
}

export async function roleRoutes(app: FastifyInstance) {
  app.get("/roles", async (req, res) => {
    const { rows } = await app.pg.query(
      `
            SELECT company_id, title, start_date, end_date, description
            FROM roles
            `,
    );
    return rows;
  });

  app.get<{ Params: { id: string } }>("/roles/:id", async (req, res) => {
    const { id } = req.params;
    const { rows } = await app.pg.query(
      `
            SELECT company_id, title, start_date, end_date, description
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
      company_id: string;
      title: string;
      start_date: string;
      end_date?: string;
      description?: string;
    };
  }>("/roles", async (req, res) => {
    const { company_id, title, start_date, end_date, description } = req.body;

    if(!company_id || company_id.trim() === ""){
      return res.status(400).send({ error: "Company is required" });
    }

    const companyExists = await validateCompanyExists(app, company_id.trim());
    if (!companyExists) {
      return res.status(400).send({ error: "Company not found" });
    }
    
    if (!title || title.trim() === "") {
      return res.status(400).send({ error: "Role title is required" });
    }

    if (!start_date || start_date.trim() === "") {
      return res.status(400).send({ error: "Role start date is required" });
    }

    const { rows } = await app.pg.query(
        `
        INSERT into roles (company_id, title, start_date, end_date, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, company_id, title, start_date, end_date, description, created_at, updated_at
        `,[
            company_id.trim(), 
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

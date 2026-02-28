import type { FastifyInstance } from "fastify";
import { getCompanies, createCompany, updateCompany, deleteCompany } from "../../controllers/admin/companies.ts";

export async function companyRoutes(app: FastifyInstance) {
  // GET all companies
  app.get("/companies", async (req, res) => {
    const rows = await getCompanies(app);
    return rows;
  });

  // GET single company by id
  app.get<{ Params: { id: string } }>(
    "/companies/:id",
    async (req, res) => {
      const { id } = req.params;
     const rows = await getCompanies(app, id);
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

      return await createCompany(app, name, website);
    }
  );

  // PUT update company
  app.put<{ Params: { id: string }; Body: { name?: string; website?: string } }>(
    "/companies/:id",
    async (req, res) => {
      const { id } = req.params;
      const { name, website } = req.body;

      return await updateCompany(app, id, name, website);
    }
  );

  // DELETE company
  app.delete<{ Params: { id: string } }>(
    "/companies/:id",
    async (req, res) => {
      const { id } = req.params;

      return await deleteCompany(app, id);
    }
  );
}
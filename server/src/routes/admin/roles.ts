import type { FastifyInstance } from "fastify";
import { getRoles, createRole, updateRole, deleteRole } from "../../controllers/admin/roles";

const endpoint:string = "/roles";

export async function roleRoutes(app: FastifyInstance) {
  app.get(endpoint, async (req, res) => {
    return await getRoles(app);
  });

  app.get<{ Params: { id: string } }>(`${endpoint}/:id`, async (req, res) => {
    const { id } = req.params;
    const rows = await getRoles(app, id);

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
      skill_ids?: string[],
    };
  }>(endpoint, async (req, res) => {
    const { company_id, title, start_date, end_date, description, skill_ids } = req.body;

    if(!company_id || company_id.trim() === ""){
      return res.status(400).send({ error: "Company is required" });
    }
    
    if (!title || title.trim() === "") {
      return res.status(400).send({ error: "Role title is required" });
    }

    if (!start_date || start_date.trim() === "") {
      return res.status(400).send({ error: "Role start date is required" });
    }

    const rows = await createRole(
      app,
      company_id,
      title,
      start_date,
      end_date,
      description,
      skill_ids
    );

    if (rows.length === 0){
        return res.status(404).send({error: "Role not found"});
    }

    return rows[0];
  });

  app.put<{
    Params:{
      id:string;
    },
    Body: {
      company_id: string;
      title: string;
      start_date: string;
      end_date?: string;
      description?: string;
      skill_ids?: string[],
    };
  }>(`${endpoint}/:id`, async (req, res) =>{
    const { id } = req.params;
    const { company_id, title, start_date, end_date, description, skill_ids } = req.body;
    
    if(!company_id || company_id.trim() === ""){
      return res.status(400).send({ error: "Company is required" });
    }

    const rows = await updateRole(
      app,
      id,
      company_id,
      title,
      start_date,
      end_date,
      description,
      skill_ids,
    );

    if (rows.length === 0) {
      return res.status(404).send({ error: "Role not found" });
    }

    return rows[0];
  });

  app.delete<{ Params: { id: string } }>(`${endpoint}/:id`, async (req, res) => {
    const { id } = req.params;

    const rows = await deleteRole(app, id);

    if (rows.length === 0) {
      return res.status(404).send({ error: "Role not found" });
    }

    return rows[0];
  });
}
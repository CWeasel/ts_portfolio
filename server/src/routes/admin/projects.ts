import type { FastifyInstance } from "fastify";
import { getProjects, createProject, updateProject, deleteProject } from "../../controllers/admin/projects";

export async function projectRoutes(app: FastifyInstance) {
  // GET all projects
  app.get("/projects", async (req, res) => {
    return await getProjects(app);
  });

  // GET single project by id
  app.get<{ Params: { id: string } }>(
    "/projects/:id",
    async (req, res) => {
      const { id } = req.params;
      const rows = await getProjects(app, id);
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

      const rows = await createProject(
        app,
        name,
        summary,
        description,
        url,
        repo_url,
        start_date,
        end_date,
        featured,
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

      const rows = await updateProject(
        app,
        id,
        name,
        summary,
        description,
        url,
        repo_url,
        start_date,
        end_date,
        featured,
      );

      return rows[0];
    }
  );

  // DELETE project
  app.delete<{ Params: { id: string } }>(
    "/projects/:id",
    async (req, res) => {
      const { id } = req.params;

      const rows = await deleteProject(app, id);

      return rows[0];
    }
  );
}
import type { FastifyInstance } from "fastify";
import { authenticateAdmin } from "../controllers/admin/authentication.ts";

export async function authenticationRoutes(app: FastifyInstance) {
  app.post<{ Body: { email: string; password: string } }>(
    "/login",
    async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .send({ error: "Email and password are required" });
      }

      try {
        const user = await authenticateAdmin(app, email, password);
        req.session.adminUserId = user.id;
        
      return { ok: true };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        app.log.warn(`Login attempt failed for ${email}: ${errorMessage}`);
        return res.status(401).send({ error: "Invalid credentials" });
      }
    },
  );

  app.post("/logout", async (req, res) => {
    req.destroySession();
    return { ok: true };
  });

  app.get("/me", async (req) => {
    if (!req.session.adminUserId) {
      return { authenticated: false };
    }

    return { authenticated: true };
  });
}

import type { FastifyInstance } from "fastify";
import { authenticateAdmin } from "../controllers/admin/authentication.ts";

export async function authenticationRoutes(app: FastifyInstance) {
  app.post<{ Body: { username: string; password: string } }>(
    "/login",
    async (req, res) => {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .send({ error: "Username and password are required" });
      }

      try {
        const user = await authenticateAdmin(app, username, password);
        req.session.adminUserId = user.id;
        return { message: "Login successful" };
      } catch (error) {
        return res.status(401).send({ error: "Invalid credentials" });
      }
      return { ok: true };
    },
  );

  app.post("/logout", async (req, res) => {
    req.destroySession();
    return { ok: true };
  });

  app.get("/api/auth/me", async (req) => {
    if (!req.session.adminUserId) {
      return { authenticated: false };
    }

    return { authenticated: true };
  });
}

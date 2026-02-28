import type { FastifyInstance } from "fastify";
import { companyRoutes } from "./companies.ts";
import { profileRoutes } from "./profile.ts";
import { projectRoutes } from "./projects.ts";
import { skillRoutes } from "./skills.ts";
import { roleRoutes } from "./roles.ts";

export async function requireAdmin(req: any, res: any) {
  if (!req.session.adminUserId) {
    return res.status(401).send({ error: "Unauthorized" });
  }
}

export default async function adminRoutes(app: FastifyInstance) {
  app.register(companyRoutes);
  app.register(profileRoutes);
  app.register(projectRoutes);
  app.register(skillRoutes);
  app.register(roleRoutes);
}

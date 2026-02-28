import type { FastifyInstance } from "fastify";
import { companyRoutes } from "./companies.ts";
import { profileRoutes } from "./profile.ts";
import { projectRoutes } from "./projects.ts";
import { skillRoutes } from "./skills.ts";
import { roleRoutes } from "./roles.ts";
import { authenticationRoutes } from "../authentication.ts";

export default async function adminRoutes(app: FastifyInstance) {
  app.register(companyRoutes);
  app.register(profileRoutes);
  app.register(projectRoutes);
  app.register(skillRoutes);
  app.register(roleRoutes);
  app.register(authenticationRoutes);
}

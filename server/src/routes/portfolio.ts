import type { FastifyInstance } from "fastify";
import * as portController from "../controllers/portfolio.ts";

async function portfolioRoutes(app: FastifyInstance) {
  app.get("/skills", async () => {
    const skills = await portController.getSkills(app);
    return skills;
  });
  app.get("/roles", async () => {
    const roles = await portController.getRoles(app);
    return roles;
  });
  app.get("/projects", async () => {
    const projects = await portController.getFeaturedProjects(app);
    return projects;
  });
  app.get("/profile", async () => {
    const profile = await portController.getProfile(app);
    return profile;
  });
}

export default portfolioRoutes;

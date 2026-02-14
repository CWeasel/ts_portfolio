import type { FastifyInstance } from "fastify";
import { companyRoutes } from "./companies.js";
import { profileRoutes } from "./profile.js";
import { projectRoutes } from "./projects.js";
import { skillRoutes } from "./skills.js";

export default async function adminRoutes(app:FastifyInstance){
    app.register(companyRoutes);
    app.register(profileRoutes);
    app.register(projectRoutes);
    app.register(skillRoutes);
}


import type { FastifyInstance } from "fastify";
import { authenticationRoutes } from "./authentication.ts";
import  portfolioRoutes from "./portfolio.ts";

export default function portfolioGroupedRoutes(app: FastifyInstance) {
  app.register(authenticationRoutes);
  app.register(portfolioRoutes);
}

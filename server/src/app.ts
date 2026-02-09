import "dotenv/config";
import Fastify, { fastify } from "fastify";
import fastifyPostgres from "@fastify/postgres";
import cors from "@fastify/cors";
import portfolioRoutes from "./routes/portfolio.js";
import adminRoutes from "./routes/admin.js";
import { createDB } from "./db/postgresql.js";

export const buildApp = () => {
  const app = Fastify({
    logger: true,
  });

  // Register Cors plugin
  app.register(cors, {
    origin: "http://localhost:5173",
  });

  // Register and make 'pg' available throughout the app
  app.register(fastifyPostgres, {
    host: process.env.DATABASE_SERVER,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });

  const db = createDB(app);
  app.decorate("db", db);

  // Register routes
  app.register(portfolioRoutes, { prefix: "/api" });
  app.register(adminRoutes, { prefix: "/api/admin" });

  return app;
};

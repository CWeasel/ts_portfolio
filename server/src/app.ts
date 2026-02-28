import "dotenv/config";
import Fastify, { fastify } from "fastify";
import fastifyPostgres from "@fastify/postgres";
import cors from "@fastify/cors";
import portfolioGroupedRoutes from "./routes/portfolio.router.ts";
import healthRoutes from "./routes/health.ts";
import { createDB } from "./db/postgresql.ts";
import adminRoutes from "./routes/admin/admin.routes.ts";
import cookie from "@fastify/cookie";
import session from "@fastify/session";

export const buildApp = () => {
  const app = Fastify({
    logger: true,
  });
  app.log.level = "debug";

  // Register Cors plugin
  app.register(cors, {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });
  
  // Register cookie and session plugins
  app.register(cookie);
  app.register(session, {
    secret: process.env.SESSION_SECRET || "default_session_secret",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
    },
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
  app.register(portfolioGroupedRoutes, { prefix: "/api" });
  app.register(adminRoutes, { prefix: "/api/admin" });
  app.register(healthRoutes, { prefix: "/api/health" });

  return app;
};

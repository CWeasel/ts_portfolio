import Fastify from "fastify";
import cors from "@fastify/cors";
import portfolioRoutes from "./routes/portfolio.js";

export const buildApp = () => {
    const app = Fastify({
        logger: true,
    });

    // Register Cors plugin
    app.register(cors, {
        origin: "http://localhost:5173",
    })

    // Register routes
    app.register(portfolioRoutes, { prefix: "/api"});

    return app;
};
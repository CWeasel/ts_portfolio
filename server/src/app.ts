import Fastify from "fastify";
import portfolioRoutes from "./routes/portfolio.js";

export const buildApp = () => {
    const app = Fastify({
        logger: true,
    });

    // Register routes
    app.register(portfolioRoutes, { prefix: "/api"});

    return app;
};
import fastify from "fastify";

declare module "fastify" {
    interface Session {
        adminUserId?: string;
    }
};
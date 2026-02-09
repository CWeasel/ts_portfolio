import "fastify";
import type { DB } from "../db/postgresql.ts";

declare module "fastify"{
    interface FastifyInstance{
        db: DB;
    }
}
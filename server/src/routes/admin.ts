import { fastify, type FastifyInstance } from "fastify";

async function adminRoutes(app: FastifyInstance){
    app.get("/health/db", async() => {
        const result = await app.pg.query("select now()");
        return { ok: true, time: result.rows[0].now };
    })
}

export default adminRoutes;
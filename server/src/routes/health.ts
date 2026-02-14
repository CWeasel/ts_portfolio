import { fastify, type FastifyInstance } from "fastify";

async function healthRoutes(app: FastifyInstance){
    app.get("/db", async() => {
        const result = await app.pg.query("select now()");
        return { ok: true, time: result.rows[0].now };
    })
}

export default healthRoutes;
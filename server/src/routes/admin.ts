import type { FastifyInstance } from "fastify";

export function blocksRoutes(app: FastifyInstance) {
  app.patch<{
    Params: { id: string };
    Body: { data: any };
  }>("/blocks/:id", async (request, reply) => {
    const { id: id } = request.params;
    const { data: data } = request.body;

    app.log.debug(`Patching: ${data}`);

    const { rowCount, rows } = await app.pg.query(
      `
      update blocks
      set config = $1,
      updated_at = now()
      where id = $2
      returning *
      `,
      [data, id],
    );

    if (rowCount === 0) {
      return reply.status(404).send({ error: "Block not found" });
    }

    return rows[0];
  });
}

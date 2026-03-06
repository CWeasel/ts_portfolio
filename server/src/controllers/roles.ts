import type { FastifyInstance } from "fastify";

export const getRoles = async (app: FastifyInstance) => {
    const query = `
    SELECT id, name, company, start_date, end_date, description FROM roles r
    INNER JOIN companies c ON r.company_id = c.id
    ORDER BY start_date DESC;
    `;
    const { rows } = await app.pg.query(query);
    return rows;
}
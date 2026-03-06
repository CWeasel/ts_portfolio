import type { FastifyInstance } from "fastify";

export const getFeaturedProjects = async (app:FastifyInstance) => {
    const query = 
    `
    SELECT p.id, p.name, p.description, p.url, STRING_AGG(s.name, ',') as tags FROM projects p
    LEFT JOIN project_skills ps ON p.id = ps.project_id
    LEFT JOIN skills s ON ps.skill_id = s.id
    WHERE p.featured = true
    GROUP BY p.id
    ORDER BY p.start_date DESC
    LIMIT 3;
    `;
    const { rows } = await app.pg.query(query);

    if (rows.length === 0) {
        return [];
    }
    return rows;
}
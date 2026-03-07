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

export const getSkills = async (app: FastifyInstance, id: string | null = null) => {
  if (!id) {
    const { rows } = await app.pg.query(`
      SELECT id, name, category, proficiency, created_at, updated_at
      FROM skills
      ORDER BY category, name
    `);
    return rows;
  } else {
    const { rows } = await app.pg.query(
      `
        SELECT id, name, category, proficiency, created_at, updated_at
        FROM skills
        WHERE id = $1
        `,
      [id],
    );
    return rows;
  }
};

export const getProfile = async (app: FastifyInstance) => {
    const query = `
    SELECT full_name, headline, summary, photo_url, email, github_url, linkedin_url, location FROM profile LIMIT 1;
    `;
    const { rows } = await app.pg.query(query);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
};
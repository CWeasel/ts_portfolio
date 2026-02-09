import type { FastifyInstance } from "fastify";

export function createDB(app: FastifyInstance) {
  return {
    async getSkills() {
      const { rows } = await app.pg.query(
        "SELECT id, name, category, proficiency from skills order by proficiency desc",
      );
      return rows;
    },
    async getProfile() {
      const { rows } = await app.pg.query("SELECT * FROM profile LIMIT 1");
      return rows[0];
    },
    async getProjects({ limit = 3 } = {}) {
      const { rows } = await app.pg.query(
        `select id, name, summary, url, repo_url, start_date, end_date
        from projects
        where featured = true
        order by start_date desc nulls last
        limit $1`,
        [limit],
      );
      return rows;
    },
    async getExperience() {
      const { rows } = await app.pg.query(
        `select
          r.id,
          r.title,
          r.start_date,
          r.end_date,
          r.description,
          c.name as company
        from roles r
        join companies c on c.id = r.company_id
        order by r.start_date desc`,
      );
      return rows;
    },
  };
}

export type DB = ReturnType<typeof createDB>;
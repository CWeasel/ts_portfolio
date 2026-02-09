import type { FastifyInstance } from "fastify";

async function portfolioRoutes(app: FastifyInstance) {
  (app.get("/portfolio", async () => {
    const result = await app.pg.query("select 1 as ok");

    return {
      dbCheck: result.rows[0],
      profile: {
        name: "Your Name",
        title: "Fullstack Engineer",
        summary:
          "I build scalable web applications using TypeScript, React, Node, and PostgreSQL.",
      },
      sections: [
        {
          id: "about",
          type: "text",
          title: "About Me",
          content:
            "I enjoy building clean, maintainable systems and learning new technologies.",
        },
        {
          id: "skills",
          type: "list",
          title: "Skills",
          items: ["TypeScript", "React", "Node.js", "PostgreSQL", "Fastify"],
        },
      ],
    };
  }),
    app.get("/pages/:slug", async (request, reply) => {
      const { slug } = request.params as { slug: string };

      // 1) Get page
      const pageRes = await app.pg.query(
        "select id, slug, title from pages where slug = $1",
        [slug],
      );

      if (pageRes.rows.length === 0) {
        return reply.code(404).send({ error: "Page not found" });
      }

      const page = pageRes.rows[0];

      // 2) Get blocks in order
      const blocksRes = await app.pg.query(
        "select id, type, position, config from blocks where page_id = $1 order by position asc",
        [page.id],
      );

      const blocks = blocksRes.rows;

      // 3) Resolve block data dynamically
      const resolvedBlocks = [];

      for (const block of blocks) {
        switch (block.type) {
          case "hero": {
            const profile = await app.db.getProfile();
            resolvedBlocks.push({
              ...block,
              data: profile,
            });
            break;
          }

          case "skills": {
            const skills = await app.db.getSkills();
            resolvedBlocks.push({
              ...block,
              data: {
                title: block.config.title ?? "Skills",
                skills,
              },
            });
            break;
          }

          case "projects": {
            const limit = block.config.limit ?? 3;
            const projects = await app.db.getProjects({ limit });
            resolvedBlocks.push({
              ...block,
              data: {
                title: block.config.title ?? "Projects",
                projects,
              },
            });
            break;
          }

          case "experience": {
            const experience = await app.db.getExperience();
            resolvedBlocks.push({
              ...block,
              data: {
                title: block.config.title ?? "Experience",
                experience,
              },
            });
            break;
          }

          default:
            resolvedBlocks.push({ ...block, data: {} });
        }
      }

      return {
        slug: page.slug,
        title: page.title,
        blocks: resolvedBlocks,
      };
    }));
}

export default portfolioRoutes;

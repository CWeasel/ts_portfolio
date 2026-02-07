import type { FastifyInstance } from "fastify";

async function portfolioRoutes(app: FastifyInstance) {
  app.get("/portfolio", async () => {
    return {
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
  });
}

export default portfolioRoutes;

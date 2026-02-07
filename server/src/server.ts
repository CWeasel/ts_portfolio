import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return { message: "Hello, world" };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

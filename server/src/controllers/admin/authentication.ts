import type { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";

export const authenticateAdmin = async (
  app: FastifyInstance,
  username: string,
  password: string,
) => {
  const { rows } = await app.pg.query(
    `SELECT id, email, password_hash FROM admin_users WHERE email = $1`,
    [username.trim()],
  );

  if (rows.length === 0) {
    throw new Error("Invalid credentials.");
  }

  const user = rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials.");
  }

  return user;
}
import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "portfolio_backend",
  password: "Test1234",
  database: "portfolio_db",
});

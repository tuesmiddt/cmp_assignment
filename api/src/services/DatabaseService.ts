import knex from "knex";
import EnvVars from "@src/constants/EnvVars";

const db = knex({
  client: "pg",
  connection: EnvVars.DB.Connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
});

export default db;

import type { Knex } from "knex";
import EnvVars from "./constants/EnvVars";

const envConfig: Knex.Config = {
  client: "pg",
  connection: EnvVars.DB.Connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

const config: { [key: string]: Knex.Config } = {
  development: envConfig,
  staging: envConfig,
  production: envConfig,
};

module.exports = config;

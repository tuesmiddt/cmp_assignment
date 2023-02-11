import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("submissions", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.float("temperature").notNullable();
    table.boolean("has_symptoms").notNullable();
    table.boolean("has_contact").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("submissions");
}

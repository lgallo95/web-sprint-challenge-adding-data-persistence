exports.up = async function (knex) {
  await knex.schema
    .createTable("projects", (table) => {
      table.increments("project_id");
      table.text("project_name").notNullable();
      table.string("project_description");
      table.boolean("project_completed").defaultsTo(false);
    })
    .createTable("resources", (table) => {
      table.increments("resource_id");
      table.text("resource_name").notNullable().unique();
      table.string("resource_description");
    })
    .createTable("tasks", (table) => {
      table.increments("task_id");
      table.text("task_description").notNullable();
      table.string("task_notes");
      table.boolean("task_completed").defaultsTo(false);
      table
        .integer(`project_id`)
        .notNullable()
        .references("project_id")
        .inTable("projects");
    })
    .createTable("project_resources", (table) => {
      table.increments("project_resources_id");
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};

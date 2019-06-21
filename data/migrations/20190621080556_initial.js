exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('games', table => {
      table.increments();
      table.string('title', 128).notNullable().unique();
      table.string('genre', 64).notNullable();
      table.integer('releaseYear', 32);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('games');
};

import Knex from 'knex';
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('whatsapp');
        table.string('name');
        table.string('pushname');
        table.string('formatted_name');
        table.boolean('is_my_contact');
        table.boolean('is_user');
        table.boolean('is_me');
        table.string('image');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('users');
}


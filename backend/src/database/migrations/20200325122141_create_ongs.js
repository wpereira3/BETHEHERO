exports.up = function(knex) {
    /*metodo responsavel por criar uma migration (uma tabela)*/
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
};

exports.down = function(knex) {
    /*responsavel por remover uma tabela ex caso a tabela ong não possa ser criada*/
    return knex.schema.dropTable('ongs');
};
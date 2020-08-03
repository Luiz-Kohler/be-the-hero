//COMANDO PARA RODAS AS MIGRATIONS: npx knex migrate:latest
//CRIANDO UMA TABELA ONGS
exports.up = function(knex) {
    //COMANDO PARA CRIAR UMA TABELA
    return knex.schema.createTable('ongs', function(table) {
        //INFORMANDO QUE O ID VAI SER A PRIMARY KEY / IDENTIFICADOR
        table.string('id').primary()
            // COLUNA NAME É UMA STRING E NÃO PODE SER NULL
        table.string('name').notNullable()
            // COLUNA EMAIL É UMA STRING E NÃO PODE SER NULL
        table.string('email').notNullable()
            // COLUNA WHATSAPP É UMA STRING E NÃO PODE SER NULL
        table.string('whatsapp').notNullable()
            // COLUNA CITY É UMA STRING E NÃO PODE SER NULL
        table.string('city').notNullable()
            // COLUNA UF É UMA STRING QUE ACEITA SOMENTE 2 CARACTERES E NÃO PODE SER NULL
        table.string('uf', 2).notNullable()
    })
};

//CASO ALGO DE ERRADO, PODEMOS USAR ESTE METODO COMO BACKDOOR
exports.down = function(knex) {
    //COMANDO PARA DERRUBAR A TABELA
    return knex.schema.dropTable('ongs')
};
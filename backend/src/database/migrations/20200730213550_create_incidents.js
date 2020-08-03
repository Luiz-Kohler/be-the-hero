//COMANDO PARA RODAS AS MIGRATIONS: npx knex migrate:latest
//CRIANDO TABELA INCIDENTS
exports.up = function(knex) {
    //METODO PARA CRIAR UMA TABELA
    return knex.schema.createTable('incidents', function(table) {
        //PRIMARY KEY / ID DA TABELA VAI SER INCREMENTADO AUTOMATICAMENTE
        table.increments()
            //A COLUNA title VAI SER UMA STRING E NÃO PODE SER NULL
        table.string('title').notNullable()
            //A COLUNA description VAI SER UMA STRING E NÃO PODE SER NULL
        table.string('description').notNullable()
            //A COLUNA value VAI SER UM NUMERO COM CASAS DEPOIS DA VIRGULA E NÃO PODE SER NULL
        table.decimal('value').notNullable()

        table.string('ong_id').notNullable()
        table.foreign('ong_id').references('id').inTable('incidents')
    })
};

//CASO ALGO DE ERRADO, PODEMOS USAR ESTE METODO COMO BACKDOOR
exports.down = function(knex) {
    //METODO PARA DERRUBAR A TABELA INCIDENTS
    return knex.schema.dropTable('incidents')
};
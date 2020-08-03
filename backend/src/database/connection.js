//IMPORTANDO OS MODULOS
const knex = require('knex')
const config = require('../../knexfile')

//CRIANDO UMA CONEXÃO COM AS CONFIGURAÇÕES DO knexfile
const connectionDB = knex(config.development)

//EXPORTANDO A CONEXÃO
module.exports = connectionDB;
//IMPORTANDO A CONEXÃO QUE NOS ABRIMOS
const connectionDB = require('../database/connection')

//IMPORTANTO O MODULO DE CRIPTOGRAFIA
const crypto = require('crypto');

//EXPORTANDO TALS METODOS
module.exports = {

    //METODO ASSÍNCRONO PARA BUSCAR TODAS AS ONGS CADASTRADAS NO BANCO
    async getAll(request, response) {
        //BUSCANDO TODAS AS ONGS DO BANCO E COLOCANDO NA CONSTANTE
        const ongs = await connectionDB('ongs').select('*')
            //RETORNANDO AS ONGS EM FORMATO JSON
        return response.json(ongs);
    },

    //METODO ASSÍNCRONO CREATE, PARA CRIAR UM ONG
    async create(request, response) {

        //DO CORPO DA REQUISIÇÃO ESTOU PEGANDO OS VALORES DOS CAMPOS ( name, email, whatsapp, city, uf)
        const { name, email, whatsapp, city, uf } = request.body

        //GERANDO UM ID COM CRIPTOGRAFIA
        const id = crypto.randomBytes(4).toString('HEX')

        //INSERINDO NA TABELA ONGS OS VALORES BUSCADO DO CORPO DA REQUISIÇÃO
        await connectionDB('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        //RETORNANDO O ID EM JSON
        return response.json({ id })
    }
}
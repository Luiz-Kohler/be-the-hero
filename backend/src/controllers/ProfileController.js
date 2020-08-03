//IMPORTANDO A CONEXÃO COM O BANCO
const connectionDB = require('../database/connection')

//EXPORTANDO TAIS METODOS
module.exports = {

    //METODO PARA BUSCAR TODAS OS INCIDENTS DE UMA ONG
    async index(request, response) {
        //PEGANDO O ID DA ONG LOGADA PELO CAMPO AUTHORIZATION DO HEADER
        const ong_id = request.headers.authorization

        //PEGANDO ITENS NO BANCO NA TABELA INCIDENTS E PASSANDO PARA UMA CONSTANTE
        const incidents = await connectionDB('incidents')
            //ONDE O ID DA ONG DO CASO É IGUAL O ID DA ONG QUE ESTA REGISTRADO 
            .where('ong_id', ong_id)
            //PEGANDO TODOS OS CAMPOS
            .select('*')

        //RETORNANDO OS CASOS/INCIDENTS EM JSON
        return response.json(incidents)
    }
}
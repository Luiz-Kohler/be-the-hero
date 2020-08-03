//IMPORTANDO A CONEXÃO COM O BANCO DE DADOS
const connectionDB = require('../database/connection')

//EXPORTANDO TAL METODOS
module.exports = {

    //METODO ASSINCRONO QUE É RESPONSAVEL POR FAZER O LOGIN
    async login(request, response) {

        //PEGANDO O VALOR DO ID QUE O USUARIO INFORMOU NO CORPO DA REQUISIÇÃO
        const { id } = request.body

        //NA TABELA ONG DO BANCO, PEGANDO UM ITEM E COLOCANDO NA CONST ong
        const ong = await connectionDB('ongs')
            //ONDE O ID É IGUAL AO ID QUE O USUARIO INFORMOU NA REQUISIÇÃO
            .where('id', id)
            //TRAZENDO SOMENTE O NOME DA ONG
            .select('name')
            //NA PRIMEIRA ONG QUE ELE ACHA, ELE JA IRA RETORNAR SOMENTO UM ITEM, E NÃO UM ARRAY/VETOR/[]
            .first()

        //VERIFICANDO SE A CONST NÃO ENCONTROU UMA ONG COM O MESMO ID QUE O USUARIO INFORMOU
        if (!ong) {
            //CASO NÃO TENHA ACHADO VAI RETORNAR STATUS 400(BAD REQUEST) COM UM ERRO
            return response.status(400).json({ error: 'No ONG found with this ID' })
        }

        //CASO TENHA ACHADO IRA RETORNAR UM JSON COM SOMENTE A ONG
        return response.json(ong)
    }
}
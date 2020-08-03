//IMPORTANDO A CONEXÃO COM O BANCO DE DADOS
const connectionDB = require('../database/connection')

//EXPORTANDO TAL ITENS
module.exports = {
    //METODO DE CONTROLLER PARA PEGAR TODOS OS CASOS
    async getAll(request, response) {

        //PEGANDO O VALOR DA PAGE QUE É PASSADA PELA URL/QUERY, CASO NÃO ACHE NADA O VALOR PADRÃO SERA 1 
        //incidents?page=1
        const { page = 1 } = request.query

        //ARRAY COM TOTAL DE CASOS NO BANCO
        const [count] = await connectionDB('incidents').count()

        //BUSCAANDO NA TABELA INCIDENTS E COLOCANDO NA CONSTANTE
        const incidents = await connectionDB('incidents')
            //PARA PEGAR OS VALORES DA TABELA ONGS QUE É RELACIONADA AOS CASOS.
            //ONDE A O ID DA ONG TEM QUE SER IGUAL AO ID RELACIONADO DO CASO COM A ONG
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            //PEGANDO SOMENTE 5 NO TOTAL
            .limit(5)
            //PULANDO TAL CASOS
            .offset((page - 1) * 5)
            //SELECIONANDO OS VALORES QUE SERÃO ENVIADO
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])

        //PASSANDO O TOTAL DE ITENS PELO HEADER
        response.header('X-Total-Count', count['count(*)'])

        //RETORNANDO OS CASOS QUE ELE HAVIA BUSCADO DO BANCO
        return response.json(incidents)
    },

    //METODO DO CONTROLLER DE CRIAÇAO DE ENTIDADE
    async create(request, response) {
        //BUSCANDO OS VALORES (title, description, value) DO CORPO DA REQUISIÇÃO
        const { title, description, value } = request.body
            //PEGANDO O VALOR DO ID DA ONG DO CASO PELO HEADERS NO CAMPO AUTHORIZATION
        const ong_id = request.headers.authorization

        //NA TABELA incidents INSERINDO UMA ENTIDADE COM OS DADOS INFORMADOS
        //RETORNANDO O ID DA CRIAÇÃO DA ENTIDADE
        const [id] = await connectionDB('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        //RETORNANDO O ID
        return response.json({ id })
    },

    //METODO DO CONTROLLER DE REMOÇÃO DE ENTIDADE
    async delete(request, response) {
        //PEGANDO VALOR DO ID PELOS OS PARAMS: /incidents/:ID
        const { id } = request.params;
        //PEGANDO VALOR DA ID DA ONG QUE O USUARIO TA LOGADO PELO OS HEADERS NO CAMPO AUTHORIZATION
        const ong_id = request.headers.authorization;

        //NA TABELA incidents
        //ONDE O ID É IGUAL O ID DO PARAMETRO
        //BUSCANDO O SOMENTE O VALOR ong_id 
        const incident = await connectionDB('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //VERIFICANDO SE O ID DA ONG QUE O BANCO TROUXE É IGUAL DO HEADER DO USUARIO
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        //DELETANDO ITEM DA TABELA incidents COM ID SELECIONADO PELO O PARANS
        await connectionDB('incidents').where('id', id).delete();

        //RETORNANDO NO CONTENT
        return response.status(204).send();
    }
}
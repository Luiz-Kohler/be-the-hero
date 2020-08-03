//Para baixar o express basta o comando no CMD: "npm install express"
//Importa o express para criação da aplicacao
const express = require('express');
//Importando cors para segurança
const cors = require('cors');

//Cria a aplicação
const app = express();

//Importando as rotas
const routes = require('./routes')

//implementando o cors
app.use(cors())

//Converter json para um objeto em js
app.use(express.json())
    //Implementando as rotas criadas por mim
app.use(routes)

//Aplicaçao vai escutar a porta: localhost:3333
app.listen(3333)

//Para rodar o programa deve digitar no CMD: "node index.js", index.js é o arquivo que você vai inicializar
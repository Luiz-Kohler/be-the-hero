//IMPORTANDO OS MODULOS
const express = require('express')

//IMPORTANDO OS CONTROLLER QUE CRIAMOS
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

//DECLARANDO AS ROTAS
const routes = express.Router()

//INFORMANDO AS ROTAS QUE NOS CRIAMOS NO CONTROLLER

//ROTAS DA ONG
routes.post('/ongs', OngController.create)
routes.get('/ongs', OngController.getAll)

//ROTA DOS CASOS
routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.getAll)
routes.delete('/incidents/:id', IncidentController.delete)

//ROTA DO PERFIL DA ONG LOGADA
routes.get('/profile', ProfileController.index)

//ROTAS PARA FAZER O LOGIN DA ONG
routes.post('/session', SessionController.login)

//EXPORTANDO AS ROTAS CRIADA
module.exports = routes
const express = require('express');

const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Criar rota de todas as Ongs cadastradas no BD
routes.get('/ongs',OngController.index);
// Criar Ong no BD
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

// Criar rota de todos os Incidents cadastrados no BD
routes.get('/incidents', IncidentController.index);
// Criar Incidents no BD
routes.post('/incidents', IncidentController.create);
// Deleta Incidents do BD
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
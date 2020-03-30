const express = require('express');
const routes = express.Router();
const ongController = require('./controller/ongController.js');
const incidentController = require('./controller/incidentController.js');
const profileController = require('./controller/profileController.js');
const sessionController = require('./controller/sessionController.js');
routes.post('/sessions', sessionController.create)
routes.post('/ongs', ongController.create);
routes.get('/ongs', ongController.index);
routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);
routes.get('/profile', profileController.index);

routes.delete('/incidents/:id', incidentController.delete);


module.exports = routes;
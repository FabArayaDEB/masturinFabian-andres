const express = require('express')
const Router = express.Router();
const asistenciaController = require('../controller/asistenciaController')

Router.post('/asistencias', asistenciaController.marcarEntrada);

module.exports = Router;
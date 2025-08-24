const express = require('express')
const Router = express.Router();
const asistenciaController = require('../controller/asistenciaController')

Router.post('/entrada', asistenciaController.marcarEntrada);
Router.post('/salida', asistenciaController.marcarSalida);

module.exports = Router;
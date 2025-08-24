const express = require('express');
const router = express.Router();
const atrasosController = require('../controller/atrasosController')
const anticipadasController = require('../controller/anticiposController')
const inasistenciasController = require('../controller/inasistenciasController')
const {verificarToken, verificarRol} = require('../middleware')


router.get('/reportes/atrasos', verificarToken, verificarRol('admin'), atrasosController.getAtrasos);
router.get('/reportes/anticipos', verificarToken, verificarRol('admin'), anticipadasController.getAnticipadas);
router.get('/inasistencias', verificarToken, verificarRol('admin'), inasistenciasController.getInasistencias);

module.exports = router;
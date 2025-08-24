const express = require('express');
const router = express.Router();
const atrasosController = require('../controller/atrasosController')
const anticipadasController = require('../controller/anticiposController')
const inasistenciasController = require('../controller/inasistenciasController')

router.get('/atrasos', atrasosController.getAtrasos);
router.get('/anticipos', anticipadasController.getAnticipadas);
router.get('/inasistencias', inasistenciasController.getInasistencias);

module.exports = router;
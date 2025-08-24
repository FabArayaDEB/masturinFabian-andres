const express = require('express');
const router = express.Router();
const atrasosController = require('../controller/atrasosController')
const anticipadasController = require('../controller/anticiposController')
const {verificarToken, verificarRol} = require('../middleware')


router.get('/reportes/atrasos', atrasosController.getAtrasos);
router.get('/reportes/anticipos', verificarToken, verificarRol('admin'), anticipadasController.getAnticipadas);

module.exports = router;
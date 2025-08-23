const express = require('express');
const router = express.Router();
const atrasosController = require('../controller/atrasosController')
const anticipadasController = require('../controller/anticiposController')

router.get('/atrasos', atrasosController.getAtrasos);
router.get('/anticipos', anticipadasController.getAnticipadas);

module.exports = router;
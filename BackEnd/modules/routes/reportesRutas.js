const express = require('express');
const router = express.Router();
const atrasosController = require('../controller/atrasosController')

router.get('/atrasos', atrasosController.getAtrasos);

module.exports = router;
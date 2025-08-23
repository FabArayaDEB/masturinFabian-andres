const express = require('express');
const TrabajadorController = require('../controller/trabajadorController');

const router = express.Router();

// GET /api/trabajadores - Obtener todos los trabajadores
router.get('/', TrabajadorController.obtenerTodos);

// GET /api/trabajadores/:rut - Obtener trabajador por RUT
router.get('/:rut', TrabajadorController.obtenerPorRut);

// POST /api/trabajadores - Crear nuevo trabajador
router.post('/', TrabajadorController.crear);

// PUT /api/trabajadores/:rut - Actualizar trabajador
router.put('/:rut', TrabajadorController.actualizar);

// DELETE /api/trabajadores/:rut - Eliminar trabajador
router.delete('/:rut', TrabajadorController.eliminar);

module.exports = router;
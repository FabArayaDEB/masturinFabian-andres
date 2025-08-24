const express = require('express');
const TrabajadorController = require('../controller/trabajadorController');
const {verificarToken, verificarRol} = require('../middleware')

const router = express.Router();

// GET /api/trabajadores - Obtener todos los trabajadores
router.get('/', verificarToken, verificarRol('admin'), TrabajadorController.obtenerTodos);

// GET /api/trabajadores/:rut - Obtener trabajador por RUT
router.get('/:rut', verificarToken, verificarRol('admin'), TrabajadorController.obtenerPorRut);

// POST /api/trabajadores - Crear nuevo trabajador
router.post('/', verificarToken, verificarRol('admin'), TrabajadorController.crear);

// PUT /api/trabajadores/:rut - Actualizar trabajador
router.put('/:rut', verificarToken, verificarRol('admin'), TrabajadorController.actualizar);

// DELETE /api/trabajadores/:rut - Eliminar trabajador
router.delete('/:rut', verificarToken, verificarRol('admin'), TrabajadorController.eliminar);

module.exports = router;
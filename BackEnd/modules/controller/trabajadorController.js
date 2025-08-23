const TrabajadorModel = require('../model/trabajadorModel');

class TrabajadorController {
    // GET /api/trabajadores - Obtener todos los trabajadores
    static obtenerTodos(req, res) {
        TrabajadorModel.obtenerTodos((err, results) => {
            if (err) {
                console.error('Error al obtener trabajadores:', err);
                return res.status(500).json({ 
                    error: 'Error interno del servidor',
                    details: err.message 
                });
            }
            res.json({
                success: true,
                data: results,
                count: results.length
            });
        });
    }

    // GET /api/trabajadores/:rut - Obtener trabajador por RUT
    static obtenerPorRut(req, res) {
        const { rut } = req.params;
        
        if (!rut) {
            return res.status(400).json({ 
                error: 'RUT es requerido' 
            });
        }

        TrabajadorModel.obtenerPorRut(rut, (err, results) => {
            if (err) {
                console.error('Error al obtener trabajador:', err);
                return res.status(500).json({ 
                    error: 'Error interno del servidor',
                    details: err.message 
                });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ 
                    error: 'Trabajador no encontrado' 
                });
            }
            
            res.json({
                success: true,
                data: results[0]
            });
        });
    }

    // POST /api/trabajadores - Crear nuevo trabajador
    static crear(req, res) {
        const { rut, correo, contraseña, cargo, sueldo, tipo_contrato, fecha_inicio, fecha_fin } = req.body;
        
        // Validaciones básicas
        if (!rut || !correo || !contraseña) {
            return res.status(400).json({ 
                error: 'RUT, correo y contraseña son requeridos' 
            });
        }

        const trabajador = {
            rut,
            correo,
            contraseña,
            cargo,
            sueldo,
            tipo_contrato,
            fecha_inicio,
            fecha_fin
        };

        TrabajadorModel.crear(trabajador, (err, result) => {
            if (err) {
                console.error('Error al crear trabajador:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ 
                        error: 'El RUT o correo ya existe' 
                    });
                }
                return res.status(500).json({ 
                    error: 'Error interno del servidor',
                    details: err.message 
                });
            }
            
            res.status(201).json({
                success: true,
                message: result.message,
                data: { rut: result.rut }
            });
        });
    }

    // PUT /api/trabajadores/:rut - Actualizar trabajador
    static actualizar(req, res) {
        const { rut } = req.params;
        const { correo, contraseña, cargo, sueldo, tipo_contrato, fecha_fin } = req.body;
        
        if (!rut) {
            return res.status(400).json({ 
                error: 'RUT es requerido' 
            });
        }

        if (!correo && !contraseña && !cargo && !sueldo && !tipo_contrato && !fecha_fin) {
            return res.status(400).json({ 
                error: 'Al menos un campo debe ser proporcionado para actualizar' 
            });
        }

        const trabajador = {
            correo,
            contraseña,
            cargo,
            sueldo,
            tipo_contrato,
            fecha_fin
        };

        TrabajadorModel.actualizar(rut, trabajador, (err, result) => {
            if (err) {
                console.error('Error al actualizar trabajador:', err);
                if (err.message === 'Trabajador no encontrado') {
                    return res.status(404).json({ 
                        error: 'Trabajador no encontrado' 
                    });
                }
                return res.status(500).json({ 
                    error: 'Error interno del servidor',
                    details: err.message 
                });
            }
            
            res.json({
                success: true,
                message: result.message
            });
        });
    }

    // DELETE /api/trabajadores/:rut - Eliminar trabajador
    static eliminar(req, res) {
        const { rut } = req.params;
        
        if (!rut) {
            return res.status(400).json({ 
                error: 'RUT es requerido' 
            });
        }

        TrabajadorModel.eliminar(rut, (err, result) => {
            if (err) {
                console.error('Error al eliminar trabajador:', err);
                if (err.message === 'Trabajador no encontrado') {
                    return res.status(404).json({ 
                        error: 'Trabajador no encontrado' 
                    });
                }
                return res.status(500).json({ 
                    error: 'Error interno del servidor',
                    details: err.message 
                });
            }
            
            res.json({
                success: true,
                message: result.message
            });
        });
    }
}

module.exports = TrabajadorController;
const db = require('../../db/db');

class TrabajadorModel {
    // Obtener todos los trabajadores
    static obtenerTodos(callback) {
        const query = `
            SELECT u.rut, u.correo, u.rol, 
                   c.cargo, c.sueldo, c.tipo_contrato, c.estado, c.fecha_inicio, c.fecha_fin
            FROM usuarios u
            LEFT JOIN contratos c ON u.rut = c.rut AND c.estado = 'activo'
            WHERE u.rol = 'trabajador'
        `;
        db.query(query, callback);
    }

    // Obtener trabajador por RUT
    static obtenerPorRut(rut, callback) {
        const query = `
            SELECT u.rut, u.correo, u.rol, 
                   c.cargo, c.sueldo, c.tipo_contrato, c.estado, c.fecha_inicio, c.fecha_fin
            FROM usuarios u
            LEFT JOIN contratos c ON u.rut = c.rut AND c.estado = 'activo'
            WHERE u.rut = ? AND u.rol = 'trabajador'
        `;
        db.query(query, [rut], callback);
    }

    // Crear nuevo trabajador
    static crear(trabajador, callback) {
        db.beginTransaction((err) => {
            if (err) return callback(err);

            // Insertar usuario
            const queryUsuario = 'INSERT INTO usuarios (rut, correo, contraseña, rol) VALUES (?, ?, ?, ?)';
            db.query(queryUsuario, [trabajador.rut, trabajador.correo, trabajador.contraseña, 'trabajador'], (err, result) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                // Insertar contrato si se proporciona información
                if (trabajador.cargo && trabajador.sueldo && trabajador.tipo_contrato) {
                    const queryContrato = `
                        INSERT INTO contratos (rut, fecha_inicio, fecha_fin, cargo, sueldo, tipo_contrato, estado) 
                        VALUES (?, ?, ?, ?, ?, ?, 'activo')
                    `;
                    db.query(queryContrato, [
                        trabajador.rut, 
                        trabajador.fecha_inicio || new Date().toISOString().split('T')[0],
                        trabajador.fecha_fin || null,
                        trabajador.cargo,
                        trabajador.sueldo,
                        trabajador.tipo_contrato
                    ], (err) => {
                        if (err) {
                            return db.rollback(() => callback(err));
                        }
                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => callback(err));
                            }
                            callback(null, { rut: trabajador.rut, message: 'Trabajador creado exitosamente' });
                        });
                    });
                } else {
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => callback(err));
                        }
                        callback(null, { rut: trabajador.rut, message: 'Trabajador creado exitosamente' });
                    });
                }
            });
        });
    }

    // Actualizar trabajador
    static actualizar(rut, trabajador, callback) {
        db.beginTransaction((err) => {
            if (err) return callback(err);

            // Actualizar usuario
            const queryUsuario = 'UPDATE usuarios SET correo = ?, contraseña = ? WHERE rut = ? AND rol = "trabajador"';
            db.query(queryUsuario, [trabajador.correo, trabajador.contraseña, rut], (err, result) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                if (result.affectedRows === 0) {
                    return db.rollback(() => callback(new Error('Trabajador no encontrado')));
                }

                // Actualizar contrato si existe información
                if (trabajador.cargo || trabajador.sueldo || trabajador.tipo_contrato) {
                    const queryContrato = `
                        UPDATE contratos 
                        SET cargo = COALESCE(?, cargo), 
                            sueldo = COALESCE(?, sueldo), 
                            tipo_contrato = COALESCE(?, tipo_contrato),
                            fecha_fin = COALESCE(?, fecha_fin)
                        WHERE rut = ? AND estado = 'activo'
                    `;
                    db.query(queryContrato, [
                        trabajador.cargo,
                        trabajador.sueldo,
                        trabajador.tipo_contrato,
                        trabajador.fecha_fin,
                        rut
                    ], (err) => {
                        if (err) {
                            return db.rollback(() => callback(err));
                        }
                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => callback(err));
                            }
                            callback(null, { message: 'Trabajador actualizado exitosamente' });
                        });
                    });
                } else {
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => callback(err));
                        }
                        callback(null, { message: 'Trabajador actualizado exitosamente' });
                    });
                }
            });
        });
    }

    // Eliminar trabajador
    static eliminar(rut, callback) {
        db.beginTransaction((err) => {
            if (err) return callback(err);

            // Finalizar contratos activos
            const queryFinalizarContrato = 'UPDATE contratos SET estado = "finalizado" WHERE rut = ? AND estado = "activo"';
            db.query(queryFinalizarContrato, [rut], (err) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                // Eliminar usuario
                const queryEliminarUsuario = 'DELETE FROM usuarios WHERE rut = ? AND rol = "trabajador"';
                db.query(queryEliminarUsuario, [rut], (err, result) => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }

                    if (result.affectedRows === 0) {
                        return db.rollback(() => callback(new Error('Trabajador no encontrado')));
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => callback(err));
                        }
                        callback(null, { message: 'Trabajador eliminado exitosamente' });
                    });
                });
            });
        });
    }
}

module.exports = TrabajadorModel;
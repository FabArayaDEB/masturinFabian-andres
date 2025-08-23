const db = require('../../db/db');
const bcrypt = require('bcrypt');

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
        const saltRounds = 10;
        bcrypt.hash(trabajador.contraseña, saltRounds, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            }

            db.beginTransaction((err) => {
                if (err) return callback(err);

                const queryUsuario = 'INSERT INTO usuarios (rut, correo, contraseña, rol) VALUES (?, ?, ?, "trabajador")';
                db.query(queryUsuario, [trabajador.rut, trabajador.correo, hashedPassword], (err, result) => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }

                    const queryContrato = 'INSERT INTO contratos (rut, fecha_inicio, fecha_fin, cargo, sueldo, tipo_contrato) VALUES (?, ?, ?, ?, ?, ?)';
                    db.query(queryContrato, [
                        trabajador.rut,
                        trabajador.fecha_inicio,
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
                            callback(null, { message: 'Trabajador creado exitosamente', rut: trabajador.rut });
                        });
                    });
                });
            });
        });
    }

    static actualizar(rut, trabajador, callback) {
        if (trabajador.contraseña) {
            const saltRounds = 10;
            bcrypt.hash(trabajador.contraseña, saltRounds, (err, hashedPassword) => {
                if (err) {
                    return callback(err);
                }
                
                this.actualizarConContraseña(rut, { ...trabajador, contraseña: hashedPassword }, callback);
            });
        } else {
            this.actualizarSinContraseña(rut, trabajador, callback);
        }
    }

    static actualizarConContraseña(rut, trabajador, callback) {
        db.beginTransaction((err) => {
            if (err) return callback(err);

            const queryUsuario = 'UPDATE usuarios SET correo = ?, contraseña = ? WHERE rut = ? AND rol = "trabajador"';
            db.query(queryUsuario, [trabajador.correo, trabajador.contraseña, rut], (err, result) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                if (result.affectedRows === 0) {
                    return db.rollback(() => callback(new Error('Trabajador no encontrado')));
                }

                const queryContrato = 'UPDATE contratos SET fecha_inicio = ?, fecha_fin = ?, cargo = ?, sueldo = ?, tipo_contrato = ? WHERE rut = ? AND estado = "activo"';
                db.query(queryContrato, [
                    trabajador.fecha_inicio,
                    trabajador.fecha_fin || null,
                    trabajador.cargo,
                    trabajador.sueldo,
                    trabajador.tipo_contrato,
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
            });
        });
    }

    static actualizarSinContraseña(rut, trabajador, callback) {
        db.beginTransaction((err) => {
            if (err) return callback(err);

            const queryUsuario = 'UPDATE usuarios SET correo = ? WHERE rut = ? AND rol = "trabajador"';
            db.query(queryUsuario, [trabajador.correo, rut], (err, result) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                if (result.affectedRows === 0) {
                    return db.rollback(() => callback(new Error('Trabajador no encontrado')));
                }

                const queryContrato = 'UPDATE contratos SET fecha_inicio = ?, fecha_fin = ?, cargo = ?, sueldo = ?, tipo_contrato = ? WHERE rut = ? AND estado = "activo"';
                db.query(queryContrato, [
                    trabajador.fecha_inicio,
                    trabajador.fecha_fin || null,
                    trabajador.cargo,
                    trabajador.sueldo,
                    trabajador.tipo_contrato,
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
            });
        });
    }

    static verificarContraseña(contraseñaPlana, contraseñaEncriptada, callback) {
        bcrypt.compare(contraseñaPlana, contraseñaEncriptada, callback);
    }

    // Eliminar trabajador
    static eliminar(rut, callback) {
        db.beginTransaction((err) => {
            if (err) return callback(err);

            // Finalizar contratos activos
            const queryFinalizarContrato = 'UPDATE contratos SET estado = "finalizado", fecha_fin = CURDATE() WHERE rut = ? AND estado = "activo"';
            
            db.query(queryFinalizarContrato, [rut], (err) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                const queryDesactivarUsuario = 'UPDATE usuarios SET rol = "inactivo" WHERE rut = ? AND rol = "trabajador"';
                db.query(queryDesactivarUsuario, [rut], (err, result) => {
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
                        callback(null, { message: 'Trabajador desactivado exitosamente' });
                    });
                });
            });
        });
    }
}

module.exports = TrabajadorModel;
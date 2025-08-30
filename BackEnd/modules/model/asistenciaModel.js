const db = require('../../db/db');

exports.marcarEntrada = (data, callback) => {
    const { correo } = data;
    db.query('SELECT rut FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) return callback(new Error('Usuario no encontrado'))

        const rutEntrada = result[0].rut;

        db.query('INSERT INTO asistencias(rut, fecha, hora_entrada) VALUES (?, CURDATE(), NOW())', [rutEntrada], (err) => {
            if (err) return callback(err);

            callback(null, { mensaje: 'Entrada marcada correctamente' });
        })
    })
}

exports.marcarSalida = (data, callback) => {
    const { correo } = data;
    db.query('SELECT rut FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) return callback(new Error('Usuario no encontrado'))

        const rutSalida = result[0].rut;

        db.query(
            'SELECT rut, fecha, hora_salida FROM asistencias WHERE rut = ? AND fecha = CURDATE()',
            [rutSalida],
            (err, result) => {
                if (err) return callback(err);
                if (result.length === 0) return callback(new Error('No puedes marcar la salida sin haber marcado la entrada'));

                if (result[0].hora_salida) return callback(new Error('Ya marcaste la salida hoy'));

                db.query(
                    'UPDATE asistencias SET hora_salida = NOW() WHERE rut = ? AND fecha = CURDATE()',
                    [rutSalida],
                    (err, updateResult) => {
                        if (err) return callback(err);
                        if (updateResult.affectedRows === 0) return callback(new Error('No se pudo registrar la salida'));
                        callback(null, { mensaje: 'Salida marcada correctamente' });
                    }
                );
            }
        );

    });
}

exports.marcarSalidaColacion = (data, callback) => {
    const { correo } = data;

    // Obtener rut del usuario
    db.query('SELECT rut FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) return callback(new Error('Usuario no encontrado'));

        const rut = result[0].rut;

        // Verificar si existe asistencia para hoy
        db.query(
            'SELECT rut, fecha, hora_salida_colacion, hora_entrada_colacion FROM asistencias WHERE rut = ? AND fecha = CURDATE()',
            [rut],
            (err, result) => {
                if (err) return callback(err);
                if (result.length === 0) return callback(new Error('No puedes marcar la colación sin haber registrado la entrada del día'));

                // Revisar si ya se marcó la salida de colación
                if (result[0].hora_salida_colacion) return callback(new Error('Ya marcaste la entrada de colación hoy'));

                // Registrar hora de salida de colación
                db.query(
                    'UPDATE asistencias SET hora_salida_colacion = NOW() WHERE rut = ? AND fecha = CURDATE()',
                    [rut],
                    (err, updateResult) => {
                        if (err) return callback(err);
                        if (updateResult.affectedRows === 0) return callback(new Error('No se pudo registrar la salida de colación'));
                        callback(null, { mensaje: 'Salida de colación registrada correctamente' });
                    }
                );
            }
        );
    });
};

exports.marcarEntradaColacion = (data, callback) => {
    const { correo } = data;

    // Obtener rut del usuario
    db.query('SELECT rut FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) return callback(new Error('Usuario no encontrado'));

        const rut = result[0].rut;

        // Verificar si existe asistencia para hoy
        db.query(
            'SELECT rut, fecha, hora_salida_colacion, hora_entrada_colacion FROM asistencias WHERE rut = ? AND fecha = CURDATE()',
            [rut],
            (err, result) => {
                if (err) return callback(err);
                if (result.length === 0) return callback(new Error('No puedes marcar la colación sin haber registrado la entrada del día'));

                // Revisar si ya se marcó la salida de colación
                if (result[0].hora_entrada_colacion) return callback(new Error('Ya marcaste la salida de colación hoy'));

                // Registrar hora de salida de colación
                db.query(
                    'UPDATE asistencias SET hora_entrada_colacion = NOW() WHERE rut = ? AND fecha = CURDATE()',
                    [rut],
                    (err, updateResult) => {
                        if (err) return callback(err);
                        if (updateResult.affectedRows === 0) return callback(new Error('No se pudo registrar la entrada de colación'));
                        callback(null, { mensaje: 'Entrada de colación registrada correctamente' });
                    }
                );
            }
        );
    });
};


const db = require('../../db/db');

exports.marcarEntrada = (data, callback) => {
    const { correo } = data;
    db.query('SELECT rut FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) return callback(new Error('Usuario no encontrado'))

        const rutEntrada = result[0].rut;

        db.query('INSERT INTO asistencias(rut, fecha, hora_entrada) VALUES (?, CURDATE(), NOW())', [rutEntrada], (err) => {
            if (err) return callback(err);

            callback(null, {mensaje: 'Entrada marcada correctamente'});
        })
    })
}

exports.marcarSalida = (data, callback) => {
    const {correo} = data;
    db.query('SELECT rut FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) return callback(new Error('Usuario no encontrado'))

        const rutSalida = result[0].rut;

        db.query('SELECT rut, fecha FROM asistencias WHERE rut = ? AND fecha = CURDATE()', [rutSalida], (err, result) => {
            if(err) return callback(err);
            if (result.length === 0) return callback(new Error('No puedes marcar la salida sin haber marcado la entrada'));
            if (result[0].fecha) return callback(new Error('No puedes marcar mas de una salida'));

            db.query('UPDATE asistencias SET hora_salida = NOW() WHERE rut = ? AND fecha = CURDATE()', [rutSalida], (err) => {
                if (err) return callback(err);

                callback(null, {mensaje: 'Salida marcada correctamente'});
            });
        });
    });
    
}
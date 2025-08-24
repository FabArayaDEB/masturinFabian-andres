const db = require('../../db/db');

exports.marcarEntrada = (data, callback) => {
    const { correo } = data;
    db.query('SELECT rut FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) return callback(err);

        const rut = result[0].rut;
        console.log(rut)
        
        db.query('INSERT INTO asistencias(rut, fecha, hora_entrada) VALUES (?, CURDATE(), NOW())', [rut], (err) => {
            if (err) return callback(err);

            let mensaje = '';

            if (!err){
                mensaje = 'Asistencia tomada correctamente';
            }

            callback(null, {mensaje})
        })
    })
}
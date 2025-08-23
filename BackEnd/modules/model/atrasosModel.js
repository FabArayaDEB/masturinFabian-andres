const db = require('../../db/db');

exports.getAtrasos = (data, callback) => {
    const {fecha, hora_entrada, hora_salida} = data;

    db.query('SELECT * FROM asistencias WHERE fecha = ? AND hora_entrada >= ? AND hora_salida <= ?', [fecha, hora_entrada, hora_salida], (err, results) => {
        if (err) return callback(err);

        if (!results || results.length === 0) return callback(new Error("Datos no disponibles"));

        const reporte = results.map(r => ({
            rut: r.rut,
            fecha: r.fecha,
            hora_entrada: r.hora_entrada,
            hora_salida: r.hora_salida

        }));

        callback(null, {reporte});
    });
}
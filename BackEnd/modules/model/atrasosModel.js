const db = require('../../db/db');

exports.getAtrasos = (data, callback) => {
    const {fecha_inicio, fecha_fin, hora_entrada} = data;

    db.query('SELECT * FROM asistencias WHERE fecha BETWEEN ? AND ? AND hora_entrada > ?', [fecha_inicio, fecha_fin, hora_entrada], (err, results) => {
        if (err) return callback(err);

        if (!results || results.length === 0) return callback(new Error("No hay atrasos registrados en las fechas ingresadas"));

        const reporte = results.map(r => ({
            rut: r.rut,
            fecha: r.fecha,
            hora_entrada: r.hora_entrada,

        }));

        callback(null, {reporte});
    });
}
const db = require('../../db/db');

exports.getAtrasos = (data, callback) => {
    const {fecha_inicio, fecha_fin} = data;

    db.query('SELECT a.rut, a.fecha, a.hora_entrada, c.hora_entrada AS hora_esperada FROM asistencias a JOIN contratos c ON a.rut = c.rut WHERE a.fecha BETWEEN ? AND ? AND a.hora_entrada > c.hora_entrada', [fecha_inicio, fecha_fin], (err, results) => {
        if (err) return callback(err);

        if (!results || results.length === 0) return callback(new Error("No hay atrasos registrados en las fechas ingresadas"));

        const reporte = results.map(r => ({
            rut: r.rut,
            fecha: r.fecha,
            hora_esperada: r.hora_esperada,
            hora_entrada: r.hora_entrada

        }));

        callback(null, {reporte});
    });
}
const db = require('../../db/db');

exports.getAnticipadas = (data, callback) => {
    const {fecha_inicio, fecha_fin} = data;

    db.query('SELECT a.rut, a.fecha, a.hora_salida, c.hora_salida AS hora_esperada FROM asistencias a JOIN contratos c ON a.rut = c.rut WHERE a.fecha BETWEEN ? AND ? AND a.hora_salida < c.hora_salida', [fecha_inicio, fecha_fin], (err, results) => {
        if (err) return callback(err);

        if (!results || results.length === 0) return callback(new Error("No hay salidas anticipadas registradas en las fechas ingresadas"));

        const reporte = results.map(r => ({
            rut: r.rut,
            fecha: r.fecha,
            hora_esperada: r.hora_esperada,
            hora_salida: r.hora_salida

        }));

        callback(null, {reporte});
    });
}

exports.getAnticipadasColacion = (data, callback) => {
    const {fecha_inicio, fecha_fin} = data;

    db.query('SELECT a.rut, a.fecha, a.hora_entrada_colacion, c.hora_entrada_colacion AS hora_esperada FROM asistencias a JOIN contratos c ON a.rut = c.rut WHERE a.fecha BETWEEN ? AND ? AND a.hora_entrada_colacion < c.hora_entrada_colacion', [fecha_inicio, fecha_fin], (err, results) => {
        if (err) return callback(err);

        if (!results || results.length === 0) return callback(new Error("No hay salidas anticipadas de colacion registradas en las fechas ingresadas"));

        const reporte = results.map(r => ({
            rut: r.rut,
            fecha: r.fecha,
            hora_esperada_entrada_colacion: r.hora_esperada,
            hora_entrada_colacion: r.hora_entrada_colacion

        }));

        callback(null, {reporte});
    });
}
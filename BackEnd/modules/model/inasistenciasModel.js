const db = require('../../db/db');

exports.getInasistencias = (data, callback) => {
    const {fecha_inicio, fecha_fin} = data;

    // Query para encontrar usuarios que NO tienen registros de asistencia en el rango de fechas
    const query = `
        SELECT DISTINCT u.rut, DATE(d.fecha) as fecha
        FROM usuarios u
        CROSS JOIN (
            SELECT DATE(DATE_ADD(?, INTERVAL seq.seq DAY)) as fecha
            FROM (
                SELECT 0 as seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20 UNION ALL SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL SELECT 29 UNION ALL SELECT 30
            ) seq
            WHERE DATE(DATE_ADD(?, INTERVAL seq.seq DAY)) <= ?
        ) d
        LEFT JOIN asistencias a ON u.rut = a.rut AND DATE(a.fecha) = d.fecha
        WHERE a.rut IS NULL
        AND u.rol != 'admin'
        ORDER BY u.rut, d.fecha`;

    db.query(query, [fecha_inicio, fecha_inicio, fecha_fin], (err, results) => {
        if (err) return callback(err);

        if (!results || results.length === 0) {
            return callback(new Error("No hay inasistencias registradas en las fechas ingresadas"));
        }

        // Agrupar por usuario
        const inasistenciasPorUsuario = {};
        results.forEach(r => {
            if (!inasistenciasPorUsuario[r.rut]) {
                inasistenciasPorUsuario[r.rut] = {
                    rut: r.rut,
                    fechas_inasistencia: []
                };
            }
            inasistenciasPorUsuario[r.rut].fechas_inasistencia.push(r.fecha);
        });

        const reporte = Object.values(inasistenciasPorUsuario);

        callback(null, {reporte});
    });
};
const inasistenciasModel = require("../model/inasistenciasModel");

exports.getInasistencias = (req, res) => {
    const {fecha_inicio, fecha_fin} = req.body;

    if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({mensaje: "Faltan campos obligatorios"});
    }

    inasistenciasModel.getInasistencias({fecha_inicio, fecha_fin}, (err, results) => {
        if (err){
            return res.status(500).json({
                mensaje: 'Error interno del servidor',
                error: err.message
            });
        }

        if (results.reporte.length === 0) {
            return res.status(404).json({
                error: 'No hay inasistencias con las fechas ingresadas'
            });
        }

        res.json({
            data: results
        });
    });
};
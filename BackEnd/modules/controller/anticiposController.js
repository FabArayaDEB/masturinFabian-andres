const anticiposModel = require("../model/anticiposModel");

exports.getAnticipadas = (req, res) => {
    const {fecha_inicio, fecha_fin} = req.body;

    if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({mensaje: "Faltan campos obligatorios"});
    }

    anticiposModel.getAnticipadas({fecha_inicio, fecha_fin}, (err, results) => {
        if (err){
            return res.status(500).json({
                mensaje: 'Error interno del servidor',
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: 'No hay salidas anticipadas con las fechas ingresadas'
            });
        }

        res.json({
            data: results
        });
    });
}

exports.getAnticipadasColacion = (req, res) => {
    const {fecha_inicio, fecha_fin} = req.body;

    if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({mensaje: "Faltan campos obligatorios"});
    }

    anticiposModel.getAnticipadasColacion({fecha_inicio, fecha_fin}, (err, results) => {
        if (err){
            return res.status(500).json({
                mensaje: 'Error interno del servidor',
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: 'No hay salidas anticipadas con las fechas ingresadas'
            });
        }

        res.json({
            data: results
        });
    });
}

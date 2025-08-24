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

        res.json({
            data: results
        });
    });
}
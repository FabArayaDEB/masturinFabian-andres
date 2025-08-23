const loginModelo = require("../model/atrasosModel");

exports.getAtrasos = (req, res) => {
    const {fecha_inicio, fecha_fin, hora_entrada} = req.body;

    if (!fecha_inicio || !fecha_fin || !hora_entrada) {
        return res.status(400).json({mensaje: "Faltan campos obligatorios"});
    }

    loginModelo.getAtrasos({fecha_inicio, fecha_fin, hora_entrada}, (err, results) => {
        if (err){
            return res.status(500).json({
                mensaje: 'Error interno del servidor',
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: 'No hay atrasos con las fechas ingresadas'
            });
        }

        res.json({
            data: results
        });
    });
}
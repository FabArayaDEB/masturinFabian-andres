const asistenciaModel = require('../model/asistenciaModel')

exports.marcarEntrada = (req, res) => {
    const {correo} = req.body;

    if (!correo) return res.status(400).json({mensaje: "Faltan datos necesarios"})

    asistenciaModel.marcarEntrada({correo}, (err, results) => {
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
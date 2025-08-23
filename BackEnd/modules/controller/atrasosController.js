const loginModelo = require("../model/atrasosModel");

exports.getAtrasos = (req, res) => {
    const {fecha, hora_entrada, hora_salida} = req;

    if (fecha, hora_entrada, hora_salida) {
        return res.status(400).json({mensaje: "Faltan campos obligatorios"});
    }

    loginModelo.getAtrasos({fecha, hora_entrada, hora_salida}, (err, results) => {
        if (err){
            return res.status(500).json({
                mensaje: 'Error interno del servidor',
                error: err.message
            });
        }

        if (results.length === 0) {
            return req.status(404).json({
                error: 'No hay registros con los parametros indicados'
            });
        }

        res.json({
            data: results
        });
    });
}
const loginModelo = require("../model/loginModel");

exports.login = (req, res) => {
    const { correo , contraseña} = req.body || {};

    if (!correo || !contraseña){
        return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    loginModelo.login({correo, contraseña},  (err, resultado) => {
        if (err){
            const errorCredencial = ["Usuario no encontrado", "Credenciales incorrectas"].includes(err.message);
            const statusCode = errorCredencial ? 401 : 500;

            return res.status(statusCode).json({ mensaje: err.message});
        }

        res.status(200).json({ mensaje: "Inicio de secion exitoso", ...resultado});
    });
};
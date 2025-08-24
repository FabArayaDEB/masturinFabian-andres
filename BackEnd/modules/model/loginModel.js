const db = require('../../db/db');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const SECRET = "12345678910"

exports.login = (data, callback) => {
    const { correo, contraseña } = data;

    db.query("SELECT * FROM usuarios WHERE correo = ?", [correo], (err, results) => {
        if (err) return callback(err);

        if (!results || results.length === 0) return callback(new Error("Correo no encontrado"));

        const usuario = results[0];

        bcrypt.compare(contraseña, usuario.contraseña, (err, esValido) => {
            if (err) return callback(err);

            if (!esValido) return callback(new Error("Credenciales incorrectas"));

            const token = jwt.sign(
                {correo: usuario.correo, rol: usuario.rol},
                SECRET,

                {expiresIn: "1h"}
            );
            console.log(token);

            callback(null, {token});
        });
    });
};
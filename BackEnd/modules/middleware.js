const jwt = require('jsonwebtoken');
const SECRET = '12345678910';

function verificarToken(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) return res.status(403).json({ error: 'falta el token' });

    const token = header.split(" ")[1];

    jwt.verify(token, SECRET, (err, usuario) => {
        if (err) return res.status(403).json({ error: 'Token invalido o expirado' });
        req.usuario = usuario;
        next();
    });
}

function verificarRol(rol) {
    return (req, res, next) => {
        if (!req.usuario) return res.status(401).json({ mensaje: 'No estas autenticado' });
        if (req.usuario.rol !== rol) return res.status(403).json({ mensaje: 'No tienes permisos para esta accion' });
        next();
    }
}

module.exports = { verificarToken, verificarRol };
// Middleware para verificar el token generao y autorizar el acceso a una ruta
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const Rol = require('../models/rol');

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

let verificaAdmin = (req, res, next) => {
    let usuario = req.usuario;
    let idUsuario = usuario._id;
    let descripcionRol;

    Usuario.findById(idUsuario)
        .populate('rol')
        .exec((err, newUsuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Ha ocurrido un error en el servidor'
                });
            }
            descripcionRol = newUsuario.rol.nombre;
            if (descripcionRol === "ADMINISTRADOR") {
                next();
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'El usuario no es un Administrador'
                });
            }
        });
}

module.exports = {
    verificaToken,
    verificaAdmin
}
const express = require('express');

const _ = require('underscore');

const Rol = require('../models/rol');

const app = express();

const { verificaAdmin, verificaToken } = require('../middlewares/autenticacion');

app.get('/rol', [verificaToken, verificaAdmin], (req, res) => {
    let desde = req.query.desde;
    desde = Number(desde);
    let limitePagina = req.query.limitePagina;
    limitePagina = Number(limitePagina);

    Rol.find({})
        .skip(desde)
        .limit(limitePagina)
        .exec((err, roles) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Rol.count({}, (err, total) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err: {
                            message: 'Ha ocurrido un error en el Servidor'
                        }
                    })
                }
                res.json({
                    ok: true,
                    roles,
                    total
                })
            })
        });
});

app.get('/rol/:rol', verificaToken, (req, res) => {

    let rol = req.params.rol;

    Rol.find({ "nombre": rol })
        .exec((err, idRol) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Ha existido un error al recuperar el rol'
                });
            }
            if (idRol.length = 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'El nombre de rol proporcionado no existe'
                })
            }
            console.log(idRol);
            res.json({
                ok: true,
                idRol
            });
        });
});

app.post('/rol', [verificaToken, verificaAdmin], (req, res) => {

    let body = req.body;

    let rol = new Rol({
        nombre: body.nombre,
        descripcion: body.descripcion,
        nivelPermisos: body.nivelPermisos
    });

    rol.save((err, rolDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            rol: rolDb
        });
    });
});

app.put('/rol/:id', [verificaToken, verificaAdmin], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'descripcion', 'nivelPermisos']);

    Rol.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, rolDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!rolDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID seleccionado no existe'
                }
            })
        }
        res.json({
            ok: true,
            rol: rolDB
        });
    });
});

app.delete('/rol/:id', [verificaToken, verificaAdmin], (req, res) => {
    let id = req.params.id;

    Rol.findByIdAndDelete(id, (err, rolBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!rolBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID ingresado no existe'
                }
            });
        }

        res.json({
            ok: true,
            rolBorrado
        })
    });
});

module.exports = app;
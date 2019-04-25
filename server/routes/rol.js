const express = require('express');

const _ = require('underscore');

const Rol = require('../models/rol');

const app = express();

app.get('/rol', (req, res) => {
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

app.post('/rol', (req, res) => {

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

/*
app.post('/usuario', (req, res) => {

    let body = req.body;
    //let persona = req.params._id
    //let rol = req.params._id

    let usuario = new Usuario({
        mail: body.mail,
        pass: bcrypt.hashSync(body.pass, 10),
        fechaAlta: body.fechaAlta,
        estado: body.estado,
        img: body.img,
        fechaBaja: body.fechaBaja,
        google: body.google,
        rol: body.rol,
        persona: body.persona
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        usuario.pass = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});
*/

app.put('/rol/:id', (req, res) => {
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

app.delete('/rol/:id', (req, res) => {
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
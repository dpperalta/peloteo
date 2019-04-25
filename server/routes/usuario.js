const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function(req, res) {

    let desde = req.query.desde;
    desde = Number(desde);
    let limitePagina = req.query.limitePagina;
    limitePagina = Number(limitePagina);

    Usuario.find({})
        .skip(desde)
        .limit(limitePagina)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({}, (err, total) => {
                res.json({
                    ok: true,
                    usuarios,
                    total
                })
            })

        });
});

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

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['estado', 'img', 'fechaBaja', 'pass']);
    let nuevaPass = body.pass;
    if (nuevaPass) {
        nuevaPass = bcrypt.hashSync(nuevaPass, 10);
    }
    body.pass = nuevaPass

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: false }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID seleccionado no existe'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID ingresado no existe'
                }
            })
        }
        res.json({
            ok: true,
            usuarioBorrado
        })
    });

});

module.exports = app;
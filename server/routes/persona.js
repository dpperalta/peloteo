const express = require('express');

const _ = require('underscore');

const Persona = require('../models/persona');

const { verificaToken, verificaAdmin } = require('../middlewares/autenticacion');

const app = express();

app.get('/persona', verificaToken, (req, res) => {
    let desde = req.query.desde;
    desde = Number(desde);
    let limitePagina = req.query.limitePagina;
    limitePagina = Number(limitePagina);

    Persona.find({})
        .skip(desde)
        .limit(limitePagina)
        .exec((err, personas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Persona.count({}, (err, total) => {
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
                    personas,
                    total
                })
            })
        });
});

app.post('/persona', [verificaToken, verificaAdmin], function(req, res) {

    let body = req.body;

    let persona = new Persona({
        nombres: body.nombres,
        apellidos: body.apellidos,
        nombreCompleto: (body.nombres + ' ' + body.apellidos),
        fechaNacimiento: new Date(body.fechaNacimiento),
        apodo: body.apodo,
        telefono: body.telefono,
        celular: body.celular,
        direccion: body.direccion,
        cedula: body.cedula
    });

    persona.save((err, personaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            persona: personaDB
        });
    });

});

app.put('/persona/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombres', 'apellidos', 'fechaNacimiento', 'apodo', 'telefono', 'celular', 'direccion', 'cedula']);
    let nombresCompletos = body.nombres + ' ' + body.apellidos;
    body.nombreCompleto = nombresCompletos

    Persona.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, personaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID seleccionado no existe'
                }
            });
        }
        res.json({
            ok: true,
            persona: personaDB
        })
    });
});

app.delete('/persona/:id', [verificaToken, verificaAdmin], (req, res) => {
    let id = req.params.id;

    Persona.findByIdAndDelete(id, (err, personaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!personaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID ingresado no existe'
                }
            });
        }

        res.json({
            ok: true,
            personaBorrada
        })
    });
});

module.exports = app;
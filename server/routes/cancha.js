const express = require('express');
const _ = require('underscore');

const Cancha = require('../models/cancha');

const { verificaToken, verificaAdmin } = require('../middlewares/autenticacion');

const app = express();

app.get('/cancha', verificaToken, (req, res) => {

    Cancha.find({}).exec((err, canchas) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            canchas
        });
    });
});

// Obtener una cancha por ID
app.get('/cancha/:id', (req, res) => {
    let id = req.params.id;

    Cancha.findById(id).exec((err, canchaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!canchaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID enviado no es correcto'
                }
            })
        }
        res.json({
            ok: true,
            canchaDB
        })
    });
});

// Buscar una cancha
app.get('/cancha/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Cancha.find({ nombre: regex })
        //.populate('nombre', 'callePrincipal', 'calleSecundaria')
        .exec((err, canchaBuscada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!canchaBuscada) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'La cancha buscada no se encuentra registrada en Peloteo'
                    }
                });
            }
            res.json({
                ok: true,
                canchaBuscada
            })
        });
});

app.post('/cancha', [verificaToken, verificaAdmin], (req, res) => {
    let body = req.body;

    let cancha = new Cancha({
        nombre: body.nombre,
        callePrincipal: body.callePrincipal,
        numeroCasa: body.numeroCasa,
        calleSecundaria: body.calleSecundaria,
        barrio: body.barrio,
        referencia: body.referencia,
        latitud: body.latitud,
        longitud: body.longitud,
        telefono: body.telefono,
        celular: body.celular,
        capacidadMinima: body.capacidadMinima,
        capacidadMaxima: body.capacidadMaxima,
        capacidadTotal: body.capacidadTotal,
        horaDesde: body.horaDesde,
        horaHasta: body.horaHasta,
        diaDesde: body.diaDesde,
        diaHasta: body.diaHasta,
        valorDiurno: body.valorDiurno,
        valorNocturno: body.valorNocturno
    });

    cancha.save((err, canchaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            cancha: canchaDB
        })
    })
});

app.put('/cancha/:id', [verificaToken, verificaAdmin], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'callePrincipal', 'calleSecundaria', 'celular', 'horaDesde', 'horaHasta',
        'diaDesde', 'diaHasta', 'valorDiurno', 'valorNocturno'
    ]);
    // Para actualizar campos parciales y que siga funcionando el runValidators, se debe utilizar context: 'query'
    Cancha.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, canchaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!canchaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID ingresado no es válido'
                }
            })
        }
        res.json({
            ok: true,
            cancha: canchaDB
        })
    });
});

app.delete('/cancha/:id', [verificaToken, verificaAdmin], (req, res) => {

    let id = req.params.id;

    Cancha.findByIdAndDelete(id, (err, canchaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!canchaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID ingresado no existe'
                }
            })
        }
        res.json({
            ok: true,
            canchaBorrada
        })
    });
});

module.exports = app;
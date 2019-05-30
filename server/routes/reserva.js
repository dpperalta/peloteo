const express = require('express');
const _ = require('underscore');
const moment = require('moment-timezone');

const Reserva = require('../models/reserva');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

app.get('/reserva', verificaToken, (req, res) => {
    Reserva.find({}).exec((err, reservas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            reservas
        })
    });
});

app.post('/reserva', verificaToken, (req, res) => {
    let body = req.body;


    let reserva = new Reserva({
        diaReserva: body.diaReserva,
        horaReserva: body.horaReserva,
        pagoAnticipado: body.pagoAnticipado,
        valorPagoAnticipado: body.valorPagoAnticipado,
        valorTotalPagar: body.valorTotalPagar,
        numeroJugadores: body.numeroJugadores,
        saldoPagar: body.valorTotalPagar,
        usuario: req.usuario._id,
        cancha: body.cancha,
        estado: body.estado,
        fechaReserva: body.fechaReserva
    });
    let fechaReservada = new Date(reserva.fechaReserva);
    let fechaHoy = new Date(Date.now());
    if (fechaReservada.getDate() < fechaHoy.getDate()) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La fecha de reserva no puede ser menor a la fecha actual'
            }
        })
    } else {
        reserva.save((err, reservaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                reserva: reservaDB
            })
        });
    }
});

app.put('/reserva/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['diaReserva', 'horaReserva', 'pagoAnticipado', 'valorPagoAnticipado', 'valorTotalPagar',
        'numeroJugadores', 'saldoPagar', 'estado'
    ]);
    Reserva.findOneAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, reservaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!reservaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID ingresado no es válido'
                }
            });
        }
        res.json({
            ok: true,
            reserva: reservaDB
        });
    });
});

app.delete('/reserva/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Reserva.findByIdAndDelete(id, (err, reservaEliminada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!reservaEliminada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID enviado no es correcto'
                }
            })
        }
        res.json({
            ok: true,
            reservaEliminada
        })
    });
});

module.exports = app;
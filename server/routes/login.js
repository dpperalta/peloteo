const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const Usuario = require('../models/usuario');

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ mail: body.mail }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o Contraseña Incorrectos'
                }
            });
        }
        if (!bcrypt.compareSync(body.pass, usuarioDB.pass)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (Contraseña) Incorrectos'
                }
            });
        }

        token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});


module.exports = app;
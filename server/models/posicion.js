const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let posicionSchema = new Schema({
    nombre: {
        type: String,
        unique: true
    },
    acronimo: {
        type: String,
        required: [true, 'El acrónimo de la posición es requerido'],
        unique: true
    },
    detalle: {
        type: String
    }
});

posicionSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Posicion', posicionSchema);
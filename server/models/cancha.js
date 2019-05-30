const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let canchaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre del Establecimiento es requerido'],
        unique: true
    },
    callePrincipal: {
        type: String,
        required: [true, 'La Calle Principal es requerida'],
    },
    numeroCasa: {
        type: String
    },
    calleSecundaria: {
        type: String,
        required: [true, 'La Calle Secundaria es requerida']
    },
    barrio: {
        type: String
    },
    referencia: {
        type: String
    },
    latitud: {
        type: Number
    },
    longitud: {
        type: Number
    },
    telefono: {
        type: String,
        unique: true
    },
    celular: {
        type: String,
        required: [true, 'El Teléfono Celular es requerido'],
        unique: true
    },
    capacidadMinima: {
        type: Number
    },
    capacidadMaxima: {
        type: Number
    },
    capacidadTotal: {
        type: Number
    },
    horaDesde: {
        type: String,
        required: [true, 'La hora de inicio de atención es requerida']
    },
    horaHasta: {
        type: String,
        required: [true, 'La hora de fin de atención es requerida']
    },
    diaDesde: {
        type: String,
        required: [true, 'El día de inicio de atención es requerido']
    },
    diaHasta: {
        type: String,
        required: [true, 'El día de fin de atención es requerido']
    },
    valorDiurno: {
        type: Number,
        required: [true, 'El valor de alquiler en horario duirno es requerido']
    },
    valorNocturno: {
        type: Number,
        required: [true, 'El valor de alquiler en horario nocturno es requerido']
    }
});

canchaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Cancha', canchaSchema);
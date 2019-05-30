const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let partidoSchema = new Schema({
    equipoLocal: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: [true, 'El Equipo Local es requerido']
    },
    equipoVisitante: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: [true, 'El Equipo Visitante es requerido']
    },
    marcadorLocal: {
        type: Number
    },
    marcadorVisitante: {
        type: Number
    },
    chaleco: {
        type: String
    },
    detalles: {
        type: String
    },
    reserva: {
        type: Schema.Types.ObjectId,
        ref: 'Reserva',
        required: [true, 'La reserva es requerida para alamacenar el partido']
    }
});

partidoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

module.exports = mongoose.model('Partido', partidoSchema);
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let equipoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre el equipo es requerido'],
        unique: true
    },
    detalles: {
        type: String
    },
    fundacion: {
        type: Date
    },
    representante: {
        type: String
    },
    capitan: {
        type: String
    },
    contactoRepresentante: {
        type: String
    }
});

equipoSchema.plugin(uniqueValidator, { message: '{PATH} ya se ha registrado en el sistema' });

module.exports = mongoose.model('Equipo', equipoSchema);
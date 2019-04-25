const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let personaSchema = new Schema({
    nombres: {
        type: String,
        required: [true, 'Debe especificar al menos uno de sus nombres']
    },
    apellidos: {
        type: String,
        required: [true, 'Debe especificar al menos uno de sus apellidos']
    },
    nombreCompleto: {
        type: String,
    },
    fechaNacimiento: {
        type: Date,
        required: false
    },
    apodo: {
        type: String,
        required: false
    },
    telefono: {
        type: String
    },
    celular: {
        type: String
    },
    direccion: {
        type: String
    },
    cedula: {
        type: String
    }
});

module.exports = mongoose.model('Persona', personaSchema);
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = new Schema;

let jugadorSchema = new Schema({
    numero: {
        type: Number,
        required: [true, 'El número del jugador es requerido']
    },
    descripcion: {
        type: String
    },
    apodo: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Se debe especificar un usuario']
    },
    posicion: {
        type: Schema.Types.ObjectId,
        ref: 'Posicion'
    },
    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: [true, 'Se debe especificar un equipo']
    }
});

jugadorSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Jugador', jugadorSchema);
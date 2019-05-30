const mongoose = require('mongoose');
const moment = require('moment-timezone');

const uniqueValidator = require('mongoose-unique-validator');

const fechaHoy = moment.tz(Date.now(), "America/Guayaquil");

let diasValidos = {
    values: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    message: '{VALUE} no es un día válido'
}
let horarsValidas = {
    values: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ],
    message: '{VALUE} no es una hora válida'
}

let Schema = mongoose.Schema;

let reservaSchema = new Schema({
    diaReserva: {
        type: String,
        required: [true, 'El día de reservación es obligatorio'],
        enum: diasValidos
    },
    horaReserva: {
        type: String,
        required: [true, 'La hora de reserva es obligatoria'],
        enum: horarsValidas
    },
    pagoAnticipado: {
        type: Number
    },
    valorPagoAnticipado: {
        type: Number
    },
    valorTotalPagar: {
        type: Number
    },
    numeroJugadores: {
        type: Number
    },
    saldoPagar: {
        type: Number
    },
    estado: {
        type: Boolean,
        required: [true, 'El estado de la reserva es obligaotrio'],
        default: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario que realiza la reserva, es requerido']
    },
    cancha: {
        type: Schema.Types.ObjectId,
        ref: 'Cancha',
        required: [true, 'La cancha reservada es requerida']
    },
    fechaReserva: {
        type: Date,
        required: [true, 'La fecha de reserva es requerida'],
        timezone: 'America/Guayaquil'
    },
    fechaRegistro: {
        type: Date,
        default: fechaHoy,
        timezone: 'America/Guayaquil'
    }
});

reservaSchema.plugin(uniqueValidator, { message: '{PATH] debe ser único' });

module.exports = mongoose.model('Reserva', reservaSchema);
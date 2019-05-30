const mongoose = require('mongoose');
const moment = require('moment-timezone');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const fechaHoy = moment.tz(Date.now(), "America/Guayaquil");

// let hoy = generaFecha();

// function generaFecha() {
//     let dia = new Date().getDate();
//     let mes = new Date().getMonth() + 1;
//     let anio = new Date().getFullYear();

//     dia = addZero(dia);
//     mes = addZero(mes);

//     let fecha = dia + '/' + mes + '/' + anio;

//     return fecha;

// }

// function addZero(i) {
//     if (i < 10) {
//         i = '0' + i;
//     }
//     return i;
// }

let usuarioSchema = new Schema({
    mail: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'La contraseña en obligatoria']
    },
    fechaAlta: {
        type: Date,
        default: fechaHoy,
        timezone: 'America/Guayaquil'
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        required: false
    },
    fechaBaja: {
        type: Date,
        required: false
    },
    google: {
        type: Boolean,
        default: false
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: false
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, 'El rol es requerido']
            //default: 'USUARIO',
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del rol es requerido'],
        unique: true
    },
    descripcion: {
        type: String,
        required: false,
    },
    nivelPermisos: {
        type: Number,
        required: false
    }
});

rolSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Rol', rolSchema);
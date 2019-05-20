const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let direccionSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'El ID es un campo requerido.']
    },
    calle: {
        type: String,
    },
    numero: {
        type: String,
    },
    tipo: {
        type: String,
    },
    piso: {
        type: String,
    },
    depto: {
        type: String,
    },
    cpost: {
        type: String,
    },
    entrecalle1: {
        type: String,
    },
    entrecalle2: {
        type: String,
    },
    barrio: {
        type: String,
    },
    partido: {
        type: String,
    },
    provincia: {
        type: Number,
    },
    pais: {
        type: Number,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
direccionSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Direccion', direccionSchema);
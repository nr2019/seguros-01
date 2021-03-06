const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let provinciaSchema = new Schema({
    idpais: {
        type: Number,
        required: [true, 'El ID del país es un campo requerido.']
    },
    idprovincia: {
        type: Number,
        required: [true, 'El ID de la provincia es un campo requerido.']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es un campo requerido']
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
provinciaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Provincia', provinciaSchema);
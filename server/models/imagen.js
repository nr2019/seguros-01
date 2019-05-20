const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let imagenSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'El ID es un campo requerido.']
    },
    referencia: {
        type: String,
        required: [true, 'La referencia es un campo requerido']
    },
    idreferencia: {
        type: Number,
        required: [true, 'El ID referencia es un campo requerido']
    },
    url: {
        type: String,
        required: [true, 'La URL es un campo requerido']
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
imagenSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Imagen', imagenSchema);
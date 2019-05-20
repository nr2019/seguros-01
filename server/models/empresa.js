const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let empresaSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'El ID es un campo requerido.']
    },
    idgrupo: {
        type: Number,
    },
    rsoc: {
        type: String,
        required: [true, 'La Razón social es un campo requerido']
    },
    cuit: {
        type: Number,
        required: [true, 'El CUIT es un campo requerido']
    },
    idciiuu: {
        type: Number,
        required: [true, 'El ID de CIIUU es un campo requerido']
    },
    masasalarial: {
        type: Number,
    },
    capitas: {
        type: Number,

    },
    alicuota: {
        type: Number,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
empresaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Empresa', empresaSchema);
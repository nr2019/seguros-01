const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let grupoAseguradoSchema = new Schema({
    idgrupo: {
        type: Number,
        required: [true, 'El ID de grupo es un campo requerido.']
    },
    idasegurado: {
        type: Number,
        required: [true, 'El ID de asegurado es un campo requerido']
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
grupoAsegurado.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('GrupoAsegurado', grupoAsegurado);
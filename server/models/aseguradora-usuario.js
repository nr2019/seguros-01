const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let asegUsuSchema = new Schema({

    idaseguradora: {
        type: Number,
        required: [true, 'El ID de aseguradora es un campo requerido']
    },
    idusuario: {
        type: Number,
        required: [true, 'El ID de usuario es un campo requerido']
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
asegUsuSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('AsegUsu', asegUsuSchema);
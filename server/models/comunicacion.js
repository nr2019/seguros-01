const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let comunicacionSchema = new Schema({
    //
    tipo: {
        type: String,
        required: [true, 'El tipo es un campo requerido']
    },
    dato: {
        type: String,
        //required: [true, 'El ID referencia es un campo requerido']
    },

    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
comunicacionSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Comunicacion', comunicacionSchema);
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let cotizacionSchema = new Schema({
    estadocot: {
        type: Number,
    },
    asegurado: {
        type: Number,
    },
    aseguradora: {
        type: Number,
        //required: [true, 'El ID referencia es un campo requerido']
    },
    vencimiento: {
        type: Date,
        required: [true, 'El Vencimiento de la cotización es un campo requerido']
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
cotizacionSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Cotizacion', cotizacionSchema);
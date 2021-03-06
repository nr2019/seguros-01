const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let ciiuuSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'El ID es un campo requerido.']
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
ciiuuSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Ciiuu', ciiuuSchema);
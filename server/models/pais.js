const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let paisSchema = new Schema({
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
    img: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/11/12/03/14/emojis-2941416_960_720.png',
    },
});


// En este caso PATH va a ser email, porque es el campo clave
paisSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Pais', paisSchema);
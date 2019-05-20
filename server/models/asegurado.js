const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
/*
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};*/

let aseguradoSchema = new Schema({

    id: {
        type: Number,
        unique: true,
        //required: [true, 'La razón social es un campo requerido']
    },
    idempresa: {
        type: Number,
        required: [true, 'El ID de empresa es un campo requerido']
    },
    estado: {
        type: Boolean,
        default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
aseguradoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Asegurado', aseguradoSchema);
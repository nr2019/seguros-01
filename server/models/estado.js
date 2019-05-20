const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
/*
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};*/

let estadoSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        //required: [true, 'La razón social es un campo requerido']
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
estadoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Estado', estadoSchema);
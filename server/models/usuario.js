const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let usuarioSchema = new Schema({
    dni: {
        type: Number,
        required: [true, 'El DNI es un campo requerido.']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es un campo requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El Apellido es un campo requerido']
    },
    email: {
        type: String,
        // no podrá existir 2 correos iguales
        //unique: true,
        required: [true, 'El correo es un campo requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es un campo requerido']
    },
    img: {
        type: String,
        require: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos //Ambito de valores
    },
    estado: {
        type: Boolean,
        default: true,
    },
    expira: {
        type: Date,
        //default: true,
    },
});


// En este caso PATH va a ser email, porque es el campo clave
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Usuario', usuarioSchema);
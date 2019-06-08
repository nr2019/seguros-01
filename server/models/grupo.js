const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let grupoSchema = new Schema({
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
        default: 'https://png2.kisspng.com/sh/f21950fee5ea907e49081ef5f0f7c450/L0KzQYm3UsAyN5DtiZH0aYP2gLBuTfZia6V0ius2aX7nhcT7kwkua5DmhJ9rdYPsfrb6k713bZR5hAQ2Y3H1hLF2jr1kd5JxReJ4d3X1PcHzgf51NaFqjOR4Y3jofbrqgfwuPZI8S6k7YnG3SIrthsYvPWM8UaQ8MkW0RYKAVcE2PGY1SqsCNT7zfri=/kisspng-factory-industry-coal-business-vector-cartoon-coal-power-plant-petrochemical-5a7372ba489ff6.5279232515175154502975.png',
    },
});


// En este caso PATH va a ser email, porque es el campo clave
grupoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Grupo', grupoSchema);
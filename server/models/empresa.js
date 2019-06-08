const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let empresaSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'El ID es un campo requerido.']
    },
    idgrupo: {
        type: Number,
    },
    rsoc: {
        type: String,
        required: [true, 'La Razón social es un campo requerido.']
    },
    cuit: {
        type: Number,
        required: [true, 'El CUIT es un campo requerido.']
    },
    idciiuu: {
        type: Number,
        required: [true, 'El ID de CIIUU es un campo requerido.']
    },
    masasalarial: {
        type: Number,
        required: [true, 'La masa salarial es un campo requerido.']
    },
    capitas: {
        type: Number,
        required: [true, 'El número de capitas es un campo requerido.']
    },
    alicuota: {
        type: Number,
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
empresaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });
module.exports = mongoose.model('Empresa', empresaSchema);
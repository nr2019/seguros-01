require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Cuando hay un app.use es un middleware 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes/asegurado'));
app.use(require('./routes/empresa'));
app.use(require('./routes/grupo'));
app.use(require('./routes/ciiuu'));
app.use(require('./routes/estado'));
app.use(require('./routes/usuario'));
app.use(require('./routes/direccion'));
app.use(require('./routes/comunicacion'));
app.use(require('./routes/aseguradora-usuario'));
app.use(require('./routes/aseguradora'));
app.use(require('./routes/cotizacion'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;
        console.log('Base de datos ONLINE');
    });
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Comunicacion = require('../models/comunicacion');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-whith, Content-Type, Accept");
    next();
});

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/comunicacion', function(req, res) {
    Comunicacion.find({ estado: true }, 'tipo dato')
        .exec((err, comunicacion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Comunicacion.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    comunicacion,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/comunicacion', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let comunicacion = new Comunicacion({
        tipo: body.tipo,
        dato: body.dato,
    });

    //  se graba en la base
    comunicacion.save((err, comunicacionDB) => {
        //      Errores
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //      Grabación OK
        res.json({
            ok: true,
            comunicacion: comunicacionDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
app.put('/comunicacion/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['tipo', 'dato']);

    Comunicacion.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, comunicacionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            comunicacion: comunicacionDB
        });
    })
});


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/comunicacion/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Comunicacion.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, comunicacionBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!comunicacionBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Comunicación no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            comunicacion: comunicacionBorrado
        });
    });
});


module.exports = app;
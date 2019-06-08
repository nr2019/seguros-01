/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Cotizacion = require('../models/cotizacion');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-whith, Content-Type, Accept");
    next();
});

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/cotizacion', function(req, res) {
    Cotizacion.find({ estado: true }, 'estadocot asegurado aseguradora vencimiento')
        .exec((err, cotizacion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Cotizacion.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    cotizacion,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/cotizacion', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let cotizacion = new Cotizacion({
        estadocot: body.estadocot,
        asegurado: body.asegurado,
        aseguradora: body.aseguradora,
        vencimiento: body.vencimiento,
    });
    //  se graba en la base
    cotizacion.save((err, cotizacionDB) => {
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
            cotizacion: cotizacionDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
app.put('/cotizacion/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['estadocot', 'asegurado', 'aseguradora', 'vencimiento']);

    Cotizacion.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, cotizacionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            cotizacion: cotizacionDB
        });
    })
});


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/cotizacion/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Cotizacion.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, cotizacionBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!cotizacionBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Cotizacion no encontrada.'
                }
            });
        }

        res.json({
            ok: true,
            cotizacion: cotizacionBorrado
        });
    });
});

module.exports = app;
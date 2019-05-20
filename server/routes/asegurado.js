/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Asegurado = require('../models/asegurado');

const app = express();

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/asegurado', function(req, res) {
    Asegurado.find({ estado: true }, 'id idempresa')
        .exec((err, asegurados) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Asegurado.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    asegurados,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/asegurado', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let asegurado = new Asegurado({
        id: body.id,
        idempresa: body.idempresa,
    });
    //  se graba en la base
    asegurado.save((err, aseguradoDB) => {
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
            asegurado: aseguradoDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
/*app.put('/asegurado/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['idempresa', 'estado']);

    Asegurado.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, aseguradoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            asegurado: aseguradoDB
        });
    })
});*/

/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/asegurado/:id', function(req, res) {


    let idbusqueda = req.params.id;

    let cambiaEstado = {
        estado: false
    };
    //  { id: idbusqueda } =>where
    //  cambiaEstado => borrado lógico
    Asegurado.findOneAndUpdate({ id: idbusqueda }, cambiaEstado, { new: true }, (err, aseguradoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!aseguradoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Asegurado no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            asegurado: aseguradoBorrado
        });
    });
});
module.exports = app;
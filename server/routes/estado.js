/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Estado = require('../models/estado');

const app = express();

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/estado', function(req, res) {
    Estado.find({ estado: true }, 'id descripcion')
        .exec((err, estado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Estado.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    estado,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/estado', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let estado = new Estado({
        id: body.id,
        descripcion: body.descripcion,
    });
    //  se graba en la base
    estado.save((err, estadoDB) => {
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
            estado: estadoDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
app.put('/estado/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Estado.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, estadoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            estado: estadoDB
        });
    })
});


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/estado/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Estado.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, estadoBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!estadoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Estado no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            grupo: estadoBorrado
        });
    });
});


module.exports = app;
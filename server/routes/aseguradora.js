/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Aseguradora = require('../models/aseguradora');

const app = express();

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/aseguradora', function(req, res) {
    Aseguradora.find({ estado: true }, 'idempresa')
        .exec((err, aseguradora) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Aseguradora.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    aseguradora,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/aseguradora', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let aseguradora = new Aseguradora({
        idempresa: body.idempresa,
    });
    //  se graba en la base
    aseguradora.save((err, aseguradoraDB) => {
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
            aseguradora: aseguradoraDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
/*app.put('/grupo/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Grupo.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, grupoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            grupo: grupoDB
        });
    })
});*/


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/aseguradora/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Aseguradora.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, aseguradoraBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!aseguradoraBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Aseguradora no encontrada.'
                }
            });
        }

        res.json({
            ok: true,
            aseguradora: aseguradoraBorrado
        });
    });
});


module.exports = app;
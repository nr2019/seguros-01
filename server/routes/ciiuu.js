/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Ciiuu = require('../models/ciiuu');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-whith, Content-Type, Accept");
    next();
});

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/ciiuu', function(req, res) {
    Ciiuu.find({ estado: true }, 'id descripcion')
        .exec((err, ciiuu) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Ciiuu.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    ciiuu,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/ciiuu', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let ciiuu = new Ciiuu({
        id: body.id,
        descripcion: body.descripcion,
    });
    //  se graba en la base
    ciiuu.save((err, ciiuuDB) => {
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
            ciiuu: ciiuuDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
app.put('/ciiuu/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Ciiuu.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, ciiuuDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            ciiuu: ciiuuDB
        });
    })
});


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/ciiuu/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Ciiuu.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, ciiuuBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!ciiuuBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'CIIUU no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            ciiuu: ciiuuBorrado
        });
    });
});

module.exports = app;
/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Grupo = require('../models/grupo');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-whith, Content-Type, Accept");
    next();
});

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/grupo', function(req, res) {
    Grupo.find({ estado: true }, 'id descripcion img')
        .exec((err, grupo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Grupo.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    grupo,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/grupo', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let grupo = new Grupo({
        id: body.id,
        descripcion: body.descripcion,
        img: body.img,
    });
    //  se graba en la base
    grupo.save((err, grupoDB) => {
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
            grupo: grupoDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
app.put('/grupo/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', 'img']);

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
});


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/grupo/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Grupo.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, grupoBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!grupoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Grupo no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            grupo: grupoBorrado
        });
    });
});


module.exports = app;
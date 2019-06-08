/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const AsegUsu = require('../models/aseguradora-usuario');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-whith, Content-Type, Accept");
    next();
});

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/aseguradora-usuario', function(req, res) {
    AsegUsu.find({ estado: true }, 'idaseguradora idusuario')
        .exec((err, asegusu) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            AsegUsu.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    asegusu,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/aseguradora-usuario', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let asegusu = new AsegUsu({
        idaseguradora: body.idaseguradora,
        idusuario: body.idusuario,
    });
    //  se graba en la base
    asegusu.save((err, asegusuDB) => {
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
            asegusu: asegusuDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
/*app.put('/aseguradora-usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['idaseguradora', 'idusuario']);

    AsegUsu.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, asegusuDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            asegusu: asegusuDB
        });
    })
});*/


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/aseguradora-usuario/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    AsegUsu.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, asegusuBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!asegusuBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Aseguradora-Usuario no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            asegusu: asegusuBorrado
        });
    });
});


module.exports = app;
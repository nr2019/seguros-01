/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Direccion = require('../models/direccion');

const app = express();

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/direccion', function(req, res) {
    Direccion.find({ estado: true }, 'id calle numero tipo piso depto cpost entrecalle1 entrecalle2 barrio partido provincia pais')
        .exec((err, direccion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Direccion.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    direccion,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/direccion', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let direccion = new Direccion({
        id: body.id,
        calle: body.calle,
        numero: body.numero,
        tipo: body.tipo,
        piso: body.piso,
        depto: body.depto,
        cpost: body.cpost,
        entrecalle1: body.entrecalle1,
        entrecalle2: body.entrecalle2,
        barrio: body.barrio,
        partido: body.partido,
        provincia: body.provincia,
        pais: body.pais,
    });
    //  se graba en la base
    direccion.save((err, direccionDB) => {
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
            direccion: direccionDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
app.put('/direccion/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['id', 'calle', 'numero', 'tipo', 'piso', 'depto', 'cpost', 'entrecalle1', 'entrecalle2', 'barrio', 'partido', 'provincia', 'pais']);

    Direccion.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, direccionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            direccion: direccionDB
        });
    })
});


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/direccion/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Direccion.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, direccionBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!direccionBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Dirección no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            direccion: direccionBorrado
        });
    });
});


module.exports = app;
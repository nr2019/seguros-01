/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const _ = require('underscore');
const Empresa = require('../models/empresa');

const app = express();

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/empresa', function(req, res) {
    Empresa.find({ estado: true }, 'id idgrupo rsoc cuit idciiuu masasalarial capitas alicuota img iddir')
        .exec((err, empresas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Empresa.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    empresas,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/empresa', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let empresa = new Empresa({
        id: body.id,
        idgrupo: body.idgrupo,
        rsoc: body.rsoc,
        cuit: body.cuit,
        idciiuu: body.idciiuu,
        masasalarial: body.masasalarial,
        capitas: body.capitas,
        alicuota: body.alicuota,
        img: body.img,
        iddir: body.iddir,
    });
    //  se graba en la base
    empresa.save((err, empresaDB) => {
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
            empresa: empresaDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
app.put('/empresa/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['idgrupo', 'rsoc', 'cuit', 'idciiuu', 'masasalarial', 'capitas', 'alicuota', 'img', 'iddir']);

    Empresa.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, empresaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            empresa: empresaDB
        });
    })
});



/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/empresa/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Empresa.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, empresaBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!empresaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Empresa no encontrada.'
                }
            });
        }

        res.json({
            ok: true,
            usuario: empresaBorrado
        });
    });
});

/*****************************************************************/
// DELETE
/*****************************************************************/
/*app.delete('/empresa/:id', function(req, res) {


    let idbusqueda = req.params.id;

    let cambiaEstado = {
        estado: false
    };
    //  { id: idbusqueda } =>where
    //  cambiaEstado => borrado lógico
    Empresa.findOneAndUpdate({ id: idbusqueda }, cambiaEstado, { new: true }, (err, empresaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!empresaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Asegurado no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            asegurado: empresaBorrado
        });
    });
});*/









module.exports = app;
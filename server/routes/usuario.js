/*****************************************************************/
// Declaraciones
/*****************************************************************/
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-whith, Content-Type, Accept");
    next();
});

/*****************************************************************/
// GET
/*****************************************************************/
app.get('/usuario', function(req, res) {
    Usuario.find({ estado: true }, 'dni nombre apellido email img role expira')
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuario,
                    cantidad: conteo
                });
            });
        });
});

/*****************************************************************/
// POST
/*****************************************************************/
app.post('/usuario', function(req, res) {
    let body = req.body;

    //  Obtención de datos 
    let usuario = new Usuario({
        dni: body.dni,
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
        expira: body.expira,
    });
    //  se graba en la base
    usuario.save((err, usuarioDB) => {
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
            usuario: usuarioDB
        });
    });
});

/*****************************************************************/
// PUT
/*****************************************************************/
app.put('/usuario/:id', function(req, res) {


    /* password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    expira: body.expira,
    Van por dirección separada*/


    let id = req.params.id;
    let body = _.pick(req.body, ['dni', 'nombre', 'apellido', 'email', 'img']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // Se ocultan campos en la respuesta para conserver información
        let resultado = _.pick(usuarioDB, ['dni', 'nombre', 'apellido', 'email', 'img']);


        res.json({
            ok: true,
            usuario: resultado
        });
    })
});


/*****************************************************************/
// DELETE
/*****************************************************************/
app.delete('/usuario/:id', function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado.'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


module.exports = app;
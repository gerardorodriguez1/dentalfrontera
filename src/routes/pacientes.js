const express = require('express');
const router = express.Router();

//Conecta la conx desde database.js
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('pacientes/add');
});


//agrega datos a la bd
router.post('/add', isLoggedIn, async (req, res) => {
    const { nombre, direccion, telefono, descripcion } = req.body;
    const newPaciente = {
        nombre,
        direccion,
        telefono,
        descripcion,
        //SESIONES CON DATOS PRIVADOS, OJO
        id_p: req.user.id
    };
    await pool.query('INSERT INTO pacientes_citas set ?', [newPaciente]);
    req.flash('success', 'Paciente guardado correctamente.');
    res.redirect('/pacientes'); 
});

//se muestran los datos requeridos en el body
router.get('/', isLoggedIn, async (req, res) => {
    //"WHERE id_p, SESIONES CON DATOS PRIVADOS, OJO"
    const usuarios_citas = await pool.query('SELECT * FROM pacientes_citas where id_p = ?', [req.user.id]);
    res.render('pacientes/lista_pc',  {usuarios_citas} );
});

//eliminar completo
router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM pacientes_citas WHERE id_p = ?', [id]);
    req.flash('success', 'Paciente eliminado satisfactoriamente.');
    res.redirect('/pacientes');
});

//editar
router.get('/editar/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const pacientes = await pool.query('SELECT * FROM pacientes_citas WHERE id_p = ?', [id]);
    res.render('pacientes/editar', {paciente: pacientes[0]});
});


//editar con query mysql
router.post('/editar/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const {nombre, direccion, telefono, descripcion} = req.body;
    const newPaciente = {
        nombre,
        direccion,
        telefono,
        descripcion
    };
    await pool.query('UPDATE pacientes_citas set ? WHERE id_p = ?', [newPaciente, id]);
    req.flash('success', 'Datos actualizados con éxito.');
    res.redirect('/pacientes');
});

module.exports = router;
const express = require('express');
const router = express.Router();

//Conecta la conx desde database.js
const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('pacientes/add');
});


//agrega datos a la bd
router.post('/add', async (req, res) => {
    const { nombre, direccion, telefono, descripcion } = req.body;
    const newPaciente = {
        nombre,
        direccion,
        telefono,
        descripcion
    };
    await pool.query('INSERT INTO pacientes_citas set ?', [newPaciente]);
    res.redirect('/pacientes'); 
});

//se muestran los datos requeridos en el body
router.get('/', async (req, res) => {
    const usuarios_citas = await pool.query('SELECT * FROM pacientes_citas');
    res.render('pacientes/lista_pc',  {usuarios_citas} );
});

//eliminar completo
router.get('/delete/:id', async (req, res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM pacientes_citas WHERE id_p = ?', [id]);
    res.redirect('/pacientes');
});

//editar
router.get('/editar/:id', async (req, res) => {
    const {id} = req.params;
    const pacientes = await pool.query('SELECT * FROM pacientes_citas WHERE id_p = ?', [id]);
    res.render('pacientes/editar', {paciente: pacientes[0]});
});


//editar con query mysql
router.post('/editar/:id', async (req, res) => {
    const {id} = req.params;
    const {nombre, direccion, telefono, descripcion} = req.body;
    const newPaciente = {
        nombre,
        direccion,
        telefono,
        descripcion
    };
    console.log(newPaciente);
    await pool.query('UPDATE pacientes_citas set ? WHERE id_p = ?', [newPaciente, id]);
    res.redirect('/pacientes');
});

module.exports = router;
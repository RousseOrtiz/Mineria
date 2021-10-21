const { application } = require('express');
const express = require('express');
const router = express.Router();;
const app = express();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')

// PREGUNTA 1
router.get('/pregunta1', isLoggedIn, (req, res) => {
    res.render('links/pregunta1');
});


router.post('/pregunta1', isLoggedIn, async (req, res) => {
    const encuesta = {
        user_id: req.user.id
    }
    pool.query('INSERT INTO encuesta SET ?', [encuesta], async function (error, results, fields) {
        if (error) throw error;
        console.log(results.insertId);
        const { p1 } = req.body;
        const pregunta = {
            id_encuesta : results.insertId,
            respuesta : p1
        };
        console.log(app.get('timeMS'));
        app.set('lastId', results.insertId);
        await pool.query('INSERT INTO pregunta1 set ?', [pregunta]);
        req.flash('success', 'Encuesta realizada con exito');
        res.redirect('./pregunta2');
      });
});

// Pregunta 2
router.get('/pregunta2', isLoggedIn, (req, res) => {
    res.render('links/pregunta2');
});

router.post('/pregunta2', isLoggedIn, async (req, res) => {
    const { p2 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p2
    };
    await pool.query('INSERT INTO pregunta2 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('./pregunta3');
});

// PREGUNTA 3
router.get('/pregunta3', isLoggedIn, (req, res) => {
    res.render('links/pregunta3');
});

router.post('/pregunta3', isLoggedIn, async (req, res) => {
    const { p3 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p3
    };
    await pool.query('INSERT INTO pregunta3 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('./pregunta4');
});

// Pregunta 4
router.get('/pregunta4', isLoggedIn, (req, res) => {
    res.render('links/pregunta4');
});

router.post('/pregunta4', isLoggedIn, async (req, res) => {
    const { p4 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p4
    };
    await pool.query('INSERT INTO pregunta4 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('./pregunta5');
});

// PREGUNTA 5
router.get('/pregunta5', isLoggedIn, (req, res) => {
    res.render('links/pregunta5');
});

router.post('/pregunta5', isLoggedIn, async (req, res) => {
    const { p5 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p5
    };
    await pool.query('INSERT INTO pregunta5 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('./pregunta6');
});

// Pregunta 6
router.get('/pregunta6', isLoggedIn, (req, res) => {
    res.render('links/pregunta6');
});

router.post('/pregunta6', isLoggedIn, async (req, res) => {
    const { p6 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p6
    };
    await pool.query('INSERT INTO pregunta6 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('./pregunta7');
});

// PREGUNTA 7
router.get('/pregunta7', isLoggedIn, (req, res) => {
    res.render('links/pregunta7');
});

router.post('/pregunta7', isLoggedIn, async (req, res) => {
    const { p7 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p7
    };
    await pool.query('INSERT INTO pregunta7 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('./pregunta8');
});

// Pregunta 8
router.get('/pregunta8', isLoggedIn, (req, res) => {
    res.render('links/pregunta8');
});

router.post('/pregunta8', isLoggedIn, async (req, res) => {
    const { p8 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p8
    };
    await pool.query('INSERT INTO pregunta8 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('./pregunta9');
});

// PREGUNTA 9
router.get('/pregunta9', isLoggedIn, (req, res) => {
    res.render('links/pregunta9');
});

router.post('/pregunta9', isLoggedIn, async (req, res) => {
    const { p9 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p9
    };
    await pool.query('INSERT INTO pregunta9 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('./pregunta10');
});

// Pregunta 10
router.get('/pregunta10', isLoggedIn, (req, res) => {
    res.render('links/pregunta10');
});

router.post('/pregunta10', isLoggedIn, async (req, res) => {
    const { p10 } = req.body;
    const pregunta = {
        id_encuesta : app.get('lastId'),
        respuesta : p10
    };
    await pool.query('INSERT INTO pregunta10 set ?', [pregunta]);
    req.flash('success', 'Encuesta realizada con exito');
    res.redirect('/');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM encuesta WHERE user_id = ?', [req.user.id]);
    res.render('links/list', {links});
});

module.exports = router;
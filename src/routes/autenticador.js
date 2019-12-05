const express = require('express');
const router = express.Router();

//traer modulo aqui
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});
 

//que el sistema reconozca las sesiones
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/perfil',
    failureRedirect: '/signup',
    failureFlash: true
}));


//logeo usuarios
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/perfil',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/perfil', isLoggedIn, (req, res) =>{
    res.render('perfil');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const sesion = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

//inicializar
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.port || 4000 );
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'diseño'),
    partialsDir: path.join(app.get('views'), 'reuso'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewars
app.use(sesion({
    secret: 'localdentalsesion',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/autenticador'));
app.use('/pacientes',require('./routes/pacientes'));

//publico
app.use(express.static(path.join(__dirname, 'public')));

//iniciar servidor
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});
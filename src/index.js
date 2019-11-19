const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//inicializar
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req, res, next) => {
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
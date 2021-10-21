const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const path = require('path');
const validator = require('express-validator');
const passport = require('passport');
const session = require('express-session');
const { dirname } = require('path');
const socketIO = require('socket.io');

const {database} = require('./keys');

//Inicializacion
const app = express();
require('./lib/passport');

//Ajustes
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//MiddleWares
app.use(session({
    secret: 'diegogomez',
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


//Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    app.locals.id = req.encuesta;
    next();
});


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentications'));
app.use('/links', require('./routes/links'));

//Archivos Publicos
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar Servidor
const server = app.listen(app.get('port'), () => {
    console.log('El puerto esta ', app.get('port'));
})

const { Server } = require('ws');
const pool = require('./database');
const wss = new Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', tiempoMS => {
        console.log(`Received message => ${tiempoMS}`);
        const obj = JSON.parse(tiempoMS);
        const time = obj['timeOnPageMs'];
    })
});
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const { auth, requiresAuth } = require('express-openid-connect');
const authConfig = require('./../_config/auth.config');

/**
 * INTIALIZE APP
 */

 const app = express();

 /**
 * SECURITY
 */

app.use(cors());
app.use(helmet());

/**
 * VIEW ENGINE
 */

 app.set('views', path.join(__dirname, 'src/views'));
 app.set('view engine', 'hbs');
 app.engine('hbs', exphbs({
   handlebars: allowInsecurePrototypeAccess(Handlebars),
   defaultLayout: 'main',
   extname: '.hbs',
   layoutsDir: __dirname + '/src/views/layouts',
   partialsDir: __dirname + '/src/views/partials'
 }));

/**
 * MIDDLEWARE
 */

app.use(auth(authConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './../_public')));

app.use(cookieParser());

app.use((req, res, next) => {

  console.log(req.headers);
  next()

});

/**
 * DEV MIDDLEWARE
 */



/**
 * GLOBAL VARIABLES
 */

 app.use(function (req, res, next) {
  //res.locals.success_msg = req.flash('success_msg');
  //res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.oidc.user || null;
  res.locals.isAuthenticated = req.oidc.isAuthenticated() ? true : false;
  next();
}); 

/**
 * LOAD ROUTES
 */

// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'logged in': 'logged out');
// });

// app.get('/profile', requiresAuth(), (req, res) => {

//   res.send(req.oidc.user);

// })

const { clientRouter } = require('./src/controllers/client/routes');
app.use('/', clientRouter);

module.exports = app;
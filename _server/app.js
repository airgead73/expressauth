const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');

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
 * MIDDLEWARE
 */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth(authConfig));
app.use(express.static(path.join(__dirname, './../_PUBLIC')));
app.use(cookieParser());

app.use((req, res, next) => {

  console.log(req.headers);
  next()

});

/**
 * DEV MIDDLEWARE
 */



/**
 * AUTHENTICATION
 */



/**
 * LOAD ROUTES
 */

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'logged in': 'logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {

  res.send(req.oidc.user);

})

module.exports = app;
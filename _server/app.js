const express = require('express');
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const authConfig = require('./../_config/auth.config');

app.use(auth(authConfig));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'logged in': 'logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {

  res.send(req.oidc.user);

})

module.exports = app;
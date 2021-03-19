const express = require('express');
const app = express();

const { auth, requiresAuth } = require('express-openid-connect');

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET
  })
);

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'logged in': 'logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {

  res.send(req.oidc.user);

})

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});
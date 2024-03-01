const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initDb } = require('./db/connect');
const routes = require('./routes');
//const { auth, requiresAuth } = require('express-openid-connect');

//const jwksRsa = require('jwks-rsa');
//const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//// Auth0 Configuration
//const config = {
//  authRequired: false,
//  auth0Logout: true,
//  secret: process.env.SECRET,
//  baseURL: process.env.BASE_URL,
//  clientID: process.env.CLIENT_ID,
//  issuerBaseURL: process.env.ISSUER_BASE
//};

// Routes

//app.use(auth(config));
//app.get('/', (req, res) => {
//  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//});
app.use('/' , routes);

//requiresAuth()
// Start server & connect to DB
initDb((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});

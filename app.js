const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDb } = require('./db/connect'); // Import the initDb function from your Mongoose connection file
const routes = require('./routes');
const { auth, requiresAuth } = require('express-openid-connect');


// Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE
};


const jwt = require('jsonwebtoken'); // Import jsonwebtoken module

// Middleware for verifying JWT
const jwtCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER_BASE}/.well-known/jwks.json`
  }), (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(jwtCheck);
app.use('/', requiresAuth(), routes);

// Start server + connect to DB
initDb((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and Server is running on port ${port}`);
    });
  }
});

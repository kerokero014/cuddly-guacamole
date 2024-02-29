const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initDb } = require('./db/connect');
const routes = require('./routes');
const { auth, requiresAuth } = require('express-openid-connect');
const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');

// Load environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Validate required environment variables
const requiredEnvVars = ['SECRET', 'BASE_URL', 'CLIENT_ID', 'ISSUER_BASE'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT Verification Middleware
const jwtCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(
    token,
    jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.ISSUER_BASE}/.well-known/jwks.json`
    }),
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      req.user = decoded;
      next();
    }
  );
};

// Auth0 Configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE
};

// Routes
app.use(auth(config));
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.use('/', jwtCheck, requiresAuth(), routes);

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

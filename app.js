const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDb } = require('./db/connect'); // Import the initDb function from your Mongoose connection file
const routes = require('./routes');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

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

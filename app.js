//Job application Tracker Project
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Test route
app.get('/', (req, res) => {
    res.send('Hello World');
    }
);


// Start server + connect to DB
mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });



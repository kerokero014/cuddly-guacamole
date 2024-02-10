const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));

router.use('/applications', require('./applicationRoutes'));

module.exports = router;

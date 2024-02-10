const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));

router.use('/applications', require('./applicationRoutes'));

router.use('/', require('./swagger'));

module.exports = router;

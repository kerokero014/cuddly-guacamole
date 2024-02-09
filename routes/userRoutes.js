const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/', userController.getUsers); //get all

router.get('/:id', userController.getSingleUser); // get all

module.exports = router;

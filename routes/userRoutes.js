const userController = require('../controller/userController');
const express = require('express');


router.get('/:id', userController.getSingleUser);

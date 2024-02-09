const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/', userController.getUsers); //get all

router.get('/:id', userController.getSingleUser); // get one

router.post('/', userController.createNewUser); // create one

router.put('/:id', userController.updateUser); // update one

router.delete('/:id', userController.deleteUser); // delete one

module.exports = router;

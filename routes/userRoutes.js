const express = require('express');
const router = express.Router();
const UserValidation = require('../Middleware/user-validation');
const userController = require('../controller/userController');
//const errorHandler = require('../Middleware/errorHandle');

router.get('/', userController.getUsers); //get all

router.get('/:id', userController.getSingleUser); // get one

router.post('/', UserValidation.userRules(), userController.createNewUser); // create one

router.put('/:id', UserValidation.userRules(), userController.updateUser); // update one

router.delete('/:id', userController.deleteUser); // delete one

module.exports = router;

const express = require('express');
const router = express.Router();
const UserValidation = require('../middleware/user-validation');
const userController = require('../controller/userController');
const SingleValid = require('../middleware/idValidation');

router.get('/', userController.getUsers); //get all

router.get('/:id', SingleValid.idValidation(), userController.getSingleUser); // get one

router.post('/', UserValidation.userRules(), userController.createNewUser); // create one

router.put('/:id', UserValidation.userRules(), userController.updateUser); // update one

router.delete('/:id', SingleValid.idValidation(), userController.deleteUser); // delete one

module.exports = router;

const express = require('express');
const router = express.Router();
const appValidator = require('../validation/app-validation');
const applicationController = require('../controller/applicationController');
const SingleValid = require('../validation/idValidation');

router.get('/', applicationController.getAllApplications);

router.get('/:id', SingleValid.idValidation(),applicationController.getApplicationbyId);

router.post('/:id', appValidator.appRules(), applicationController.createApplicationbyUserId);

router.put('/:id', appValidator.appRules(), applicationController.updateApplicationbyId);

router.delete('/:id', SingleValid.idValidation(), applicationController.deleteApplicationbyId);

module.exports = router;

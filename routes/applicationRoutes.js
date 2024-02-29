const express = require('express');
const router = express.Router();
const appValidator = require('../validation/app-validation');
const applicationController = require('../controller/applicationController');

router.get('/', applicationController.getAllApplications);

router.get('/:id', applicationController.getApplicationbyId);

router.post('/:id', appValidator.appRules(), applicationController.createApplicationbyUserId);

router.put('/:id', appValidator.appRules(), applicationController.updateApplicationbyId);

router.delete('/:id', applicationController.deleteApplicationbyId);

module.exports = router;

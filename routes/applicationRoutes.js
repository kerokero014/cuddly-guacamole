const express = require('express');
const router = express.Router();

const applicationController = require('../controller/applicationController');


router.get('/', applicationController.getAllApplications);

router.get('/:id', applicationController.getApplicationbyId);

router.post('/:id', applicationController.createApplicationbyUserId);

router.put('/:id', applicationController.updateApplicationbyId);

router.delete('/:id', applicationController.deleteApplicationbyId);

module.exports = router;
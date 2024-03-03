const application = require('../models/appModel');
const { validationResult } = require('express-validator');

const getAllApplications = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const lists = await application.getApplications();

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(lists);
  } catch (error) {
    console.error('Error in getAllApplications function:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getApplicationbyId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicationId = req.params.id;
    console.log('Application ID:', applicationId);

    const result = await application.getById(applicationId);

    if (result) {
      res.status(201).json(result);
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error in getSingleApplication function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createApplicationbyUserId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;

    const applicationInfo = {
      Job: req.body.Job,
      Company: req.body.Company,
      Location: req.body.Location,
      Salary: req.body.Salary,
      Benefits: req.body.Benefits,
      Experience: req.body.Experience,
      Skills: req.body.Skills,
      Description: req.body.Description,
      website: req.body.website,
      interviewDate: req.body.interviewDate,
      interviewTime: req.body.interviewTime,
      applicationStatus: req.body.applicationStatus,
      interviewStatus: req.body.interviewStatus,
      offerStatus: req.body.offerStatus,
      interviewFeedback: req.body.interviewFeedback,
      owner: userId
    };

    const result = await application.createApplication(applicationInfo);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createApplicationbyUserId function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateApplicationbyId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicationId = req.params.id;
    const userId = req.params.userId;

    const applicationInfo = {
      Job: req.body.Job,
      Company: req.body.Company,
      Location: req.body.Location,
      Salary: req.body.Salary,
      Benefits: req.body.Benefits,
      Requirements: req.body.Requirements,
      Experience: req.body.Experience,
      Skills: req.body.Skills,
      Description: req.body.Description,
      website: req.body.website,
      interviewDate: req.body.interviewDate,
      interviewTime: req.body.interviewTime,
      applicationStatus: req.body.applicationStatus,
      interviewStatus: req.body.interviewStatus,
      offerStatus: req.body.offerStatus,
      interviewFeedback: req.body.interviewFeedback,
      owner: userId
    };

    const result = await application.updateApplication(applicationId, applicationInfo); // Call the method directly

    res.status(204).json(result);
  } catch (error) {
    console.error('Error in updateApplicationbyId function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteApplicationbyId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const applicationId = req.params.id;

    const result = await application.deleteApplication(applicationId);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in deleteApplicationbyId function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllApplications,
  getApplicationbyId,
  createApplicationbyUserId,
  updateApplicationbyId,
  deleteApplicationbyId
};

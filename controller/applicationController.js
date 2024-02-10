const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllApplications = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('WS').collection('applications').find();
    const lists = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error in getAllApplications function:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getApplicationbyId = async (req, res) => {
  try {
    const applicationId = req.params.id;
    console.log('Application ID:', applicationId);

    const result = await mongodb
      .getDb()
      .db('WS')
      .collection('applications')
      .findOne({ _id: new ObjectId(applicationId) });

    if (result) {
      res.status(200).json(result);
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
    const userId = req.params.id;

    const application = {
      Job: req.body.Job,
      Company: req.body.Company,
      Location: req.body.Location,
      Date: req.body.Date,
      Salary: req.body.Salary,
      Benefits: req.body.Benefits,
      Requisites: req.body.Requisites,
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

    const result = await mongodb.getDb().db('WS').collection('applications').insertOne(application);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createApplicationbyUserId function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateApplicationbyId = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const userId = req.params.userId;

    const application = {
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

    const result = await mongodb
      .getDb()
      .db('WS')
      .collection('applications')
      .updateOne({ _id: new ObjectId(applicationId) }, { $set: application });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in updateApplicationbyId function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteApplicationbyId = async (req, res) => {
  try {
    const applicationId = req.params.id;

    const result = await mongodb
      .getDb()
      .db('WS')
      .collection('applications')
      .deleteOne({ _id: new ObjectId(applicationId) });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in deleteApplicationbyId function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getAllApplications, getApplicationbyId, createApplicationbyUserId, updateApplicationbyId, deleteApplicationbyId};

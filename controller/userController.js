const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('WS').collection('users').find();
    const lists = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error in getUsers function:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('User ID:', userId);

    const result = await mongodb
      .getDb()
      .db('WS')
      .collection('users')
      .findOne({ _id: new ObjectId(userId) });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getSingleUser function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createNewUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      JobTitle: req.body.JobTitle,
      Experience: req.body.Experience,
      Education: req.body.Education,
      Education: req.body.Education,
      password: req.body.password
    };
    const result = await mongodb.getDb().db('WS').collection('users').insertOne(user);

    if (result.acknowledged) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      throw new Error('User creation failed');
    }
  } catch (error) {
    console.error('Error in createNewUser function:', error);
    res.status(500).json({ error: 'Error occurred while creating user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      JobTitle: req.body.JobTitle,
      Experience: req.body.Experience,
      Education: req.body.Education,
      Education: req.body.Education,
      password: req.body.password
    };
    const result = await mongodb
      .getDb()
      .db('WS')
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: user });
    if (result.acknowledged) {
      res.status(201).json({ message: 'User updated successfully' });
    } else {
      throw new Error('User update failed');
    }
  } catch {
    console.error('Error in updateUser function:', error);
    res.status(500).json({ error: 'Error occurred while updating user' });
  }
};

module.exports = { getUsers, getSingleUser, createNewUser, updateUser };

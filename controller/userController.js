const mongodb = require('../db/connect');
const {ObjectId} = require('mongodb');

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

    const result = await mongodb.getDb().db('WS').collection('users').findOne({ _id: new ObjectId(userId) });

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


module.exports = { getUsers, getSingleUser };

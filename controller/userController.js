const mongodb = require('mongodb');
const objectId = mongodb.ObjectID;


const getUsers = async (req, res) => {}



const getSingleUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    console.log(userId);

    const result = await mongodb.db('WS').collection('users').findOne({ _id: userId });

    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    console.log('lists', lists);

    if (lists.length > 0) {
      res.status(200).json(lists[0]);
    } else {
      res.status(200).send(JSON.stringify(lists[0]));
    }
  } catch (error) {
    console.error('Error in getSingle function:', error);
  }
};

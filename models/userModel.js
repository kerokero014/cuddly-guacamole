const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const User = {
  async getAllUsers() {
    const result = await getDb().db('WS').collection('users').find();
    const lists = await result.toArray();
    return lists;
  },

  async getUserById(userId) {
    const result = await getDb()
      .db('WS')
      .collection('users')
      .findOne({ _id: new ObjectId(userId) });
    return result;
  },

  async create(userData) {
    const result = await getDb().db('WS').collection('users').insertOne(userData);
    return result.ops;
  },

  async update(userId, userData) {
    const result = await getDb()
      .db('WS')
      .collection('users')
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: userData },
        { returnOriginal: false }
      );
    return result.value;
  },

  async delete(userId) {
    const result = await getDb()
      .db('WS')
      .collection('users')
      .deleteOne({ _id: new ObjectId(userId) });
    return result;
  }
};

module.exports = User;
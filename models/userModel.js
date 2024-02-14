const mongoose = require('mongoose');
const UserSchema = require('../models/userSchema');

const User = {
  async getAllUsers() {
    try {
      const UserModel = mongoose.model('User', UserSchema);
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error('Error in getAllUsers function:', error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
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

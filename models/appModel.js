const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const Appls = {
  async getApplications() {
    const result = await getDb().db('WS').collection('applications').find();
    const lists = await result.toArray();
    return lists;
  },

  async getById(id) {
    const result = await getDb()
      .db('WS')
      .collection('applications')
      .findOne({ _id: new ObjectId(id) });
    return result;
  },

  async createApplication(applicationInfo) {
    const result = await getDb().db('WS').collection('applications').insertOne(applicationInfo);
    return result;
  },

  async updateApplication(applicationId, application) {
    const result = await getDb()
      .db('WS')
      .collection('applications')
      .updateOne({ _id: new ObjectId(applicationId) }, { $set: application });
    return result;
  },

  async deleteApplication(applicationId) {
    const result = await getDb()
      .db('WS')
      .collection('applications')
      .deleteOne({ _id: new ObjectId(applicationId) });
    return result;
  }
};

module.exports = Appls;

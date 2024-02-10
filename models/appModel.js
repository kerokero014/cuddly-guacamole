const { MongoClient } = require('mongodb');


// UserModel.js
class UserModel {
    constructor(db) {
        this.users = db.collection('users');
    }

    async getUserById(userId) {
        return await this.users.findOne({ _id: userId });
    }
}

// OtherModel.js
class OtherModel {
    constructor(db) {
        this.otherCollection = db.collection('');
    }

    async getOtherById(otherId) {
        return await this.otherCollection.findOne({ _id: otherId });
    }
}


modeule.exports = { UserModel, OtherModel };
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userID: String,
  userName: String,
  userPicURI: String,
  friendList: [],
  answer: { type: [Number], default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
},{collection: 'User'});

const User = mongoose.model('User', UserSchema);

module.exports = User;

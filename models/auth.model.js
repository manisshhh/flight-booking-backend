const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Auth = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  isActive: {
    type: Boolean
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('Auth', Auth)
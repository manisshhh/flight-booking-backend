const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Customer = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  gender: {
    type: String
  },
  address: {
    type: String
  }
}, {
  collection: 'customer'
})

module.exports = mongoose.model('Customer', Customer)
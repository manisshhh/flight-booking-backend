const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Airports = new Schema({
  airports: {
    type: Array
  }
}, {
  collection: 'airports'
})

module.exports = mongoose.model('Airports', Airports)
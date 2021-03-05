const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FlightSchedule = new Schema({
    airline : {type:String},
    departure : {type:String},
    "departure-time" : {type:String},
    "arrival-time" : {type:String},
    arrival : {type:String},
    price : {type:String},
    duration : {type:String},
    type : {type:String}
}, {
  collection: 'flight-schdule'
})

module.exports = mongoose.model('FlightSchedule', FlightSchedule)
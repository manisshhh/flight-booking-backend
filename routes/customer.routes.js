const express = require('express');
const app = express();

const customerRoute = express.Router();
let Customer = require('../models/customer.model');
let Airports = require('../models/airports.model');
let Flights = require('../models/flight-schedule.model');

// Add Customer
customerRoute.route('/add-customer').post((req, res, next) => {
  let setData = {id:req.body.id,gender:req.body.gender,name:req.body.name,address:req.body.address,to_city:req.body.to_city,from_city:req.body.from_city}
  Customer.create(setData, (error, data) => {
    if (error) {
      console.log(error)
      // return next(error)
      res.json('err', error)
    } else {
      res.json(data)
    }
  })
});

// Get all Customers
customerRoute.route('/').get((req, res) => {
  Customer.find((error, data) => {
    if (error) {
      res.json({name:"manish"})
    } else {
      res.json(data)
    }
  })
})

// Get Customer
customerRoute.route('/get-customer/:id').get((req, res) => {
  Customer.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Customer
customerRoute.route('/update-customer/:id').put((req, res, next) => {
  Customer.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Custoemr updated successfully!')
    }
  })
})

// Delete Customer
customerRoute.route('/delete-customer/:id').delete((req, res, next) => {
  Customer.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Get airports

customerRoute.route('/airports').get((req, res) => {
  Airports.find((error, data) => {
    console.log(error)
    if (error) {
      res.json(err)
    } else {
      res.json(data)
    }
  })
})

customerRoute.route('/flight-search').post(async (req, res) => {
  let departure = req.body.departure
  let arrival = req.body.arrival
  let flights = await Flights.find({
    departure,
    arrival
   });
   if (flights) {
    res.json(flights)
  }
})

module.exports = customerRoute;
const express = require('express');
const app = express();

const customerRoute = express.Router();
let Customer = require('../models/customer.model');

// Add Customer
customerRoute.route('/add-customer').post((req, res, next) => {
  Customer.create(req.body, (error, data) => {
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

module.exports = customerRoute;
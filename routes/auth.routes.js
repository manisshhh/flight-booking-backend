const express = require('express');
const app = express();

const authRoute = express.Router();
let Auth = require('../models/auth.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');


authRoute.route('/register').post((req, res, next) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  Auth.create({
    email : req.body.email,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

authRoute.route('/login').post( async  (req, res, next) => {
   const email = req.body.email
   const password = req.body.password
  try {
    let user = await Auth.findOne({
     email
    });
    if (!user)
      return res.status(200).json({
        message: "User Not Exist"
      });

    let isMatch = false
    if(password === user.password) {
      isMatch = true;
    } else {
      isMatch = false
    }
    if (!isMatch)
      return res.status(200).json({
        message: "Incorrect Password !"
      });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = authRoute;
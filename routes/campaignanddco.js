var passport = require('passport');
var mongoose = require('mongoose');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/User");
var Campaign = require('../models/Campaign');
var Dcome = require('../models/Dcome');

/* USER SIGNUP */
router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please type username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      dealers : [{
        dealerid: '',
        dealername: '',
        dealermake: '',
        dealerurl: '',
        dealercupid: '',
        dealerpacode: '',
        dealerzipcode: ''
      }]
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

/* USER LOGIN */
router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          console.log("token1", token);
          res.json({success: true, token: 'JWT ' + token, user: user});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

/* UPDATE USER PROFILE */
router.put('/profile',  function(req, res) {
  User.findByIdAndUpdate(req.body._id, req.body, function (err, post)  {
    if (err) return next(err);
    res.json(post);
  });
});


/*** DCO ****/

/* GET ALL DCOs */
router.get('/',  passport.authenticate('jwt', { session: false}),  function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Dcome.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized msg1.'});
}
});

/* GET SINGLE DCO BY PLACEMENT ID */
router.get('/:id',  function(req, res, next) {
  
  Dcome.findById(req.params.id, function (err, post)  {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE DCO */
router.post('/',  passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
  Dcome.create(req.body, function (err, post) { 
    if (err) return next(err);
    res.json(post);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized msg2.'});
}
});

/* UPDATE DCO */
router.put('/:id',  function(req, res, next) {
 
  Dcome.findByIdAndUpdate(req.params.id, req.body, function (err, post)  {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE DCO */
router.delete('/:id', function(req, res, next) {
  
  Dcome.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*** End DCO Routes ***/


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
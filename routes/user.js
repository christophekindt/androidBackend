var express = require('express');
var router = express();
var mongoose = require('mongoose');

// Model
var User = mongoose.model('user');

router.get('/', function(req, res, next) {
  var response = {};
  User.find({}, function(err, data) {
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      };
    } else {
      response = {
        "error": false,
        "message": data
      };
    }
    res.json(response);
  });
});

router.post('/', function(req, res, next) {
  var db = new User();
  var response = {};
  // fetch email and password from REST request.
  // Add strict validation when you use this in Production.
  db.email = req.body.email;
  // Hash the password using SHA1 algorithm.
  db.password = require('crypto')
    .createHash('sha1')
    .update(req.body.password)
    .digest('base64');
  db.score = req.body.score;
  db.save(function(err) {
    // save() will run insert() command of UserDB.
    // it will add new data in collection.
    if (err) {
      response = {
        "error": true,
        "message": "Error adding data"
      };
    } else {
      response = {
        "error": false,
        "message": "Data added"
      };
    }
    res.json(response);
  });
});

router.get('/:id', function(req, res, next) {
  var response = {};
  User.findById(req.params.id,function(err,data){
  // This will run User Query to fetch data based on ID.
      if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
      } else {
          response = {"error" : false,"message" : data};
      }
      res.json(response);
  });
});

router.put('/:id', function(req, res, next) {
  var response = {};
  // first find out record exists or not
  // if it does then update the record
  User.findById(req.params.id,function(err,data){
      if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
      } else {
      // we got data from User.
      // change it accordingly.
          if(req.body.email !== undefined) {
              // case where email needs to be updated.
              data.email = req.body.email;
          }
          if(req.body.password !== undefined) {
              // case where password needs to be updated
              data.password = req.body.password;
          }
          if(req.body.score !== undefined) {
              // case where password needs to be updated
              data.score = req.body.score;
          }
          // save the data
          data.save(function(err){
              if(err) {
                  response = {"error" : true,"message" : "Error updating data"};
              } else {
                  response = {"error" : false,"message" : "Data is updated for "+req.params.id};
              }
              res.json(response);
          })
      }
  });
});

module.exports = router;

var express = require('express');
var router = express();
var mongoose = require('mongoose');

//model
var answer = mongoose.model('answer');

router.get('/', function(req, res, next) {
  var response = {};
  answer.find({}, function(err, data) {
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
  var answ = new answer();
  var response = {};
  answ.answer = req.body.answer;
  answ.users = req.body.users;
  answ.save(function(err) {
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

module.exports = router;

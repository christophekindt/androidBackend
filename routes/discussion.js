var express = require('express');
var router = express();
var mongoose = require('mongoose');

//model
var discussion = mongoose.model('discussion');

router.get('/', function(req, res, next) {
  var response = {};
  discussion.find({}, function(err, data) {
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
  var disc = new discussion();
  var response = {};
  // fetch email and password from REST request.
  // Add strict validation when you use this in Production.
  disc.question = req.body.question;
  if (req.body.compensation != undefined){
    disc.compensation = req.body.compensation;
  }
  disc.answers = req.body.answers;
  disc.save(function(err) {
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

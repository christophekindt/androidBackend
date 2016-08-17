var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/discussiesDb');

//Models
require("./models/user");
require("./models/discussion");
require("./models/answer");
//Routes
var users = require("./routes/user");
var discussion = require("./routes/discussion");
var answer = require("./routes/answer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": false
}));

app.use('/user', users);
app.use('/discussion', discussion);
app.use('/answer', answer);


app.listen(3000);
console.log("Listening to PORT 3000");

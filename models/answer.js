var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
  answer:{
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
});

mongoose.model('answer',answerSchema);

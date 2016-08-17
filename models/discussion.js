var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  compensation: {
    type: String,
    required: false
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'answer'
  }]
});

mongoose.model('discussion',discussionSchema);

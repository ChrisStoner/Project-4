var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

function validatePresenceOf(value) {
  return value && value.length;
}


var BlogPost = new Schema({
 posttitle: String,
 post     : String
});

var Submit = mongoose.model('Submit', BlogPost);

module.exports = Submit; //then can require this in program and will have access to the submit model

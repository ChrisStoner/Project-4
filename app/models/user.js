var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

function validatePresenceOf(value) {
  return value && value.length;
}

var UserSchema = new Schema({
//define fields
  firstname : String,
  lastname : String,
  username : String,
  password : String,
  email : {type: String, validate: [validatePresenceOf, 'an email is required'], index: { unique: true }},

  
});

var BlogPost = new Schema({
 post     : String
});

var User = mongoose.model('User', UserSchema); // (model name , schema being used)

var Submit = mongoose.model('Submit', BlogPost);

module.exports = User; //then can require this in program and will have access to the user model
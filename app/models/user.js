var mongoose = require('mongoose');
var Schema = mongoose.Schema; 


var UserSchema = new Schema({
//define fields
  username : String,
  password : String,
})

var User = mongoose.model('User', UserSchema); // (model name , schema being used)

module.exports = User; //then can require this in program and will have access to the user model

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

//var signup = require('user/signup');
var ejs = require('ejs');
var app = module.exports = express.createServer();
var cf = require('./cloudfoundry');
var signup = require('./routes/user/signup');

//var renders = require('./renders');
//var signup = require('./renders/signup');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/user/signup', signup.index);
//app.get('/renders') renders.index);
//app.get('/user/signup', signup.index);

app.listen(cf.port || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

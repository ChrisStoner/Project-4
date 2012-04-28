
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

//var signup = require('user/signup');
var ejs = require('ejs');
var app = module.exports = express.createServer();
var cf = require('./cloudfoundry');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var User = require('./models/user'); // require model, pull in user model created
var Submit = require('./models/submit');

var articleProvider = require('./ArticleProvider-mongodb').ArticleProvider;
mongoose.connect('mongodb://localhost/codebase') // will create the example_db database if it doesn't already exist.

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

//gets the about page
app.get('/about', function(req, res){
	res.render('about', { 
		title: 'about'
	});
});

app.get('/submit', function(req, res){
	res.render('submit', {
		title: 'submit'
	});
});
//gets the contact page
app.get('/contact', function(req, res){
	res.render('contact', { 
		title: 'contact'
	});
});

//gets the signup page
app.get('/signup', function(req, res){
  res.render('signup', {
    title: 'signup'
  });
});

app.listen(cf.port || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

app.get('/blog/new', function(req, res) {
    res.render('blog_new', { locals: {
        title: 'New Post'
    }
    });
});

app.post('/blog/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/')
    });
});

app.get('/blog/:id', function(req, res) {
    articleProvider.findById(req.params.id, function(error, article) {
        res.render('blog_show.ejs',
        { locals: {
            title: article.title,
            article:article
        }
        });
    });
});

app.post('/blog/addComment', function(req, res) {
    articleProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
       } , function( error, docs) {
           res.redirect('/blog/' + req.param('_id'))
       });
});


app.post('/signup', function(req, res){
  var u = new User({firstname:req.body.firstname, lastname:req.body.lastname, username:req.body.username, password:req.body.password, email:req.body.email});

  u.save(function(err){
    if(err)
       res.redirect('/failed');
    else
        res.redirect('/saved');
   });
});

app.post('/submit', function(req, res){
  var u = new Submit({post:req.body.post, posttitle:req.body.posttitle});

  u.save(function(err){
    if(err)
      res.redirect('/failed');
    else
        res.redirect('/saved');
   });
});


app.get('/failed', function(req, res) {
  res.send('ERROR');
});

app.get('/saved', function(req, res) {
  res.send('SUCCESS!');
});


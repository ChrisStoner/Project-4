/* index page */

var postName = "some post name";
var post = "Posted code goes here. How many posts to show?  Archive by age? Have number of views posted?  Number of replies? Note that the header and code section is set up in index.ejs, being added to body tag in layout.ejs.";

exports.index = function(req, res){
  res.render('index', { title: 'CSCI', postName:postName, post:post})
};


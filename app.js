var express = require('express');
var mysql = require('mysql');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./routes/db');
//var cors = require('cors');

var hbs = require('hbs'); //mine

//setting up database
/*var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'testing',
 });*/


var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
//app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
//app.use('/users', users);

app.post('/getSite', function (req, res) {
    var site_code = req.body.site;
    console.log("First Name"+site_code);
    //var response =sites(site_name);
    var select = 'SELECT * FROM sites INNER JOIN photos ON sites.Site_Code = photos.Site_Code '
    var q = select+ "WHERE sites.Site_Code ='"+site_code+"'";
    var returnSite = function(err, data){
      //console.log(data);
       res.send(data);
     }

     var getSite = function(callback){
       db.query(q, function(err, rows, fields) {
         console.log(rows);
         console.log(q);
         var site = rows;
         
         if(err) throw err;
           callback(null, site);
         });

     }

    getSite(returnSite);

});

app.post('/getSounds', function (req, res) {
  console.log("getting sounds");
  var site_code = req.body.site;
  console.log("Site Name"+site_code);
  //var response =sites(site_name);
  var select = 'SELECT * FROM sounds INNER JOIN sites ON sites.Site_Code = sounds.Site_Code '
  var q = select+ "WHERE sites.Site_Code ='"+site_code+"'";
  var returnSound = function(err, data){
    //console.log(data);
     res.send(data);
   }

   var getSound = function(callback){
     db.query(q, function(err, rows, fields) {
       console.log(rows);
       console.log(q);
       var site = rows;
       if(err) throw err;
         callback(null, site);
       });

   }

  getSound(returnSound);
});

//technically have a post and a get for search... more than need?
/*app.post('/search', function(req, res){
  var text = req.body.search
  console.log("rendering search");
  console.log(text);

 res.redirect('/search/:'+text);


});*/



//partials
hbs.registerPartial('partial_name', 'partial value');
hbs.registerPartials(__dirname + '/views/partial');

//do I need this?
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var blocks = {};

hbs.registerHelper('test', function() {
  return 'test';
});

//Helper for If Equals function
hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

//helper extend and block, allow to add script to bottom of one page only
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;

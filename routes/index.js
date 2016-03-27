var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  //var db = req.db;
  var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : 'root',
     database : 'testing',
   });
  //connection.connect();
   connection.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      throw err;
    }
    console.log('Connection established');
    });

    connection.query('SELECT * from sites', function(err, rows, fields) {
      if (!err)
        console.log('The solution is: ', rows);
      else
        console.log('Error while performing Query.');
    });

  res.render('index', {
    title: 'Express Testing',
    age: '33',
    pet: "dog"
   });
});

router.get('/about', function(req, res) {
    res.render('about', { title: 'Hello, World!' });
});

router.get('/studies', function(req, res) {
    res.render('studies', { title: 'Hello, World!' });
});

router.get('/grte', function(req, res) {

    res.render('grte', { title: 'Hello, World!' });
});


module.exports = router; //return value of whole file

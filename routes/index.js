var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./db');

/* GET home page. */
router.get('/', function(req, res, next) {

  /*  db.query('SELECT * from sites', function(err, rows, fields) {
      if (!err)
        console.log('The solution is: ', rows);
      else
        console.log('Error while performing Query.');
    });*/

  res.render('index', {
    title: 'Express Testing',
    age: '33',
    pet: "dog"
   });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About' });
});

router.get('/studies', function(req, res) {
    res.render('studies', { title: 'Hello, World!' });
});

router.get('/grte', function(req, res) {
    res.render('grte', { title: 'grte'});
});

router.get('/yell', function(req, res) {
    res.render('yell', { title: 'yell'});
});

router.get('/list/:park', function(req, res) {
  db.query('SELECT * from sites', function(err, rows, fields) {
    if(err) throw err;
      res.render('list', { title: 'List', entries:rows, park: req.params.park });
      console.log('The solution is: ', rows);
  });

});

module.exports = router; //return value of whole file

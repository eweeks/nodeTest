var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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

module.exports = router; //return value of whole file

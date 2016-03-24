var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express Testing',
    age: '33'
   });
});

module.exports = router; //return value of whole file

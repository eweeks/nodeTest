var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./db');
var sites = require('./site');


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

router.get('/site', function(req, res) {
    //res.send(d.Site_Name.getSite());
    //res.send(list.getList());
    console.log("Site info");
});

router.get('/yell', function(req, res) {
    res.render('yell', { title: 'yell'});
});

router.get('/list/:park', function(req, res) {

  db.query('SELECT * FROM sounds JOIN sites ON sites.Site_Code = sounds.Site_Code', function(err, rows, fields) {
    if(err) throw err;
      res.render('list', { title: 'List', entries:rows, park: req.params.park });
      //console.log('The solution is: ', rows);
  });

});

router.get('/search', function(req, res) {
    console.log('you are searching..');
    var string = req.query.search;
    var text = '%'+string+'%';
    var select='SELECT * FROM sounds JOIN sites ON sites.Site_Code = sounds.Site_Code '
    var sql = select+"WHERE Sound_Name LIKE "+db.escape(text)+" OR Unit_Code LIKE "+db.escape(text)+" OR Tags LIKE "+db.escape(text)+"OR Site_Name LIKE "+db.escape(text)+"";

      db.query(sql, function(err, rows, fields) {
        if(err) throw err;
          res.render('search', { title: 'Search', entries:rows});
        });

});

//testing for typeahead..
router.get('/searchlist', function(req, res) {
    console.log('typeahead');
    var string = req.query.key;
    var text = '%'+string+'%';
    var sql = "SELECT * FROM sites WHERE Site_Name LIKE "+db.escape(text)+"";

      db.query(sql, function(err, rows, fields) {
        if(err) throw err;
            var data=[];
            for(i=0;i<rows.length;i++)
            {
            data.push(rows[i].Site_Name);
            }
            res.end(JSON.stringify(data));

        });
});

module.exports = router; //return value of whole file

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./db');
var sites = require('./site');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
    title: 'Visualizing Soundscapes',
   });
});

router.get('/about', function(req, res) {
  //var about = document.getElementById(about);
    //about.css('background', 'blue');
  res.render('index/', { title: 'Visualizing Soundscapes' });
  //console.log("about render");

   //$(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
  // $(window).scrollTop($('#about').offset().top);
});

router.get('/studies', function(req, res) {
    res.render('studies', { title: 'Hello, World!' });
});

router.get('/grte', function(req, res) {
    res.render('grte', { title: 'grte'});
});

router.get('/site', function(req, res) {
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

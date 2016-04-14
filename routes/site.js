var express = require('express');
var mysql = require('mysql');
var db = require('./db');

exports.getSite = function(n){
  var site_name = n;
  var q = "SELECT * FROM sites WHERE Site_Name = '"+site_name+"'";
  var returnSite = function(err, data){
     console.log(data);
     return (data);
   }

   var getSite = function(callback){
     db.query(q, function(err, rows, fields) {
       if(err) throw err;
         console.log('The solution is: ', rows);
         callback(null, rows);
       });

   }

  getSite(returnSite);


}

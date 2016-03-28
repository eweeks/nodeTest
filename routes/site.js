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

/*
module.exports = function (name) {


};

//var response;


var q = "SELECT * FROM sites WHERE Site_Name = '"+name+"'";
console.log("Query "+name);
return name;
app.get('/user/:userid', function (req, res, next) {
  res.send('respond with a user');
});

exports.sayHelloInEnglish = function() {
  return "HELLO";
};

exports.sayHelloInSpanish = function() {
  return "Hola";
};

query = function(n){
var name = n;
var q = "SELECT * FROM sites WHERE Site_Name = '"+name+"'";
var r;
db.query(q, function(err, rows, fields) {
  if(err) throw err;
    console.log('The solution is: ', rows);
    return r;
  });

};

exports.getSite = function(n){
  var result = query(n);
  console.log("results "+result);
  return result;

/*  var name = n;
  var response;
  var q = "SELECT * FROM sites WHERE Site_Name = '"+name+"'";
  console.log("site name to look up "+ name);
  //var response;
  db.query(q, function(err, rows, fields) {
    if(err) throw err;
      console.log('The solution is: ', rows);
      response=rows;
        return response;
      //console.log(response);
  });
  //console.log(response);
    //return response;
  //return response;*/
//};

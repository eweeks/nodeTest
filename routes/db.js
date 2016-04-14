var mysql = require('mysql');
console.log("Hello!");
var db;
var settings = {
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'testing',
   debug: 'true',
 };

 var settings2 = {
     connectionLimit : 10, //important
     host     : 'localhost',
     user     : 'root',
     password : 'root',
     database : 'testing',
     debug    :  false
 };

function connectDatabase() {
    db= mysql.createPool(settings2);
    db.getConnection(function(err, connection) {
        // connected! (unless `err` is set)
        if(!err) {
            connection.release();
            console.log('Database is connected!');
        } else {
            console.log('Error connecting database!');
        }
    });

    return db;
}

module.exports = connectDatabase();

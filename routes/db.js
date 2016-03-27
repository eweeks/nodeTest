var mysql = require('mysql');
var db;
//setting up database
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'testing',
 });


function connectDatabase() {
    if (!db) {
       connection.connect(function(err){
        if(err){
          console.log('Error connecting to Db');
          throw err;
        }
        console.log('Connection established');
      });
    }
    return db;
}

module.exports = connectDatabase();

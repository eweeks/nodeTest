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

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);


        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();

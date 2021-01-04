const mysql = require('mysql');
const mysql2 = require('mysql2');
var user = require('./users');
var connection;
function connectToDatabase(){
    console.log("Connecting to Database ...");
    
 connection = mysql2.createPool({
    host: 'factorycluster.cscjitdezpyp.us-east-2.rds.amazonaws.com',
    port:'3306',
    user:'admin',
    password:'moatazmaher',
    database : 'Factory'
});
connection.promise()
.execute("SELECT * FROM `Managers`")
.then(([rows]) => {
    console.log('Connected to Database!');
}).catch(err => {
    console.log(err);
});}
function checkUser(Data,Callback){
    var Response;
    connection.promise().execute("SELECT ID,Password,Type FROM Managers WHERE ID = '"+ Data.ID +"'")
    .then(([rows]) => {
        
    if(rows.length == 0){
        Response = "Wrong ID";
    }
    else {
        if(rows[0].Password == Data.Password){
            user.knowUser(rows[0]);
            Response = "Pass";

        }
        else 
        Response = "Wrong Password";
    }
    // show the all users name
  //  rows.forEach(user => {
  //      console.log(user.name);
   // });
   Callback(Response)
}).catch(err => {
    console.log(err);
});

 }
function getAllManagers(Callback){
    connection.query("SELECT * FROM Managers",function(err, results, fields){
        Callback(results);
    });
    
}
module.exports = {connectToDatabase,checkUser,getAllManagers};
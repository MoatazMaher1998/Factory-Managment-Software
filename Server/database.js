const mysql = require('mysql');
const mysql2 = require('mysql2');
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
    console.log('Connected to Mysql Database! Weza fager a gd3an');
}).catch(err => {
    console.log(err);
});}
function checkUser(Data,Callback){
    var Response='weza';
    connection.promise().execute("SELECT Password,Type FROM Managers WHERE ID = '"+ Data.ID +"'")
    .then(([rows]) => {
        
    if(rows.length == 0){
        Response = "Wrong ID";
    }
    else {
        if(rows[0].Password == Data.Password){
            if(rows[0].Type == 1){Response = "Admin";}
            else{Response = "Manager";}
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

module.exports = {connectToDatabase,checkUser};
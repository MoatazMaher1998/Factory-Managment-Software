const mysql = require('mysql');
const mysql2 = require('mysql2');
var user = require('./users');
var connection;
function deleteUser(ID,Callback){
    connection.query("DELETE FROM Factory.Managers WHERE (`ID` = '"+ ID +"');", 
    function(err,results,fields){
        console.log(err);
        Callback(results);
     
});
}
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
    connection.query("SELECT * FROM Factory.Managers  LEFT JOIN Factory.Department ON Factory.Managers.dep_ID = Factory.Department.Dept_ID",function(err, results, fields){
        Callback(results);
    });
    
}
function getTables(Callback){
    connection.query("select * from Factory.Cutting Left Join Factory.Order ON Factory.Cutting.order_id = Factory.Order.order_id",function(err,Cuttings,fields){    
    connection.query("select * from Factory.Sewing  Left Join Factory.Order ON Factory.Sewing.order_id = Factory.Order.order_id",function(err,Sewings,fields){
    connection.query("select * from Factory.Packing Left Join Factory.Order ON Factory.Packing.order_id = Factory.Order.order_id",function(err,Packings,fields){
    connection.query("select * from Factory.Order",function(err,Orders,fields){
    connection.query("select * from Factory.Managers",function(err,Managers,fields){
    connection.query("select * from Factory.Patron",function(err,Patrons,fields){
    connection.query("select * from Factory.Cloth",function(err,Cloth,fields){
                Callback(Cuttings,Sewings,Packings,Orders,Managers,Patrons,Cloth);
            });
            });
            });
            });
            });
            });
            });
    
}
function addManager(Manager,Callback){
   if(Manager.Department == 1){
      Type = "admin";
   }
    else if(Manager.Department == 2){
        Type = "CManager";
    }
    else if(Manager.Department == 3){
        Type = "SManager";
    }
    else if(Manager.Department == 4){
        Type = "PManager";
    }
    connection.query("INSERT INTO `Factory`.`Managers` (`name`, `password`, `type`, `dep_ID`) VALUES ('"+ Manager.Name+"', '" + Manager.Password + "', '"+Type + "', '" + Manager.Department+ "');",
    function(err, results, fields){
        Callback(results);
    
    });
      
    
}
function addOrder(Data,Callback){
    console.log(Data);
    connection.query("INSERT INTO Factory.Order (order_id, patron_id, cloth_id, start_date, order_cost) VALUES ("+Data.orderid+"," +Data.Patron_ID +"," + Data.Cloth_ID +",'"+ "2021-01-06" +"',"+ (Data.Cutting_Cost * Data.outputquantity) + ");",
    function(err1, result1, fields){
    connection.query("INSERT INTO Factory.Cutting ( mgr_id, cost, output_quantity, order_id) VALUES ('"+Data.managerid +"', '"+ Data.Cutting_Cost+"', '"+ Data.outputquantity +"', '"+ Data.orderid +"')",
        function(err2, result2, fields){
        Callback(err1);
        });
    });
}
function proceedCutting(Data,Callback){
    connection.query("",
    function(err, results, fields){
        Callback(results);
    
    });
}
module.exports = {proceedCutting,connectToDatabase,checkUser,getAllManagers,addManager,deleteUser,getTables,addOrder};
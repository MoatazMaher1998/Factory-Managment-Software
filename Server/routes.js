const { response } = require('express');
var express = require('express');
var router = express.Router();
var database = require('./database');
const { getUser,validateUser } = require('./users');

router.post('/DeleteUser',function(req,res){
Data = req.body;
if(Data.ID == 1){
    database.getAllManagers(function(response){
        res.render('AdminPanel',{managers : response , msg : "You cant delete yourself ya 5anzeer"});
    });
}
else{
database.deleteUser(Data.ID,function(results){
      if(results.affectedRows == 1){
        database.getAllManagers(function(response){
            res.render('AdminPanel',{managers : response , msg : "User Deleted !"});
        });
    }
    else {
        database.getAllManagers(function(response){
            res.render('AdminPanel',{managers : response , msg : "User Doesn't Exist!"});
        });
    }
});

}
});
router.post('/AddUser', function(req,res){
    Data = req.body;
    if(Data.Password == Data.CPassword){
        database.addManager(Data,function(result){
            if(result.affectedRows == 1){
                database.getAllManagers(function(response){
                    res.render('AdminPanel',{managers : response , msg : "User Added" , user : getUser()});
                });
            }
            else {
                database.getAllManagers(function(response){
                    res.render('AdminPanel',{managers : response , msg : "There Was Error !" , user : getUser()});
                });
            }
        })
    }
});
router.post('/admin', function(req,res){
if(validateUser(req.body) == true){
        database.getAllManagers(function(response){
        res.render('AdminPanel',{managers : response , msg:"" , user : req.body});
    });
    
        }
else 
res.send("you have no authentication ya 3ars");
});
router.post('/main', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','POST request on "/main" received on server');
    database.getTables(function(Cuttings,Sewings,Packings,Orders,Managers,Patrons,Cloth){
       
    database.checkUser(req.body,function(response){
        if( response == "Pass"){
            res.render('Main' , {user :getUser() , Cloth_List : Cloth , Patrons_List : Patrons,Managers_List: Managers,Cutting_Orders : Cuttings , Sewing_Orders : Sewings ,Packing_Orders : Packings , Orders_List : Orders});}
            else {
                res.render('Welcome' , {condition :response});}
           
            
            
    });
});
});
router.get('/*', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','GET request on "/" received on server');
    res.render('Welcome',{condition : "new"} );
    
});
module.exports = router;
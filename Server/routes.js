var express = require('express');
var router = express.Router();
var database = require('./database');
const { getUser,validateUser } = require('./users');

router.post('/admin', function(req,res){
if(validateUser(req.body)== true){
    res.render('AdminPanel',{managers : database.getAllManagers()});}
else 
res.send("you have no authentication ya 3ars");
});
router.post('/main', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','POST request on "/main" received on server');
    
    database.checkUser(req.body,function(response){
        if( response == "Pass"){
            res.render('Main' , {user :getUser()});}
            else {
                res.render('Welcome' , {condition :response});}
           
            
            
    });
});
router.get('/*', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','GET request on "/" received on server');
    res.render('Welcome',{condition : "new"} );
    
});
module.exports = router;
var express = require('express');
var router = express.Router();
var database = require('./database');
const { getUser } = require('./users');
var user = require('./users');
router.post('/admin', function(req,res){
res.send("Hello");
});
router.post('/main', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','POST request on "/main" received on server');
    
    database.checkUser(req.body,function(response){
        if( response == "admin"){
            user.knowUser(response);
            console.log(getUser());
            res.render('Main' , {type :getUser()});}
            else {
                res.render('Welcome' , {condition :response});}
           
            
            
    });

  
});
router.get('/*', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','GET request on "/" received on server');
    res.render('Welcome',{condition : "new"} );
    
});
module.exports = router;
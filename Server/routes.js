var express = require('express');
var router = express.Router();
var database = require('./database');
router.post('/main', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','POST request on "/main" received on server');
    
    database.checkUser(req.body,function(response){
        console.log(response);
        if( response == "Admin"){
            res.sendFile(require('path').parse(__dirname).dir + '/Views/Main.html');}
            else{
                res.send(response);
            }
    });

  
});
router.get('/', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','GET request on "/" received on server');
    res.sendFile(require('path').parse(__dirname).dir + '/Views/Welcome.html' );
});
module.exports = router;
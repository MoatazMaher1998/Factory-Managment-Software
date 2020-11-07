var express = require('express');
var router = express.Router();
router.post('/user', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','POST request on "/user" received on server');
    res.send("User " + req.body.uname + " Logged in now");
});
router.get('/', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','GET request on "/" received on server');
    res.sendFile(require('path').parse(__dirname).dir + '/Views/Welcome.html' );
});
module.exports = router;
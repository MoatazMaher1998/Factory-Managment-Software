var express = require('express');
var router = express.Router();
router.post('/main', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','POST request on "/main" received on server');
    res.sendFile(require('path').parse(__dirname).dir + '/Views/Main.html');
});
router.get('/', function (req, res) {
    console.log('\x1b[36m%s\x1b[0m','GET request on "/" received on server');
    res.sendFile(require('path').parse(__dirname).dir + '/Views/Welcome.html' );
});
module.exports = router;
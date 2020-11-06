const express = require("express");
var opn = require('opn');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',function(req,res){
console.log("Server Responded to init GET req");
res.sendFile(__dirname + '/Views/Welcome.html' )
});
app.listen(2000, function() {

    console.log('App running on port 2000');

});
opn('http://localhost:2000/');
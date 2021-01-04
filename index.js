const express = require("express");
var opn = require('opn');
const app = express();
app.use(express.static(__dirname + '/views'));
app.set("view engine","ejs");
const Port = process.env.PORT || 2000;
var routes = require('./Server/routes.js');
var database = require('./Server/database');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
database.connectToDatabase();
app.use('/',routes);
app.use('/user',routes);
app.listen(Port, function() {

    console.log("App running on port : " + Port);

});
//opn('http://localhost:2000/');
const express = require("express");
var opn = require('opn');
const app = express();
var routes = require('./Server/routes.js')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/',routes);
app.use('/user',routes);
app.listen(2000, function() {

    console.log('App running on port 2000');

});
opn('http://localhost:2000/');
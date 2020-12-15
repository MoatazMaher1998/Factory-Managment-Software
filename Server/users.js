const e = require("express");

var currentUser;
function knowUser(user){
currentUser = user;
}
function getUser(){
    return currentUser;
}
function validateUser(req){
if(req.ID == currentUser.ID && req.Password == currentUser.Password){
    return true;
}
else return false;
}
module.exports={getUser,knowUser,validateUser};
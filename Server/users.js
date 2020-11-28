var currentUser;
function knowUser(user){
currentUser = user;
}
function getUser(){
    return currentUser;
}
module.exports={getUser,knowUser};
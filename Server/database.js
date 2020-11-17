const mysql = require('mysql');
function connectToDatabase(){
var connection = mysql.createConnection({
  host: 'sql7.freemysqlhosting.net',
  port : '3306',
  user: 'sql7377142',
  password: 'VEWpxxIlVs',
  database: 'sql7377142'
});
connection.connect((err) => {
  if (err){console.log(err);}
  else
  console.log('Connected!');
});
connection.query("INSERT INTO `test` (`ID`, `Name`) VALUES ('3', 'kosomyahmedhany');");


}
module.exports = connectToDatabase;
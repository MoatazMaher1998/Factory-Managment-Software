<?php
$Username = $_POST['uname'];
$Password = $_POST['psw'];

if(strtolower($Username) == "ahmed"  &&  $Password == "1234")
{
    header("Location: Main.html");
}
else
{
    header("Location: Wrong.html");
}


?>

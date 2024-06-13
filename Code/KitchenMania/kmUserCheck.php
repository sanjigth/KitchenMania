<?php

if(!empty($_POST['login'])) {

    $userName = $_POST["EmailAddress"];
    $passW = $_POST["Password"];

    $connectionString = 'localhost';
    $connectionDB = 'kitchenmaniadb';
    $userN = "root";
    $pass = "";
    $connection = @mysqli_connect($connectionString, $userN, $pass, $connectionDB);

    $sql = "SELECT EmailAddress FROM km_users WHERE EmailAddress = '$userName' and Password = '$passW'";

    $select = $connection->query($sql);

    if ($select->num_rows>0){
        echo '<a href="index.html">Please click to continue to the game</a>';
    } else {
        echo "User login details are incorrect!";
        die("Error: {$connection->errno} : {$connection->error}");
    }
$connection->close();
}
?>
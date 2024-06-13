<?php
    if (!empty($_POST['signUp'])) {

        $firstName = $_POST['FirstName'];
        $lastName = $_POST['LastName'];
        $emailAdd = $_POST['EmailAddress'];
        $passW = $_POST['Password'];
        
        $connectionString = 'localhost';
        $connectionDB = 'kitchenmaniadb';
        $userN = "root";
        $pass = "";
        $connection = @mysqli_connect($connectionString, $userN, $pass, $connectionDB);
        
        $sql = "INSERT INTO km_users (FirstName, LastName, EmailAddress, Password) VALUES ('$firstName', '$lastName', '$emailAdd', '$passW')";

        $insert = $connection->query($sql);
        
        if ($insert === TRUE) {
            echo "<h1>Success! Thank you registering an account! </h1> ";
            echo ' <a href="kmLoginForm.html">Click here to go back to the login page!</a>';
        } else {
            die("Error: {$connection->errno} : {$connection->error}");
        }
        $connection->close();
    }
?>
<?php
$servername = "localhost";
$username = "root";
$password = "admin1234";
$dbname = "androiddb";
$user_id = $_GET["user_id"];
$user_name = $_GET["user_name"];
$passwd = $_GET["passwd"];
$id1 = $_GET["id"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE usertb SET user_id='$user_id', user_name='$user_name',passwd='$passwd' WHERE id='$id1'";

if ($conn->query($sql) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
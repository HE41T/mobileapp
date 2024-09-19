<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "androiddb";

// Get the ID from the request
$id1 = isset($_GET["id"]) ? intval($_GET["id"]) : 0;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Set the response content type to JSON
//header('Content-Type: application/json');

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Prepare the SQL statement to prevent SQL injection
$sql = "DELETE FROM usertb WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id1);

// Execute the query
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        // Successfully deleted the record
        echo json_encode(['success' => true, 'message' => 'Record deleted successfully']);
    } else {
        // No record found with the given ID
        echo json_encode(['success' => false, 'message' => 'No record found with the given ID']);
    }
} else {
    // SQL error
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
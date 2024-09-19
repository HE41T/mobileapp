<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "androiddb";

// Set the response content type to JSON
header('Content-Type: application/json');

// Get the search query from the request
$query = isset($_GET['query']) ? $_GET['query'] : '';

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for a connection error
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Escape the query to prevent SQL injection
$query = $conn->real_escape_string($query);

// Prepare the SQL query to search for matching user names or IDs
$sql = "SELECT id, user_id, user_name, passwd FROM usertb WHERE user_id LIKE '%$query%'";

// Execute the query
$result = $conn->query($sql);

// Prepare the results as an array
$searchResults = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $searchResults[] = $row;
    }
}

// Return the search results as JSON
echo json_encode($searchResults);

// Close the database connection
$conn->close();
?>

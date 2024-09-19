<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "androiddb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id']) || !isset($data['user_name']) || !isset($data['passwd']) || !isset($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required parameters']);
    exit;
}

$user_id = $data['user_id'];
$user_name = $data['user_name'];
$passwd = $data['passwd'];
$id = $_GET['id'];

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare("UPDATE usertb SET user_id = ?, user_name = ?, passwd = ? WHERE id = ?");
$stmt->bind_param("sssi", $user_id, $user_name, $passwd, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Record updated successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating record: ' . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>

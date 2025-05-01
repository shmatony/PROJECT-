<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "farmer_friendly";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$title = $_POST['title'];
$content = $_POST['content'];

$sql = "INSERT INTO blogs (title, content, date_posted) VALUES (?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $title, $content);

if ($stmt->execute()) {
  echo "Story submitted successfully!";
} else {
  echo "Error: " . $conn->error;
}

$conn->close();
?>

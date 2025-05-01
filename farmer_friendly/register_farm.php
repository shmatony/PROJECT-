<?php
// Try these connection options one by one

// Option 1: Using the farmer_user
$host = "localhost";
$dbname = "farmer_friendly_farms";
$username = "farmer_user";
$password = "your_password_here"; // Use the password you set

// Option 2: Using root (XAMPP default)
// $username = "root";
// $password = ""; // Empty password for XAMPP

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
    
    // Your registration code here...
    
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
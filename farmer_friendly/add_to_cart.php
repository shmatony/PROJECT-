<?php
session_start();

// Initialize cart if not set
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Handle adding product
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $product_name = $_POST['product_name'];
    $product_price = $_POST['product_price'];

    $item = [
        'name' => $product_name,
        'price' => $product_price
    ];

    $_SESSION['cart'][] = $item;

    // Redirect back to products page
    header("Location: products.html");
    exit();
}
?>

<?php
session_start();

// Clear the cart after checkout
$_SESSION['cart'] = [];

echo "<h1>✅ Thank you for your purchase!</h1>";
echo "<p>Your order has been placed successfully.</p>";
echo "<a href='products.html'>Go Back to Products</a>";
?>

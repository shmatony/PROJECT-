<?php
session_start();

// Handle removal
if (isset($_GET['remove'])) {
    $product_to_remove = $_GET['remove'];
    unset($_SESSION['cart'][$product_to_remove]);
    header('Location: view_cart.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cart- Farmer Friendly</title>
    <link rel="stylesheet" href="Rizz.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <h1>🌾 Farmer Friendly</h1>
        <h2>Shopping Cart</h2>
<?php
if (!empty($_SESSION['cart'])) {
    $total_price = 0;

    echo "<table border='1' cellpadding='10'>";
    echo "<tr><th>Product</th><th>Price (KSh)</th><th>Quantity</th><th>Subtotal (KSh)</th><th>Action</th></tr>";

    foreach ($_SESSION['cart'] as $name => $details) {
        $subtotal = $details['price'] * $details['quantity'];
        echo "<tr>";
        echo "<td>" . htmlspecialchars($name) . "</td>";
        echo "<td>" . htmlspecialchars($details['price']) . "</td>";
        echo "<td>" . htmlspecialchars($details['quantity']) . "</td>";
        echo "<td>" . $subtotal . "</td>";
        echo "<td><a href='view_cart.php?remove=" . urlencode($name) . "'>❌ Remove</a></td>";
        echo "</tr>";

        $total_price += $subtotal;
    }

    echo "<tr><td colspan='3'><strong>Total</strong></td><td colspan='2'><strong>KSh " . $total_price . "</strong></td></tr>";
    echo "</table>";

    echo "<br><a href='products.php'>Continue Shopping</a> | ";
    echo "<a href='checkout.php'>Proceed to Checkout</a>";
} else {
    echo "<p>Your cart is empty! 🛒</p>";
    echo "<a href='products.php'>Start Shopping</a>";
}
?>

</body>
</html>

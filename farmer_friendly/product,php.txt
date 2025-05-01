<?php
session_start();
?>
<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products - Farmer Friendly</title>
    <link rel="stylesheet" href="Rizz.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <h1>🌾 Farmer Friendly</h1>
        <nav>


<div class="product-card">
  <img src="images/potatoes.jpg" alt="Organic Potatoes">
  <h3>Organic Potatoes</h3>
  <p>Chemical-free potatoes, hand-harvested in Mt. Kenya.</p>
  <form method="post" action="cart.php">
    <input type="hidden" name="product_name" value="Organic Potatoes">
    <input type="hidden" name="product_price" value="100">
    <button type="submit" name="add_to_cart">Add to Cart</button>
  </form>
</div>

<div class="product-card">
  <img src="images/carrots.jpg" alt="Crisp Carrots">
  <h3>Crisp Carrots</h3>
  <p>Freshly harvested carrots, perfect for snacking.</p>
  <form method="post" action="cart.php">
    <input type="hidden" name="product_name" value="Crisp Carrots">
    <input type="hidden" name="product_price" value="80">
    <button type="submit" name="add_to_cart">Add to Cart</button>
  </form>
</div>

<a href="view_cart.php">Go to Cart</a>

</body>
</html>

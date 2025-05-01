document.addEventListener('DOMContentLoaded', function() {
     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = calculateTotal(cart);
     const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const addToCartButtons = document.querySelectorAll('.product-card .btn');
     updateCartDisplay();
   
     addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const product = {
                name: productCard.querySelector('h3').textContent,
                price: extractPrice(productCard.querySelector('p:nth-child(4)').textContent),
                image: productCard.querySelector('img').src,
                quantity: 1,
                id: generateProductId(productCard)
            };
            
            addToCart(product);
        });
    });
       
    // Checkout button functionality
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert(`Order placed! Total: Ksh ${total.toFixed(2)}`);
            clearCart();
        });
    }
    
    // Helper Functions
    function extractPrice(priceText) {
        // Handle both "129ksh/kg" and "$1.29/kg" formats
        const priceMatch = priceText.match(/(\d+\.?\d*)/);
        return priceMatch ? parseFloat(priceMatch[0]) : 0;
    }
    
    function generateProductId(productCard) {
        // Create a consistent ID from product name and first 3 letters of price
        const name = productCard.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
        const price = productCard.querySelector('p:nth-child(4)').textContent.match(/\d+/)[0];
        return `${name}-${price.substring(0, 3)}`;
    }
    
    function addToCart(product) {
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            // Update quantity if product exists
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new product to cart
            cart.push(product);
        }
        
        total = calculateTotal(cart);
        saveCart();
        updateCartDisplay();
        
        // Show add to cart notification
        showNotification(`${product.name} added to cart!`);
    }
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        total = calculateTotal(cart);
        saveCart();
        updateCartDisplay();
    }
    
    function updateQuantity(productId, newQuantity) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1 && newQuantity > 0) {
            cart[itemIndex].quantity = parseInt(newQuantity);
            total = calculateTotal(cart);
            saveCart();
            updateCartDisplay();
        }
    }
    
    function calculateTotal(cartItems) {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function clearCart() {
        cart = [];
        total = 0;
        saveCart();
        updateCartDisplay();
    }
    
    function updateCartDisplay() {
        if (!cartItemsDiv) return;
        
        cartItemsDiv.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotalDiv.textContent = `Total: Ksh 0.00`;
            return;
        }
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Ksh ${item.price.toFixed(2)} per item</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <input type="number" min="1" value="${item.quantity}" 
                           data-id="${item.id}" class="quantity-input">
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                    <span class="item-total">Ksh ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
            cartItemsDiv.appendChild(cartItemElement);
        });
        
        // Add event listeners to dynamically created elements
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(this.dataset.id);
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                updateQuantity(this.dataset.id, parseInt(this.value));
            });
        });
        
        cartTotalDiv.textContent = `Total: Ksh ${total.toFixed(2)}`;
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Simulate login (replace with actual API call)
        console.log('Login attempt with:', { email, password, rememberMe });

        // Redirect on successful login
        window.location.href = 'dashboard.html';
    });

    // Forgot password link
    document.querySelector('.form-options a').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset link will be sent to your email!');
    });
});
// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-6VX7EGWTQW');

// Newsletter Form Submission
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    
    if (validateEmail(email)) {
        fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => showToast('Subscription successful!'))
        .catch(error => showToast('Error, please try later'));
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showToast(message) {
    // Implementation for toast notifications
}


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Simulate successful registration
    alert('Registration successful!');
    window.location.href = 'login.html';
});
// Mobile Menu Toggle (for responsive design)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    const nav = document.querySelector('nav');
    document.querySelector('header').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
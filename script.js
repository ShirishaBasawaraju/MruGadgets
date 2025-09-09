let cart = [];

const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCount = document.getElementById('cart-count');

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const p = document.createElement('p');
        p.textContent = `${item.name} - ₹${item.price}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => { cart.splice(index, 1); updateCartDisplay(); };
        p.appendChild(removeBtn);
        cartItemsContainer.appendChild(p);
    });
    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

cartBtn.onclick = () => { cartModal.style.display = 'block'; }
closeCart.onclick = () => { cartModal.style.display = 'none'; }
window.onclick = (e) => { if(e.target == cartModal) cartModal.style.display = 'none'; }


// Checkout simulation
checkoutBtn.onclick = () => {
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }
    alert("Payment options: Credit Card, UPI, Netbanking\nTotal: ₹" + cartTotal.textContent);
    cart = [];
    updateCartDisplay();
    cartModal.style.display = 'none';
};
document.querySelectorAll('.product-card').forEach(card => {
    const btn = document.createElement('button');
    btn.textContent = 'Add to Cart';
    btn.onclick = () => {
        const name = card.querySelector('h4').textContent;
        const price = parseInt(card.querySelector('p').textContent.replace('₹','').trim());
        cart.push({name, price});
        updateCartDisplay();
        alert(`${name} added to cart!`);
    };
    card.appendChild(btn);
});
checkoutBtn.onclick = () => {
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }
    // Show payment section
    document.getElementById('payment-section').style.display = 'block';
};

// Handle Payment
document.getElementById('pay-btn').onclick = () => {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    alert(`Payment Successful!\nMethod: ${paymentMethod}\nTotal: ₹${cartTotal.textContent}`);
    
    // Clear cart after payment
    cart = [];
    updateCartDisplay();
    cartModal.style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
};

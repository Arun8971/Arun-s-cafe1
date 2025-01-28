// Menu Data
const menuItems = [
  { id: 1, name: "Masala Dosa", price: 120, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Paneer Tikka", price: 180, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Butter Chicken", price: 220, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Gulab Jamun", price: 80, image: "https://via.placeholder.com/200" },
];

let cart = [];

// Render Menu
const menuContainer = document.querySelector('.menu-items');
menuItems.forEach(item => {
  const menuItem = document.createElement('div');
  menuItem.classList.add('menu-item');
  menuItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p class="price">₹${item.price}</p>
    <button onclick="addToCart(${item.id})">Add to Cart</button>
  `;
  menuContainer.appendChild(menuItem);
});

// Add to Cart
function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  const cartItem = cart.find(i => i.id === itemId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
}

// Update Cart
function updateCart() {
  const cartContainer = document.querySelector('.cart-items');
  const cartCount = document.getElementById('cart-count');
  const totalAmount = document.getElementById('total-amount');

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <h3>${item.name}</h3>
      <div class="quantity">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
      <p>₹${item.price * item.quantity}</p>
    `;
    cartContainer.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalAmount.textContent = total;
}

// Update Quantity
function updateQuantity(itemId, change) {
  const cartItem = cart.find(i => i.id === itemId);
  cartItem.quantity += change;
  if (cartItem.quantity <= 0) {
    cart = cart.filter(i => i.id !== itemId);
  }
  updateCart();
}

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
  document.getElementById('cart').style.display = 'none';
  document.getElementById('order-confirmation').style.display = 'block';
  cart = [];
  updateCart();
});

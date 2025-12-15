// ------------- CART STORAGE ---------------

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ---------------- CART COUNT ----------------

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.qty, 0);

  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = count;
  }
}

// ---------------- ADD TO CART ----------------

function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find(item => item.id == productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

// ---------------- CLICK HANDLER ----------------

document.addEventListener("click", event => {
  const button = event.target.closest(".add-to-cart");
  if (!button) return;

  const productId = button.dataset.id;
  addToCart(productId);
});

// ---------------- INIT ----------------
updateCartCount();

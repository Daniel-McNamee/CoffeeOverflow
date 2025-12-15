// --------------- HELPERS ----------------

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function loadProducts() {
  const res = await fetch("/data/products.json");
  return res.json();
}

// ------------ RENDER CART ----------------

async function renderCart() {
  const cart = getCart();
  const products = await loadProducts();

  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const emptyCartEl = document.getElementById("emptyCart");

  cartItemsEl.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyCartEl.classList.remove("d-none");
    cartTotalEl.textContent = "0.00";
    return;
  }

  emptyCartEl.classList.add("d-none");

  cart.forEach(item => {
    const product = products.find(p => p.id == item.id);
    if (!product) return;

    const lineTotal = product.price * item.qty;
    total += lineTotal;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <strong>${product.name}</strong><br>
        <small class="text-muted">${product.roast}</small>
      </td>

      <td>
        <input
          type="number"
          min="1"
          value="${item.qty}"
          class="form-control form-control-sm"
          data-id="${item.id}">
      </td>

      <td>€${product.price.toFixed(2)}</td>
      <td>€${lineTotal.toFixed(2)}</td>

      <td>
        <button class="btn btn-sm btn-outline-danger" data-remove="${item.id}">
          Remove
        </button>
      </td>
    `;

    cartItemsEl.appendChild(row);
  });

    cartTotalEl.textContent = total.toFixed(2);
  
    updateCartCount();
}


// ---------------- EVENTS ----------------

// Quantity change
document.addEventListener("change", event => {
  if (event.target.matches("input[data-id]")) {
    const id = event.target.dataset.id;
    const qty = parseInt(event.target.value, 10);

    let cart = getCart();
    const item = cart.find(i => i.id == id);

    if (item && qty > 0) {
      item.qty = qty;
      saveCart(cart);
      renderCart();
    }
  }
});

// Remove item
document.addEventListener("click", event => {
  if (event.target.matches("button[data-remove]")) {
    const id = event.target.dataset.remove;
    let cart = getCart().filter(item => item.id != id);
    saveCart(cart);
    renderCart();
  }
});

// ---------------- INIT ----------------
renderCart();

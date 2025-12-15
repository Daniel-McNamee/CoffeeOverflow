// ---------------- HELPERS ----------------

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// ------------ AUTOFILL ADDRESS -------------

document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();
  const addressField = document.getElementById("address");

  if (user && user.address && addressField) {
    addressField.value = user.address;
  }
});

// ---------------- PAYMENT SUBMIT ----------------

document.getElementById("checkoutForm")?.addEventListener("submit", event => {
  const form = event.target;

  // Let HTML5 validation run first
  if (!form.checkValidity()) {
    return;
  }

  event.preventDefault();

  // Read values
  const cardNumberRaw = document.getElementById("cardNumber").value;
  const cardNumber = cardNumberRaw.replace(/\s/g, "");
  const expiry = document.getElementById("expiry").value;
  const cvc = document.getElementById("cvc").value;
  const address = document.getElementById("address").value;

  // Log submitted form data
  console.log("Checkout form submitted:", {
    address,
    cardNumber,
    expiry,
    cvc
  });

  const error = document.getElementById("checkoutError");
  const success = document.getElementById("checkoutSuccess");

  // Regex validation
  const cardRegex = /^\d{16}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvcRegex = /^\d{3}$/;

  const valid =
    cardRegex.test(cardNumber) &&
    expiryRegex.test(expiry) &&
    cvcRegex.test(cvc);

  if (!valid) {
    error.classList.remove("d-none");
    return;
  }

  error.classList.add("d-none");

  // Save last 4 digits
  const user = getUser();
  if (user) {
    user.paymentLast4 = cardNumber.slice(-4);
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Clear cart
  localStorage.removeItem("cart");

  // Update cart badge
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  // Show success message
  success.classList.remove("d-none");

  // Redirect after delay
  setTimeout(() => {
    window.location.href = "/";
  }, 15000);
});

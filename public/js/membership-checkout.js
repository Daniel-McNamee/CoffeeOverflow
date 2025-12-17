// ---------------- HELPERS ----------------
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// ---------------- MEMBERSHIP CHECKOUT ----------------
document
  .getElementById("membershipCheckoutForm")
  ?.addEventListener("submit", event => {

    const form = event.target;

    // Let browser validation run first
    if (!form.checkValidity()) {
      return;
    }

    event.preventDefault();

    // Read values
    const cardName = document.getElementById("cardName").value.trim();
    const cardNumberRaw = document.getElementById("cardNumber").value;
    const cardNumber = cardNumberRaw.replace(/\s/g, "");
    const expiry = document.getElementById("expiry").value;
    const cvc = document.getElementById("cvc").value;

    // Log submitted form data
    console.log("Membership checkout submitted:", {
      cardName,
      cardNumber,
      expiry,
      cvc,
      plan: "Coffee Overflow Membership",
      price: "€4.99 / month"
    });

    const error = document.getElementById("membershipError");

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

    // Save membership info to user
    const user = getUser() || {};
    user.isMember = true;
    user.membershipPlan = "Monthly";
    user.membershipPrice = "€4.99";
    user.paymentLast4 = cardNumber.slice(-4);

    localStorage.setItem("user", JSON.stringify(user));

    console.log("Membership activated for user:", user);

    // Delay redirect so console can be inspected
    setTimeout(() => {
      window.location.href = "/";
    }, 15000);
  });

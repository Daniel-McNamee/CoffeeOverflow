// ---------------- USER STORAGE ----------------

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "/";
}

// -------------- LOGIN ---------------

function handleLogin(event) {
  const form = event.target;

  if (!form.checkValidity()) {
    return;
  }

  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("loginError");

  // LOG INPUT DATA
  console.log("Login form submitted:", {
    username,
    password
  });

  if (username === "admin" && password === "coffee123") {
    setUser({
      username: "admin",
      email: "admin@coffeeoverflow.com",
      address: "Leitrim, Ireland",
      paymentLast4: "4242"
    });

    window.location.href = "/profile";
  } else {
    error.classList.remove("d-none");
  }
}

// ---------------- REGISTER ----------------

function handleRegister(event) {
  const form = event.target;

  if (!form.checkValidity()) {
    return;
  }

  event.preventDefault();

  const username = document.getElementById("regUser").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  // LOG INPUT DATA
  console.log("Register form submitted:", {
    username,
    email,
    password
  });

  setUser({
    username,
    email,
    address: "",
    paymentLast4: ""
  });

  window.location.href = "/profile";
}

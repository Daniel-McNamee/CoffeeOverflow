// ---------------- USER STORAGE ----------------

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// --------------- LOAD PROFILE --------------

document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();
  if (!user) {
    window.location.href = "/login";
    return;
  }

  document.getElementById("profileEmail").value = user.email || "";
  document.getElementById("profileAddress").value = user.address || "";

  const paymentInfo = document.getElementById("paymentInfo");
  if (user.paymentLast4) {
    paymentInfo.textContent = `Card ending in ${user.paymentLast4}`;
  }
});

// ---------------- SAVE DETAILS ----------------

document.getElementById("profileForm")?.addEventListener("submit", event => {
  const form = event.target;

  if (!form.checkValidity()) {
    return;
  }

  event.preventDefault();

  const address = document.getElementById("profileAddress").value;

  // LOG INPUT DATA
  console.log("Profile details updated:", {
    address
  });

  const user = getUser();
  user.address = address;

  setUser(user);

  document.getElementById("profileSaved").classList.remove("d-none");
});

// ---------------- CHANGE PASSWORD ----------------

document.getElementById("passwordForm")?.addEventListener("submit", event => {
  const form = event.target;

  if (!form.checkValidity()) {
    return;
  }

  event.preventDefault();

  const newPassword = document.getElementById("newPassword").value;

  // LOG INPUT DATA
  console.log("Password change submitted:", {
    newPassword
  });

  document.getElementById("passwordSaved").classList.remove("d-none");
});

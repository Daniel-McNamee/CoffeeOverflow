document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", event => {
    // Let HTML validation run first
    if (!form.checkValidity()) {
      return;
    }

    event.preventDefault();

    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    // Log Form Data
    console.log("Contact form submitted:", {
      email,
      message
    });

    // Clear form
    form.reset();
  });
});

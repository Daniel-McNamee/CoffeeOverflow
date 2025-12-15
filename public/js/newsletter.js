document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");

  if (!form) return;

  form.addEventListener("submit", event => {
    // Let HTML validation run first 
    if (!form.checkValidity()) {
      return;
    }

    event.preventDefault();

    const email = document.getElementById("newsletterEmail").value;
    const message = document.getElementById("newsletterMessage");

    // LOG FORM DATA
    console.log("Newsletter subscription:", {
      email
    });

    // Show confirmation message
    message.classList.remove("d-none");

    // Clear input
    form.reset();
  });
});

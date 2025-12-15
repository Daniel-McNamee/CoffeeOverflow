// Get filter inputs
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productCards = document.querySelectorAll(".product-card");

// Show or hide products
function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categoryFilter.value;

  productCards.forEach(card => {
    // Read product data
    const name = card.dataset.name.toLowerCase();
    const roast = card.dataset.roast?.toLowerCase() || "";
    const taste = card.dataset.taste?.toLowerCase() || "";
    const categories = card.dataset.categories || "";

    // Check search match
    const matchesSearch =
      name.includes(searchValue) ||
      roast.includes(searchValue) ||
      taste.includes(searchValue);

    // Check category match
    const matchesCategory =
      categoryValue === "all" || categories.includes(categoryValue);

    // Toggle visibility
    if (matchesSearch && matchesCategory) {
      card.closest(".col-12").style.display = "";
    } else {
      card.closest(".col-12").style.display = "none";
    }
  });
}

// Filter while typing
if (searchInput) {
  searchInput.addEventListener("input", filterProducts);
}

// Filter on category change
if (categoryFilter) {
  categoryFilter.addEventListener("change", filterProducts);
}

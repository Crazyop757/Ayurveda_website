// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initSearch();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId) {
                const targetSection = document.querySelector(targetId);
                targetSection?.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('#autocomplete');  // Ensure this matches the input ID
    const searchBarContainer = document.querySelector('.search-bar-container');  // For positioning suggestions

    // Create a suggestion box
    const suggestionsBox = document.createElement("div");
    suggestionsBox.classList.add('autocomplete-suggestions');
    suggestionsBox.style.display = "none";  // Hide by default
    searchBarContainer.appendChild(suggestionsBox);

    searchBar.addEventListener("input", () => {
        const query = searchBar.value.trim();

        if (query.length > 0) {
            // Fetch suggestions from the backend
            fetch(`/search-suggestions/?query=${query}`)
                .then(response => response.json())
                .then(data => {
                    suggestionsBox.innerHTML = ''; // Clear previous suggestions

                    // Check if there are diseases to show
                    if (data.diseases && data.diseases.length > 0) {
                        suggestionsBox.style.display = "block";  // Show the suggestion box

                        data.diseases.forEach(disease => {
                            const suggestionItem = document.createElement("div");
                            suggestionItem.classList.add("suggestion-item");
                            suggestionItem.textContent = disease;

                            // When a suggestion is clicked, fill the input with the selected disease
                            suggestionItem.addEventListener("click", () => {
                                searchBar.value = disease;
                                suggestionsBox.style.display = "none";  // Hide suggestions after selection
                            });

                            suggestionsBox.appendChild(suggestionItem);
                        });
                    } else {
                        // No suggestions found
                        suggestionsBox.innerHTML = "<div class='no-results'>No results found</div>";
                        suggestionsBox.style.display = "block";
                    }
                })
                .catch(error => console.error("Error fetching suggestions:", error));
        } else {
            suggestionsBox.style.display = "none";  // Hide the suggestion box if no query
        }
    });

    // Hide suggestions if clicked outside
    document.addEventListener("click", (event) => {
        if (!searchBarContainer.contains(event.target)) {
            suggestionsBox.style.display = "none";
        }
    });
});

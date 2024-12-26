document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initSearch();
});

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId) {
                const targetSection = document.querySelector(targetId);
                targetSection?.scrollIntoView({ behavior: 'smooth' });
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });
}

function initSearch() {
    const searchBar = document.querySelector('#autocomplete');
    const suggestionsBox = document.querySelector('#suggestions-box');

    console.log('Search function initialized'); // Add this for debugging

    if (!searchBar || !suggestionsBox) return; // Ensure elements exist

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.trim();

        if (query.length > 0) {
            fetch(`/search-suggestions/?query=${encodeURIComponent(query)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); // Check the fetched data in the console
                    suggestionsBox.innerHTML = ''; // Clear previous suggestions

                    if (data.diseases && data.diseases.length > 0) {
                        suggestionsBox.style.display = 'block'; // Show suggestions box
                        console.log('Suggestions box shown:', suggestionsBox.style.display);

                        data.diseases.forEach(disease => {
                            const suggestionItem = document.createElement('div');
                            suggestionItem.classList.add('suggestion-item');
                            suggestionItem.textContent = disease;

                            suggestionItem.addEventListener('click', () => {
                                searchBar.value = disease;
                                suggestionsBox.style.display = 'none'; // Hide suggestions box after selection
                            });

                            suggestionsBox.appendChild(suggestionItem);
                        });
                    } else {
                        suggestionsBox.innerHTML = '<div class="no-results">No results found</div>';
                        suggestionsBox.style.display = 'block'; // Show suggestions box
                    }
                })
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            suggestionsBox.style.display = 'none'; // Hide suggestions when query is empty
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchBar.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.style.display = 'none'; // Hide suggestions on outside click
        }
    });
}

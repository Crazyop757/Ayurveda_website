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

    console.log('Search elements:', { searchBar, suggestionsBox }); // Debug log

    if (!searchBar || !suggestionsBox) {
        console.error('Search elements not found');
        return;
    }

    searchBar.addEventListener('input', async (e) => {
        const query = e.target.value.trim();
        console.log('Input value:', query); // Debug log

        if (query.length > 0) {
            try {
                console.log('Fetching suggestions for:', query); // Debug log
                const response = await fetch(`/search-suggestions/?query=${encodeURIComponent(query)}`);
                console.log('Response status:', response.status); // Debug log
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Received data:', data); // Debug log

                suggestionsBox.innerHTML = '';
                
                if (data.diseases && data.diseases.length > 0) {
                    data.diseases.forEach(disease => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.classList.add('suggestion-item');
                        suggestionItem.textContent = disease;
                        
                        suggestionItem.addEventListener('click', () => {
                            searchBar.value = disease;
                            suggestionsBox.style.display = 'none';
                        });
                        
                        suggestionsBox.appendChild(suggestionItem);
                    });
                    suggestionsBox.style.display = 'block';
                    console.log('Suggestions box displayed'); // Debug log
                } else {
                    suggestionsBox.innerHTML = '<div class="no-results">No results found</div>';
                    suggestionsBox.style.display = 'block';
                    console.log('No results displayed'); // Debug log
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                suggestionsBox.innerHTML = '<div class="suggestion-item">Error loading suggestions</div>';
                suggestionsBox.style.display = 'block';
            }
        } else {
            suggestionsBox.style.display = 'none';
            console.log('Query empty, hiding suggestions'); // Debug log
        }
    });

    // Click outside to close suggestions
    document.addEventListener('click', (event) => {
        if (!searchBar.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.style.display = 'none';
        }
    });
}
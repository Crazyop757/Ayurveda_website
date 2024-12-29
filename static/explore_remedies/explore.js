document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const remedyCards = document.querySelectorAll('.remedy-card');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeBtn = document.querySelector('.close-btn');
    const popupElements = {
        title: document.getElementById('popupTitle'),
        englishName: document.getElementById('popupEnglishName'),
        image: document.getElementById('popupImage'),
        preparation: document.getElementById('popupPreparation'),
        usage: document.getElementById('popupUsage'),
        disease: document.getElementById('popupDisease')
    };

    // Open popup function
    function openPopup(card) {
        // Update popup content
        popupElements.title.textContent = card.dataset.name + ' ';
        popupElements.englishName.textContent = `(${card.dataset.englishName})`;
        popupElements.image.src = card.dataset.image;
        popupElements.image.alt = card.dataset.englishName;
        popupElements.preparation.textContent = card.dataset.preparation;
        popupElements.usage.textContent = card.dataset.usage;
        popupElements.disease.textContent = card.dataset.disease;

        // Show popup with animation
        requestAnimationFrame(() => {
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close popup function
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Clear content after animation
        setTimeout(() => {
            if (!popupOverlay.classList.contains('active')) {
                popupElements.image.src = '';
            }
        }, 300);
    }

    // Event Listeners
    remedyCards.forEach(card => {
        card.addEventListener('click', () => openPopup(card));
    });

    closeBtn.addEventListener('click', closePopup);
    
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
});
// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Add any additional interactivity here
    
    // Example: Add a class when card is clicked
    const card = document.querySelector('.content-card');
    card.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

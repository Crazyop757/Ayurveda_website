// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.querySelector('.character-count');
    const fileUpload = document.querySelector('.file-upload');
    
    // Character count update
    messageTextarea.addEventListener('input', function() {
        const count = this.value.length;
        const words = this.value.trim().split(/\s+/).length;
        charCount.textContent = `${count} characters / ${words} words`;
    });

    // File upload handling
    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = '#00cc00';
    });

    fileUpload.addEventListener('dragleave', () => {
        fileUpload.style.borderColor = '#ddd';
    });

    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = '#ddd';
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    document.getElementById('attachment').addEventListener('change', function(e) {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        const uploadText = document.querySelector('.upload-text');
        if (files.length > 0) {
            uploadText.textContent = `Selected: ${files[0].name}`;
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const inquiryType = document.getElementById('inquiryType').value;

        if (!name || !email || !message || !inquiryType) {
            alert('Please fill in all required fields');
            return;
        }

        // Here you would typically send the form data to a server
        console.log('Form submitted:', {
            name,
            email,
            message,
            inquiryType
        });

        // Success message
        alert('Thank you for your message. We will get back to you soon!');
        form.reset();
        document.querySelector('.upload-text').textContent = 'Click or drop files to upload.';
    });
});

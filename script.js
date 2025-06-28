// JavaScript for Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked (for smooth scrolling)
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling using Fetch API for Formspree
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submissionMessage = document.getElementById('form-submission-message');

    if (contactForm && submissionMessage) { // Ensure elements exist
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default browser form submission

            submissionMessage.textContent = 'Sending message...';
            submissionMessage.classList.remove('hidden', 'text-green-500', 'text-red-500');
            submissionMessage.classList.add('text-gray-400'); // Indicate processing

            const formData = new FormData(contactForm);

            try {
                // Send form data to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Essential for Formspree to return a JSON response
                    }
                });

                if (response.ok) { // Check if the response status is 2xx (success)
                    submissionMessage.textContent = 'Message sent successfully!';
                    submissionMessage.classList.remove('text-gray-400');
                    submissionMessage.classList.add('text-green-500');
                    contactForm.reset(); // Clear form fields on success
                } else {
                    // Handle non-OK responses (e.g., validation errors from Formspree)
                    const data = await response.json();
                    if (data.errors) {
                        // Display specific error messages from Formspree if available
                        submissionMessage.textContent = data.errors.map(err => err.message).join(', ') || 'Failed to send message.';
                    } else {
                        submissionMessage.textContent = 'Failed to send message. Please try again later.';
                    }
                    submissionMessage.classList.remove('text-gray-400');
                    submissionMessage.classList.add('text-red-500');
                }
            } catch (error) {
                console.error('Network or unexpected error:', error);
                submissionMessage.textContent = 'An error occurred. Please check your network and try again.';
                submissionMessage.classList.remove('text-gray-400');
                submissionMessage.classList.add('text-red-500');
            } finally {
                // Hide message after a few seconds, regardless of success or failure
                setTimeout(() => {
                    submissionMessage.classList.add('hidden');
                }, 5000); // 5 seconds
            }
        });
    }
});

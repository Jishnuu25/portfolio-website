// Create overlay element for mobile menu background
let overlay;
document.addEventListener('DOMContentLoaded', () => {
    overlay = document.createElement('div');
    overlay.id = 'mobile-menu-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-70 z-40 hidden';
    document.body.appendChild(overlay);
});

// JavaScript for Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if(overlay) overlay.classList.toggle('hidden');
});

// Handle touch events for better mobile experience
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    // Add touch feedback
    link.addEventListener('touchstart', function() {
        this.classList.add('active-link');
    }, { passive: true });
    
    link.addEventListener('touchend', function() {
        this.classList.remove('active-link');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            if(overlay) overlay.classList.add('hidden');
        }, 150); // Short delay for visual feedback
    }, { passive: true });
    
    // Regular click handler for non-touch devices
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if(overlay) overlay.classList.add('hidden');
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

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme on page load
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    
    // Function to toggle theme
    const toggleTheme = () => {
        document.body.classList.toggle('light-mode');
        
        // Save theme preference
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    };
    
    // Toggle theme when buttons are clicked
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleBtnMobile) {
        themeToggleBtnMobile.addEventListener('click', toggleTheme);
    }
});

// Certificate button animations
document.addEventListener('DOMContentLoaded', () => {
    const certificateButtons = document.querySelectorAll('.view-cert-btn');
    
    certificateButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add pulse animation
            this.classList.add('animate-pulse');
            
            // Remove animation after delay
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 500);
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

// Mobile Welcome Message Auto-Hide
document.addEventListener('DOMContentLoaded', () => {
    const mobileWelcome = document.getElementById('mobileWelcome');
    
    if (mobileWelcome) {
        // Hide the welcome message after 3 seconds with smooth fade out
        setTimeout(() => {
            mobileWelcome.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            mobileWelcome.style.opacity = '0';
            mobileWelcome.style.transform = 'translateY(-10px)';
            
            // Remove from DOM after fade animation completes
            setTimeout(() => {
                mobileWelcome.remove();
            }, 500);
        }, 3000); // 3 seconds delay
    }
});

// Mobile Profile Picture Touch Effects
document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('profileContainer');
    
    if (profileContainer && 'ontouchstart' in window) {
        let touchStarted = false;
        let touchTimer = null;
        
        // Add touch event listeners for mobile zoom effect
        profileContainer.addEventListener('touchstart', function(e) {
            touchStarted = true;
            // Clear any existing timer
            if (touchTimer) {
                clearTimeout(touchTimer);
            }
            // Add the touch-active class immediately
            this.classList.add('touch-active');
        }, { passive: true });
        
        profileContainer.addEventListener('touchend', function(e) {
            if (touchStarted) {
                // Keep the zoom effect for 2 seconds then remove it
                touchTimer = setTimeout(() => {
                    this.classList.remove('touch-active');
                    touchStarted = false;
                }, 2000);
            }
        }, { passive: true });
        
        profileContainer.addEventListener('touchcancel', function(e) {
            this.classList.remove('touch-active');
            touchStarted = false;
            if (touchTimer) {
                clearTimeout(touchTimer);
            }
        }, { passive: true });
    }
});

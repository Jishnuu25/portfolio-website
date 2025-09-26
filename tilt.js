/*!
 * Simple tilt.js implementation for mobile touch
 * Adapting concepts from vanilla-tilt.js for mobile usage
 */

class MobileTilt {
    constructor(elements, settings = {}) {
        this.defaults = {
            maxTilt: 5,
            perspective: 1000,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            scale: 1.05,
            speed: 300,
            transition: true,
            glare: false,
            glarePercentage: 50,
        };
        
        this.settings = {
            ...this.defaults,
            ...settings
        };
        
        if (typeof elements === 'string') {
            this.elements = document.querySelectorAll(elements);
        } else if (elements instanceof Node) {
            this.elements = [elements];
        } else if (elements instanceof NodeList) {
            this.elements = elements;
        } else {
            console.error("Error: Invalid element or selector provided");
            return;
        }
        
        this.init();
    }
    
    init() {
        // Only apply on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            this.elements.forEach(element => {
                // Skip if element doesn't exist
                if (!element) return;
                
                if (element.querySelector('.tilt-inner') === null) {
                    // Create a wrapper for the content if it doesn't exist
                    const inner = document.createElement('div');
                    inner.className = 'tilt-inner';
                    
                    // Move all child elements to the inner wrapper
                    while (element.firstChild) {
                        inner.appendChild(element.firstChild);
                    }
                    
                    element.appendChild(inner);
                    
                    // Add glare effect if enabled
                    if (this.settings.glare) {
                        const glareElement = document.createElement('div');
                        glareElement.className = 'tilt-glare';
                        const glareInner = document.createElement('div');
                        glareInner.className = 'tilt-glare-inner';
                        glareElement.appendChild(glareInner);
                        element.appendChild(glareElement);
                        
                        // Apply styles to glare elements
                        Object.assign(glareElement.style, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            pointerEvents: 'none',
                            borderRadius: 'inherit'
                        });
                        
                        Object.assign(glareInner.style, {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            pointerEvents: 'none',
                            backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
                            transform: 'rotate(180deg) translate(-50%, -50%)',
                            transformOrigin: '0% 0%',
                            opacity: '0',
                            width: `${this.settings.glarePercentage * 2}%`,
                            height: `${this.settings.glarePercentage * 2}%`,
                            transition: `opacity ${this.settings.speed}ms ${this.settings.easing}`
                        });
                    }
                }
                
                // Apply CSS to the element
                element.style.transformStyle = 'preserve-3d';
                element.style.transform = 'perspective(' + this.settings.perspective + 'px)';
                element.style.transition = this.settings.transition ? 'transform ' + this.settings.speed + 'ms ' + this.settings.easing : '';
                
                this.addEventListeners(element);
            });
        }
    }
    
    addEventListeners(element) {
        element.addEventListener('touchstart', this.onTouchStart.bind(this, element), { passive: true });
        element.addEventListener('touchmove', this.onTouchMove.bind(this, element), { passive: true });
        element.addEventListener('touchend', this.onTouchEnd.bind(this, element), { passive: true });
    }
    
    onTouchStart(element, e) {
        // Store initial touch position
        element.dataset.touchStartX = e.touches[0].clientX;
        element.dataset.touchStartY = e.touches[0].clientY;
        
        // Store element dimensions
        const rect = element.getBoundingClientRect();
        element.dataset.width = rect.width;
        element.dataset.height = rect.height;
        
        // Add active class
        element.classList.add('tilt-active');
        
        // Reset transform to prepare for the tilt
        if (this.settings.transition) {
            element.style.transition = 'none';
        }
    }
    
    onTouchMove(element, e) {
        if (e.touches.length === 1) {
            // Calculate tilt based on touch movement
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            const startX = parseFloat(element.dataset.touchStartX);
            const startY = parseFloat(element.dataset.touchStartY);
            const width = parseFloat(element.dataset.width);
            const height = parseFloat(element.dataset.height);
            
            // Limit movement calculation to prevent extreme tilts
            const moveX = Math.min(Math.max((touchX - startX) / (width / 2), -1), 1);
            const moveY = Math.min(Math.max((touchY - startY) / (height / 2), -1), 1);
            
            // Adjust tilt angles
            const tiltX = -moveY * this.settings.maxTilt;
            const tiltY = moveX * this.settings.maxTilt;
            
            // Apply transform
            element.style.transform = `perspective(${this.settings.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${this.settings.scale})`;
            
            // Apply transform to inner elements if needed
            const inner = element.querySelector('.tilt-inner');
            if (inner) {
                inner.style.transform = `translateZ(20px)`;
            }
            
            // Apply glare effect if enabled
            if (this.settings.glare) {
                const glareInner = element.querySelector('.tilt-glare-inner');
                if (glareInner) {
                    // Calculate glare position based on tilt
                    const glareAngle = Math.atan2(moveX, moveY) * (180 / Math.PI);
                    const glarePercentage = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2)) * 100;
                    
                    // Apply styles
                    glareInner.style.transform = `rotate(${glareAngle}deg) translate(-50%, -50%)`;
                    glareInner.style.opacity = glarePercentage / 100 * 0.7; // Max opacity is 0.7
                }
            }
        }
    }
    
    onTouchEnd(element) {
        // Reset transform with transition
        if (this.settings.transition) {
            element.style.transition = `transform ${this.settings.speed}ms ${this.settings.easing}`;
        }
        
        element.style.transform = 'perspective(' + this.settings.perspective + 'px)';
        
        // Reset inner elements
        const inner = element.querySelector('.tilt-inner');
        if (inner) {
            inner.style.transform = '';
        }
        
        // Reset glare if enabled
        if (this.settings.glare) {
            const glareInner = element.querySelector('.tilt-glare-inner');
            if (glareInner) {
                glareInner.style.opacity = '0';
            }
        }
        
        // Remove active class
        element.classList.remove('tilt-active');
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Apply to skill badges 
    new MobileTilt('.skill-badge', {
        maxTilt: 10,
        scale: 1.05,
        speed: 300
    });
    
    // Apply to project cards
    new MobileTilt('.project-card', {
        maxTilt: 5,
        scale: 1.02,
        speed: 400
    });
    
    // Apply to certification cards
    new MobileTilt('.certification-card', {
        maxTilt: 5,
        scale: 1.03,
        speed: 400,
        glare: true,
        glarePercentage: 80
    });
    
    // Apply to about me section card
    new MobileTilt('#profile .card-bg', {
        maxTilt: 3,
        scale: 1.01,
        speed: 500
    });
    
    // Apply to experience section card
    new MobileTilt('#experience .card-bg', {
        maxTilt: 3,
        scale: 1.01,
        speed: 500
    });
    
    // Apply to contact section cards
    new MobileTilt('#contact-full .card-bg', {
        maxTilt: 4,
        scale: 1.02,
        speed: 450,
        glare: true,
        glarePercentage: 60
    });
    
    // Apply to testimonial cards (if any)
    new MobileTilt('.testimonial-card', {
        maxTilt: 6,
        scale: 1.03,
        speed: 350
    });
});
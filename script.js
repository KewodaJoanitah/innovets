// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.service) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add animation keyframes for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .activity-card, .team-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Mobile menu animation
const style2 = document.createElement('style');
style2.textContent = `
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style2);

// Add loading animation for images (placeholder effect)
document.addEventListener('DOMContentLoaded', () => {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder, .hero-card, .service-icon, .team-image');
    
    imagePlaceholders.forEach((placeholder, index) => {
        placeholder.style.animationDelay = `${index * 0.1}s`;
        placeholder.classList.add('fade-in');
    });
});

// Add fade-in animation class
const style3 = document.createElement('style');
style3.textContent = `
    .fade-in {
        animation: fadeIn 0.8s ease-out both;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style3);

// Statistics counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h4');
            statItems.forEach(item => {
                const text = item.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    item.textContent = '0' + (text.includes('+') ? '+' : '');
                    animateCounter(item, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Emergency contact quick access
function createEmergencyButton() {
    const emergencyBtn = document.createElement('div');
    emergencyBtn.innerHTML = `
        <div class="emergency-btn">
            <i class="fas fa-phone"></i>
            <span>Emergency</span>
        </div>
    `;
    
    emergencyBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
    `;
    
    const btnElement = emergencyBtn.querySelector('.emergency-btn');
    btnElement.style.cssText = `
        background: #ef4444;
        color: white;
        padding: 12px 20px;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    `;
    
    btnElement.addEventListener('click', () => {
        window.location.href = 'tel:555-911-PETS';
    });
    
    btnElement.addEventListener('mouseenter', () => {
        btnElement.style.transform = 'scale(1.05)';
        btnElement.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
    });
    
    btnElement.addEventListener('mouseleave', () => {
        btnElement.style.transform = 'scale(1)';
        btnElement.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
    });
    
    document.body.appendChild(emergencyBtn);
}

// Add pulse animation for emergency button
const style4 = document.createElement('style');
style4.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        50% {
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.6), 0 0 0 10px rgba(239, 68, 68, 0.1);
        }
        100% {
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
    }
    
    @media (max-width: 768px) {
        .emergency-btn {
            padding: 10px 16px !important;
            font-size: 0.9rem;
        }
    }
`;
document.head.appendChild(style4);

// Initialize emergency button
document.addEventListener('DOMContentLoaded', () => {
    createEmergencyButton();
});

// Back to top button
function createBackToTopButton() {
    const backToTopBtn = document.createElement('div');
    backToTopBtn.innerHTML = `
        <div class="back-to-top">
            <i class="fas fa-chevron-up"></i>
        </div>
    `;
    
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    const btnElement = backToTopBtn.querySelector('.back-to-top');
    btnElement.style.cssText = `
        background: #2563eb;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
    `;
    
    btnElement.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    btnElement.addEventListener('mouseenter', () => {
        btnElement.style.transform = 'scale(1.1)';
        btnElement.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });
    
    btnElement.addEventListener('mouseleave', () => {
        btnElement.style.transform = 'scale(1)';
        btnElement.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(backToTopBtn);
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', () => {
    createBackToTopButton();
});

console.log('innoVets website loaded successfully! 🐾');

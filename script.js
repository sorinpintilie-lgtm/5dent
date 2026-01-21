// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const appointmentForm = document.getElementById('appointmentForm');

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(appointmentForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (in a real application, you would send this to a server)
    const button = appointmentForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Trimite...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Programare Trimisa!';
        button.style.backgroundColor = '#34a853';
        
        // Reset form
        appointmentForm.reset();
        
        // Reset button
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.disabled = false;
        }, 3000);
    }, 1500);
});

// Scroll animations for sections with enhanced effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add bounce effect on entrance
            if (!entry.target.classList.contains('entranced')) {
                entry.target.style.animation = 'fadeInUp 0.8s ease both';
                entry.target.classList.add('entranced');
            }
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Enhanced gallery interactions
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.addEventListener('click', function() {
        // Simple lightbox effect
        const img = this.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            animation: scaleIn 0.3s ease;
            border-radius: var(--radius-lg);
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', function() {
            this.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(this);
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced form animations
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Mobile menu animation
const mobileMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.style.animation = 'slideOut 0.3s ease both';
        setTimeout(() => {
            mobileMenu.classList.remove('active');
        }, 300);
    } else {
        mobileMenu.classList.add('active');
        mobileMenu.style.animation = 'slideIn 0.3s ease both';
    }
});

// Add slide animations to styles
const slideAnimations = document.createElement('style');
slideAnimations.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideAnimations);

// Gallery image zoom effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Simple gallery functionality - in a real application, this would open a lightbox
        console.log('Gallery item clicked');
    });
});

// Testimonials slider functionality (basic)
const testimonials = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

// Auto-rotate testimonials
function rotateTestimonials() {
    testimonials[currentTestimonial].style.opacity = '0';
    testimonials[currentTestimonial].style.transform = 'scale(0.95)';
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    
    testimonials[currentTestimonial].style.opacity = '1';
    testimonials[currentTestimonial].style.transform = 'scale(1)';
}

// Add smooth transition to testimonials
testimonials.forEach(testimonial => {
    testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Auto-rotate every 5 seconds (optional, commented out by default)
// setInterval(rotateTestimonials, 5000);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Floating animation for badges
const badges = document.querySelectorAll('.badge');
badges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.2}s`;
    badge.style.animation = 'float 3s ease-in-out infinite';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add intersection observer for card animations
const cards = document.querySelectorAll('.service-card, .stat-card, .testimonial-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease both';
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    cardObserver.observe(card);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('div[style*="position: fixed"]');
        if (lightbox) {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        }
    }
});

// Add accessibility focus styles
const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});
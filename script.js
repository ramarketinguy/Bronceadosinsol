// ===== Elegant Antigravity Particles (Atmospheric Cosmos) =====
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        document.body.prepend(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.particles = [];
        this.mouse = { x: null, y: null, radius: 250 };
        this.particleCount = 200; // Balanced density for elegance without noise

        this.resize();
        this.init();
        this.animate(0);

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY + window.scrollY;
        });
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
    }

    animate(time) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update(this.mouse, this.canvas.width, this.canvas.height, time);
            particle.draw(this.ctx);
        });

        requestAnimationFrame((t) => this.animate(t));
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;

        // Ultra-micro particles for supreme subtlety
        this.size = Math.random() * 0.5 + 0.1;

        // Floating drift
        this.velocity = {
            x: (Math.random() - 0.5) * 0.15,
            y: (Math.random() - 0.5) * 0.15
        };

        // Premium ultra-low opacity palette for zero noise
        this.opacity = Math.random() * 0.15 + 0.02;
        this.color = `rgba(212, 175, 55, ${this.opacity})`;

        // For organic pulsing/floating
        this.angle = Math.random() * Math.PI * 2;
        this.angularVelocity = (Math.random() - 0.5) * 0.02;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Non-intrusive shimmer
        if (Math.random() > 0.999) {
            ctx.shadowBlur = 1;
            ctx.shadowColor = 'rgba(212, 175, 55, 0.2)';
        } else {
            ctx.shadowBlur = 0;
        }
    }

    update(mouse, canvasWidth, canvasHeight, time) {
        // Subtle drift + Sine floating
        this.angle += this.angularVelocity;
        this.x += this.velocity.x + Math.cos(this.angle) * 0.1;
        this.y += this.velocity.y + Math.sin(this.angle) * 0.1;

        // Soft Mouse Interaction (Parting of the sea)
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);

                // Very gentle push
                this.x -= Math.cos(angle) * force * 1.0;
                this.y -= Math.sin(angle) * force * 1.0;
            }
        }

        // Seamless wrap
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;
    }
}

// Initialize on load
window.addEventListener('load', () => {
    new ParticleSystem();
});

// Smooth scroll for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.about-card, .timeline-item, .benefit-card, .care-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Floating button scroll visibility
const floatingCta = document.getElementById('floating-cta');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.remove('visible');
    }
});

// Add stagger animation to benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1} s`;
});

// Add stagger animation to about cards
const aboutCards = document.querySelectorAll('.about-card');
aboutCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15} s`;
});

// Enhanced hover effect for glass cards
const glassCards = document.querySelectorAll('.glass-card');
glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${- deltaY * 5}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Log to confirm script loaded
console.log('âœ¨ Estilo y Glamour - Landing page initialized with particle system');


/* ===== Meta Conversions API (CAPI) Helper ===== */
/**
 * Función para enviar eventos a Meta via CAPI
 * @param {string} eventName - Nombre del evento (ej: 'Purchase', 'Lead')
 * @param {object} userData - Datos del usuario para el matching (email, teléfono, etc)
 * @param {object} customData - Datos adicionales del evento (valor, moneda, etc)
 */
async function trackMetaEvent(eventName, userData = {}, customData = {}) {
    const pixelId = '1120348705763717';
    const apiVersion = 'v18.0';
    const url = \https://graph.facebook.com/\/\/events\;

    // Estructura recomendada por Meta
    const data = [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: userData,
        custom_data: customData,
        event_source_url: window.location.href,
    }];

    try {
        const response = await fetch(\\?access_token=\\, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        });
        const result = await response.json();
        console.log('? Meta CAPI Event Tracked:', eventName, result);
        return result;
    } catch (error) {
        console.error('? Meta CAPI Error:', error);
    }
}

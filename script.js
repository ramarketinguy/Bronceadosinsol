/* ===== Elegant Antigravity Particles (Atmospheric Cosmos) ===== */
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

    // Track WhatsApp link clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackMetaEvent('Contact', {}, {
                content_name: 'Reserva WhatsApp',
                content_category: 'Leads'
            });
        });
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
const heroSection = document.getElementById('hero');
const ctaSection = document.getElementById('cta');

window.addEventListener('scroll', () => {
    if (!floatingCta) return;

    const scrollPos = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 500;
    const ctaTop = ctaSection ? ctaSection.offsetTop : document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Show strictly after Hero and hide exactly when CTA section starts entering viewport
    if (scrollPos > heroHeight && scrollPos < ctaTop - viewportHeight) {
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.remove('visible');
    }
});

// Add stagger animation to benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add stagger animation to about cards
const aboutCards = document.querySelectorAll('.about-card');
aboutCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
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
console.log('✨ Estilo y Glamour - Landing page initialized with particle system');


/* ===== Meta Conversions API (CAPI) & Pixel Tracking Helper ===== */
const metaCAPIToken = 'EAFry5T1AwZAcBQzLz2cvl2MUel8P6cXbgw0n1oM5RXEiJXmLB8972BJsNuPxlQVwxQCwIJyGJ2ZCCanYFkyrLeRSi4Th1HcUsqXsh9ZB1DKxtQNtTg7zxm9bmQrSqBuw65nFF9C33tBtEFvdKToa8oXNVjoj7mdnPqpkGC9dJyYI5kcod2mM69catSVIuQxRQZDZD';
const pixelId = '1189241653345607'; // Pixel ID unificado con Signals Gateway

// TEST_EVENT_CODE: Activar para pruebas en Meta Events Manager.
// Poné aquí el código de prueba que aparece en Events Manager > Test Events.
// Dejalo en '' (vacío) para producción.
const TEST_EVENT_CODE = 'TEST68662';

console.log("Antigravity Scripts Loaded v6.0 — CAPI Token Updated");

/**
 * trackMetaEvent - Envía eventos tanto por el Pixel (browser) como por CAPI (server-side)
 */
async function trackMetaEvent(eventName, userData = {}, customData = {}, actionSource = 'website') {
    // 1. Pixel Browser Tracking
    if (typeof fbq === 'function') {
        fbq('track', eventName, customData);
    }

    // 2. CAPI Tracking
    if (!metaCAPIToken) return;

    const eventTime = Math.floor(Date.now() / 1000);
    const eventId = 'ev_' + eventTime + '_' + Math.floor(Math.random() * 1000);

    const payload = {
        data: [{
            event_name: eventName,
            event_time: eventTime,
            action_source: actionSource,
            user_data: {
                client_user_agent: navigator.userAgent,
                fbp: document.cookie.split('; ').find(row => row.startsWith('_fbp='))?.split('=')[1],
                fbc: document.cookie.split('; ').find(row => row.startsWith('_fbc='))?.split('=')[1],
                ...userData
            },
            custom_data: customData,
            event_id: eventId,
            event_source_url: window.location.href
        }]
    };

    // Agregar test_event_code si está activo (solo para pruebas)
    if (TEST_EVENT_CODE) {
        payload.test_event_code = TEST_EVENT_CODE;
    }

    try {
        const response = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${metaCAPIToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log(`✨ CAPI ${eventName}:`, result);
    } catch (error) {
        console.error('❌ CAPI Error:', error);
    }
}

/**
 * sendMetaTestEvent - Envía el evento de prueba exacto que Meta recomienda
 * para verificar la conexión CAPI en Events Manager > Test Events.
 * Usá esta función desde la consola del navegador: sendMetaTestEvent()
 */
async function sendMetaTestEvent() {
    if (!metaCAPIToken) {
        console.error('❌ No hay token CAPI configurado');
        return;
    }

    const testPayload = {
        data: [
            {
                event_name: "Purchase",
                event_time: Math.floor(Date.now() / 1000),
                action_source: "website",
                user_data: {
                    em: [
                        "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"
                    ],
                    ph: [
                        null
                    ]
                },
                attribution_data: {
                    attribution_share: "0.3"
                },
                custom_data: {
                    currency: "USD",
                    value: "142.52"
                },
                original_event_data: {
                    event_name: "Purchase",
                    event_time: Math.floor(Date.now() / 1000)
                }
            }
        ]
    };

    // Agregar test_event_code si está activo
    if (TEST_EVENT_CODE) {
        testPayload.test_event_code = TEST_EVENT_CODE;
    }

    console.log('🧪 Enviando evento de prueba Purchase a Meta CAPI...');
    console.log('📦 Payload:', JSON.stringify(testPayload, null, 2));

    try {
        const response = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${metaCAPIToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testPayload)
        });
        const result = await response.json();

        if (result.events_received) {
            console.log(`✅ ÉXITO — Eventos recibidos por Meta: ${result.events_received}`);
            console.log('📊 Resultado completo:', result);
            console.log('👉 Verificá en: https://business.facebook.com/events_manager → Test Events');
        } else {
            console.warn('⚠️ Respuesta inesperada:', result);
        }
        return result;
    } catch (error) {
        console.error('❌ Error enviando evento de prueba:', error);
        return null;
    }
}

// Track PageView immediately
trackMetaEvent('PageView');

// Enviar evento de prueba automáticamente si TEST_EVENT_CODE está activo
if (TEST_EVENT_CODE) {
    console.log('🧪 Modo de prueba ACTIVO — test_event_code:', TEST_EVENT_CODE);
    console.log('💡 Para enviar manualmente un Purchase de prueba, ejecutá en consola: sendMetaTestEvent()');
    // Enviar el evento de prueba Purchase automáticamente
    sendMetaTestEvent();
}

// --- Video Play Button Interaction ---
function setupVideoPlayer(videoId) {
    const video = document.getElementById(videoId);
    if (!video) return;

    // Try to find the overlay in the sibling/parent structure we created
    const wrapper = video.closest('.video-responsive') || video.parentElement;
    const overlay = wrapper.querySelector('.play-button-overlay');

    if (overlay) {
        // Overlay Click -> Play (Aggressive)
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // 1. Hide Overlay Immediately for UI feedback
            overlay.style.display = 'none';
            video.controls = true;

            // 2. Try playing
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log("Auto-play blocked, muting...", err);
                    // 3. Fallback: Mute and Play
                    video.muted = true;
                    video.play();
                });
            }
        });

        // Sync UI if video starts via other means
        video.addEventListener('play', () => {
            overlay.style.display = 'none';
            video.controls = true;
        });

        // Show overlay again if paused (and not seeking)
        video.addEventListener('pause', () => {
            if (!video.seeking) {
                overlay.style.display = 'flex';
                video.controls = false;
            }
        });

        video.addEventListener('ended', () => {
            overlay.style.display = 'flex';
            video.controls = false;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initializing native video controls only - no custom JS needed for playback

    // Track WhatsApp Clicks as 'Contact'
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackMetaEvent('Contact', {}, { content_name: 'WhatsApp Click' });
        });
    });
});

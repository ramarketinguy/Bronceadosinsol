
// Clean Card Animation Script
document.addEventListener("DOMContentLoaded", () => {
    // Select all clean video cards
    const cards = document.querySelectorAll('.clean-video-card');

    if (cards.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the card is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});

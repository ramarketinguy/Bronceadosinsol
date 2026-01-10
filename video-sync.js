// ===== Video Control - Prevent Autoplay & Single Video Playback =====

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {

        // Get all video iframes
        const iframes = document.querySelectorAll('iframe[src*="mediadelivery.net"]');

        // Ensure autoplay is OFF in all iframe URLs
        iframes.forEach(iframe => {
            let src = iframe.src;

            // Force autoplay=0 in the URL
            if (src.includes('autoplay=1')) {
                src = src.replace('autoplay=1', 'autoplay=0');
            }
            if (!src.includes('autoplay=')) {
                src += (src.includes('?') ? '&' : '?') + 'autoplay=0';
            }

            // Force muted=0 (unmuted by default, user controls)
            if (src.includes('muted=1')) {
                src = src.replace('muted=1', 'muted=0');
            }

            // Update the iframe src if changed
            if (src !== iframe.src) {
                iframe.src = src;
            }
        });

        // Setup click listeners to pause other videos
        iframes.forEach((iframe, index) => {
            const container = iframe.closest('.video-responsive') ||
                iframe.closest('.showcase-video-section') ||
                iframe.parentElement;

            // When user interacts with this video, pause others
            container.addEventListener('click', function () {
                pauseOtherVideos(index, iframes);
            });

            // Also listen for focus on iframe
            iframe.addEventListener('focus', function () {
                pauseOtherVideos(index, iframes);
            });
        });

        // Pause videos when scrolled out of view
        setupIntersectionObserver(iframes);

        console.log('Video control initialized - autoplay disabled, single playback enabled');
    });

    function pauseOtherVideos(activeIndex, iframes) {
        iframes.forEach((iframe, index) => {
            if (index !== activeIndex) {
                try {
                    // Try to send pause command via postMessage
                    iframe.contentWindow.postMessage(JSON.stringify({
                        event: 'command',
                        func: 'pauseVideo',
                        args: ''
                    }), '*');

                    // Alternative: BunnyCDN specific command
                    iframe.contentWindow.postMessage('pause', '*');
                } catch (e) {
                    // Cross-origin, can't control directly
                }
            }
        });
    }

    function setupIntersectionObserver(iframes) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    const iframe = entry.target.querySelector('iframe') || entry.target;
                    if (iframe && iframe.contentWindow) {
                        try {
                            iframe.contentWindow.postMessage('pause', '*');
                            iframe.contentWindow.postMessage(JSON.stringify({
                                event: 'command',
                                func: 'pauseVideo',
                                args: ''
                            }), '*');
                        } catch (e) { }
                    }
                }
            });
        }, { threshold: 0.1 });

        // Observe all video containers
        document.querySelectorAll('.video-responsive, .showcase-video-section, .care-video-wrapper').forEach(container => {
            observer.observe(container);
        });
    }
})();

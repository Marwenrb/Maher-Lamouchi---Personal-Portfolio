import { preloadImages } from './utils.js';
import { Content } from './content.js';
import { LanguageSwitcher } from './languageSwitcher.js';

// Smooth scrolling.
let lenis;
const initSmoothScrolling = () => {
	// Smooth scrolling initialization (using Lenis https://github.com/studio-freight/lenis)
	lenis = new Lenis({
		lerp: 0.1,
		smoothWheel: true,
		orientation: 'vertical',
	});
    
    lenis.on('scroll', () => ScrollTrigger.update());
	
    const scrollFn = () => {
		lenis.raf();
		requestAnimationFrame(scrollFn);
	};
	requestAnimationFrame(scrollFn);
};

// Initialize language switcher and UI elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language switcher (which also sets up the back-to-top button)
    LanguageSwitcher.init();

    // Set initial state of language toggle
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        languageToggle.classList.add(`lang-${LanguageSwitcher.currentLang}`);
        
        // Add direct click handlers to options for better mobile support
        const options = languageToggle.querySelectorAll('.language-toggle__option');
        options.forEach(option => {
            option.style.pointerEvents = 'auto';
        });
    }
});

// .content elements
const contentElems = [...document.querySelectorAll('.content')];
contentElems.forEach(el => new Content(el));

// smooth scrolling with Lenis
initSmoothScrolling();

// Preload images then remove loader (loading class) from body
preloadImages('.canvas-wrap').then(() => document.body.classList.remove('loading'));
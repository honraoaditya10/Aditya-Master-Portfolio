// Theme configuration and utilities
const themeConfig = {
    darkColors: ['#8892b0', '#a8b2d1', '#ccd6f6', '#98a5c0', '#7889a8'],
    lightColors: ['#000000', '#1a1a1a', '#333333', '#4d4d4d', '#2c2c2c']
};

// Make config available globally
window.themeConfig = themeConfig;

// Initialize theme
function initTheme() {
    // Inject CSS if not present (optional, but ensures styles are loaded)
    if (!document.querySelector('link[href="theme/theme.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'theme/theme.css';
        document.head.appendChild(link);
    }

    const SUN_ICON = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>';
    const MOON_ICON = '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    // Create and append toggle button if it doesn't exist
    let btn = document.getElementById('themeToggle');
    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.id = 'themeToggle';
        btn.setAttribute('aria-label', 'Toggle theme');
        document.body.appendChild(btn);
    }
    const nav = document.querySelector('.navbar');
    if (nav) {
        btn.style.top = '';
        btn.style.zIndex = '';
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        btn.innerHTML = SUN_ICON;
    } else {
        btn.innerHTML = MOON_ICON;
    }

    // Event listener
    // Remove existing listeners by cloning (simple way) or just add if we know it's clean.
    // Since we are moving code out, we assume this script runs once.
    btn.onclick = () => {
        const isLight = document.body.classList.toggle('light-theme');
        btn.innerHTML = isLight ? SUN_ICON : MOON_ICON;
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Dispatch event for other scripts (like background animation)
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isLight } }));
    };
}

// Helper to get current colors for animation
window.getCurrentThemeColors = function() {
    return document.body.classList.contains('light-theme') ? themeConfig.lightColors : themeConfig.darkColors;
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

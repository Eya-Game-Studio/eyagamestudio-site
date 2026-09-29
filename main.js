// main.js - Vanilla JS replacement for Nuxt hydration
document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark Mode Toggle
    const htmlEl = document.documentElement;
    // The theme button doesn't have an ID, but it has aria-label
    const themeToggleBtns = document.querySelectorAll('button[aria-label="Tema Değiştir"]');
    
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlEl.classList.contains('dark')) {
                htmlEl.classList.remove('dark');
                htmlEl.classList.add('light');
                localStorage.setItem('nuxt-color-mode', 'light');
            } else {
                htmlEl.classList.remove('light');
                htmlEl.classList.add('dark');
                localStorage.setItem('nuxt-color-mode', 'dark');
            }
        });
    });

    // 2. Mobile Menu Toggle
    // The mobile menu button has md:hidden class
    const mobileToggleBtn = document.querySelector('button.md\\:hidden');
    const nav = document.querySelector('nav');
    
    if (mobileToggleBtn && nav) {
        // Create mobile menu container since Nuxt omitted it from SSR payload
        let mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden bg-white dark:bg-gray-900 absolute top-20 left-0 w-full shadow-lg border-t border-gray-100 dark:border-gray-800 hidden';
        mobileMenu.innerHTML = `
            <div class="flex flex-col p-4 space-y-4">
                <a href="/" class="text-gray-700 dark:text-gray-300 font-medium">Ana Sayfa</a>
                <a href="/about" class="text-gray-700 dark:text-gray-300 font-medium">Hakkımızda</a>
                <a href="/games" class="text-gray-700 dark:text-gray-300 font-medium">Oyunlarımız</a>
                <a href="/contact" class="text-gray-700 dark:text-gray-300 font-medium">İletişim</a>
            </div>
        `;
        nav.appendChild(mobileMenu);
        
        mobileToggleBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // 3. Smooth Scrolling for anchor links (for the homepage sections like #games, #about)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
                // close mobile menu if open
                if (typeof mobileMenu !== 'undefined' && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});

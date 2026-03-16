/* =========================================
   MacrosGPT Landing Page
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initFadeInAnimations();
    initFaqAccordion();
});

/* =========================================
   Sticky Header (for sub-pages)
   ========================================= */
function initStickyHeader() {
    var header = document.getElementById('header');
    if (!header) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* =========================================
   Mobile Menu
   ========================================= */
function initMobileMenu() {
    var menuBtn = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* =========================================
   Smooth Scroll
   ========================================= */
function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;

            var target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            // Account for floating nav pill or legacy header
            var nav = document.getElementById('nav');
            var header = document.getElementById('header');
            var offset = 80;
            if (nav) offset = nav.offsetHeight + 32;
            else if (header) offset = header.offsetHeight + 20;

            var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            var menuBtn = document.getElementById('mobile-menu-btn');
            var mobileMenu = document.getElementById('mobile-menu');
            if (menuBtn && mobileMenu) {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

/* =========================================
   Fade In Animations on Scroll
   ========================================= */
function initFadeInAnimations() {
    var fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    });

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });
}

/* =========================================
   FAQ Accordion
   ========================================= */
function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function () {
            var isActive = item.classList.contains('active');

            // Close others
            faqItems.forEach(function (other) {
                if (other !== item) {
                    other.classList.remove('active');
                    var btn = other.querySelector('.faq-question');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', String(!isActive));
        });
    });
}

// Main JS for portfolio interactions

// DOM helpers
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Navbar toggle for mobile
const hamburger = $('#hamburger');
const siteNav = $('#site-nav');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        siteNav.classList.toggle('open');
    });
}

// Smooth scroll for anchor links
$$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // close nav on mobile
            if (siteNav.classList.contains('open')) {
                siteNav.classList.remove('open');
            }
        }
    });
});

// Typing animation for role subtitle
function typeEffect(element, speed = 100) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const typingEl = document.querySelector('.role-subtitle .typing');
if (typingEl) {
    typeEffect(typingEl, 80);
}

// Scroll reveal animations
const reveals = $$('.fade-in');
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Modal functionality
$$('[data-modal-trigger]').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const id = btn.getAttribute('data-modal-trigger');
        const modal = $(`#modal-${id}`);
        if (modal) modal.classList.add('show');
    });
});
$$('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('show');
    });
});
// close when clicking outside
$$('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('show');
    });
});

// Form validation and submission simulation
const contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();
        let valid = true;
        if (!name) valid = false;
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) valid = false;
        if (!message) valid = false;
        if (valid) {
            // simulate submission
            contactForm.reset();
            $('#formSuccess').style.display = 'block';
            setTimeout(() => {
                $('#formSuccess').style.display = 'none';
            }, 4000);
        } else {
            alert('Please fill out all fields correctly.');
        }
    });
}

// Back to top button
const backToTop = $('#backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

// Navigation active state on scroll
const sections = document.querySelectorAll('section');
const navLinks = $$('.nav-link');
function setNavActive() {
    let index = sections.length;
    while (--index && window.scrollY + 150 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove('active'));
    const id = sections[index].id || sections[index].className.split(' ')[0];
    const activeLink = document.querySelector(`.nav-link[href$="${id}"]`);
    if (activeLink) activeLink.classList.add('active');
}
window.addEventListener('scroll', setNavActive);
window.addEventListener('load', setNavActive);


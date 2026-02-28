document.addEventListener('DOMContentLoaded', function(){
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('site-nav');

    hamburger && hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // close menu when a link is clicked (mobile)
    document.querySelectorAll('.site-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if(nav.classList.contains('open')){
                nav.classList.remove('open');
            }
        });
    });

    // simple fade-in on scroll
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    faders.forEach(fader => observer.observe(fader));
});

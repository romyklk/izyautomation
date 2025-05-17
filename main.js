// Initialisation d'AOS
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    mirror: true,
    offset: 120
});

document.addEventListener('DOMContentLoaded', function () {
    // Animation personnalisée pour le logo
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.style.transition = 'transform 0.5s ease';
        logo.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.1)';
        });
        logo.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // Animation pour les boutons
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.hasAttribute('data-aos')) {
            btn.style.transition = 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease';
            btn.addEventListener('mouseover', function () {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
            });
            btn.addEventListener('mouseout', function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            });
        }
    });

    // Animation pour le header au scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255,255,255,0.98)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            header.style.background = 'white';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
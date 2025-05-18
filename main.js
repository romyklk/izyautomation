// Configuration des particules
particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#4F46E5'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#FF5733',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'bounce',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'window',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

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
    let lastScroll = 0;

    // Fonction de gestion du scroll du header
    const handleHeaderScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255,255,255,0.98)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            header.style.background = 'white';
        }

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll vers le bas
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll vers le haut
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
        lastScrollTop = currentScroll;
    };

    window.addEventListener('scroll', handleHeaderScroll);

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

    // Animation des nombres dans la section résultats
    document.addEventListener('DOMContentLoaded', function () {
        const animateValue = (obj, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const numberElements = document.querySelectorAll('.bento-card [style*="font-size"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = parseInt(element.textContent);
                    animateValue(element, 0, finalValue, 2000);
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        numberElements.forEach(el => observer.observe(el));

        // Animation 3D hover effect pour les cartes
        const cards = document.querySelectorAll('.bento-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const xRotation = ((y - rect.height / 2) / rect.height) * 10;
                const yRotation = ((x - rect.width / 2) / rect.width) * 10;

                this.style.transform = `perspective(1000px) rotateX(${-xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseout', function () {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    });

    // Gestion des onglets de démo
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoScreens = document.querySelectorAll('.demo-screen');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Activer l'onglet
            demoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Afficher le contenu correspondant
            demoScreens.forEach(screen => {
                if (screen.dataset.tab === targetTab) {
                    screen.classList.add('active');
                    // Ajouter une animation
                    screen.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    screen.classList.remove('active');
                }
            });
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');

    // Afficher/cacher le bouton en fonction du scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll smooth vers le haut au clic
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks?.classList.toggle('active');
    });

    // Fermer le menu au clic sur un lien
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.setAttribute('aria-expanded', 'false');
            navLinks?.classList.remove('active');
        });
    });

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks?.classList.remove('active');
            hamburger?.setAttribute('aria-expanded', 'false');
        }
    });
});
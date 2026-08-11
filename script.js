/**
 * JUNAID AMEER - PERSONAL PORTFOLIO ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const AppState = {
        isMobile: window.innerWidth <= 900,
        mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 }
    };

    /* ==========================================================================
       DEEP SPACE PARTICLE ENGINE (Starfield Particles)
       ========================================================================== */
    const initParticleEngine = () => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height; 
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 20;
                this.size = Math.random() * 2.2 + 0.3;
                this.speedY = Math.random() * 0.35 + 0.08;
                this.speedX = (Math.random() - 0.5) * 0.12;
                this.opacity = Math.random() * 0.6 + 0.1;
                this.isLime = Math.random() > 0.7; 
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                
                const driftX = (AppState.mouse.x - window.innerWidth / 2) * 0.0004;
                this.x += driftX * (this.size * 0.5);

                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                if (this.isLime) {
                    ctx.fillStyle = `rgba(137, 243, 54, ${this.opacity})`;
                    ctx.shadowBlur = this.size > 1.8 ? 6 : 0;
                    ctx.shadowColor = 'rgba(137, 243, 54, 0.4)';
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                    ctx.shadowBlur = 0;
                }
                
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particleCount = AppState.isMobile ? 40 : 95;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const renderLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(renderLoop);
        };
        renderLoop();
    };
    initParticleEngine();

    /* ==========================================================================
       INTERACTIVE AMBIENT TRACKING
       ========================================================================== */
    const initAmbientTracking = () => {
        const ambientGlow = document.getElementById('ambient-glow');
        if (!ambientGlow) return;

        window.addEventListener('mousemove', (e) => {
            AppState.mouse.targetX = e.clientX;
            AppState.mouse.targetY = e.clientY;
        }, { passive: true });

        const lerpGlow = () => {
            AppState.mouse.x += (AppState.mouse.targetX - AppState.mouse.x) * 0.04;
            AppState.mouse.y += (AppState.mouse.targetY - AppState.mouse.y) * 0.04;

            const shiftX = (AppState.mouse.x - window.innerWidth / 2) * 0.10;
            const shiftY = (AppState.mouse.y - window.innerHeight / 2) * 0.10;

            ambientGlow.style.transform = `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px))`;
            requestAnimationFrame(lerpGlow);
        };
        lerpGlow();
    };
    if (!AppState.isMobile) initAmbientTracking();

    /* ==========================================================================
       DYNAMIC CARD SPOTLIGHT LIGHTING
       ========================================================================== */
    const initCardSpotlights = () => {
        const cards = document.querySelectorAll('.glass-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if(!card.classList.contains('footer-social-node')) {
                    card.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(137, 243, 54, 0.06), transparent 80%), var(--card-bg-glass)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                if(!card.classList.contains('footer-social-node')) {
                    card.style.background = 'var(--card-bg-glass)';
                }
            });
        });
    };
    initCardSpotlights();

    /* ==========================================================================
       TYPEWRITER ENGINE
       ========================================================================== */
    const initTypewriter = () => {
        const target = document.getElementById('typewriter');
        if (!target) return;

        const phrases = ["Content Creator", "Cyber Security Student", "Tech Storyteller"];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 70;

        const processType = () => {
            const currentPhrase = phrases[phraseIdx];
            
            if (isDeleting) {
                target.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 35; 
            } else {
                target.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIdx === currentPhrase.length) {
                typingSpeed = 2200; 
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 400; 
            }

            setTimeout(processType, typingSpeed);
        };
        setTimeout(processType, 800);
    };
    initTypewriter();

    /* ==========================================================================
       SCROLL REVEAL ENGINE
       ========================================================================== */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.scroll-reveal, .cinematic-quote');
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observerOptions = {
            root: null,
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        };

        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    if (entry.target.classList.contains('cinematic-quote')) {
                        entry.target.classList.add('visible');
                    }
                    observer.unobserve(entry.target); 
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
        revealElements.forEach(el => revealObserver.observe(el));

        const timelineOptions = {
            root: null,
            threshold: 0.35,
            rootMargin: "0px 0px -10% 0px"
        };

        const timelineCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('active-dot');
                }
            });
        };

        const timelineObserver = new IntersectionObserver(timelineCallback, timelineOptions);
        timelineItems.forEach(item => timelineObserver.observe(item));
    };
    initScrollReveal();

    /* ==========================================================================
       SCROLL CONTROLLER
       ========================================================================== */
    const initScrollEngine = () => {
        const navbar = document.getElementById('main-nav');
        const progressBar = document.getElementById('scroll-progress');
        const timelineProgress = document.getElementById('timeline-progress');
        const timelineSection = document.getElementById('journey');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            const currentTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            if (currentTop > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            const scrollPercent = (currentTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;

            if (timelineSection && timelineProgress) {
                const rect = timelineSection.getBoundingClientRect();
                const viewHeight = window.innerHeight;
                
                if (rect.top < viewHeight && rect.bottom > 0) {
                    const totalTrack = rect.height;
                    const scrolledInside = (viewHeight - rect.top);
                    let progressPercent = (scrolledInside / totalTrack) * 100;
                    progressPercent = Math.min(Math.max(progressPercent, 0), 100);
                    timelineProgress.style.height = `${progressPercent}%`;
                }
            }

            let activeId = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (currentTop >= sectionTop - 160) {
                    activeId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });

        }, { passive: true });
    };
    initScrollEngine();

    /* ==========================================================================
       MAGNETIC BUTTON VECTOR MATRIX ENGINE
       ========================================================================== */
    const initMagneticButtons = () => {
        const targets = document.querySelectorAll('.magnetic-target');

        targets.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.35}px) scale(1.02)`;
                if (btn.classList.contains('footer-social-node')) {
                    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
                }
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    };
    if (!AppState.isMobile) initMagneticButtons();

    /* ==========================================================================
       MOBILE RESPONSIVE NAVIGATION ENGINE LAYER
       ========================================================================== */
    const initMobileNav = () => {
        const toggle = document.querySelector('.mobile-toggle');
        const menu = document.getElementById('nav-links');
        const links = document.querySelectorAll('.nav-link');

        if (!toggle || !menu) return;

        const toggleMenu = () => {
            const openState = menu.classList.toggle('open');
            toggle.classList.toggle('open');
            toggle.setAttribute('aria-expanded', openState);
        };

        toggle.addEventListener('click', toggleMenu);
        links.forEach(link => link.addEventListener('click', () => {
            if (menu.classList.contains('open')) toggleMenu();
        }));
    };
    initMobileNav();

    /* ==========================================================================
       PREMIUM HOVER HARDWARE CURSOR ENGINE
       ========================================================================== */
    const initHardwareCursor = () => {
        const cursor = document.getElementById('custom-cursor');
        const blur = document.getElementById('cursor-blur');
        
        if (!cursor || !blur) return;

        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            blur.style.left = `${e.clientX}px`;
            blur.style.top = `${e.clientY}px`;
        }, { passive: true });

        const activeTargets = document.querySelectorAll('a, button');
        activeTargets.forEach(node => {
            node.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovering'));
            node.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovering'));
        });
    };
    if (!AppState.isMobile) initHardwareCursor();
});
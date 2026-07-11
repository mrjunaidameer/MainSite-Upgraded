/**
 * JUNAID AMEER - PREMIUM PERSONAL PORTFOLIO ENGINE
 * Architecture: Vanilla ECMAScript Engine
 * Optimization: Hardware Acceleration, Passive Event Listeners, Compositor Layers
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Application State Management
    const AppState = {
        isMobile: window.innerWidth <= 900,
        scrollPosition: 0,
        mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 }
    };

    /* ==========================================================================
       CINEMATIC BACKGROUND PARTICLE ENGINE (2D Canvas Logic)
       ========================================================================== */
    const initParticleEngine = () => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

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
                this.size = Math.random() * 2.5 + 0.5;
                this.speedY = Math.random() * 0.4 + 0.1;
                this.speedX = (Math.random() - 0.5) * 0.15;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.blur = this.size > 2;
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                
                const driftX = (AppState.mouse.x - window.innerWidth / 2) * 0.0005;
                this.x += driftX * (this.size * 0.5);

                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 147, 79, ${this.opacity})`;
                
                if (this.blur) {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = 'rgba(255, 110, 41, 0.4)';
                } else {
                    ctx.shadowBlur = 0;
                }
                
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particleCount = AppState.isMobile ? 35 : 90;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const renderLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrameId = requestAnimationFrame(renderLoop);
        };
        renderLoop();
    };
    initParticleEngine();

    /* ==========================================================================
       INTERACTIVE BACKGROUND SPOTLIGHT TRACKING ENGINE
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

            const shiftX = (AppState.mouse.x - window.innerWidth / 2) * 0.12;
            const shiftY = (AppState.mouse.y - window.innerHeight / 2) * 0.12;

            ambientGlow.style.transform = `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px))`;
            requestAnimationFrame(lerpGlow);
        };
        lerpGlow();
    };
    if (!AppState.isMobile) initAmbientTracking();

    /* ==========================================================================
       DYNAMIC TARGET INTERACTIVE SPOTLIGHT LIGHTING
       ========================================================================== */
    const initCardSpotlights = () => {
        const cards = document.querySelectorAll('.item-glow, .item-glow-large, .footer-social-node');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const glowSize = card.classList.contains('item-glow-large') ? '400px' : '220px';
                const glowColor = 'rgba(255, 110, 41, 0.08)';
                
                if(!card.classList.contains('footer-social-node')) {
                    card.style.background = `radial-gradient(${glowSize} circle at ${x}px ${y}px, ${glowColor}, transparent 80%), var(--card-bg-glass)`;
                }
                card.style.borderColor = `rgba(255, 110, 41, 0.25)`;
            });

            card.addEventListener('mouseleave', () => {
                if(!card.classList.contains('footer-social-node')) {
                    card.style.background = 'var(--card-bg-glass)';
                    card.style.borderColor = 'var(--card-border-glass)';
                } else {
                    card.style.borderColor = 'rgba(255,255,255,0.04)';
                }
            });
        });
    };
    initCardSpotlights();

    /* ==========================================================================
       PREMIUM APPLE METRIC TEXT TYPEWRITER ENGINE
       ========================================================================== */
    const initTypewriter = () => {
        const target = document.getElementById('typewriter');
        if (!target) return;

        const phrases = ["Content Creator", "Cyber Security Student"];
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
       INTERSECTION OBSERVER METRICS (SCROLL REVEAL SCENARIO)
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
       CORE GLOBAL HIGH-PERFORMANCE SCROLL CONTROLLER
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
       MAGNETIC HOVER VECTOR MATRIX ENGINE
       ========================================================================== */
    const initMagneticButtons = () => {
        const targets = document.querySelectorAll('.magnetic-target');

        targets.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.35}px, ${y * 0.4}px) scale(1.02)`;
                if (btn.classList.contains('footer-social-node')) {
                    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
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

        const activeTargets = document.querySelectorAll('a, button, .form-input');
        activeTargets.forEach(node => {
            node.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovering'));
            node.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovering'));
        });
    };
    if (!AppState.isMobile) initHardwareCursor();

    /* ==========================================================================
       DIRECT COMPOSER LAUNCH MAIL ENGINE
       ========================================================================== */
    const initContactForm = () => {
        const form = document.getElementById('premium-contact-form');
        const btn = document.getElementById('form-submit-btn');
        const msg = document.getElementById('form-status-msg');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                msg.style.color = '#ff6e29';
                msg.textContent = "Please complete all fields with accurate parameters.";
                return;
            }

            btn.classList.add('loading');
            btn.disabled = true;

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            // Constructs native deep link mail parameter structures
            const targetRecipient = "thejunaidinsights@gmail.com";
            const subjectLine = encodeURIComponent(`Portfolio Connection - ${name}`);
            const bodyContent = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            const mailtoLink = `mailto:${targetRecipient}?subject=${subjectLine}&body=${bodyContent}`;

            setTimeout(() => {
                btn.classList.remove('loading');
                msg.style.color = '#29ff8d';
                msg.textContent = "Opening mail client window to send your message directly...";
                
                // Triggers native platform system mail layout dispatching
                window.location.href = mailtoLink;
                
                form.reset();
                btn.disabled = false;
                setTimeout(() => { msg.textContent = ""; }, 6000);
            }, 1200);
        });
    };
    initContactForm();
});
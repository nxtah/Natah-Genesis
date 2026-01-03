document.addEventListener('DOMContentLoaded', function() {
    console.log('Natah-Genesis loaded');
    
    // Language Switcher
    let currentLang = localStorage.getItem('preferred-language') || 'en';
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        
        // Update active state on toggle button
        document.querySelectorAll('.lang-option, .mobile-lang-option').forEach(opt => {
            if (opt.dataset.lang === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
        
        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keys = el.dataset.i18n.split('.');
            let value = translations[lang];
            keys.forEach(key => value = value[key]);
            
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else {
                el.textContent = value;
            }
        });
        
        // Update elements with HTML content
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const keys = el.dataset.i18nHtml.split('.');
            let value = translations[lang];
            keys.forEach(key => value = value[key]);
            
            // Re-apply word animation wrapper after changing HTML
            if (el.classList.contains('intro-description')) {
                el.innerHTML = value;
                applyWordAnimation(el);
                // Trigger animation immediately for already-visible section
                if (el.classList.contains('animated')) {
                    const wordSpans = el.querySelectorAll('.word-animate');
                    wordSpans.forEach((span, index) => {
                        const delayMs = index * 100;
                        span.style.animationDelay = `${delayMs}ms`;
                        span.classList.add('animate');
                    });
                }
            } else {
                el.innerHTML = value;
            }
        });
        
        // Update intro heading with special structure
        const introHeading = document.querySelector('.intro-heading');
        if (introHeading) {
            const heading = translations[lang].intro.heading;
            const highlight = translations[lang].intro.highlight;
            introHeading.innerHTML = `${heading}<br><span class="intro-highlight">${highlight}</span>`;
        }
    }
    
    // Initialize language on load
    setLanguage(currentLang);
    
    // Language toggle click handler
    const langToggle = document.getElementById('lang-toggle');
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLang = currentLang === 'en' ? 'id' : 'en';
            setLanguage(newLang);
        });
    }
    
    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', function() {
            const newLang = currentLang === 'en' ? 'id' : 'en';
            setLanguage(newLang);
        });
    }
    
    // Word-by-word entrance animation for intro description
    function applyWordAnimation(element) {
        const text = element.innerHTML;
        // Split by spaces but preserve HTML tags
        const words = text.split(/(\s+|<[^>]+>)/);
        
        let animatedHTML = '';
        let wordCount = 0;
        
        words.forEach(word => {
            if (word.trim() === '' || word.startsWith('<')) {
                // Preserve whitespace and HTML tags
                animatedHTML += word;
            } else {
                // Wrap word with animation span (no delay initially)
                animatedHTML += `<span class="word-animate">${word}</span>`;
                wordCount++;
            }
        });
        
        element.innerHTML = animatedHTML;
    }
    
    // Word-by-word entrance animation for intro description
    const introDescription = document.querySelector('.intro-description');
    if (introDescription) {
        applyWordAnimation(introDescription);
        
        // Trigger animation when user scrolls to intro section
        const introSection = document.querySelector('.intro-section');
        if (introSection) {
            const introObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !introDescription.classList.contains('animated')) {
                        // Add staggered delays and trigger animation
                        const wordSpans = introDescription.querySelectorAll('.word-animate');
                        wordSpans.forEach((span, index) => {
                            const delayMs = index * 100; // 100ms stagger
                            span.style.animationDelay = `${delayMs}ms`;
                            span.classList.add('animate'); // Apply animation class
                        });
                        introDescription.classList.add('animated');
                        introObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3
            });
            
            introObserver.observe(introSection);
        }
    }
    
    // Logo click - scroll to top
    const logo = document.querySelector('.navbar-logo');
    const mobileLogo = document.querySelector('.mobile-logo');
    
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (mobileLogo) {
        mobileLogo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBackToTop = document.getElementById('mobile-back-to-top');
    const mobileChatBtn = document.getElementById('mobile-chat-btn');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
        
        // Back to top functionality
        if (mobileBackToTop) {
            mobileBackToTop.addEventListener('click', function(e) {
                e.preventDefault();
                mobileMenu.classList.remove('active');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Mobile chat button
        if (mobileChatBtn) {
            mobileChatBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mobileMenu.classList.remove('active');
                const chatbotContainer = document.getElementById('chatbot-container');
                if (chatbotContainer) {
                    chatbotContainer.classList.add('active');
                }
            });
        }
    }
    
    // Stars Animation - Inactivity Detection
    let inactivityTimeout;
    const heroStarsContainer = document.getElementById('stars-container');
    const footerStarsContainer = document.getElementById('footer-stars-container');
    const heroSection = document.querySelector('.hero-section');
    const footerSection = document.querySelector('.footer-section');
    
    function createStars(container) {
        container.innerHTML = '';
        const starCount = Math.floor(Math.random() * 10) + 12; // 12-21 stars
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const fadeDelay = Math.random() * 0.5;
            const blinkDuration = Math.random() * 3 + 2; // 2-5s
            const blinkDelay = Math.random() * 1;
            const floatDuration = Math.random() * 10 + 8; // 8-18s
            const floatDelay = Math.random() * 2;
            
            star.style.left = x + '%';
            star.style.top = y + '%';
            star.style.animationDelay = fadeDelay + 's';
            star.style.animation = `starFadeIn 0.8s ease-in ${fadeDelay}s forwards, 
                                     starBlink ${blinkDuration}s ease-in-out ${blinkDelay}s infinite, 
                                     starFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`;
            
            container.appendChild(star);
        }
    }
    
    function showStars() {
        // Check which section is visible and show stars accordingly
        const heroRect = heroSection.getBoundingClientRect();
        const footerRect = footerSection.getBoundingClientRect();
        const isInHero = heroRect.top <= window.innerHeight && heroRect.bottom >= 0;
        const isInFooter = footerRect.top <= window.innerHeight && footerRect.bottom >= 0;
        
        if (isInHero && heroStarsContainer) {
            createStars(heroStarsContainer);
            heroStarsContainer.classList.add('visible');
            startStarTeleportation(heroStarsContainer);
        }
        
        if (isInFooter && footerStarsContainer) {
            createStars(footerStarsContainer);
            footerStarsContainer.classList.add('visible');
            startStarTeleportation(footerStarsContainer);
        }
    }
    
    function hideStars() {
        if (heroStarsContainer) {
            heroStarsContainer.classList.remove('visible');
            stopStarTeleportation(heroStarsContainer);
        }
        if (footerStarsContainer) {
            footerStarsContainer.classList.remove('visible');
            stopStarTeleportation(footerStarsContainer);
        }
    }
    
    let teleportIntervals = new Map();
    
    function startStarTeleportation(container) {
        stopStarTeleportation(container);
        const interval = setInterval(() => {
            const stars = container.querySelectorAll('.star');
            if (stars.length > 0) {
                // Randomly pick 1-3 stars to teleport
                const numberOfStarsToMove = Math.floor(Math.random() * 3) + 1;
                const starsToMove = [];
                
                for (let i = 0; i < numberOfStarsToMove; i++) {
                    const randomIndex = Math.floor(Math.random() * stars.length);
                    if (!starsToMove.includes(stars[randomIndex])) {
                        starsToMove.push(stars[randomIndex]);
                    }
                }
                
                starsToMove.forEach(star => {
                    // Fade out
                    star.style.opacity = '0';
                    star.style.transition = 'opacity 0.5s ease';
                    
                    // After fade out, move to new position and fade in
                    setTimeout(() => {
                        const newX = Math.random() * 100;
                        const newY = Math.random() * 100;
                        star.style.left = newX + '%';
                        star.style.top = newY + '%';
                        
                        // Fade back in
                        setTimeout(() => {
                            star.style.opacity = '1';
                        }, 50);
                    }, 500);
                });
            }
        }, 4000); // Teleport every 4 seconds
        teleportIntervals.set(container, interval);
    }
    
    // Problem cards entrance animation
    const problemSection = document.querySelector('.problem-section');
    const problemCards = document.querySelectorAll('.problem-card');
    const problemHeading = document.querySelector('.problem-heading');
    
    if (problemSection && problemCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger heading animation first
                    if (problemHeading) {
                        problemHeading.classList.add('heading-visible');
                    }
                    // Trigger cards animation with slight delay
                    setTimeout(() => {
                        problemCards.forEach(card => {
                            card.classList.add('card-visible');
                        });
                    }, 200);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        cardObserver.observe(problemSection);
    }
    
    // Problem Cards - Click to flip on touch devices
    problemCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Check if device is touch-enabled
            if (window.matchMedia('(hover: none)').matches) {
                e.preventDefault();
                const cardInner = card.querySelector('.card-inner');
                if (cardInner.style.transform === 'rotateY(180deg)') {
                    cardInner.style.transform = 'rotateY(0deg)';
                } else {
                    cardInner.style.transform = 'rotateY(180deg)';
                }
            }
        });
    });
    
    function stopStarTeleportation(container) {
        if (teleportIntervals.has(container)) {
            clearInterval(teleportIntervals.get(container));
            teleportIntervals.delete(container);
        }
    }
    
    function resetInactivityTimer() {
        clearTimeout(inactivityTimeout);
        hideStars();
        
        // Only show stars if user is in hero or footer section
        const heroRect = heroSection.getBoundingClientRect();
        const footerRect = footerSection.getBoundingClientRect();
        const isInHero = heroRect.top <= window.innerHeight && heroRect.bottom >= 0;
        const isInFooter = footerRect.top <= window.innerHeight && footerRect.bottom >= 0;
        
        if (isInHero || isInFooter) {
            inactivityTimeout = setTimeout(showStars, 3000);
        }
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', resetInactivityTimer);
    
    // Track scroll
    window.addEventListener('scroll', resetInactivityTimer);
    
    // Initialize
    resetInactivityTimer();
    
    // Hero text slide on scroll
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroTitle.classList.remove('slide-left');
                } else {
                    heroTitle.classList.add('slide-left');
                }
            });
        }, {
            threshold: 0.5
        });
        
        heroObserver.observe(heroSection);
    }
    
// Chatbot functionality
    const chatbotBtn = document.getElementById('navbar-chat-btn');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    
    if (chatbotBtn && chatbotContainer && chatbotClose) {
        chatbotBtn.addEventListener('click', function(e) {
            e.preventDefault();
            chatbotContainer.classList.toggle('active');
        });
        
        chatbotClose.addEventListener('click', function(e) {
            e.preventDefault();
            chatbotContainer.classList.remove('active');
        });
    }
    
    // Close chatbot when clicking outside
    if (chatbotContainer && chatbotBtn) {
        document.addEventListener('click', function(e) {
            const isClickInsideChatbot = chatbotContainer.contains(e.target);
            const isClickOnButton = chatbotBtn.contains(e.target);
            const mobileChatBtn = document.getElementById('mobile-chat-btn');
            const isClickOnMobileChat = mobileChatBtn && mobileChatBtn.contains(e.target);
            
            if (!isClickInsideChatbot && !isClickOnButton && !isClickOnMobileChat && chatbotContainer.classList.contains('active')) {
                // Trigger close animation
                chatbotContainer.classList.add('closing');
                setTimeout(function() {
                    chatbotContainer.classList.remove('active', 'closing');
                }, 400); // Match animation duration
            }
        });
    }
    
    // Update chat button text based on section
    const sections = document.querySelectorAll('section[data-section], footer[data-section]');
    
    const chatObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const chatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.getAttribute('data-section');
                if (chatbotBtn && sectionName !== 'Introduction') {
                    chatbotBtn.textContent = 'Chat with my Bot FREE!';
                    chatbotBtn.classList.add('active');
                } else if (chatbotBtn && sectionName === 'Introduction') {
                    chatbotBtn.textContent = 'Your favorite digital solution';
                    chatbotBtn.classList.remove('active');
                }
            }
        });
    }, chatObserverOptions);
    
    sections.forEach(section => {
        chatObserver.observe(section);
    });
    
    // Section indicator update on scroll
    const sectionIndicator = document.getElementById('section-indicator');
    
    // Intersection Observer to detect which section is in view
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.getAttribute('data-section');
                if (sectionIndicator && sectionName) {
                    // Add slide-in animation
                    sectionIndicator.classList.remove('slide-in');
                    void sectionIndicator.offsetWidth; // Trigger reflow
                    // Special text for footer section
                    if (entry.target.classList.contains('footer-section')) {
                        sectionIndicator.textContent = "Let's Rock!";
                    } else {
                        sectionIndicator.textContent = sectionName;
                    }
                    sectionIndicator.classList.add('slide-in');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Solution items scroll animation
    const solutionItems = document.querySelectorAll('.solution-item');
    const solutionHeading = document.querySelector('.solution-heading');
    const solutionSubtitle = document.querySelector('.solution-subtitle');
    const solutionSection = document.querySelector('.solution-section');
    
    if (solutionSection) {
        const solutionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger heading animation
                    if (solutionHeading) {
                        solutionHeading.classList.add('heading-visible');
                    }
                    // Trigger subtitle animation
                    if (solutionSubtitle) {
                        solutionSubtitle.classList.add('subtitle-visible');
                    }
                }
            });
        }, {
            threshold: 0.2
        });
        
        solutionObserver.observe(solutionSection);
    }
    
    if (solutionItems.length > 0) {
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });
        
        solutionItems.forEach(item => {
            itemObserver.observe(item);
        });
    }

    // Support section entrance animation
    const supportSection = document.querySelector('.support-section');
    const supportHeading = document.querySelector('.support-heading');
    const supportSubtitle = document.querySelector('.support-subtitle');
    const supportCards = document.querySelectorAll('.support-card');
    const supportExtraCards = document.querySelectorAll('.support-card.support-extra');
    const supportShowMore = document.getElementById('support-show-more');
    
    if (supportSection) {
        const supportObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (supportHeading) supportHeading.classList.add('heading-visible');
                    if (supportSubtitle) supportSubtitle.classList.add('subtitle-visible');
                    if (supportCards.length > 0) {
                        supportCards.forEach(card => card.classList.add('card-visible'));
                    }
                    supportObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        supportObserver.observe(supportSection);
    }

    // Support show more toggle
    if (supportShowMore && supportExtraCards.length > 0) {
        let expanded = false;
        const toggleCards = () => {
            expanded = !expanded;
            supportExtraCards.forEach(card => {
                if (expanded) {
                    card.classList.add('revealed');
                } else {
                    card.classList.remove('revealed');
                }
            });
            supportShowMore.classList.toggle('expanded', expanded);
        };
        supportShowMore.addEventListener('click', toggleCards);
    }
    
    // Cursor image hover effect
    const cursorImage = document.querySelector('.cursor-image');
    
    if (cursorImage && solutionItems.length > 0) {
        solutionItems.forEach(item => {
            const imageUrl = item.getAttribute('data-image');
            
            item.addEventListener('mouseenter', function() {
                if (imageUrl) {
                    cursorImage.style.backgroundImage = `url(${imageUrl})`;
                    cursorImage.classList.add('active');
                }
            });
            
            item.addEventListener('mouseleave', function() {
                cursorImage.classList.remove('active');
            });
            
            item.addEventListener('mousemove', function(e) {
                cursorImage.style.left = e.clientX + 'px';
                cursorImage.style.top = e.clientY + 'px';
            });
        });
    }

    // Project Modal functionality
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalGif = document.getElementById('modalGif');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalDescription = document.getElementById('modalDescription');
    const modalContent = document.getElementById('modalContent');
    
    // Open modal when project card is clicked
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const gifSrc = this.querySelector('.project-gif').src;
            const title = this.querySelector('.project-title').textContent;
            const desc = this.querySelector('.project-desc').textContent;
            
            // Set modal content
            modalGif.src = gifSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            // Show modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset description visibility
            modalDescription.classList.remove('visible');
            modalContent.scrollTop = 0;
            
            // On mobile, show description immediately
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    modalDescription.classList.add('visible');
                }, 300);
            }
        });
    });
    
    // Close modal
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Close on backdrop click
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Scroll reveal description
    projectModal.addEventListener('scroll', function() {
        const scrollPosition = projectModal.scrollTop;
        const modalHeight = projectModal.scrollHeight - projectModal.clientHeight;
        
        // Show description when scrolled past 20% of the modal
        if (scrollPosition > modalHeight * 0.15 || scrollPosition > 100) {
            modalDescription.classList.add('visible');
        }
    });

    // Project section entrance animation
    const projectSection = document.querySelector('.project-section');
    const projectHeading = document.querySelector('.project-heading');
    const projectSubtitle = document.querySelector('.project-subtitle');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectSection) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger heading animation
                    if (projectHeading) {
                        projectHeading.classList.add('heading-visible');
                    }
                    // Trigger subtitle animation
                    if (projectSubtitle) {
                        projectSubtitle.classList.add('subtitle-visible');
                    }
                    // Trigger cards animation
                    if (projectCards.length > 0) {
                        projectCards.forEach(card => {
                            card.classList.add('card-visible');
                        });
                    }
                    projectObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        projectObserver.observe(projectSection);
    }

    // Service section entrance animation
    const serviceSection = document.querySelector('.service-section');
    const serviceHeading = document.querySelector('.service-heading');
    const serviceSubtitle = document.querySelector('.service-subtitle');
    const serviceBoxes = document.querySelectorAll('.service-box');
    
    if (serviceSection) {
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger heading animation
                    if (serviceHeading) {
                        serviceHeading.classList.add('heading-visible');
                    }
                    // Trigger subtitle animation
                    if (serviceSubtitle) {
                        serviceSubtitle.classList.add('subtitle-visible');
                    }
                    // Trigger boxes animation
                    if (serviceBoxes.length > 0) {
                        serviceBoxes.forEach(box => {
                            box.classList.add('box-visible');
                        });
                    }
                    serviceObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        serviceObserver.observe(serviceSection);
    }

    // Counter animation for stats section
    function animateCounter(element, target, duration, suffix = '') {
        let startValue = 0;
        const increment = target / (duration / 16); // 60fps
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue) + suffix;
            }
        }, 16);
    }
    
    // Observe stats section for counter animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    
                    // Animate each number
                    if (statNumbers[0] && !statNumbers[0].classList.contains('animated')) {
                        animateCounter(statNumbers[0], 10, 2000, '+');
                        statNumbers[0].classList.add('animated');
                    }
                    if (statNumbers[1] && !statNumbers[1].classList.contains('animated')) {
                        animateCounter(statNumbers[1], 96, 2000, '%');
                        statNumbers[1].classList.add('animated');
                    }
                    if (statNumbers[2] && !statNumbers[2].classList.contains('animated')) {
                        statNumbers[2].textContent = '24/7';
                        statNumbers[2].classList.add('animated');
                    }
                    
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        counterObserver.observe(statsSection);
    }
});

// Footer CTA Scroll Detection
document.addEventListener('DOMContentLoaded', function() {
    const footerCta = document.getElementById('footer-cta');
    const footerSection = document.querySelector('.footer-section');
    
    if (footerCta && footerSection) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    footerCta.classList.add('visible');
                } else {
                    footerCta.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        ctaObserver.observe(footerSection);
    }
});


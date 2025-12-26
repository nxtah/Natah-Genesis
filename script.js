// Natah-Genesis JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Natah-Genesis loaded');
    
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
    
    // Problem Cards - Click to flip on touch devices
    const problemCards = document.querySelectorAll('.problem-card');
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
    const sections = document.querySelectorAll('section[data-section]');
    
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
                    chatbotBtn.textContent = 'Chat with my Bot!';
                    chatbotBtn.classList.add('active');
                } else if (chatbotBtn && sectionName === 'Introduction') {
                    chatbotBtn.textContent = 'Your favorite digital AI solution';
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
                    sectionIndicator.textContent = sectionName;
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
                        animateCounter(statNumbers[0], 500, 2000, '+');
                        statNumbers[0].classList.add('animated');
                    }
                    if (statNumbers[1] && !statNumbers[1].classList.contains('animated')) {
                        animateCounter(statNumbers[1], 98, 2000, '%');
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


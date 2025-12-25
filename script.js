// Natah-Genesis JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Natah-Genesis loaded');
    
    // Logo click - scroll to top
    const logo = document.querySelector('.navbar-logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Hero text slide on scroll
    const heroTitle = document.querySelector('.hero-title');
    const heroSection = document.querySelector('.hero-section');
    
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
            
            if (!isClickInsideChatbot && !isClickOnButton && chatbotContainer.classList.contains('active')) {
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
    
    // Navbar smooth scroll
    const navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add smooth scroll functionality here when sections are ready
        });
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

    // Counter animation for intro stats
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
    
    // Observe intro section for counter animation
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
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
        
        counterObserver.observe(introSection);
    }
});

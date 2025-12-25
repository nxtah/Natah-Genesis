# 🤖 Botpress AI Chatbot Setup Guide

Panduan lengkap untuk setup dan integrasi Botpress AI Chatbot ke website Natah Genesis.

---// ===========================
// SMOOTH SCROLL & NAVIGATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for external links or non-section links
            if (href === '#' || href.includes('wa.me')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===========================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with slide-up class
    document.querySelectorAll('.slide-up').forEach(element => {
        observer.observe(element);
    });
    
    // ===========================
    // STAGGERED ANIMATION FOR CARDS
    // ===========================
    
    const cardSections = [
        '.problem-grid .problem-card',
        '.solution-grid .solution-card',
        '.services-grid .service-card'
    ];
    
    cardSections.forEach(selector => {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // ===========================
    // DYNAMIC YEAR IN FOOTER
    // ===========================
    
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} Natah Genesis. All rights reserved.`;
    }
    
    // ===========================
    // SMOOTH COUNTER ANIMATION FOR STATS (OPTIONAL)
    // ===========================
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // ===========================
    // BUTTON RIPPLE EFFECT
    // ===========================
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===========================
    // PARALLAX EFFECT FOR HERO
    // ===========================
    
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            
            if (heroVisual && scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // ===========================
    // LOADING ANIMATION
    // ===========================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements on load
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroText) {
            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (heroImage) {
            setTimeout(() => {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0)';
            }, 400);
        }
    });

    // ===========================
    // CHATBOT TOGGLER (OPEN/CLOSE)
    // ===========================

    const chatbotShell = document.querySelector('.chatbot-shell');
    const chatbot = document.querySelector('.chatbot-embed');
    const chatbotLauncher = document.querySelector('.chatbot-launcher');
    const chatbotClose = document.querySelector('.chatbot-close');

    function openChatbot() {
        if (!chatbotShell) return;
        chatbotShell.classList.add('active');
        if (chatbotLauncher) chatbotLauncher.classList.add('hidden');
    }

    function closeChatbot() {
        if (!chatbotShell) return;
        chatbotShell.classList.remove('active');
        if (chatbotLauncher) chatbotLauncher.classList.remove('hidden');
    }

    if (chatbotLauncher) {
        chatbotLauncher.addEventListener('click', (e) => {
            e.stopPropagation();
            openChatbot();
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeChatbot();
        });
    }

    // Close chatbot when clicking outside it
    document.addEventListener('click', (e) => {
        const isChatbot = chatbotShell && chatbotShell.contains(e.target);
        const isLauncher = chatbotLauncher && chatbotLauncher.contains(e.target);
        if (chatbotShell && chatbotShell.classList.contains('active') && !isChatbot && !isLauncher) {
            closeChatbot();
        }
    });

    // Prevent clicks inside chatbot from bubbling to document
    if (chatbotShell) {
        chatbotShell.addEventListener('click', (e) => e.stopPropagation());
    }
    
    // ===========================
    // ACTIVE SECTION HIGHLIGHTING IN NAV
    // ===========================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--primary-color)';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ===========================
    // CHATBOT DEMO INSTRUCTION PULSE
    // ===========================
    
    const instructionBox = document.querySelector('.instruction-box');
    
    if (instructionBox) {
        const instructionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add extra emphasis when instruction box is visible
                    instructionBox.style.animation = 'pulse-border 1.5s ease-in-out infinite';
                }
            });
        }, { threshold: 0.5 });
        
        instructionObserver.observe(instructionBox);
    }
    
    // ===========================
    // CONSOLE MESSAGE (OPTIONAL BRANDING)
    // ===========================
    
    console.log('%c🚀 Natah Genesis - Website & AI Solutions', 'color: #10b981; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies', 'color: #cbd5e1; font-size: 12px;');
    console.log('%cInterested in our services? Contact us via WhatsApp!', 'color: #2563eb; font-size: 12px;');
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// FORM VALIDATION (FOR FUTURE USE)
// ===========================

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&// ===========================
// SMOOTH SCROLL & NAVIGATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for external links or non-section links
            if (href === '#' || href.includes('wa.me')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===========================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with slide-up class
    document.querySelectorAll('.slide-up').forEach(element => {
        observer.observe(element);
    });
    
    // ===========================
    // STAGGERED ANIMATION FOR CARDS
    // ===========================
    
    const cardSections = [
        '.problem-grid .problem-card',
        '.solution-grid .solution-card',
        '.services-grid .service-card'
    ];
    
    cardSections.forEach(selector => {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // ===========================
    // DYNAMIC YEAR IN FOOTER
    // ===========================
    
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} Natah Genesis. All rights reserved.`;
    }
    
    // ===========================
    // SMOOTH COUNTER ANIMATION FOR STATS (OPTIONAL)
    // ===========================
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // ===========================
    // BUTTON RIPPLE EFFECT
    // ===========================
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===========================
    // PARALLAX EFFECT FOR HERO
    // ===========================
    
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            
            if (heroVisual && scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // ===========================
    // LOADING ANIMATION
    // ===========================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements on load
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroText) {
            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (heroImage) {
            setTimeout(() => {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0)';
            }, 400);
        }
    });

    // ===========================
    // CHATBOT TOGGLER (OPEN/CLOSE)
    // ===========================

    const chatbotShell = document.querySelector('.chatbot-shell');
    const chatbot = document.querySelector('.chatbot-embed');
    const chatbotLauncher = document.querySelector('.chatbot-launcher');
    const chatbotClose = document.querySelector('.chatbot-close');

    function openChatbot() {
        if (!chatbotShell) return;
        chatbotShell.classList.add('active');
        if (chatbotLauncher) chatbotLauncher.classList.add('hidden');
    }

    function closeChatbot() {
        if (!chatbotShell) return;
        chatbotShell.classList.remove('active');
        if (chatbotLauncher) chatbotLauncher.classList.remove('hidden');
    }

    if (chatbotLauncher) {
        chatbotLauncher.addEventListener('click', (e) => {
            e.stopPropagation();
            openChatbot();
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeChatbot();
        });
    }

    // Close chatbot when clicking outside it
    document.addEventListener('click', (e) => {
        const isChatbot = chatbotShell && chatbotShell.contains(e.target);
        const isLauncher = chatbotLauncher && chatbotLauncher.contains(e.target);
        if (chatbotShell && chatbotShell.classList.contains('active') && !isChatbot && !isLauncher) {
            closeChatbot();
        }
    });

    // Prevent clicks inside chatbot from bubbling to document
    if (chatbotShell) {
        chatbotShell.addEventListener('click', (e) => e.stopPropagation());
    }
    
    // ===========================
    // ACTIVE SECTION HIGHLIGHTING IN NAV
    // ===========================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--primary-color)';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ===========================
    // CHATBOT DEMO INSTRUCTION PULSE
    // ===========================
    
    const instructionBox = document.querySelector('.instruction-box');
    
    if (instructionBox) {
        const instructionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add extra emphasis when instruction box is visible
                    instructionBox.style.animation = 'pulse-border 1.5s ease-in-out infinite';
                }
            });
        }, { threshold: 0.5 });
        
        instructionObserver.observe(instructionBox);
    }
    
    // ===========================
    // CONSOLE MESSAGE (OPTIONAL BRANDING)
    // ===========================
    
    console.log('%c🚀 Natah Genesis - Website & AI Solutions', 'color: #10b981; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies', 'color: #cbd5e1; font-size: 12px;');
    console.log('%cInterested in our services? Contact us via WhatsApp!', 'color: #2563eb; font-size: 12px;');
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// FORM VALIDATION (FOR FUTURE USE)
// ===========================

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===========================
// ANALYTICS TRACKING (PLACEHOLDER)
// ===========================

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log('Button clicked:', buttonText);
        
        // Add your analytics tracking here
        // Example: gtag('event', 'button_click', { button_name: buttonText });
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp link clicked');
        
        // Add your analytics tracking here
        // Example: gtag('event', 'whatsapp_click', { link_url: this.href });
    });
});

        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===========================
// ANALYTICS TRACKING (PLACEHOLDER)
// ===========================

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log('Button clicked:', buttonText);
        
        // Add your analytics tracking here
        // Example: gtag('event', 'button_click', { button_name: buttonText });
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp link clicked');
        
        // Add your analytics tracking here
        // Example: gtag('event', 'whatsapp_click', { link_url: this.href });
    });
});


## 📋 Table of Contents

1. [Apa itu Botpress?](#apa-itu-botpress)
2. [Prerequisites](#prerequisites)
3. [Langkah 1: Buat Akun Botpress](#langkah-1-buat-akun-botpress)
4. [Langkah 2: Buat Bot Baru](#langkah-2-buat-bot-baru)
5. [Langkah 3: Design Conversation Flow](#langkah-3-design-conversation-flow)
6. [Langkah 4: Train AI Agent](#langkah-4-train-ai-agent)
7. [Langkah 5: Get Credentials](#langkah-5-get-credentials)
8. [Langkah 6: Update Website Code](#langkah-6-update-website-code)
9. [Langkah 7: Customize & Deploy](#langkah-7-customize--deploy)
10. [Tips & Best Practices](#tips--best-practices)

---

## Apa itu Botpress?

Botpress adalah platform AI chatbot yang powerful dengan fitur:
- Visual conversation builder
- Natural Language Understanding (NLU)
- Integration dengan berbagai platform
- Analytics & monitoring
- Free tier tersedia (10,000 messages/month)

**Website:** https://botpress.com

---

## Prerequisites

✅ Email aktif untuk registrasi  
✅ Browser modern (Chrome, Firefox, Edge)  
✅ Akses ke file `index.html` website Natah Genesis  
✅ (Optional) Domain custom untuk branding  

---

## Langkah 1: Buat Akun Botpress

### 1.1 Registrasi

1. Buka **https://botpress.com**
2. Klik **"Get Started"** atau **"Start Building"**
3. Pilih metode sign up:
   - Sign up with Google (Recommended)
   - Sign up with GitHub
   - Email & Password
4. Verifikasi email jika diperlukan
5. Login ke Botpress Dashboard

### 1.2 Pilih Plan

- **Free Plan**: 10,000 messages/month (cukup untuk mulai)
- **Pro Plan**: $49/month - unlimited messages
- Pilih **Free** untuk testing dulu

---

## Langkah 2: Buat Bot Baru

### 2.1 Create New Bot

1. Di Dashboard, klik **"Create Bot"** atau **"+ New Bot"**
2. Isi informasi bot:
   - **Bot Name**: `Natah Genesis AI Assistant`
   - **Description**: `AI chatbot untuk layanan website dan AI solutions`
   - **Language**: `English` atau `Indonesian` (pilih sesuai target market)
   - **Template**: Pilih **"Blank Bot"** atau **"Customer Support"**
3. Klik **"Create Bot"**

### 2.2 Bot Created

- Bot akan dibuat dalam beberapa detik
- Kamu akan diarahkan ke **Studio** (visual bot builder)

---

## Langkah 3: Design Conversation Flow

### 3.1 Understanding Studio Interface

Botpress Studio terdiri dari:
- **Flow Editor**: Tempat design conversation flow
- **Cards**: Berbagai node untuk dialog
- **Emulator**: Test bot secara real-time

### 3.2 Buat Basic Conversation Flow

#### A. Welcome Message

1. Buat flow baru: **"welcome"**
2. Tambahkan **Text Card**
3. Isi message:

```
👋 Hi! Saya AI Assistant dari Natah Genesis.

Kami membantu bisnis membangun:
✅ Website profesional
✅ AI Chatbot otomatis
✅ Sistem automasi sederhana

Ada yang bisa saya bantu? Klik salah satu:
```

4. Tambahkan **Choice Card** (button):
   - Button 1: "Tanya tentang Services 📦"
   - Button 2: "Lihat Harga 💰"
   - Button 3: "Chat dengan Tim 💬"
   - Button 4: "Pertanyaan Lain ❓"

#### B. Services Flow

1. Buat flow: **"services"**
2. Tambahkan Text Card:

```
📦 Kami menawarkan 3 paket layanan:

🟢 **Basic Website**
- Landing page profesional
- WhatsApp integration
- Mobile responsive

🔵 **Smart Website** (Most Popular)
- Website + AI Chatbot
- Automated responses 24/7
- Custom branding

🟣 **Automation System**
- Full automation solution
- Booking system
- Admin flow

Mau tahu lebih detail paket mana?
```

3. Tambahkan Choice buttons

#### C. Pricing Flow

1. Buat flow: **"pricing"**
2. Tambahkan Text Card dengan info harga (sesuaikan):

```
💰 Harga Paket Natah Genesis:

✨ Basic Website: Rp 2.500.000
✨ Smart Website: Rp 5.000.000 (Recommended!)
✨ Automation System: Hubungi kami

📌 Semua paket include:
- Free consultation
- Quick setup
- Ongoing support

Mau konsultasi gratis via WhatsApp?
```

4. Tambahkan button "Chat via WhatsApp"

#### D. Contact Flow

1. Buat flow: **"contact"**
2. Tambahkan Text Card:

```
💬 Senang bisa bantu kamu!

Langsung chat dengan tim kami via WhatsApp untuk:
✅ Free consultation
✅ Custom quote
✅ Demo AI chatbot

Klik tombol di bawah untuk mulai chat:
```

3. Tambahkan **Action Card** untuk redirect ke WhatsApp
4. URL: `https://wa.me/6281234567890?text=Hi%20Natah%20Genesis,%20I'm%20interested%20in%20your%20services`

#### E. FAQ Flow

1. Buat flow: **"faq"**
2. Tambahkan berbagai FAQ common:
   - "Berapa lama waktu pembuatan website?"
   - "Apakah AI chatbot bisa bahasa Indonesia?"
   - "Bagaimana cara maintain websitenya?"
   - dll.

---

## Langkah 4: Train AI Agent

### 4.1 Enable AI Agent (NLU)

1. Klik **"Agent"** tab di Studio
2. Enable **"AI Agent"**
3. Pilih model: **GPT-4** atau **GPT-3.5-turbo**

### 4.2 Add Knowledge Base

1. Klik **"Knowledge Base"** atau **"Knowledgebase"**
2. Tambahkan informasi tentang Natah Genesis:

**About Company:**
```
Natah Genesis adalah digital solution provider yang fokus pada:
- Website development profesional
- AI chatbot implementation
- Business automation systems

Target market: UMKM, klinik, sekolah, local brands
Visi: Membuat digital solution accessible dan affordable
```

**Services Detail:**
```
Basic Website: Landing page + WhatsApp integration + Mobile responsive
Smart Website: Website + AI chatbot FAQ-based + Automated responses 24/7 + Custom branding
Automation System: Full automation + Booking system + Admin flow + Priority support
```

**Common Questions:**
```
Q: Berapa lama pembuatan website?
A: 7-14 hari kerja tergantung kompleksitas proyek

Q: Apakah bisa custom design?
A: Ya, semua design disesuaikan dengan brand identity kamu

Q: Support setelah website jadi?
A: Ya, kami provide ongoing support dan maintenance
```

3. Save Knowledge Base

### 4.3 Train Intents

1. Tambahkan **Intents** untuk berbagai pertanyaan user:
   - `ask.services` - User tanya tentang layanan
   - `ask.pricing` - User tanya tentang harga
   - `ask.contact` - User mau contact
   - `ask.faq` - Pertanyaan umum
   - `greeting` - Sapaan

2. Untuk setiap intent, tambahkan **example utterances**:

**Intent: ask.services**
- "Apa saja layanan kalian?"
- "Services apa yang ditawarkan?"
- "Bisa buat website ga?"
- "Ada AI chatbot?"

**Intent: ask.pricing**
- "Berapa harganya?"
- "Harga paket berapa?"
- "Biaya buat website?"
- "Budget sekitar berapa?"

3. Train model dengan klik **"Train"**

---

## Langkah 5: Get Credentials

### 5.1 Get Bot ID & Client ID

1. Di Botpress Studio, klik **"Integrations"** atau **"Channels"**
2. Pilih **"Web Chat"** atau **"Webchat"**
3. Enable Web Chat integration
4. Copy credentials:
   - **Bot ID**: `xxxxx-xxxxx-xxxxx`
   - **Client ID**: `xxxxx-xxxxx-xxxxx`
   - **Webhook ID**: `xxxxx-xxxxx-xxxxx`

### 5.2 Save Credentials

Copy credentials ini ke notepad sementara, akan digunakan di langkah berikutnya.

---

## Langkah 6: Update Website Code

### 6.1 Open index.html

Buka file: `d:\natah\PROJECTS\natah-genesis\index.html`

### 6.2 Update Botpress Configuration

Cari bagian script Botpress (di akhir file sebelum `</body>`):

```html
<script>
    window.botpressWebChat.init({
        "composerPlaceholder": "Ask me anything about our services...",
        "botConversationDescription": "Natah Genesis AI Assistant",
        "botId": "YOUR_BOT_ID_HERE",  // ⬅️ GANTI INI
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "YOUR_CLIENT_ID_HERE",  // ⬅️ GANTI INI
        "webhookId": "YOUR_WEBHOOK_ID_HERE",  // ⬅️ GANTI INI
        "lazySocket": true,
        "themeName": "prism",
        "botName": "Natah Genesis AI",
        "avatarUrl": "https://via.placeholder.com/40x40.png?text=NG",
        "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/YOUR_STYLE_ID/v12345/style.css",
        "frontendVersion": "v1",
        "useSessionStorage": true,
        "theme": "prism",
        "themeColor": "#2563eb"
    });
</script>
```

### 6.3 Replace Credentials

Ganti:
- `YOUR_BOT_ID_HERE` → Bot ID dari Botpress
- `YOUR_CLIENT_ID_HERE` → Client ID dari Botpress
- `YOUR_WEBHOOK_ID_HERE` → Webhook ID dari Botpress

**Contoh:**
```javascript
"botId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
"clientId": "x9y8z7w6-v5u4-3210-tuvw-xy9876543210",
"webhookId": "m1n2o3p4-q5r6-7890-stuv-mn1234567890",
```

### 6.4 (Optional) Customize Appearance

Sesuaikan tampilan chatbot:

```javascript
"composerPlaceholder": "Tanya apa saja tentang layanan kami...",
"botName": "Natah AI Assistant",
"themeColor": "#10b981",  // Warna hijau matching WhatsApp
"avatarUrl": "https://yourdomain.com/logo.png",  // Logo kamu
```

### 6.5 Save File

Save `index.html` setelah update credentials.

---

## Langkah 7: Customize & Deploy

### 7.1 Customize Bot Responses

Kembali ke Botpress Studio:

1. **Personalize Greeting**
   - Sesuaikan tone of voice (formal/casual)
   - Tambahkan emoji untuk friendly
   - Include unique value proposition

2. **Add Rich Responses**
   - Gunakan images/GIFs
   - Tambahkan carousel untuk showcase packages
   - Include video demo (optional)

3. **Setup Handoff to Human**
   - Jika bot tidak bisa jawab, redirect ke WhatsApp
   - "Saya belum bisa jawab pertanyaan ini, mau chat langsung dengan tim?"

### 7.2 Test Bot

1. Di Botpress Studio, klik **"Emulator"** (icon chat bubble)
2. Test berbagai scenario:
   - Greeting flow
   - Ask about services
   - Ask about pricing
   - Random questions
3. Fix any issues di flow

### 7.3 Publish Bot

1. Klik **"Publish"** di Botpress Studio
2. Wait for deployment (30-60 seconds)
3. Bot is now LIVE! 🎉

### 7.4 Test on Website

1. Open `index.html` di browser
2. Chatbot widget akan muncul di bottom-right
3. Test conversation flow
4. Pastikan redirect ke WhatsApp works

### 7.5 Deploy Website

Upload website ke hosting (Netlify/Vercel/GitHub Pages):

**Netlify:**
```bash
# Drag & drop folder ke Netlify
# atau
netlify deploy --prod
```

**Vercel:**
```bash
vercel --prod
```

**GitHub Pages:**
```bash
git add .
git commit -m "Add Botpress AI chatbot"
git push origin main
```

---

## Tips & Best Practices

### 🎯 Conversation Design

✅ **Keep it simple**: Jangan buat flow terlalu kompleks  
✅ **Use buttons**: Lebih mudah dari free text  
✅ **Quick replies**: Maks 3-4 pilihan per card  
✅ **Friendly tone**: Gunakan emoji, informal language  
✅ **Clear CTA**: Setiap flow end dengan clear next action  

### 🤖 AI Training

✅ **Update knowledge base**: Add FAQ baru secara berkala  
✅ **Monitor conversations**: Review chat logs di Botpress Analytics  
✅ **Improve intents**: Tambahkan utterances dari real user input  
✅ **Fallback strategy**: Selalu provide escape route (contact human)  

### 🎨 UI/UX

✅ **Brand consistency**: Match color scheme website  
✅ **Custom avatar**: Use logo atau mascot  
✅ **Welcome message**: Engaging dan clear value  
✅ **Loading states**: Jangan biarkan user waiting tanpa feedback  

### 📊 Analytics & Monitoring

✅ **Track metrics**:
   - Total conversations
   - User satisfaction
   - Most asked questions
   - Drop-off points

✅ **Iterate based on data**: Improve flow berdasarkan analytics

✅ **A/B testing**: Test different greetings/flows

### 🔒 Security & Privacy

✅ **Don't collect sensitive data**: Jangan minta password, credit card, etc.  
✅ **GDPR compliance**: Add privacy notice  
✅ **Data retention**: Set appropriate retention period di Botpress settings  

### 💰 Cost Optimization

✅ **Free tier limits**: 10,000 messages/month  
✅ **Monitor usage**: Check di Botpress Dashboard  
✅ **Upgrade when needed**: Jika traffic tinggi, consider Pro plan  

---

## 🚨 Troubleshooting

### Bot tidak muncul di website

**Solusi:**
1. Check browser console untuk errors
2. Pastikan credentials benar (Bot ID, Client ID, Webhook ID)
3. Pastikan bot sudah di-publish di Botpress Studio
4. Clear browser cache dan reload

### Bot tidak respond

**Solusi:**
1. Check Botpress Dashboard - bot status harus "Published"
2. Re-train AI model di Studio
3. Check flow logic - pastikan ada connection antar nodes
4. Review Logs di Botpress untuk error messages

### Bot respond lambat

**Solusi:**
1. Optimize flow - reduce unnecessary nodes
2. Check Botpress service status
3. Consider upgrading plan untuk better performance

### Credentials tidak ketemu

**Solusi:**
1. Login ke Botpress Dashboard
2. Pilih bot → Settings → Channels → Web Chat
3. Copy credentials dari sana

---

## 📚 Resources

- **Botpress Documentation**: https://botpress.com/docs
- **Botpress Community**: https://discord.gg/botpress
- **Video Tutorials**: https://youtube.com/@botpress
- **Templates Library**: https://botpress.com/templates

---

## 🎓 Next Steps

Setelah chatbot live:

1. ✅ Monitor conversations selama 1 minggu
2. ✅ Collect feedback dari users
3. ✅ Update FAQ berdasarkan pertanyaan real
4. ✅ Add advanced features:
   - Appointment booking
   - Lead qualification
   - Email integration
5. ✅ Scale to other channels (WhatsApp, Telegram, Facebook Messenger)

---

## 📞 Need Help?

Jika ada kesulitan dalam setup:

1. Check Botpress docs dulu
2. Join Botpress Discord community
3. Contact Natah Genesis support via WhatsApp

---

**Happy Building! 🚀**

*Last updated: December 21, 2025*

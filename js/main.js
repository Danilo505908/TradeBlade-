/**
 * TradeBlade - Main JavaScript
 * Організований та оптимізований код
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Smooth scroll to element with offset
 */
function scrollToElement(selector, offset = 68) {
    const target = document.querySelector(selector);
    if (target) {
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Close modal helper
 */
function closeModal(modal, form = null) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (form) form.reset();
    }
}

/**
 * Open modal helper
 */
function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// ============================================
// MOBILE MENU
// ============================================

(function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenuModal = document.getElementById('mobileMenuModal');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = mobileMenuModal?.querySelectorAll('.mobile-menu-link');
    const btnMobileRegister = document.querySelector('.btn-mobile-register');
    const btnMobileLogin = document.querySelector('.btn-mobile-login');
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');

    // Open mobile menu
    if (hamburger && mobileMenuModal) {
        hamburger.addEventListener('click', () => {
            openModal(mobileMenuModal);
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            closeModal(mobileMenuModal);
        });
    }

    // Close menu when clicking on links
    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href?.startsWith('#')) {
                    closeModal(mobileMenuModal);
                    setTimeout(() => scrollToElement(href), 300);
                } else {
                    closeModal(mobileMenuModal);
                }
            });
        });
    }

    // Close menu when clicking outside
    if (mobileMenuModal) {
        mobileMenuModal.addEventListener('click', (e) => {
            if (e.target === mobileMenuModal) {
                closeModal(mobileMenuModal);
            }
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuModal?.classList.contains('active')) {
            closeModal(mobileMenuModal);
        }
    });

    // Mobile menu action buttons
    if (btnMobileRegister && registerModal) {
        btnMobileRegister.addEventListener('click', () => {
            closeModal(mobileMenuModal);
            setTimeout(() => openModal(registerModal), 300);
        });
    }

    if (btnMobileLogin && loginModal) {
        btnMobileLogin.addEventListener('click', () => {
            closeModal(mobileMenuModal);
            setTimeout(() => openModal(loginModal), 300);
        });
    }
})();

// ============================================
// SMOOTH SCROLLING
// ============================================

(function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                scrollToElement(href);
            }
        });
    });
})();

// ============================================
// HEADER SCROLL EFFECT
// ============================================

(function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        header.style.boxShadow = currentScroll > 100 
            ? '0 4px 16px rgba(0, 0, 0, 0.5)' 
            : 'none';
    });
})();

// ============================================
// FORM HANDLERS
// ============================================

(function initFormHandlers() {
    // Email forms
    const emailForms = document.querySelectorAll('.form-field');
    emailForms.forEach(form => {
        const emailInput = form.querySelector('.email-input');
        const submitBtn = form.querySelector('.btn-form, .btn-start');
        
        if (emailInput && submitBtn) {
            const handleSubmit = (e) => {
                e.preventDefault();
                const email = emailInput.value.trim();
                
                if (email && isValidEmail(email)) {
                    console.log('Email submitted:', email);
                    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                    emailInput.value = '';
                } else {
                    alert('Пожалуйста, введите корректный email адрес.');
                }
            };

            submitBtn.addEventListener('click', handleSubmit);
            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSubmit(e);
                }
            });
        }
    });

    // CTA form
    const ctaEmailInput = document.querySelector('.cta-email-input');
    const ctaBtn = document.querySelector('.cta-btn');
    
    if (ctaEmailInput && ctaBtn) {
        const handleCTASubmit = (e) => {
            e.preventDefault();
            const email = ctaEmailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                console.log('CTA Email submitted:', email);
                alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                ctaEmailInput.value = '';
            } else {
                alert('Пожалуйста, введите корректный email адрес.');
            }
        };

        ctaBtn.addEventListener('click', handleCTASubmit);
        ctaEmailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleCTASubmit(e);
            }
        });
    }

    // Try Free buttons
    const tryFreeButtons = document.querySelectorAll('.btn-try-free, .btn-try');
    const registerModal = document.getElementById('registerModal');
    
    tryFreeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const formField = button.closest('.form-field') || 
                           button.closest('.try-free-form')?.querySelector('.form-field');
            const emailInput = formField?.querySelector('.email-input');
            
            if (emailInput) {
                const email = emailInput.value.trim();
                
                if (email && isValidEmail(email)) {
                    console.log('Try Free submitted:', email);
                    alert('Спасибо! Вы получили 5 дней бесплатного пользования. Мы отправили подтверждение на ' + email);
                    emailInput.value = '';
                } else {
                    alert('Пожалуйста, введите корректный email адрес.');
                    emailInput.focus();
                }
            } else if (registerModal) {
                openModal(registerModal);
            }
        });
    });
})();

// ============================================
// MODAL FUNCTIONALITY
// ============================================

(function initModals() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const purchaseModal = document.getElementById('purchaseModal');
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    const loginModalClose = document.getElementById('loginModalClose');
    const registerModalClose = document.getElementById('registerModalClose');
    const modalClose = document.getElementById('modalClose');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    // Open modals
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal);
        });
    }

    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(registerModal);
        });
    }

    // Close modals
    if (loginModalClose && loginModal) {
        loginModalClose.addEventListener('click', () => {
            closeModal(loginModal, loginForm);
        });
    }

    if (registerModalClose && registerModal) {
        registerModalClose.addEventListener('click', () => {
            closeModal(registerModal, registerForm);
        });
    }

    if (modalClose && purchaseModal) {
        modalClose.addEventListener('click', () => {
            closeModal(purchaseModal);
        });
    }

    // Close modals when clicking outside
    [loginModal, registerModal, purchaseModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    const form = modal.querySelector('form');
                    closeModal(modal, form);
                }
            });
        }
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (loginModal?.classList.contains('active')) {
                closeModal(loginModal, loginForm);
            }
            if (registerModal?.classList.contains('active')) {
                closeModal(registerModal, registerForm);
            }
            if (purchaseModal?.classList.contains('active')) {
                closeModal(purchaseModal);
            }
        }
    });

    // Switch between login and register modals
    if (switchToRegister && loginModal && registerModal) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal, loginForm);
            setTimeout(() => openModal(registerModal), 300);
        });
    }

    if (switchToLogin && registerModal && loginModal) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(registerModal, registerForm);
            setTimeout(() => openModal(loginModal), 300);
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (email && isValidEmail(email) && password) {
                console.log('Login submitted:', { email });
                alert('Вход выполнен успешно! Добро пожаловать в TradeBlade.');
                closeModal(loginModal, loginForm);
            } else {
                alert('Пожалуйста, заполните все поля корректно.');
            }
        });
    }

    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

            if (!email || !isValidEmail(email)) {
                alert('Пожалуйста, введите корректный email адрес.');
                return;
            }

            if (!password || password.length < 6) {
                alert('Пароль должен содержать минимум 6 символов.');
                return;
            }

            if (password !== passwordConfirm) {
                alert('Пароли не совпадают.');
                return;
            }

            console.log('Register submitted:', { email });
            alert('Регистрация выполнена успешно! Добро пожаловать в TradeBlade.');
            closeModal(registerModal, registerForm);
        });
    }
})();

// ============================================
// ANIMATIONS
// ============================================

(function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.addEventListener('DOMContentLoaded', () => {
        const animateElements = document.querySelectorAll('.feature-card, .step-card, .stat-item');
        animateElements.forEach(el => observer.observe(el));
    });

    // Number counter animation for stats
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (end > 1000) {
                element.textContent = value.toLocaleString();
            } else {
                element.textContent = value + (end.toString().includes('%') ? '%' : '');
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end.toString().includes('%') ? end : end.toLocaleString();
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animate stats when they come into view
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue) {
                    const text = statValue.textContent.trim();
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    if (number) {
                        statValue.textContent = '0';
                        setTimeout(() => {
                            animateValue(statValue, 0, number, 2000);
                        }, 200);
                    }
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => {
        statObserver.observe(item);
    });
})();

// ============================================
// SWIPER - DEALS SECTION
// ============================================

(function initSwiper() {
    let dealsSwiperInstance = null;

    // Update mobile SVG scrollbar position
    function updateMobileScrollbar(swiper) {
        const mobileScrollbar = document.querySelector('.deals-swiper-scrollbar-mobile');
        if (!mobileScrollbar) return;
        
        const scrollbarRect = mobileScrollbar.querySelector('rect:nth-child(2)');
        if (!scrollbarRect) return;
        
        const scrollbarWidth = 311;
        const thumbWidth = 61.656;
        const maxPosition = scrollbarWidth - thumbWidth;
        const progress = swiper.progress;
        const position = progress * maxPosition;
        
        scrollbarRect.setAttribute('x', position);
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Initialize Swiper
        dealsSwiperInstance = new Swiper('.deals-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: false,
            },
            breakpoints: {
                320: { slidesPerView: 1.2 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3.5 },
                1440: { slidesPerView: 'auto' }
            },
            on: {
                progress: updateMobileScrollbar,
                slideChangeTransitionEnd: updateMobileScrollbar,
                touchEnd: updateMobileScrollbar
            }
        });
        
        // Mobile scrollbar click handler
        const mobileScrollbar = document.querySelector('.deals-swiper-scrollbar-mobile');
        if (mobileScrollbar && dealsSwiperInstance) {
            mobileScrollbar.addEventListener('click', (e) => {
                const rect = mobileScrollbar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const scrollbarWidth = 311;
                const progress = Math.max(0, Math.min(1, clickX / scrollbarWidth));
                const maxTranslate = dealsSwiperInstance.maxTranslate();
                const targetTranslate = -progress * maxTranslate;
                
                dealsSwiperInstance.setTranslate(targetTranslate);
                dealsSwiperInstance.updateProgress();
                dealsSwiperInstance.updateSlidesClasses();
                updateMobileScrollbar(dealsSwiperInstance);
            });
        }
    });
})();

// ============================================
// CRYPTO PRICES - BINANCE API
// ============================================

(function initCryptoPrices() {
    // Fetch cryptocurrency price from Binance API
    async function fetchCryptoPrice(symbol) {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
            const data = await response.json();
            return {
                price: parseFloat(data.lastPrice),
                priceChangePercent: parseFloat(data.priceChangePercent),
                high24h: parseFloat(data.highPrice),
                low24h: parseFloat(data.lowPrice)
            };
        } catch (error) {
            console.error(`Error fetching ${symbol}:`, error);
            return null;
        }
    }

    // Update deal cards with real-time prices
    async function updateDealCards() {
        const dealCards = document.querySelectorAll('.deal-card[data-pair]');
        
        for (const card of dealCards) {
            const pair = card.getAttribute('data-pair');
            const profitValueElement = card.querySelector('.profit-value');
            
            if (profitValueElement && pair) {
                try {
                    const priceData = await fetchCryptoPrice(pair);
                    
                    if (priceData) {
                        const formattedPercent = priceData.priceChangePercent.toFixed(4);
                        const sign = priceData.priceChangePercent >= 0 ? '+' : '';
                        
                        profitValueElement.textContent = `${sign}${formattedPercent}%`;
                        
                        // Update arrow direction and color
                        const arrowImg = card.querySelector('.profit-arrow');
                        if (arrowImg) {
                            if (priceData.priceChangePercent < 0) {
                                arrowImg.style.transform = 'rotate(180deg)';
                                arrowImg.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)';
                                profitValueElement.style.color = '#FF4444';
                            } else {
                                arrowImg.style.transform = 'rotate(0deg)';
                                arrowImg.style.filter = 'none';
                                profitValueElement.style.color = '#35FF9E';
                            }
                        }
                    }
                } catch (error) {
                    console.error(`Error updating card for ${pair}:`, error);
                }
            }
        }
    }

    // Update prices on load and every 30 seconds
    document.addEventListener('DOMContentLoaded', () => {
        updateDealCards();
        setInterval(updateDealCards, 30000);
    });
})();

// ============================================
// TARIFFS MODAL
// ============================================

(function initTariffsModal() {
    const basePrices = {
        standart: { 12: 234, 6: 150, 3: 90, 1: 35 },
        vip: { 12: 585, 6: 350, 3: 200, 1: 75 }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const purchaseModal = document.getElementById('purchaseModal');
        const modalClose = document.getElementById('modalClose');
        const tariffButtons = document.querySelectorAll('.tariff-btn');
        const modalPlanName = document.getElementById('modalPlanName');
        const modalPlanPrice = document.getElementById('modalPlanPrice');
        const modalTotalPrice = document.getElementById('modalTotalPrice');
        const modalPeriod = document.getElementById('modalPeriod');
        const purchaseForm = document.getElementById('purchaseForm');
        const tariffPeriodSelects = document.querySelectorAll('.tariff-period-select');
        const tariffTabs = document.querySelectorAll('.tariff-tab');

        if (!purchaseModal) return;

        // Open modal when clicking tariff button
        tariffButtons.forEach(button => {
            button.addEventListener('click', () => {
                const plan = button.getAttribute('data-plan');
                const price = parseInt(button.getAttribute('data-price'));
                const selectedPeriod = button.closest('.tariff-card')?.querySelector('.tariff-period-select')?.value;
                
                if (modalPlanName) modalPlanName.textContent = plan.toUpperCase();
                if (modalPlanPrice) modalPlanPrice.textContent = `$${price}`;
                if (modalTotalPrice) modalTotalPrice.textContent = `$${price}`;
                if (modalPeriod && selectedPeriod) modalPeriod.value = selectedPeriod;
                
                purchaseModal.setAttribute('data-plan', plan);
                purchaseModal.setAttribute('data-base-price', price);
                
                openModal(purchaseModal);
            });
        });

        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                closeModal(purchaseModal);
            });
        }

        purchaseModal.addEventListener('click', (e) => {
            if (e.target === purchaseModal) {
                closeModal(purchaseModal);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && purchaseModal.classList.contains('active')) {
                closeModal(purchaseModal);
            }
        });

        // Update price when period changes in modal
        if (modalPeriod) {
            modalPeriod.addEventListener('change', () => {
                const plan = purchaseModal.getAttribute('data-plan');
                const period = parseInt(modalPeriod.value);
                
                if (plan && basePrices[plan] && basePrices[plan][period]) {
                    const newPrice = basePrices[plan][period];
                    if (modalPlanPrice) modalPlanPrice.textContent = `$${newPrice}`;
                    if (modalTotalPrice) modalTotalPrice.textContent = `$${newPrice}`;
                }
            });
        }

        // Update price when period changes in tariff cards
        tariffPeriodSelects.forEach(select => {
            select.addEventListener('change', () => {
                const card = select.closest('.tariff-card');
                const plan = card?.classList.contains('tariff-card-standart') ? 'standart' : 'vip';
                const period = parseInt(select.value);
                const priceElement = card?.querySelector('.tariff-price');
                
                if (basePrices[plan] && basePrices[plan][period] && priceElement) {
                    const newPrice = basePrices[plan][period];
                    priceElement.textContent = `$${newPrice}`;
                    
                    const button = card.querySelector('.tariff-btn');
                    if (button) {
                        button.setAttribute('data-price', newPrice);
                    }
                }
            });
        });

        // Handle form submission
        if (purchaseForm) {
            purchaseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('modalEmail')?.value;
                const period = modalPeriod?.value;
                const plan = purchaseModal.getAttribute('data-plan');
                const price = modalTotalPrice?.textContent;
                
                if (email && isValidEmail(email)) {
                    console.log('Purchase submitted:', { email, plan, period, price });
                    alert(`Спасибо! Подписка на тариф ${plan.toUpperCase()} оформлена. Мы отправили подтверждение на ${email}`);
                    purchaseForm.reset();
                    closeModal(purchaseModal);
                } else {
                    alert('Пожалуйста, введите корректный email адрес.');
                }
            });
        }

        // Tab switching
        tariffTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tariffTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    });
})();

// ============================================
// FAQ ACCORDION
// ============================================

(function initFAQ() {
    document.addEventListener('DOMContentLoaded', () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            
            if (header) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });
                    
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
})();

// ============================================
// REVIEWS - LOAD MORE
// ============================================

(function initReviews() {
    document.addEventListener('DOMContentLoaded', () => {
        const loadMoreBtn = document.querySelector('.btn-load-more');
        const reviewsGrid = document.querySelector('.reviews-grid');
        
        if (!reviewsGrid || !loadMoreBtn) return;
        
        const originalReviews = [];
        const reviewCards = reviewsGrid.querySelectorAll('.review-card');
        reviewCards.forEach(card => {
            originalReviews.push(card.cloneNode(true));
        });
        
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const leftColumn = reviewsGrid.querySelector('.reviews-column-left');
            const rightColumn = reviewsGrid.querySelector('.reviews-column-right');
            
            if (!leftColumn || !rightColumn) return;
            
            const leftCards = leftColumn.querySelectorAll('.review-card').length;
            const rightCards = rightColumn.querySelectorAll('.review-card').length;
            const targetColumn = leftCards <= rightCards ? leftColumn : rightColumn;
            
            originalReviews.forEach((reviewClone, index) => {
                const newReview = reviewClone.cloneNode(true);
                setTimeout(() => {
                    targetColumn.appendChild(newReview);
                    newReview.style.opacity = '0';
                    newReview.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        newReview.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        newReview.style.opacity = '1';
                        newReview.style.transform = 'translateY(0)';
                    }, 10);
                }, index * 100);
            });
            
            setTimeout(() => {
                const newReviews = targetColumn.querySelectorAll('.review-card');
                if (newReviews.length > 0) {
                    newReviews[newReviews.length - 1].scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, originalReviews.length * 100 + 100);
        });
    });
})();

// ============================================
// IMAGE ERROR HANDLING
// ============================================

(function initImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.error('Image failed to load:', this.src);
            this.style.display = 'none';
        });
    });
})();

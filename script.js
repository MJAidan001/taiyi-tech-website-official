// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMarketChart();
    initScrollProgress();
    initProductCards();
    initProductGallery();
    initProductButtons();
    initBackToTop();
    initScrollAnimations();
    initSmoothScroll();
    initMobileMenu();
    initFormValidation();
    initImageLazyLoading();
    initTypingEffect();
    
    // 用户登录状态管理
    initUserAuth();
    
    // 产品功能初始化
    initProductClickHandlers();
    initViewAllProductsButton();
    initProductCategoryFilter();
    initProductHoverEffects();
    
    // 产品详情页特定功能
    if (window.location.pathname.includes('product-detail')) {
        initProductImageGallery();
        initQuantitySelector();
        initAddToCart();
        initProductDetailPage();
    }
    
    // 结算页功能
    if (window.location.pathname.includes('checkout')) {
        initCheckoutPage();
    }
    
    // 订单页面功能
    if (window.location.pathname.includes('orders')) {
        initOrdersPage();
    }
    
    // 个人中心功能
    if (window.location.pathname.includes('profile')) {
        // 检查登录状态
        if (!isUserLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }
        initProfilePage();
    }
    
    // 其他功能
    updateCartIcon();
    initProductSearch();
    initProductSort();
    
    // 页面加载完成后移除加载屏幕
    window.addEventListener('load', function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });
});

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (isLoggedIn && username) {
        document.getElementById('userNotLoggedIn').classList.add('hidden');
        document.getElementById('userLoggedIn').classList.remove('hidden');
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = username;
        }
    }
}

// 初始化滚动进度条
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

// 初始化回到顶部按钮
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有带有 fade-in 类的元素
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// 初始化移动端菜单
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // 动画效果
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
    }
}

// 初始化产品筛选
function initProductFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的 active 类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的 active 类
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // 筛选产品
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category.includes(category)) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 初始化平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 初始化粒子效果
function initParticleEffect() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // 创建更多粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// 初始化导航栏效果
function initNavbarEffects() {
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
                navbar.style.backdropFilter = 'blur(12px)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// 初始化折线图
function initMarketChart() {
    const ctx = document.getElementById('marketChart');
    if (!ctx || typeof Chart === 'undefined') return;

    // 创建渐变背景
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
            datasets: [{
                label: '情感计算市场规模（亿美元）',
                data: [100, 150, 220, 300, 400, 520, 686.86],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: gradient,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgb(139, 92, 246)',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    borderWidth: 2,
                    padding: 16,
                    displayColors: false,
                    cornerRadius: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return `市场规模: ${context.parsed.y}亿美元`;
                        },
                        afterLabel: function(context) {
                            const growth = context.dataIndex > 0 ? 
                                ((context.parsed.y - context.dataset.data[context.dataIndex - 1]) / context.dataset.data[context.dataIndex - 1] * 100).toFixed(1) : 0;
                            return context.dataIndex > 0 ? `增长率: +${growth}%` : '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9CA3AF',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        },
                        callback: function(value) {
                            return value + '亿';
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9CA3AF',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12,
                            weight: '500'
                        },
                        padding: 10
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 产品卡片点击事件
document.addEventListener('click', function(e) {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
        const productId = productCard.dataset.productId;
        // 这里可以添加产品详情页面的逻辑
        console.log('Product clicked:', productId);
        
        // 添加点击动画效果
        productCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            productCard.style.transform = '';
        }, 150);
    }
});

// 退出登录
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.reload();
}

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 打字机效果
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        setTimeout(() => {
            typingText.style.borderRight = 'none';
        }, 4000);
    }
});

// 鼠标跟随效果（可选）
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    // 更新浮动元素位置
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        const speed = (index + 1) * 0.0002;
        const x = Math.sin(Date.now() * speed) * 20;
        const y = Math.cos(Date.now() * speed) * 15;
        icon.style.transform = `translate(${x}px, ${y}px) rotate(${Math.sin(Date.now() * speed) * 5}deg)`;
    });
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform += ` translateY(${scrolled * speed * 0.1}px)`;
    });
});

// 添加音效（可选，需要音频文件）
function playClickSound() {
    // const audio = new Audio('/sounds/click.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(() => {});
}

// 为按钮添加点击音效
document.querySelectorAll('button, .hero-btn, .product-btn').forEach(btn => {
    btn.addEventListener('click', playClickSound);
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(() => {
    // 滚动相关逻辑
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // 关闭移动端菜单
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// 预加载关键图片
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// 页面加载完成后预加载图片
window.addEventListener('load', preloadImages);

// 产品卡片动画
function initProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
    });

    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.product-btn')) {
                return;
            }
            
            const productId = card.dataset.productId;
            if (productId) {
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });
}

// 产品图片展示
function initProductGallery() {
    const gallery = document.querySelector('.product-gallery');
    if (gallery) {
        gallery.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                showImageModal(e.target.src);
            }
        });
    }
}

// 产品按钮功能
function initProductButtons() {
    // 立即购买按钮
    const buyNowButtons = document.querySelectorAll('.btn-buy-now');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 获取产品信息
            const productCard = this.closest('.product-card') || this.closest('.hero-section');
            let productName = '本源核';
            let productPrice = '12.00';
            let productColor = '蓝色';
            
            if (productCard) {
                const nameElement = productCard.querySelector('.product-name, h1');
                const priceElement = productCard.querySelector('.product-price, .price-amount');
                const colorElement = productCard.querySelector('.product-color, .selected-color');
                
                if (nameElement) productName = nameElement.textContent.trim();
                if (priceElement) productPrice = priceElement.textContent.replace('¥', '').trim();
                if (colorElement) productColor = colorElement.textContent.trim();
            }
            
            // 跳转到结算页面
            window.location.href = `checkout.html?product=${encodeURIComponent(productName)}&price=${productPrice}&color=${encodeURIComponent(productColor)}`;
        });
    });
    
    // 加入购物车按钮
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            let productName = '本源核';
            let quantity = 1;
            let color = '蓝色';
            
            if (productCard) {
                const nameElement = productCard.querySelector('.product-name');
                const quantityElement = productCard.querySelector('.quantity-value');
                const colorElement = productCard.querySelector('.selected-color');
                
                if (nameElement) productName = nameElement.textContent.trim();
                if (quantityElement) quantity = parseInt(quantityElement.textContent);
                if (colorElement) color = colorElement.textContent.trim();
            }
            
            addToCart(productName, quantity, color);
            showNotification(`${productName} 已加入购物车`, 'success');
        });
    });
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                showNotification('请检查表单信息', 'error');
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            input.classList.add('error');
            isValid = false;
        }
    });
    
    return isValid;
}

// 图片懒加载
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 打字机效果
function initTypingEffect() {
    const typeWriter = () => {
        const textElement = document.querySelector('.typing-text');
        if (!textElement) return;
        
        const text = textElement.dataset.text || textElement.textContent;
        textElement.textContent = '';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    };
    
    setTimeout(typeWriter, 1000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 产品详情页功能
function initProductDetailPage() {
    initImageGallery();
    initColorSelector();
    initQuantitySelector();
    initPurchaseButtons();
    initFavorites();
}

function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const newSrc = thumbnail.src;
            if (mainImage) {
                mainImage.src = newSrc;
            }
            
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
}

function initColorSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorDisplay = document.getElementById('selectedColor');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            const colorName = getColorName(color);
            
            colorOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            
            if (selectedColorDisplay) {
                selectedColorDisplay.textContent = colorName;
            }
            
            updateProductImageByColor(color);
        });
    });
}

function updateProductImageByColor(color) {
    const mainImage = document.getElementById('mainImage');
    const colorImages = {
        'blue': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
        'black': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        'white': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
        'red': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    };
    
    if (mainImage && colorImages[color]) {
        mainImage.src = colorImages[color];
    }
}

function initQuantitySelector() {
    const quantityDisplay = document.getElementById('quantityValue');
    const increaseBtn = document.getElementById('increaseQuantity');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    
    let quantity = 1;
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            quantity++;
            if (quantityDisplay) {
                quantityDisplay.textContent = quantity;
            }
            updateTotalPrice();
        });
    }
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                if (quantityDisplay) {
                    quantityDisplay.textContent = quantity;
                }
                updateTotalPrice();
            }
        });
    }
}

function updateTotalPrice() {
    const basePrice = 12.00;
    const quantity = parseInt(document.getElementById('quantityValue')?.textContent || '1');
    const totalPrice = (basePrice * quantity).toFixed(2);
    
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice;
    }
}

function initPurchaseButtons() {
    const buyNowBtn = document.getElementById('buyNowBtn');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const productName = document.querySelector('.product-name')?.textContent || '本源核';
            const quantity = parseInt(document.getElementById('quantityValue')?.textContent || '1');
            const color = document.getElementById('selectedColor')?.textContent || '蓝色';
            const price = document.getElementById('totalPrice')?.textContent || '12.00';
            
            window.location.href = `checkout.html?product=${encodeURIComponent(productName)}&quantity=${quantity}&color=${encodeURIComponent(color)}&price=${price}`;
        });
    }
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const productName = document.querySelector('.product-name')?.textContent || '本源核';
            const quantity = parseInt(document.getElementById('quantityValue')?.textContent || '1');
            const color = document.getElementById('selectedColor')?.textContent || '蓝色';
            
            addToCart(productName, quantity, color);
            showNotification(`${productName} 已加入购物车`, 'success');
        });
    }
}

function addToCart(productName, quantity, color) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => 
        item.name === productName && item.color === color
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: Date.now(),
            name: productName,
            quantity: quantity,
            color: color,
            price: 12.00,
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=150&q=80'
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function initFavorites() {
    const favoriteBtn = document.getElementById('favoriteBtn');
    
    if (favoriteBtn) {
        const productId = new URLSearchParams(window.location.search).get('id') || 'default';
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorited = favorites.includes(productId);
        
        updateFavoriteButton(favoriteBtn, isFavorited);
        
        favoriteBtn.addEventListener('click', () => {
            const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const isCurrentlyFavorited = currentFavorites.includes(productId);
            
            if (isCurrentlyFavorited) {
                const index = currentFavorites.indexOf(productId);
                currentFavorites.splice(index, 1);
                showNotification('已取消收藏', 'info');
            } else {
                currentFavorites.push(productId);
                showNotification('已添加到收藏', 'success');
            }
            
            localStorage.setItem('favorites', JSON.stringify(currentFavorites));
            updateFavoriteButton(favoriteBtn, !isCurrentlyFavorited);
        });
    }
}

function updateFavoriteButton(button, isFavorited) {
    const icon = button.querySelector('i');
    if (isFavorited) {
        icon.className = 'fas fa-heart';
        button.style.color = '#ef4444';
    } else {
        icon.className = 'far fa-heart';
        button.style.color = '#9ca3af';
    }
}

function getColorName(color) {
    const colorNames = {
        'blue': '蓝色',
        'black': '黑色',
        'white': '白色',
        'red': '红色',
        'green': '绿色',
        'yellow': '黄色',
        'purple': '紫色'
    };
    return colorNames[color] || color;
}

// 产品搜索功能
function initProductSearch() {
    const searchInput = document.getElementById('productSearch');
    const productCards = document.querySelectorAll('.product-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
                const productDesc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// 产品排序功能
function initProductSort() {
    const sortSelect = document.getElementById('productSort');
    const productContainer = document.querySelector('.product-grid');
    
    if (sortSelect && productContainer) {
        sortSelect.addEventListener('change', (e) => {
            const sortType = e.target.value;
            const productCards = Array.from(productContainer.querySelectorAll('.product-card'));
            
            productCards.sort((a, b) => {
                switch (sortType) {
                    case 'price-low':
                        return getProductPrice(a) - getProductPrice(b);
                    case 'price-high':
                        return getProductPrice(b) - getProductPrice(a);
                    case 'name':
                        return getProductName(a).localeCompare(getProductName(b));
                    default:
                        return 0;
                }
            });
            
            productCards.forEach(card => productContainer.appendChild(card));
        });
    }
}

function getProductPrice(card) {
    const priceText = card.querySelector('.product-price')?.textContent || '0';
    return parseFloat(priceText.replace('¥', '').replace(',', ''));
}

function getProductName(card) {
    return card.querySelector('.product-name')?.textContent || '';
}

// 用户认证状态管理
function initUserAuth() {
    const userNotLoggedIn = document.getElementById('userNotLoggedIn');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // 检查登录状态
    if (isUserLoggedIn()) {
        const username = getCurrentUserName();
        if (userLoggedIn) {
            userLoggedIn.style.display = 'flex';
            const usernameSpan = userLoggedIn.querySelector('.username');
            if (usernameSpan) {
                usernameSpan.textContent = username;
            }
        }
        if (userNotLoggedIn) {
            userNotLoggedIn.style.display = 'none';
        }
    } else {
        if (userLoggedIn) {
            userLoggedIn.style.display = 'none';
        }
        if (userNotLoggedIn) {
            userNotLoggedIn.style.display = 'flex';
        }
    }
    
    // 登录表单处理
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // 简单验证（实际项目中需要后端验证）
            if (username && password) {
                handleLoginSuccess(username, rememberMe);
                showNotification('登录成功！', 'success');
                
                // 重定向到首页或之前的页面
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showNotification('请输入用户名和密码', 'error');
            }
        });
    }
    
    // 退出登录
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function handleLogout(e) {
    e.preventDefault();
    
    // 清除登录状态
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userName');
    
    // 更新UI
    const userNotLoggedIn = document.getElementById('userNotLoggedIn');
    const userLoggedIn = document.getElementById('userLoggedIn');
    
    if (userLoggedIn) {
        userLoggedIn.style.display = 'none';
    }
    if (userNotLoggedIn) {
        userNotLoggedIn.style.display = 'flex';
    }
    
    showNotification('已退出登录', 'info');
    
    // 重定向到首页
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function handleLoginSuccess(username, rememberMe = false) {
    const token = 'user_token_' + Date.now();
    
    if (rememberMe) {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userName', username);
    } else {
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('userName', username);
    }
    
    // 更新UI
    const userNotLoggedIn = document.getElementById('userNotLoggedIn');
    const userLoggedIn = document.getElementById('userLoggedIn');
    
    if (userLoggedIn) {
        userLoggedIn.style.display = 'flex';
        const usernameSpan = userLoggedIn.querySelector('.username');
        if (usernameSpan) {
            usernameSpan.textContent = username;
        }
    }
    if (userNotLoggedIn) {
        userNotLoggedIn.style.display = 'none';
    }
}

function isUserLoggedIn() {
    return !!(localStorage.getItem('userToken') || sessionStorage.getItem('userToken'));
}

function getCurrentUserName() {
    return localStorage.getItem('userName') || sessionStorage.getItem('userName') || '用户';
}

// 产品点击处理
function initProductClickHandlers() {
    // 为产品卡片添加点击事件
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是按钮，不触发跳转
            if (e.target.closest('button') || e.target.closest('.btn')) {
                return;
            }
            
            // 跳转到产品详情页
            const productId = this.dataset.productId || 'default';
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}

function initViewAllProductsButton() {
    const viewAllBtn = document.getElementById('viewAllProducts');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }
}

// 产品悬停效果
function initProductHoverEffects() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 产品分类筛选
function initProductCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新按钮状态
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选产品
            productCards.forEach(card => {
                const cardCategory = card.dataset.category || 'all';
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 结算页面功能
function initCheckoutPage() {
    // 地址选择
    const addressItems = document.querySelectorAll('.address-item');
    addressItems.forEach(item => {
        item.addEventListener('click', function() {
            addressItems.forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 配送方式选择
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateOrderTotal);
    });
    
    // 从URL参数获取产品信息
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product') || '本源核';
    const productPrice = urlParams.get('price') || '12.00';
    const productColor = urlParams.get('color') || '蓝色';
    const productQuantity = urlParams.get('quantity') || '1';
    
    // 更新页面内容
    updateCheckoutProductInfo(productName, productPrice, productColor, productQuantity);
    updateOrderTotal();
    
    // 提交订单
    const submitOrderBtn = document.getElementById('submitOrder');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', function() {
            if (validateCheckoutForm()) {
                processOrder();
            }
        });
    }
}

function updateCheckoutProductInfo(name, price, color, quantity) {
    const productNameEl = document.getElementById('productName');
    const productPriceEl = document.getElementById('productPrice');
    const productColorEl = document.getElementById('productColor');
    const productQuantityEl = document.getElementById('productQuantity');
    
    if (productNameEl) productNameEl.textContent = name;
    if (productPriceEl) productPriceEl.textContent = price;
    if (productColorEl) productColorEl.textContent = color;
    if (productQuantityEl) productQuantityEl.textContent = quantity;
}

function updateOrderTotal() {
    const productPrice = parseFloat(document.getElementById('productPrice')?.textContent || '12.00');
    const productQuantity = parseInt(document.getElementById('productQuantity')?.textContent || '1');
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    const shippingCost = selectedShipping?.value === 'standard' ? 6.00 : 0.00;
    
    const subtotal = productPrice * productQuantity;
    const total = subtotal + shippingCost;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shippingCost');
    const totalEl = document.getElementById('orderTotal');
    
    if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
    if (shippingEl) shippingEl.textContent = shippingCost === 0 ? '免费' : `¥${shippingCost.toFixed(2)}`;
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

function validateCheckoutForm() {
    const selectedAddress = document.querySelector('.address-item.active');
    if (!selectedAddress) {
        showNotification('请选择收货地址', 'error');
        return false;
    }
    
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (!selectedShipping) {
        showNotification('请选择配送方式', 'error');
        return false;
    }
    
    return true;
}

function processOrder() {
    // 显示处理中状态
    const submitBtn = document.getElementById('submitOrder');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>处理中...';
    }
    
    // 模拟订单处理
    setTimeout(() => {
        const orderId = 'TY' + Date.now();
        
        // 保存订单信息
        const orderData = {
            id: orderId,
            date: new Date().toISOString(),
            status: 'paid',
            products: [{
                name: document.getElementById('productName')?.textContent || '本源核',
                price: document.getElementById('productPrice')?.textContent || '12.00',
                quantity: document.getElementById('productQuantity')?.textContent || '1',
                color: document.getElementById('productColor')?.textContent || '蓝色'
            }],
            total: document.getElementById('orderTotal')?.textContent || '12.00'
        };
        
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.unshift(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // 清空购物车中的相关商品
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== orderData.products[0].name);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
        
        // 跳转到成功页面
        window.location.href = `order-success.html?orderId=${orderId}`;
    }, 2000);
}

// 订单页面功能
function initOrdersPage() {
    loadOrders();
    
    // 订单状态筛选
    const statusFilters = document.querySelectorAll('.order-status-filter');
    statusFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const status = this.dataset.status;
            filterOrdersByStatus(status);
            
            statusFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.getElementById('ordersList');
    
    if (!ordersList) return;
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-shopping-bag text-6xl text-gray-400 mb-4"></i>
                <p class="text-gray-400 text-lg">暂无订单</p>
                <a href="products.html" class="btn-primary mt-4 inline-block">去购物</a>
            </div>
        `;
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-item" data-status="${order.status}">
            <div class="order-header">
                <div>
                    <h4>订单号：${order.id}</h4>
                    <p>下单时间：${new Date(order.date).toLocaleString()}</p>
                </div>
                <div class="order-status status-${order.status}">
                    ${getOrderStatusText(order.status)}
                </div>
            </div>
            <div class="order-products">
                ${order.products.map(product => `
                    <div class="order-product">
                        <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=80&q=80" alt="${product.name}">
                        <div class="product-info">
                            <h5>${product.name}</h5>
                            <p>颜色：${product.color} | 数量：${product.quantity}</p>
                        </div>
                        <div class="product-price">¥${product.price}</div>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <div class="order-total">总计：¥${order.total}</div>
                <div class="order-actions">
                    ${getOrderActions(order.status, order.id)}
                </div>
            </div>
        </div>
    `).join('');
}

function getOrderStatusText(status) {
    const statusMap = {
        'pending': '待付款',
        'paid': '已付款',
        'shipped': '已发货',
        'delivered': '已送达',
        'cancelled': '已取消'
    };
    return statusMap[status] || status;
}

function getOrderActions(status, orderId) {
    switch (status) {
        case 'pending':
            return `
                <button class="btn-primary" onclick="payOrder('${orderId}')">立即付款</button>
                <button class="btn-secondary" onclick="cancelOrder('${orderId}')">取消订单</button>
            `;
        case 'paid':
            return `<button class="btn-secondary" onclick="trackOrder('${orderId}')">查看物流</button>`;
        case 'shipped':
            return `
                <button class="btn-secondary" onclick="trackOrder('${orderId}')">查看物流</button>
                <button class="btn-primary" onclick="confirmDelivery('${orderId}')">确认收货</button>
            `;
        case 'delivered':
            return `<button class="btn-secondary" onclick="reviewOrder('${orderId}')">评价订单</button>`;
        default:
            return '';
    }
}

function filterOrdersByStatus(status) {
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach(item => {
        if (status === 'all' || item.dataset.status === status) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 个人中心页面相关函数
function loadUserInfo() {
    // 从localStorage获取用户信息
    const username = localStorage.getItem('userName') || '用户';
    const email = localStorage.getItem('userEmail') || '';
    
    // 更新页面上的用户信息显示
    const currentUserName = document.getElementById('currentUserName');
    const profileUserName = document.getElementById('profileUserName');
    const userEmail = document.getElementById('userEmail');
    
    if (currentUserName) currentUserName.textContent = username;
    if (profileUserName) profileUserName.textContent = username;
    if (userEmail) userEmail.textContent = email;
    
    // 加载用户详细信息
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    
    // 填充表单
    const fullName = document.getElementById('fullName');
    const phoneNumber = document.getElementById('phoneNumber');
    const emailAddress = document.getElementById('emailAddress');
    const birthday = document.getElementById('birthday');
    const gender = document.getElementById('gender');
    const biography = document.getElementById('biography');
    
    if (fullName) fullName.value = userProfile.fullName || '';
    if (phoneNumber) phoneNumber.value = userProfile.phoneNumber || '';
    if (emailAddress) emailAddress.value = userProfile.email || email;
    if (birthday) birthday.value = userProfile.birthday || '';
    if (gender) gender.value = userProfile.gender || '';
    if (biography) biography.value = userProfile.biography || '';
}

function initProfilePage() {
    // 加载用户信息
    loadUserInfo();
    
    // 初始化标签页切换
    initTabSwitching();
    
    // 初始化表单处理
    initFormHandlers();
    
    // 初始化退出登录
    initLogout();
    
    // 初始化地址管理
    initAddressManagement();
}

function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.profile-nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            button.classList.add('active');
            
            // 隐藏所有内容
            tabContents.forEach(content => content.classList.remove('active'));
            // 显示对应内容
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(`${tabId}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function initFormHandlers() {
    // 个人信息表单处理
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const userProfile = {
                fullName: document.getElementById('fullName').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                email: document.getElementById('emailAddress').value,
                birthday: document.getElementById('birthday').value,
                gender: document.getElementById('gender').value,
                biography: document.getElementById('biography').value
            };
            
            // 保存到localStorage
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            localStorage.setItem('userEmail', userProfile.email);
            
            // 更新显示
            loadUserInfo();
            
            // 显示成功提示
            showNotification('个人信息已更新', 'success');
        });
    }
    
    // 密码修改表单处理
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirmPassword) {
                showNotification('两次输入的密码不一致', 'error');
                return;
            }
            
            // 这里应该调用后端API进行密码修改
            // 目前仅做前端演示
            showNotification('密码修改成功', 'success');
            passwordForm.reset();
        });
    }
}

function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('确定要退出登录吗？')) {
                handleLogout(e);
            }
        });
    }
}

function initAddressManagement() {
    const addAddressBtn = document.getElementById('addAddressBtn');
    const addressModal = document.getElementById('addressModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const addressForm = document.getElementById('addressForm');
    
    // 加载地址列表
    loadAddressList();
    
    // 新增地址按钮点击事件
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            if (addressModal) {
                addressModal.classList.remove('hidden');
                addressModal.classList.add('flex');
                document.getElementById('modalTitle').textContent = '新增收货地址';
                addressForm.reset();
            }
        });
    }
    
    // 关闭模态框
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (addressModal) {
                addressModal.classList.add('hidden');
                addressModal.classList.remove('flex');
            }
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (addressModal) {
                addressModal.classList.add('hidden');
                addressModal.classList.remove('flex');
            }
        });
    }
    
    // 地址表单提交
    if (addressForm) {
        addressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const address = {
                recipientName: document.getElementById('recipientName').value,
                recipientPhone: document.getElementById('recipientPhone').value,
                province: document.getElementById('province').value,
                city: document.getElementById('city').value,
                district: document.getElementById('district').value,
                detailedAddress: document.getElementById('detailedAddress').value,
                recipientEmail: document.getElementById('recipientEmail').value,
                isDefault: document.getElementById('isDefault').checked
            };
            
            // 保存地址
            saveAddress(address);
            
            // 关闭模态框
            if (addressModal) {
                addressModal.classList.add('hidden');
                addressModal.classList.remove('flex');
            }
            
            // 重新加载地址列表
            loadAddressList();
            
            // 显示成功提示
            showNotification('地址保存成功', 'success');
        });
    }
}

function loadAddressList() {
    const addressList = document.getElementById('addressList');
    if (!addressList) return;
    
    // 从localStorage获取地址列表
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    
    if (addresses.length === 0) {
        addressList.innerHTML = `
            <div class="text-center py-8 text-gray-400">
                <i class="fas fa-map-marker-alt text-4xl mb-4"></i>
                <p>暂无收货地址</p>
            </div>
        `;
        return;
    }
    
    // 生成地址列表HTML
    addressList.innerHTML = addresses.map((address, index) => `
        <div class="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-semibold text-white">${address.recipientName}</h3>
                    <p class="text-gray-400">${address.recipientPhone}</p>
                </div>
                <div class="flex space-x-2">
                    <button class="text-blue-400 hover:text-blue-300" onclick="editAddress(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-400 hover:text-red-300" onclick="deleteAddress(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <p class="text-gray-300">
                ${address.province} ${address.city} ${address.district}
            </p>
            <p class="text-gray-300">${address.detailedAddress}</p>
            ${address.isDefault ? '<span class="inline-block mt-2 px-2 py-1 bg-blue-500/20 text-blue-400 text-sm rounded">默认地址</span>' : ''}
        </div>
    `).join('');
}

function saveAddress(address) {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    
    // 如果是默认地址，将其他地址设为非默认
    if (address.isDefault) {
        addresses.forEach(addr => addr.isDefault = false);
    }
    
    // 添加新地址
    addresses.push(address);
    
    // 保存到localStorage
    localStorage.setItem('addresses', JSON.stringify(addresses));
}

function editAddress(index) {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const address = addresses[index];
    
    if (!address) return;
    
    // 填充表单
    document.getElementById('recipientName').value = address.recipientName;
    document.getElementById('recipientPhone').value = address.recipientPhone;
    document.getElementById('province').value = address.province;
    document.getElementById('city').value = address.city;
    document.getElementById('district').value = address.district;
    document.getElementById('detailedAddress').value = address.detailedAddress;
    document.getElementById('recipientEmail').value = address.recipientEmail;
    document.getElementById('isDefault').checked = address.isDefault;
    
    // 显示模态框
    const addressModal = document.getElementById('addressModal');
    if (addressModal) {
        addressModal.classList.remove('hidden');
        addressModal.classList.add('flex');
        document.getElementById('modalTitle').textContent = '编辑收货地址';
    }
}

function deleteAddress(index) {
    if (!confirm('确定要删除这个地址吗？')) return;
    
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses.splice(index, 1);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    
    // 重新加载地址列表
    loadAddressList();
    showNotification('地址已删除', 'success');
}
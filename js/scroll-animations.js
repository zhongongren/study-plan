/**
 * 全局滚动交互效果系统
 * 包含：滚动进度条、导航栏变化、元素淡入动画、数字滚动、视差效果
 */

(function() {
    'use strict';

    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        
        // ==================== 1. 创建并添加滚动进度条 ====================
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.id = 'scrollProgress';
        document.body.appendChild(progressBar);

        // 更新进度条
        function updateProgressBar() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }

        window.addEventListener('scroll', updateProgressBar);
        updateProgressBar(); // 初始化

        // ==================== 2. 导航栏滚动效果 ====================
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // ==================== 3. 滚动淡入动画（Intersection Observer） ====================
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 一次性动画，触发后不再监听
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 监听所有滚动动画元素
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .scale-in, .slide-in-left, .slide-in-right'
        );
        animatedElements.forEach(el => scrollObserver.observe(el));

        // ==================== 4. 数字滚动动画 ====================
        function animateCounter(element, target, duration = 2000, suffix = '') {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = Math.floor(target) + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + suffix;
                }
            }, 16);
        }

        // 监听数字元素
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-target'));
                    const suffix = element.getAttribute('data-suffix') || '';
                    
                    if (!isNaN(target)) {
                        animateCounter(element, target, 2000, suffix);
                        counterObserver.unobserve(element);
                    }
                }
            });
        }, { threshold: 0.5 });

        // 监听所有 .counter-number 元素
        const counterElements = document.querySelectorAll('.counter-number');
        counterElements.forEach(el => counterObserver.observe(el));

        // ==================== 5. 视差滚动效果 ====================
        const parallaxElements = document.querySelectorAll('.parallax');
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }

        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', updateParallax);
            updateParallax(); // 初始化
        }

        // ==================== 6. 卡片悬停3D效果（可选） ====================
        const cards = document.querySelectorAll('.portfolio-item, .work-card, .industry-card, .case-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // ==================== 7. 平滑滚动到锚点 ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '#contact' && href !== '#works') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ==================== 8. 动态监听新添加的元素 ====================
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // 元素节点
                        // 监听新的滚动动画元素
                        if (node.classList && (
                            node.classList.contains('fade-in-up') ||
                            node.classList.contains('scale-in') ||
                            node.classList.contains('slide-in-left') ||
                            node.classList.contains('slide-in-right')
                        )) {
                            scrollObserver.observe(node);
                        }
                        
                        // 监听新的数字元素
                        if (node.classList && node.classList.contains('counter-number')) {
                            counterObserver.observe(node);
                        }
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('✅ 全局滚动交互效果已启用');
    });

})();

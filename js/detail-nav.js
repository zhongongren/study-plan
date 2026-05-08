// 详情页导航功能 - 通用脚本

document.addEventListener('DOMContentLoaded', function() {
    // 初始化回到顶部按钮
    initScrollToTop();
    
    // 初始化返回按钮（如果需要智能判断来源）
    initSmartBackButton();
    
    // 平滑滚动
    initSmoothScroll();
});

// 回到顶部功能
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // 点击回到顶部
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 智能返回按钮（记住来源页面）
function initSmartBackButton() {
    const backBtn = document.querySelector('.back-button');
    if (!backBtn) return;
    
    // 如果按钮已经有href，不需要修改
    if (backBtn.getAttribute('href') && backBtn.getAttribute('href') !== '#') {
        return;
    }
    
    // 获取来源页面
    const referrer = document.referrer;
    const currentDomain = window.location.origin;
    
    // 如果来自本站的portfolio.html或index.html，返回相应页面
    if (referrer && referrer.startsWith(currentDomain)) {
        if (referrer.includes('portfolio.html')) {
            backBtn.setAttribute('href', 'portfolio.html');
        } else if (referrer.includes('index.html') || referrer === currentDomain + '/' || referrer === currentDomain) {
            backBtn.setAttribute('href', 'index.html');
        } else {
            // 其他情况默认返回作品集
            backBtn.setAttribute('href', 'portfolio.html');
        }
    } else {
        // 外部访问默认返回作品集
        backBtn.setAttribute('href', 'portfolio.html');
    }
    
    // 添加点击事件（优先使用浏览器历史记录）
    backBtn.addEventListener('click', function(e) {
        // 如果有历史记录且来自本站，使用浏览器返回
        if (window.history.length > 1 && referrer && referrer.startsWith(currentDomain)) {
            e.preventDefault();
            window.history.back();
        }
        // 否则使用href跳转
    });
}

// 平滑滚动到锚点
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // ESC键返回
    if (e.key === 'Escape') {
        const backBtn = document.querySelector('.back-button');
        if (backBtn) {
            backBtn.click();
        }
    }
    
    // Home键回到顶部
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

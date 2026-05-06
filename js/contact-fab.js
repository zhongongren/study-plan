/* ========================================
   固定联系我按钮 JavaScript
   功能：展开/收起、复制联系方式
   ======================================== */

(function() {
  'use strict';
  
  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    const fabButton = document.querySelector('.fab-button');
    const contactCard = document.querySelector('.contact-card');
    const closeButton = document.querySelector('.contact-card-close');
    const contactItems = document.querySelectorAll('.contact-item');
    const copyToast = document.querySelector('.copy-toast');
    
    if (!fabButton || !contactCard) return;
    
    // 切换联系卡片显示/隐藏
    function toggleCard(show) {
      if (show === undefined) {
        contactCard.classList.toggle('active');
        fabButton.classList.toggle('active');
      } else {
        contactCard.classList.toggle('active', show);
        fabButton.classList.toggle('active', show);
      }
    }
    
    // 点击主按钮
    fabButton.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleCard();
      
      // 移动端展开文字
      if (window.innerWidth <= 768) {
        fabButton.classList.toggle('expanded');
      }
    });
    
    // 点击关闭按钮
    if (closeButton) {
      closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleCard(false);
        if (window.innerWidth <= 768) {
          fabButton.classList.remove('expanded');
        }
      });
    }
    
    // 点击卡片外部关闭
    document.addEventListener('click', function(e) {
      if (!contactCard.contains(e.target) && !fabButton.contains(e.target)) {
        toggleCard(false);
        if (window.innerWidth <= 768) {
          fabButton.classList.remove('expanded');
        }
      }
    });
    
    // 阻止卡片内部点击冒泡
    contactCard.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // 复制到剪贴板
    function copyToClipboard(text, label) {
      // 现代浏览器
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showCopyToast(label);
        }).catch(function() {
          fallbackCopy(text, label);
        });
      } else {
        fallbackCopy(text, label);
      }
    }
    
    // 降级复制方案
    function fallbackCopy(text, label) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      try {
        document.execCommand('copy');
        showCopyToast(label);
      } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制：' + text);
      }
      
      document.body.removeChild(textarea);
    }
    
    // 显示复制成功提示
    function showCopyToast(label) {
      if (!copyToast) return;
      
      copyToast.textContent = `已复制${label}！`;
      copyToast.classList.add('show');
      
      setTimeout(function() {
        copyToast.classList.remove('show');
      }, 2000);
    }
    
    // 联系方式项点击事件
    contactItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const value = this.querySelector('.contact-value').textContent;
        const label = this.querySelector('.contact-label').textContent;
        
        // 复制到剪贴板
        copyToClipboard(value, label);
        
        // 视觉反馈
        this.style.background = 'rgba(255, 107, 53, 0.3)';
        setTimeout(() => {
          this.style.background = '';
        }, 300);
      });
      
      // 键盘访问支持
      item.setAttribute('tabindex', '0');
      item.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
    
    // ESC键关闭卡片
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && contactCard.classList.contains('active')) {
        toggleCard(false);
        if (window.innerWidth <= 768) {
          fabButton.classList.remove('expanded');
        }
      }
    });
    
    // 滚动时收起卡片（可选）
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 向下滚动超过一定距离时隐藏
      if (scrollTop > lastScrollTop + 100) {
        if (contactCard.classList.contains('active')) {
          toggleCard(false);
        }
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
    
    // 窗口大小改变时调整
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        fabButton.classList.remove('expanded');
      }
    });
    
    // 页面加载完成后添加入场动画
    setTimeout(function() {
      fabButton.style.opacity = '1';
      fabButton.style.transform = 'scale(1)';
    }, 500);
    
  });
  
  // 初始化时隐藏按钮（等待入场动画）
  const style = document.createElement('style');
  style.textContent = `
    .fab-button {
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  `;
  document.head.appendChild(style);
  
})();

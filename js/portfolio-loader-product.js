/* ========================================
   作品集加载动画 - 产品图版 JavaScript
   功能：进度条动画、图片预加载、自动隐藏
   ======================================== */

(function() {
  'use strict';
  
  // 配置
  const CONFIG = {
    totalDuration: 2500,      // 总加载时长（毫秒）
    minDisplayTime: 2000,     // 最小显示时长（毫秒）
    updateInterval: 30,       // 进度更新间隔（毫秒）
  };
  
  // 状态
  let loadComplete = false;
  let minTimeElapsed = false;
  
  // 进度条动画
  function animateProgress() {
    const progressFill = document.querySelector('.loader-progress-fill');
    const progressText = document.querySelector('.loader-progress-text');
    
    if (!progressFill || !progressText) {
      console.warn('进度条元素未找到');
      return;
    }
    
    let progress = 0;
    const step = 100 / (CONFIG.totalDuration / CONFIG.updateInterval);
    
    const progressInterval = setInterval(() => {
      progress += step;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
      }
      
      // 更新进度条宽度和文字
      progressFill.style.width = progress + '%';
      progressText.textContent = Math.floor(progress) + '%';
    }, CONFIG.updateInterval);
  }
  
  // 预加载图片
  function preloadImages(images, onProgress, onComplete) {
    let loadedCount = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) {
      onComplete();
      return;
    }
    
    images.forEach(src => {
      const img = new Image();
      
      img.onload = img.onerror = () => {
        loadedCount++;
        const progress = (loadedCount / totalImages) * 100;
        
        if (onProgress) {
          onProgress(progress, loadedCount, totalImages);
        }
        
        if (loadedCount === totalImages) {
          onComplete();
        }
      };
      
      img.src = src;
    });
  }
  
  // 页面加载完成处理
  function onLoadComplete() {
    loadComplete = true;
    
    if (minTimeElapsed) {
      hideLoader();
    }
  }
  
  // 隐藏加载器
  function hideLoader() {
    const loader = document.querySelector('.portfolio-loader');
    if (!loader) return;
    
    // 添加淡出效果
    loader.classList.add('loaded');
    
    // 移除滚动锁定
    document.body.style.overflow = '';
    
    // 完全移除元素
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 1200);
  }
  
  // 初始化
  function init() {
    const loader = document.querySelector('.portfolio-loader');
    if (!loader) {
      console.warn('加载器元素未找到');
      return;
    }
    
    console.log('✅ 加载动画初始化');
    
    // 锁定页面滚动
    document.body.style.overflow = 'hidden';
    
    // 收集所有需要预加载的图片
    const productBg = document.querySelector('.loader-product-bg img');
    const imageUrls = [];
    
    if (productBg && productBg.src) {
      imageUrls.push(productBg.src);
    }
    
    // 收集页面主要图片
    const heroImages = document.querySelectorAll('.hero img, .product-slide-bg');
    heroImages.forEach(img => {
      if (img.src && !imageUrls.includes(img.src)) {
        imageUrls.push(img.src);
      }
    });
    
    console.log(`📸 预加载 ${imageUrls.length} 张图片`);
    
    // 预加载图片
    preloadImages(
      imageUrls,
      (progress, loaded, total) => {
        console.log(`加载进度: ${Math.floor(progress)}% (${loaded}/${total})`);
      },
      () => {
        console.log('✅ 图片加载完成');
        onLoadComplete();
      }
    );
    
    // 启动进度条动画
    setTimeout(() => {
      animateProgress();
    }, 300);
    
    // 最小显示时长计时器
    setTimeout(() => {
      minTimeElapsed = true;
      console.log('⏰ 最小显示时长已到');
      if (loadComplete) {
        hideLoader();
      }
    }, CONFIG.minDisplayTime);
    
    // 监听页面加载完成
    if (document.readyState === 'complete') {
      console.log('📄 页面已完全加载');
      onLoadComplete();
    } else {
      window.addEventListener('load', () => {
        console.log('📄 页面加载完成事件触发');
        onLoadComplete();
      });
    }
    
    // 备用方案：最长显示时长
    setTimeout(() => {
      console.log('⏱️ 最长显示时长已到，强制隐藏');
      if (!loadComplete) {
        loadComplete = true;
      }
      if (!minTimeElapsed) {
        minTimeElapsed = true;
      }
      hideLoader();
    }, CONFIG.totalDuration + 1500);
    
    // 点击加载器跳过（可选功能）
    loader.addEventListener('click', () => {
      if (loadComplete || minTimeElapsed) {
        console.log('🖱️ 用户点击跳过');
        loadComplete = true;
        minTimeElapsed = true;
        hideLoader();
      }
    });
  }
  
  // DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();

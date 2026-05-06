// ========================================
// 顶级商业字体 - 中文作品集主脚本
// ========================================

// 项目详情数据
const projectData = {
  1: {
    title: '电竞椅场景渲染',
    category: '三维渲染 · 电竞装备',
    image: 'images/works/gaming-chair-1.jpg',
    description: '为电竞家具品牌打造沉浸式场景渲染。在这个项目中，将电竞椅完美融入赛博风游戏房场景，通过RGB灯光效果、屏幕辉光、环境氛围等细节营造出极具科技感的电竺空间。',
    tools: 'Cinema 4D, Redshift, Photoshop',
    results: '产品页面停留时间增加180%，点击率提升65%，转化率提升42%。场景化的展示方式让客户更好地理解产品在实际使用场景中的效果。',
    client: '电竾家具品牌',
    duration: '2周',
    year: '2024'
  },
  2: {
    title: '工作间场景合成',
    category: '三维渲染 · 办公家具',
    image: 'images/works/gaming-chair-2.jpg',
    description: '为办公椅品牌打造现代工作间场景渲染。将产品融入温馨的家居办公环境，通过自然光照、木质桌面、现代显示器等元素，展现产品在实际使用场景中的舒适性和实用性。',
    tools: 'Cinema 4D, V-Ray, Photoshop',
    results: '客户对产品的信任度提升58%，咨询率增长72%。真实场景的展示让消费者更容易想象产品在自己家中的样子，有效降低购买决策门槛。',
    client: '人体工学家具品牌',
    duration: '2周',
    year: '2024'
  },
  3: {
    title: '升降吧台椅渲染',
    category: '三维渲染 · 家具产品',
    image: 'images/works/bar-stool-1.jpg',
    description: '为家具品牌打造高品质升降吧台椅产品渲染。采用简约的背景和专业的灯光设置，突出产品的设计感和质感。通过精细的材质模拟和光照计算，完美展现产品的每一个细节。',
    tools: 'Blender, Cycles, Photoshop',
    results: '产品页面转化率提升55%，客户咨询量增长68%。高品质的产品图显著提升了品牌形象，并被多个电商平台推荐为优质供应商。',
    client: '现代家具品牌',
    duration: '1周',
    year: '2024'
  },
  4: {
    title: '厨房场景合成',
    category: '三维渲染 · 居家场景',
    image: 'images/works/bar-stool-kitchen.jpg',
    description: '为家具品牌打造现代厨房场景渲染。将升降吧台椅完美融入温馨的家庭厨房场景，通过自然光线、木质台面、植物装饰等细节，营造出舒适的居家氛围，展现产品在实际生活中的应用场景。',
    tools: 'Cinema 4D, Corona Renderer, Photoshop',
    results: '场景化展示使产品点击率提升82%，客户咨询量增长65%，转化率提升48%。真实的家庭场景让消费者更好地理解产品在日常生活中的使用价值。',
    client: '家居生活品牌',
    duration: '2周',
    year: '2024'
  },
  5: {
    title: '时尚品牌视觉策划',
    category: '品牌策划 · 时尚',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1500&fit=crop',
    description: '为时尚品牌提供从主图到详情页的全链路视觉设计服务。包括产品精修、场景搭建、氛围营造、排版设计等。运用Cinema 4D打造立体视觉元素，After Effects制作动态效果，构建完整的品牌视觉体系。',
    tools: 'Cinema 4D, Photoshop, After Effects, Illustrator',
    results: '品牌月销量提升60%，社交媒体粉丝增长50%，品牌搜索量增加80%。完整的视觉体系帮助品牌建立了强烈的识别度，在竞争激烈的市场中脱颖而出。',
    client: '时尚服饰品牌',
    duration: '8周',
    year: '2023'
  },
  6: {
    title: '智能家居产品建模',
    category: '产品建模 · 智能家居',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=1500&fit=crop',
    description: '为智能家居新品众筹项目提供高精度产品建模和渲染服务。从工业设计图纸到最终成品的每一个细节都进行精确还原，材质、光影、环境反射都经过反复调试，呈现出产品的高端质感和科技感。',
    tools: 'Cinema 4D, Octane Renderer, Substance Painter',
    results: '众筹项目达成率300%，远超预期目标。宣传视频在各平台播放量突破百万，吸引了大量科技媒体报道。产品上市后首月销量超过预期5倍。',
    client: '智能家居品牌',
    duration: '5周',
    year: '2024'
  }
};

// ========================================
// 初始化
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initPageLoader(); // 页面加载动画
  // initCursor(); // 已禁用自定义光标
  initNavbar();
  initScrollAnimations();
  initParallax();
  init3DPortrait(); // 3D肖像鼠标跟随效果
  initSkillBars();
  initCounters();
  initWorkModal();
  initContactForm();
});

// ========================================
// 页面加载动画
// ========================================

function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  const progressBar = document.getElementById('progressBar');
  
  if (!loader || !progressBar) return;

  // 隐藏加载遗罩的辅助函数
  function hideLoader() {
    if (loader.classList.contains('fade-out')) return;
    progressBar.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('fade-out');
      document.body.classList.remove('loading');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 200);
  }

  let progress = 0;
  const interval = 20;

  // 快速进度条动画（不强制等待）
  const progressInterval = setInterval(() => {
    // 进度加速：先快后慢，到90%后等待页面实际加载完成
    if (progress < 70) {
      progress += 3;
    } else if (progress < 90) {
      progress += 0.8;
    }
    progressBar.style.width = `${Math.min(progress, 90)}%`;
    if (progress >= 90) clearInterval(progressInterval);
  }, interval);

  // 监听页面实际加载完成事件
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader, { once: true });
    // 安全限时：最多3秒后强制隐藏
    setTimeout(hideLoader, 3000);
  }
}

// ========================================
// 自定义光标系统
// ========================================

function initCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  
  if (!cursorDot || !cursorRing) return;

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let ringX = 0;
  let ringY = 0;

  // 鼠标移动
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 平滑跟随动画
  function animateCursor() {
    // 光标圆点 - 快速跟随
    const dotSpeed = 0.15;
    dotX += (mouseX - dotX) * dotSpeed;
    dotY += (mouseY - dotY) * dotSpeed;
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

    // 光标圆环 - 延迟跟随
    const ringSpeed = 0.1;
    ringX += (mouseX - ringX) * ringSpeed;
    ringY += (mouseY - ringY) * ringSpeed;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // 悬停效果
  const hoverElements = document.querySelectorAll('a, button, .work-item, .nav-link, input, textarea');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // 点击效果
  document.addEventListener('mousedown', () => {
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(0.8)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(0.9)`;
  });

  document.addEventListener('mouseup', () => {
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) scale(1)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(1)`;
  });
}

// ========================================
// 导航栏
// ========================================

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // 如果navbar不存在，直接返回
  if (!navbar) return;

  // 滚动效果
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // 关闭移动端菜单的辅助函数
  function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    }
  }

  // 移动端菜单
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      
      // 汉堡菜单动画
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(8px)' 
        : '';
      spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-8px)' 
        : '';
    });

    // 点击菜单外部关闭
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // ESC 键关闭菜单
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  // 平滑滚动
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // 关闭移动端菜单
          navMenu.classList.remove('active');
        }
      }
    });
  });

  // 高亮当前区块
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// ========================================
// 滚动动画
// ========================================

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // 动画触发后停止观察，节省性能
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// 视差滚动
// ========================================

function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  
  if (!heroBg) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  });
}

// ========================================
// 3D肖像鼠标跟随效果
// ========================================

function init3DPortrait() {
  const portrait3d = document.getElementById('portrait3d');
  const heroPortrait = document.getElementById('heroPortrait');
  
  if (!portrait3d || !heroPortrait) return;
  
  const layers = portrait3d.querySelectorAll('.portrait-layer');
  const floatTags = portrait3d.querySelectorAll('.float-tag-3d');
  
  let rect = heroPortrait.getBoundingClientRect();
  
  // 更新边界区域
  window.addEventListener('resize', throttle(() => {
    rect = heroPortrait.getBoundingClientRect();
  }, 200));
  
  // 鼠标移动事件
  heroPortrait.addEventListener('mousemove', (e) => {
    // 计算鼠标相对于肖像容器的位置 (-1 到 1)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // 3D倾斜效果
    const rotateY = x * 15; // 左右倾斜最大15度
    const rotateX = -y * 15; // 上下倾斜最大15度
    
    // 应用3D变换到主容器
    portrait3d.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
    
    // 多层视差效果
    layers.forEach((layer, index) => {
      const depth = (index - 1) * 10; // -10, 0, 10
      const moveX = x * depth;
      const moveY = y * depth;
      
      if (layer.classList.contains('layer-back')) {
        layer.style.transform = `translateZ(-50px) scale(1.1) translate(${moveX}px, ${moveY}px)`;
      } else if (layer.classList.contains('layer-mid')) {
        layer.style.transform = `translateZ(0px) translate(${moveX}px, ${moveY}px)`;
      } else if (layer.classList.contains('layer-front')) {
        layer.style.transform = `translateZ(30px) scale(0.95) translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    // 浮动标签视差效果
    floatTags.forEach((tag) => {
      const depth = parseFloat(tag.getAttribute('data-depth')) || 0.3;
      const moveX = x * depth * 50;
      const moveY = y * depth * 50;
      
      tag.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
  
  // 鼠标离开时恢复
  heroPortrait.addEventListener('mouseleave', () => {
    portrait3d.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
    
    layers.forEach((layer) => {
      if (layer.classList.contains('layer-back')) {
        layer.style.transform = `translateZ(-50px) scale(1.1)`;
      } else if (layer.classList.contains('layer-mid')) {
        layer.style.transform = `translateZ(0px)`;
      } else if (layer.classList.contains('layer-front')) {
        layer.style.transform = `translateZ(30px) scale(0.95)`;
      }
    });
    
    floatTags.forEach((tag) => {
      tag.style.transform = `translate(0px, 0px)`;
    });
  });
}

// ========================================
// 技能条动画
// ========================================

function initSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.querySelector('.skill-progress');
        const percent = entry.target.querySelector('.skill-percent');
        const targetWidth = progress.getAttribute('data-width');
        const targetPercent = percent.getAttribute('data-percent');
        
        // 填充技能条
        setTimeout(() => {
          progress.style.width = `${targetWidth}%`;
        }, 100);
        
        // 数字动画
        animateNumber(percent, 0, parseInt(targetPercent), 1500, '%');
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  skillItems.forEach(item => observer.observe(item));
}

// ========================================
// 统计数字计数动画
// ========================================

function initCounters() {
  // 原有计数器
  const counters = document.querySelectorAll('.number[data-count]');
  
  // 新增：About Me区域的数据卡片
  const dataNumbers = document.querySelectorAll('.data-number[data-target]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // 支持data-count和data-target两种属性
        const count = parseInt(target.getAttribute('data-count') || target.getAttribute('data-target'));
        
        if (count) {
          animateNumber(target, 0, count, 1500);
          observer.unobserve(target);
        }
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => observer.observe(counter));
  dataNumbers.forEach(counter => observer.observe(counter));
}

// 数字动画通用函数 - 使用requestAnimationFrame优化性能
function animateNumber(element, start, end, duration, suffix = '') {
  let startTimestamp = null;
  
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // 使用缓动函数让动画更自然
    const easedProgress = easeOutQuad(progress);
    const current = Math.floor(easedProgress * (end - start) + start);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  
  window.requestAnimationFrame(step);
}

// 缓动函数 - 二次方缓出效果
function easeOutQuad(t) {
  return t * (2 - t);
}

// ========================================
// 作品详情弹窗
// ========================================

function initWorkModal() {
  const workItems = document.querySelectorAll('.work-item');
  const modal = document.getElementById('projectModal');
  
  // 如果modal不存在，直接返回
  if (!modal) return;
  
  const modalBody = modal.querySelector('.modal-body');
  const modalClose = modal.querySelector('.modal-close');
  const modalOverlay = modal.querySelector('.modal-overlay');
  
  // 打开弹窗
  workItems.forEach(item => {
    item.addEventListener('click', () => {
      const projectId = item.getAttribute('data-project');
      const project = projectData[projectId];
      
      if (project) {
        showProjectModal(project);
      }
    });
  });
  
  // 关闭弹窗
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  function showProjectModal(project) {
    modalBody.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="modal-image">
      <h2 class="modal-title">${project.title}</h2>
      <div class="modal-meta">
        <div class="modal-meta-item">
          <span class="modal-meta-label">客户</span>
          <span class="modal-meta-value">${project.client}</span>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">周期</span>
          <span class="modal-meta-value">${project.duration}</span>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">年份</span>
          <span class="modal-meta-value">${project.year}</span>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">类型</span>
          <span class="modal-meta-value">${project.category}</span>
        </div>
      </div>
      <p class="modal-description">${project.description}</p>
      <div class="modal-tools">
        <h4>使用工具</h4>
        <p>${project.tools}</p>
      </div>
      <div class="modal-results">
        <h4>项目成果</h4>
        <p>${project.results}</p>
      </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// ========================================
// 联系表单
// ========================================

function initContactForm() {
  const form = document.querySelector('.contact-form');
  
  if (!form) return;
  
  // 创建内联提示消息函数
  function showFormMessage(msg, type) {
    let msgEl = form.querySelector('.form-message');
    if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = 'form-message';
      msgEl.style.cssText = 'margin-top:16px; padding:14px 20px; border-radius:10px; font-size:0.95rem; font-weight:500; text-align:center; transition:all 0.3s ease;';
      form.appendChild(msgEl);
    }
    if (type === 'success') {
      msgEl.style.background = 'rgba(16,185,129,0.15)';
      msgEl.style.color = '#10b981';
      msgEl.style.border = '1px solid rgba(16,185,129,0.3)';
    } else if (type === 'error') {
      msgEl.style.background = 'rgba(239,68,68,0.15)';
      msgEl.style.color = '#ef4444';
      msgEl.style.border = '1px solid rgba(239,68,68,0.3)';
    } else {
      msgEl.style.background = 'rgba(255,107,53,0.1)';
      msgEl.style.color = '#FF6B35';
      msgEl.style.border = '1px solid rgba(255,107,53,0.2)';
    }
    msgEl.textContent = msg;
    msgEl.style.display = 'block';
    setTimeout(() => { msgEl.style.display = 'none'; }, 5000);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
    const message = document.getElementById('message').value.trim();
    
    // 表单验证
    if (!name || !email || !message) {
      showFormMessage('请填写姓名、邮筱和留言内容', 'error');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('请输入有效的邮筱地址', 'error');
      return;
    }
    
    // 提交按鈕状态
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    showFormMessage('消息发送中，请稍候...', 'info');
    
    // 模拟发送（实际项目中需要连接后端 API）
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // 成功提示
    showFormMessage(`感谢您，${name}！消息已收到，我会尽快通过 ${email} 与您联系。`, 'success');
    
    // 重置表单
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // 实际项目中的发送逻辑示例：
    /*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message })
      });
      
      if (response.ok) {
        alert('消息发送成功！');
        form.reset();
      } else {
        alert('发送失败，请稍后重试');
      }
    } catch (error) {
      alert('发送失败，请检查网络连接');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
    */
  });
}

// ========================================
// 作品筛选功能（支持案例分组）
// ========================================
function initWorksFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseGroups = document.querySelectorAll('.case-group'); // 新：案例分组
  const aiMatrix = document.querySelector('.ai-portrait-matrix'); // AI珠宝展示区块
  const portfolioCards = document.querySelectorAll('.portfolio-card'); // 作品卡片 (index.html)
  const workItems = document.querySelectorAll('.work-item'); // 作品卡片 (portfolio.html)
  
  if (filterBtns.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 更新按钮状态
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // 获取筛选类别
      const filter = btn.getAttribute('data-filter');
      
      // 筛选作品卡片（.portfolio-card）
      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all') {
          // 显示所有
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else if (category === filter) {
          // 显示匹配的
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          // 隐藏不匹配的
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      
      // 筛选作品卡片（.work-item）- portfolio.html
      workItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all') {
          // 显示所有
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else if (category === filter) {
          // 显示匹配的
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          // 隐藏不匹配的
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
      
      // 筛选案例分组（.case-group）
      caseGroups.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all') {
          // 显示所有
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else if (category === filter) {
          // 显示匹配的
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          // 隐藏不匹配的
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
      
      // 筛选AI珠宝展示区块（.ai-portrait-matrix）
      if (aiMatrix) {
        const matrixCategory = aiMatrix.getAttribute('data-category');
        
        if (filter === 'all') {
          // 显示
          aiMatrix.style.display = 'block';
          setTimeout(() => {
            aiMatrix.style.opacity = '1';
            aiMatrix.style.transform = 'translateY(0)';
          }, 10);
        } else if (matrixCategory === filter) {
          // 显示匹配的
          aiMatrix.style.display = 'block';
          setTimeout(() => {
            aiMatrix.style.opacity = '1';
            aiMatrix.style.transform = 'translateY(0)';
          }, 10);
        } else {
          // 隐藏不匹配的
          aiMatrix.style.opacity = '0';
          aiMatrix.style.transform = 'translateY(20px)';
          setTimeout(() => {
            aiMatrix.style.display = 'none';
          }, 300);
        }
      }
    });
  });
}

// 初始化
initWorksFilter();

// ========================================
// 性能优化 - 防抖函数
// ========================================

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

// ========================================
// 性能优化 - 节流函数
// ========================================

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// 页面加载完成
// ========================================

window.addEventListener('load', () => {
  // 移除加载动画等
  document.body.classList.add('loaded');
  
  // 性能监控（可选）
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`页面加载时间: ${pageLoadTime}ms`);
  }
});
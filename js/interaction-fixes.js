/*
 * 交互优化脚本
 * 负责：加载层兜底、移动端导航遮罩、滚动进度条、返回顶部、卡片键盘可达性。
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function hidePortfolioLoader() {
    const loader = document.querySelector('.portfolio-loader');
    if (!loader || loader.dataset.forceHidden === '1') return;
    loader.dataset.forceHidden = '1';
    loader.classList.add('loaded');
    document.body.style.overflow = '';
    window.setTimeout(() => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, prefersReducedMotion ? 20 : 650);
  }

  function initLoaderSafety() {
    const loader = document.querySelector('.portfolio-loader');
    if (!loader) return;

    loader.setAttribute('role', 'button');
    loader.setAttribute('tabindex', '0');
    loader.setAttribute('aria-label', '作品集正在加载，点击可跳过加载动画');

    loader.addEventListener('click', hidePortfolioLoader);
    loader.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        hidePortfolioLoader();
      }
    });

    window.addEventListener('load', () => window.setTimeout(hidePortfolioLoader, 900), { once: true });
    window.setTimeout(hidePortfolioLoader, 2600);
  }

  function initMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!menuToggle || !navMenu) return;

    let backdrop = document.querySelector('.mobile-nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-nav-backdrop';
      document.body.appendChild(backdrop);
    }

    function isOpen() {
      return navMenu.classList.contains('active');
    }

    function syncState() {
      const open = isOpen();
      backdrop.classList.toggle('active', open);
      document.body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    }

    function closeMenu() {
      if (!isOpen()) return;
      navMenu.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
      syncState();
    }

    menuToggle.setAttribute('aria-controls', 'siteNavMenu');
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.id = navMenu.id || 'siteNavMenu';

    menuToggle.addEventListener('click', () => {
      window.setTimeout(syncState, 0);
    });

    backdrop.addEventListener('click', closeMenu);

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });

    syncState();
  }

  function showToast(message) {
    let toast = document.querySelector('.interaction-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'interaction-toast';
      toast.style.cssText = 'position:fixed;left:50%;bottom:34px;z-index:400;transform:translateX(-50%) translateY(16px);padding:10px 16px;border-radius:999px;background:rgba(255,107,53,.94);color:#fff;font-size:13px;box-shadow:0 12px 32px rgba(0,0,0,.35);opacity:0;pointer-events:none;transition:opacity .24s ease,transform .24s ease;';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(16px)';
    }, 1600);
  }

  function copyText(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast('已复制' + label)).catch(() => showToast(label + '：' + text));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); showToast('已复制' + label); } catch (e) { showToast(label + '：' + text); }
      textarea.remove();
    }
  }

  function initSimpleContactFab() {
    document.querySelectorAll('.contact-fab-btn').forEach((button) => {
      if (button.dataset.interactionReady === '1') return;
      button.dataset.interactionReady = '1';
      button.setAttribute('aria-expanded', 'false');

      const wrapper = button.closest('.contact-fab-wrapper') || button.parentElement;
      if (!wrapper) return;
      let panel = wrapper.querySelector('.interaction-contact-panel');
      if (!panel) {
        panel = document.createElement('div');
        panel.className = 'interaction-contact-panel';
        panel.innerHTML = '<button type="button" data-copy="19857422704" data-label="手机号">手机 / 微信：19857422704</button><button type="button" data-copy="985025700@qq.com" data-label="邮箱">邮箱：985025700@qq.com</button><a href="index.html#contact">查看完整联系方式</a>';
        wrapper.appendChild(panel);
      }

      function closePanel() {
        panel.classList.remove('active');
        button.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
      }

      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const open = !panel.classList.contains('active');
        panel.classList.toggle('active', open);
        button.classList.toggle('active', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      panel.addEventListener('click', (event) => {
        event.stopPropagation();
        const target = event.target.closest('[data-copy]');
        if (target) copyText(target.dataset.copy, target.dataset.label || '内容');
      });

      document.addEventListener('click', closePanel);
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePanel(); });
    });
  }

  function initMobileMenuFallback() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    let trigger = document.querySelector('.interaction-mobile-trigger');
    if (!trigger) {
      trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'interaction-mobile-trigger';
      trigger.setAttribute('aria-label', '打开菜单');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = '<span></span><span></span><span></span>';
      trigger.style.cssText = 'position:fixed;right:18px;top:12px;z-index:9999;width:44px;height:44px;border-radius:999px;border:1px solid rgba(255,107,53,.45);background:rgba(8,10,13,.86);box-shadow:0 12px 32px rgba(0,0,0,.34);display:none;align-items:center;justify-content:center;flex-direction:column;gap:5px;';
      trigger.querySelectorAll('span').forEach((span) => { span.style.cssText = 'width:20px;height:2px;border-radius:99px;background:#fff;display:block;transition:transform .24s ease,opacity .24s ease;'; });
      document.body.appendChild(trigger);
    }

    let backdrop = document.querySelector('.mobile-nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-nav-backdrop';
      document.body.appendChild(backdrop);
    }

    function setTriggerVisibility() {
      trigger.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    }

    function setOpen(open) {
      if (window.innerWidth > 768) open = false;
      navMenu.classList.toggle('active', open);
      trigger.classList.toggle('active', open);
      const bars = trigger.querySelectorAll('span');
      if (bars.length >= 3) {
        bars[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
        bars[1].style.opacity = open ? '0' : '1';
        bars[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
      }
      backdrop.classList.toggle('active', open);
      document.body.classList.toggle('menu-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      trigger.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    }

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      setOpen(!navMenu.classList.contains('active'));
    });

    backdrop.addEventListener('click', () => setOpen(false));
    navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { setTriggerVisibility(); if (window.innerWidth > 768) setOpen(false); });
    setTriggerVisibility();
  }

  function initScrollEnhancements() {
    let progress = document.querySelector('.interaction-scroll-progress');
    if (!progress) {
      progress = document.createElement('div');
      progress.className = 'interaction-scroll-progress';
      document.body.appendChild(progress);
    }

    let backTop = document.querySelector('.interaction-back-top');
    if (!backTop) {
      backTop = document.createElement('button');
      backTop.type = 'button';
      backTop.className = 'interaction-back-top';
      backTop.setAttribute('aria-label', '返回顶部');
      backTop.innerHTML = '↑';
      document.body.appendChild(backTop);
    }

    function update() {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.max(0, Math.min(100, (window.scrollY / max) * 100));
      progress.style.width = pct + '%';
      backTop.classList.toggle('visible', window.scrollY > Math.max(420, window.innerHeight * 0.65));
    }

    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function initCardAccessibility() {
    document.querySelectorAll('.work-item, .portfolio-card').forEach((card) => {
      const link = card.querySelector('a[href]');
      if (!link) return;
      card.addEventListener('keydown', (event) => {
        if (event.target !== card) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          link.click();
        }
      });
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
      if (!card.hasAttribute('role')) card.setAttribute('role', 'link');
    });
  }

  ready(() => {
    initLoaderSafety();
    initMobileNavigation();
    initSimpleContactFab();
    initMobileMenuFallback();
    initScrollEnhancements();
    initCardAccessibility();
  });
})();

/*
 * 案例详情页公共交互基础
 * 当前玄星页仍保留内联脚本以确保兼容；后续批量生成案例时可直接引用本文件。
 */
(function () {
  function initFadeUp() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
  }

  window.CaseDetailTemplate = { initFadeUp };
})();

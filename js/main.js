(function () {
  'use strict';

  var STORAGE_KEY = 'cleanssh-lang';

  function getLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'zh' || stored === 'en') return stored;
    var nav = navigator.language || '';
    return nav.indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function setLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  // Init
  setLang(getLang());

  // Toggle
  var btn = document.getElementById('langToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-lang');
      setLang(current === 'zh' ? 'en' : 'zh');
    });
  }

  // Scroll-triggered fade-in
  var cards = document.querySelectorAll('.feature-card, .security-item, .screenshot-placeholder, .tech-badge');
  cards.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(function (el) {
    observer.observe(el);
  });

  // Nav background on scroll
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      nav.style.borderBottomColor = 'rgba(0,0,0,0.08)';
    } else {
      nav.style.borderBottomColor = '';
    }
  });
})();

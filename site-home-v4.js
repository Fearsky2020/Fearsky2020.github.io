(() => {
  const copy = {
    nl: {
      line1: 'Web. AI. Systemen.',
      line2: 'Met karakter.',
      intro: 'Van een sterke website tot herbruikbare AI Skills en automatisering. E\u00e9n studio, direct contact en techniek die gewoon goed moet werken.',
      kicker: 'Creative technology studio \u00b7 Den Haag'
    },
    en: {
      line1: 'Web. AI. Systems.',
      line2: 'Built with character.',
      intro: 'From a strong website to reusable AI Skills and automation. One studio, direct contact and technology that simply has to work.',
      kicker: 'Creative technology studio \u00b7 The Hague'
    },
    zh: {
      line1: '\u7f51\u7ad9\u3002AI\u3002\u7cfb\u7edf\u3002',
      line2: '\u6f02\u4eae\uff0c\u800c\u4e14\u771f\u597d\u7528\u3002',
      intro: '\u4ece\u7f51\u7ad9\u5230 AI Skills \u548c\u81ea\u52a8\u5316\uff0c\u6211\u4eec\u628a\u8bbe\u8ba1\u3001\u6280\u672f\u548c\u5b9e\u9645\u4e1a\u52a1\u8fde\u5728\u4e00\u8d77\u3002\u76f4\u63a5\u6c9f\u901a\uff0c\u8ba4\u771f\u4ea4\u4ed8\u3002',
      kicker: '\u521b\u610f\u79d1\u6280\u5de5\u4f5c\u5ba4 \u00b7 \u6d77\u7259'
    }
  };
  const getLang = () => {
    const v = localStorage.getItem('goed-webwerk-language') || document.documentElement.lang || 'nl';
    return String(v).startsWith('zh') ? 'zh' : String(v).startsWith('en') ? 'en' : 'nl';
  };
  function syncHomeHero() {
    const c = copy[getLang()];
    const line1 = document.querySelector('[data-i18n="heroLine1"]');
    const line2 = document.querySelector('[data-i18n="heroLine2"]');
    const intro = document.querySelector('[data-i18n="heroIntro"]');
    const kicker = document.querySelector('[data-i18n="heroKicker"]');
    if (line1) line1.textContent = c.line1;
    if (line2) line2.textContent = c.line2;
    if (intro) intro.textContent = c.intro;
    if (kicker) kicker.textContent = c.kicker;
  }
  window.__goedHomeV4Sync = syncHomeHero;
  syncHomeHero();
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setTimeout(syncHomeHero, 80));
  });
})();
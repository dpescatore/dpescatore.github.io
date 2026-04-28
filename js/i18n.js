/* ============================================================
   DANIELE PESCATORE – PORTFOLIO
   i18n – lightweight client-side translation module
   ============================================================ */
(function () {
  'use strict';

  let lang = localStorage.getItem('lang') || 'it';
  let strings = {};

  function t(key) {
    const val = strings[key];
    return val !== undefined ? val : key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = t(el.dataset.i18n);
      if (typeof val === 'string') el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const val = t(el.dataset.i18nHtml);
      if (typeof val === 'string') el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = t(el.dataset.i18nPlaceholder);
      if (typeof val === 'string') el.placeholder = val;
    });

    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      const val = t(el.dataset.i18nValue);
      if (typeof val === 'string') el.value = val;
    });

    document.documentElement.lang = lang;
    document.title = t('meta.title');

    [
      ['meta[name="description"]',        'content', 'meta.description'],
      ['meta[property="og:title"]',        'content', 'meta.og.title'],
      ['meta[property="og:description"]',  'content', 'meta.og.description'],
      ['meta[property="og:image:alt"]',    'content', 'meta.og.imagealt'],
      ['meta[name="twitter:title"]',       'content', 'meta.og.title'],
      ['meta[name="twitter:description"]', 'content', 'meta.twitter.description'],
    ].forEach(([sel, attr, key]) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, t(key));
    });

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', lang === 'it' ? 'it_IT' : 'en_US');

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  async function setLang(newLang) {
    lang = newLang;
    localStorage.setItem('lang', lang);
    try {
      const res = await fetch(`locales/${lang}.json`);
      strings = await res.json();
    } catch {
      // keep existing strings on network error
    }
    applyTranslations();
  }

  window.i18n = { t, setLang, getLang: () => lang };

  function init() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
    setLang(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

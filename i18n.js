/**
 * StreetWOD Landing - Internacionalización
 * Detecta idioma del navegador, permite cambiar manualmente, soporta RTL (árabe)
 */
(function () {
  const STORAGE_KEY = 'streetwod_lang';
  const SUPPORTED_LANGS = ['ar', 'de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'tr', 'zh'];
  const LANG_LABELS = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
    pt: 'Português',
    de: 'Deutsch',
    ar: 'العربية',
    zh: '中文',
    it: 'Italiano',
    nl: 'Nederlands',
    pl: 'Polski',
    tr: 'Türkçe'
  };

  const BROWSER_LANG_MAP = {
    'es': 'es', 'es-ES': 'es', 'es-MX': 'es', 'es-AR': 'es',
    'en': 'en', 'en-US': 'en', 'en-GB': 'en',
    'fr': 'fr', 'fr-FR': 'fr', 'fr-CA': 'fr',
    'pt': 'pt', 'pt-BR': 'pt', 'pt-PT': 'pt',
    'de': 'de', 'de-DE': 'de', 'de-AT': 'de', 'de-CH': 'de',
    'ar': 'ar', 'ar-SA': 'ar', 'ar-EG': 'ar',
    'zh': 'zh', 'zh-CN': 'zh', 'zh-TW': 'zh', 'zh-Hans': 'zh', 'zh-Hant': 'zh',
    'it': 'it', 'it-IT': 'it', 'it-CH': 'it',
    'nl': 'nl', 'nl-NL': 'nl', 'nl-BE': 'nl',
    'pl': 'pl', 'pl-PL': 'pl',
    'tr': 'tr', 'tr-TR': 'tr',
  };

  function detectLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    const browser = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
    const full = navigator.language || navigator.userLanguage || 'en';
    return BROWSER_LANG_MAP[full] || BROWSER_LANG_MAP[browser] || 'en';
  }

  function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('rtl', lang === 'ar');
    document.body.classList.toggle('rtl', lang === 'ar');
    applyTranslations(lang);
    updateLangSelector(lang);
    updateMeta(lang);
  }

  function updateMeta(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;
    document.title = t.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = t.metaDesc;
  }

  function applyTranslations(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const val = t[key];
      if (val == null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else if (val.indexOf('<br>') !== -1) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
  }

  function updateLangSelector(currentLang) {
    const sel = document.getElementById('lang-select');
    if (!sel) return;
    sel.value = currentLang;
    sel.innerHTML = SUPPORTED_LANGS.map(function (code) {
      return '<option value="' + code + '"' + (code === currentLang ? ' selected' : '') + '>' + LANG_LABELS[code] + '</option>';
    }).join('');
  }

  function buildLangSelector() {
    const wrapper = document.getElementById('lang-wrapper');
    if (!wrapper) return;
    const sel = document.createElement('select');
    sel.id = 'lang-select';
    sel.className = 'lang-select';
    sel.setAttribute('aria-label', 'Language');
    sel.innerHTML = SUPPORTED_LANGS.map(function (code) {
      return '<option value="' + code + '">' + LANG_LABELS[code] + '</option>';
    }).join('');
    sel.addEventListener('change', function () {
      setLang(sel.value);
    });
    wrapper.appendChild(sel);
  }

  function init() {
    buildLangSelector();
    const lang = detectLanguage();
    setLang(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.i18nSetLang = setLang;
})();

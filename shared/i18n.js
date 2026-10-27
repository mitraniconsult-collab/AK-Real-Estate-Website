// Shared display helpers. English fields fall back to original content when absent.
(function () {
  function language(value) { return value === 'en' ? 'en' : 'bg'; }
  function listingField(row, field, lang) {
    if (!row) return '';
    const camel = field.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    if (language(lang) === 'en') {
      for (const key of [field + '_en', camel + 'En', camel + '_en', field + 'En']) {
        if (row[key] != null && String(row[key]).trim()) return row[key];
      }
    }
    return row[field] ?? row[camel] ?? '';
  }
  function price(value, currency = 'EUR', deal, lang = 'bg') {
    if (value == null || value === '' || !Number.isFinite(Number(value))) return '—';
    const en = language(lang) === 'en';
    currency = /^[A-Z]{3}$/.test(String(currency)) ? String(currency) : 'EUR';
    let result;
    try {
      result = new Intl.NumberFormat(en ? 'en-GB' : 'bg-BG', {
        style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2,
      }).format(Number(value));
    } catch (_) { result = Number(value).toLocaleString(en ? 'en-GB' : 'bg-BG') + ' ' + currency; }
    return result + (deal === 'Rent' ? (en ? '/mo' : '/мес.') : '');
  }
  function meta(name, content, property = false) {
    const attr = property ? 'property' : 'name';
    let node = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (!node) { node = document.createElement('meta'); node.setAttribute(attr, name); document.head.appendChild(node); }
    node.setAttribute('content', content);
  }
  function page(lang, title, description) {
    const en = language(lang) === 'en';
    document.documentElement.lang = en ? 'en' : 'bg';
    document.title = title;
    meta('og:title', title, true);
    meta('og:locale', en ? 'en_GB' : 'bg_BG', true);
    if (description) { meta('description', description); meta('og:description', description, true); }
  }
  window.AKLocale = { language, listingField, price, page };
})();

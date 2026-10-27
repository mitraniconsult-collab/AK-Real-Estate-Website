// Admin locale is independent of the public website language.
(function () {
  const key = 'ak-admin-locale';
  let current = 'bg';
  const normalize = value => value === 'en' ? 'en' : 'bg';
  const bg = {
    'Sign In': 'Вход', 'Signing In…': 'Влизане…', 'Sending…': 'Изпращане…', 'Forgot?': 'Забравена парола?',
    'Admin Console': 'Административен панел', 'Restricted Access': 'Ограничен достъп',
    'A quieter': 'Вашият', 'back': 'работен', 'office.': 'панел.', 'Welcome': 'Добре', 'back.': 'дошли.',
    'Manage the portfolio. Move listings between Draft, Active, Sold, and Rented. The site reflects your edits the moment you save.': 'Управлявайте имотите и техните статуси. Промените се показват на сайта след успешен запис.',
    'Authorized personnel only': 'Само за оторизирани служители',
    'Use your AK Real Estate administrator credentials.': 'Влезте с администраторския си профил в AK Real Estate.',
    'Email Address': 'Имейл адрес', 'Password': 'Парола', 'Remember me': 'Запомни ме',
    'Authorized admin credentials required': 'Необходим е администраторски профил',
    'Email and password are required.': 'Въведете имейл адрес и парола.',
    'Authentication service is not configured.': 'Услугата за вход не е достъпна.',
    'Invalid email or password.': 'Невалиден имейл или парола.',
    'Too many attempts. Please wait and try again.': 'Твърде много опити. Изчакайте и опитайте отново.',
    'Sign-in service temporarily unavailable.': 'Услугата за вход временно е недостъпна. Опитайте отново.',
    'Sign-in was not confirmed. Please try again.': 'Входът не е потвърден. Опитайте отново.',
    'Cannot reach sign-in service. Please try again.': 'Няма връзка с услугата за вход. Опитайте отново.',
    'Enter your email address to reset your password.': 'Въведете имейл адрес за възстановяване на паролата.',
    'Could not send the recovery email. Please try again.': 'Имейлът за възстановяване не бе изпратен. Опитайте отново.',
    'If an account exists for this email, a recovery link has been sent.': 'Ако има профил с този имейл, ще получите връзка за възстановяване.',
    'Checking access…': 'Проверка на достъпа…', 'Search': 'Търсене', 'Open menu': 'Отвори менюто',
    'Admin workspace': 'Административен панел',
    'status.Active': 'Активен', 'status.Draft': 'Чернова', 'status.Sold': 'Продаден', 'status.Rented': 'Отдаден',
    'Apartment': 'Апартамент', 'House': 'Къща', 'Villa': 'Вила', 'Office': 'Офис', 'Land': 'Парцел',
    'Sale': 'Продажба', 'Rent': 'Наем', 'For Sale': 'За продажба', 'For Rent': 'Под наем',
    'No image': 'Няма снимка', 'Untitled': 'Без заглавие', 'Main': 'Основна', 'Set as main': 'Задай като основна',
    'Remove': 'Премахни', 'Uploading…': 'Качване…', 'Bedrooms': 'Спални', 'Bathrooms': 'Бани',
    'ID': 'Номер', 'Created': 'Създаден', 'Status': 'Статус',
    'Edit': 'Редактиране', 'Not': 'Не е', 'found.': 'намерен.', 'No listing with id': 'Няма имот с номер',
    'Back to listings': 'Към имотите',
    'Featured listings appear in the home-page portfolio strip and "Featured Portfolio" section.': 'Препоръчаните имоти се показват в секцията с избрани имоти на началната страница.',
    'Approximation · public layout may differ': 'Предварителен преглед · публичното оформление може да се различава',
    'Title is required': 'Въведете заглавие', 'City is required': 'Въведете град', 'Price is required': 'Въведете цена',
    'Delete listing?': 'Да изтрием ли имота?', 'will be permanently removed.': 'ще бъде изтрит завинаги.',
    'Deleting…': 'Изтриване…', 'Delete': 'Изтрий', 'Cancel': 'Отказ', 'Confirm': 'Потвърди',
    'e.g. Villa di Pietra': 'напр. Апартамент в Лозенец',
    'Tucked behind a stone wall on a one-block lane…': 'Опишете имота, разпределението и местоположението…',
    'Los Angeles': 'София', 'Bel Air': 'Лозенец', '1421 Stone Canyon Rd, Los Angeles, CA 90077': 'ул. …, София',
    '0 = ground': '0 = партер', 'Motor court · Restored stone facade · Library · Cellar · Pool': 'Балкон · Асансьор · Паркомясто',
    'Stored with the listing. Do not enter confidential address details.': 'Записва се към имота. Не въвеждайте поверителни адресни данни.',
    'Change was not saved. Please try again.': 'Промяната не е записана. Опитайте отново.',
    'Could not delete the listing. Please try again.': 'Имотът не бе изтрит. Опитайте отново.',
    'No properties available.': 'Няма заредени имоти.', 'Loading properties…': 'Зареждане на имотите…',
    'Properties could not be loaded. Please try again.': 'Имотите не могат да се заредят. Опитайте отново.',
    'Try again': 'Опитай отново',
  };
  const en = { 'status.Active': 'Active', 'status.Draft': 'Draft', 'status.Sold': 'Sold', 'status.Rented': 'Rented' };
  function read() { try { current = normalize(localStorage.getItem(key) || current); } catch (_) {} return current; }
  function translate(text, lang = read(), catalog) {
    if (!text) return text;
    const l = normalize(lang);
    return catalog?.[l]?.[text] || (l === 'bg' ? bg[text] : en[text]) || text;
  }
  function set(value) {
    current = normalize(value);
    try { localStorage.setItem(key, current); } catch (_) {}
    window.dispatchEvent(new CustomEvent('ak-admin-locale-change', { detail: { lang: current } }));
  }
  const listeners = new Set();
  const notify = () => listeners.forEach(listener => listener());
  window.addEventListener('storage', event => { if (!event.key || event.key === key) notify(); });
  window.addEventListener('ak-admin-locale-change', notify);
  window.addEventListener('focus', notify);
  function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }
  function use(catalog) {
    const lang = React.useSyncExternalStore(subscribe, read, read);
    return { lang, setLang: set, t: text => translate(text, lang, catalog) };
  }
  function money(value, currency, deal) { return window.AKLocale.price(value, currency, deal, read()); }
  function totals(rows, average = false) {
    const groups = new Map();
    rows.forEach(row => {
      if (row.price == null || row.price === '' || !Number.isFinite(Number(row.price))) return;
      const code = row.currency || 'EUR';
      const group = groups.get(code) || { sum: 0, count: 0 };
      group.sum += Number(row.price); group.count++; groups.set(code, group);
    });
    return [...groups].map(([code, group]) => money(average ? group.sum / group.count : group.sum, code)).join(' · ') || '—';
  }
  function date(value) {
    if (!value || !Number.isFinite(new Date(value).getTime())) return '—';
    return new Date(value).toLocaleDateString(read() === 'en' ? 'en-GB' : 'bg-BG', { timeZone: 'UTC' });
  }
  window.AKAdminLocale = { read, set, translate, subscribe, use, money, totals, date, bg, en };
})();

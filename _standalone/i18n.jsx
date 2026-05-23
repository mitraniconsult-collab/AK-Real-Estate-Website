// i18n — language state + translations for AK Real Estate site.
// Persists choice in localStorage. Two locales: en, bg.

const AK_TRANSLATIONS = {
  en: {
    /* — Nav — */
    'nav.listings':       'Listings',
    'nav.services':       'Services',
    'nav.contact':        'Contact',
    'nav.requestAccess':  'Request Access',

    /* — Hero — */
    'hero.meta':          'Since 2014 · Los Angeles · Off-Market',
    'hero.titleA':        'A quieter',
    'hero.titleB':        'kind of',
    'hero.titleC':        'luxury.',
    'hero.body':          'A private portfolio of residences for those who would rather not be seen looking. Off-market listings, restored landmarks, and the kind of houses found by being told.',
    'hero.viewPortfolio': 'View Portfolio',
    'hero.requestPrivate':'Request Private Access',
    'hero.vlabel':        '§ 01 — A Private Portfolio',
    'hero.statline':      'Currently 47 active listings · 12 off-market · $1.2B portfolio value',
    'hero.scroll':        'Scroll',

    /* — Listings — */
    'listings.eyebrow':   'The Portfolio',
    'listings.kicker':    '§ 02 — Current Houses',
    'listings.title1':    'Six houses,',
    'listings.title2':    'rarely shown.',
    'listings.lede':      'A small set of residences open for private viewing this season. Off-market listings, restored landmarks, and architectural homes — by introduction.',
    'listings.all':       'View All Houses',
    'listings.viewMore':  'Enquire',

    /* — Founder — */
    'founder.vlabel':     '§ 02 — The Founder',
    'founder.eyebrow':    'A Letter from the Founder',
    'founder.title1':     'I started with one',
    'founder.titleEm':    'house.',
    'founder.p1':         'A 1924 Mediterranean on a one-block lane in Bel Air. The owners did not want it on the market. They wanted it to find the right family.',
    'founder.p2a':        'Ten years and ninety-three residences later, AK Real Estate is the same practice. We do not list. We ',
    'founder.p2em':       'introduce.',
    'founder.p3':         'Most of our portfolio is off-market. Most of our clients are referred. All of our houses are seen on a quiet afternoon, by appointment, never in groups.',
    'founder.cta':        'Read the Story',
    'founder.imgcap':     'A. Kane · Founder',
    'founder.imgsub':     'Photographed by Lila Verriér  ·  Brentwood, 2024',

    /* — Concierge — */
    'conc.vlabel':        '§ 03 — Why Work With Us',
    'conc.eyebrowNum':    'The Practice',
    'conc.titleA':        'Four services.',
    'conc.titleB':        'One',
    'conc.titleEm':       'handshake.',
    'conc.lede':          'From the first quiet viewing to the season the gardener is hired, one principal walks beside you. We do not pass clients to a team. The team is the principal.',
    'conc.s1t':           'Acquisition',
    'conc.s1b':           'Sourcing off-market listings, restored landmarks, and architecturally significant residences across California and beyond.',
    'conc.s2t':           'White-Glove Concierge',
    'conc.s2b':           'A single point of contact for the entire arc — viewings, due diligence, design, staffing, and handover.',
    'conc.s3t':           'Discreet Sale',
    'conc.s3b':           'Selling without a sign. A vetted buyer pool, private viewings, and a closing that never appears in print.',
    'conc.s4t':           'Stewardship',
    'conc.s4b':           'Year-round oversight for the residences in our portfolio — caretakers, restoration projects, and seasonal openings.',
    'conc.imgEyebrow':    'A Private Showing',
    'conc.imgTitleA':     'By appointment.',
    'conc.imgTitleB':     'Never in',
    'conc.imgTitleEm':    'groups.',
    'conc.ctaText':       'Begin a quiet conversation.',
    'conc.ctaBtn':        'Request Consultation →',

    /* — Editorial — */
    'ed.eyebrow':         'Issue 14 · Field Notes',
    'ed.title':           'Notes from the Quiet Market',
    'ed.body':            'A monthly letter on architecture, restoration, and the houses passing through our hands. Read by collectors, restorers, and the occasional client.',
    'ed.cta':             'Subscribe',

    /* — Press — */
    'press.eyebrow':      'In Print',
    'press.title':        'Featured in.',
    'press.body':         'Selected mentions, conversations, and features from the publications we trust most.',

    /* — AppPromo — */
    'app.eyebrow':        'The Companion App',
    'app.title':          'The portfolio, in your pocket.',
    'app.body':           'Browse current listings, schedule a private viewing, and receive new arrivals as they appear.',
    'app.cta':            'Request Beta Access',

    /* — Journal — */
    'journal.eyebrow':    'The Journal',
    'journal.title':      'Field notes.',
    'journal.body':       'Long-form essays on architecture, restoration, and the discipline of a private practice.',
    'journal.cta':        'Read All Issues',

    /* — Contact — */
    'contact.eyebrow':    'A Quiet Letter',
    'contact.titleA':     'Begin with a',
    'contact.titleEm':    'letter.',
    'contact.body':       'Tell us who you are and what you are looking for. We respond within forty-eight hours.',
    'contact.name':       'Your Name',
    'contact.email':      'Email Address',
    'contact.message':    'Your Message',
    'contact.send':       'Send Letter',
    'contact.la':         'Los Angeles',
    'contact.montecito':  'Montecito',
    'contact.direct':     'Direct',

    /* — Footer — */
    'ft.tagline':         'A Quieter Practice',
    'ft.tagBody':         'A private real estate practice founded in 2014. We work with a small number of clients on a small number of houses, every year, by introduction only.',
    'ft.subscribe':       'Subscribe to the Journal',
    'ft.g1':              'Portfolio',
    'ft.g1.1':            'Featured Listings',
    'ft.g1.2':            'Off-Market',
    'ft.g1.3':            'Restored Landmarks',
    'ft.g1.4':            'Architectural',
    'ft.g1.5':            'Sold',
    'ft.g2':              'Practice',
    'ft.g2.1':            'Mortgage Consultant',
    'ft.g2.2':            'Turnkey Renovation',
    'ft.g2.3':            'Interior Design',
    'ft.g2.4':            'Acquisition',
    'ft.g2.5':            'Discreet Sale',
    'ft.g3':              'Journal',
    'ft.g3.1':            'Field Notes',
    'ft.g3.2':            'Architecture',
    'ft.g3.3':            'Market',
    'ft.g3.4':            'Issue Archive',
    'ft.g4':              'Contact',
    'ft.g4.1':            'Los Angeles',
    'ft.g4.2':            'Montecito',
    'ft.g4.3':            'Direct',
    'ft.g4.4':            'Newsletter',
    'ft.copy':            '© 2026 AK Real Estate, Inc.',
    'ft.privacy':         'Privacy',
    'ft.terms':           'Terms',
    'ft.access':          'Accessibility',
    'ft.fair':            'Fair Housing',
    'ft.motto':           'A Quieter Kind of Luxury',

    /* — Services page — */
    'sv.heroVLabel':      '§ — Complete Home Solutions',
    'sv.heroEyebrow':     'The Practice · Beyond the Keys',
    'sv.heroTitle':       'Services',
    'sv.heroLeadA':       'Complete home solutions — from financing to ',
    'sv.heroLeadEm':      'finished interiors.',
    'sv.heroBody':        'A short list of disciplines we run in-house, by the same principal who walks you through the door. Quiet, considered, end to end.',
    'sv.threeDisc':       'Three Disciplines',
    'sv.indexList':       'I · Mortgage  ·  II · Renovation  ·  III · Interior',

    'sv.s1title':         'Mortgage Consultant',
    'sv.s1eyebrow':       'Financing · Advisory',
    'sv.s1body':          'Professional support in choosing the right financing option, comparing bank offers, and guiding the client through the entire approval process.',
    'sv.s1cap':           'Lending advisory · Private engagements',
    'sv.s1enquire':       'Enquire about Mortgage',

    'sv.s2title':         'Turnkey Renovation',
    'sv.s2eyebrow':       'Project · Build',
    'sv.s2body':          'Full organization and management of the renovation process — from planning and materials to execution and final handover.',
    'sv.s2cap':           'Trades managed · Single principal',
    'sv.s2enquire':       'Enquire about Turnkey',

    'sv.s3title':         'Interior Design',
    'sv.s3eyebrow':       'Design · Atelier',
    'sv.s3body':          'Tailored interior solutions designed around the space, style, and lifestyle of the client.',
    'sv.s3cap':           'Bespoke interiors · By appointment',
    'sv.s3enquire':       'Enquire about Interior',

    'sv.disc':            'Discipline',
    'sv.of':              'of',

    'sv.ctaEyebrow':      'Step into the conversation',
    'sv.ctaTitleA':       'Begin with a',
    'sv.ctaTitleEm':      'private',
    'sv.ctaTitleB':       'consultation.',
    'sv.ctaBody':         'One letter, one call. We respond within forty-eight hours with a discreet recommendation on which of the three disciplines fits the residence and the moment.',
    'sv.ctaBtn':          'Request Consultation →',
    'sv.ctaReturn':       'Return to Portfolio',
    'sv.ctaMeta':         'Los Angeles  ·  Montecito  ·  By appointment only',
    'sv.ctaMotto':        'A Quieter Kind of Luxury',
  },

  bg: {
    /* — Nav — */
    'nav.listings':       'Имоти',
    'nav.services':       'Услуги',
    'nav.contact':        'Контакт',
    'nav.requestAccess':  'Заявете достъп',

    /* — Hero — */
    'hero.meta':          'От 2014 · Лос Анджелис · Извън пазара',
    'hero.titleA':        'По-спокоен',
    'hero.titleB':        'вид',
    'hero.titleC':        'лукс.',
    'hero.body':          'Частно портфолио от резиденции за тези, които предпочитат да не бъдат забелязвани. Имоти извън пазара, реставрирани забележителности и онези домове, които се откриват само с препоръка.',
    'hero.viewPortfolio': 'Виж портфолиото',
    'hero.requestPrivate':'Заявка за частен достъп',
    'hero.vlabel':        '§ 01 — Частно портфолио',
    'hero.statline':      'Активни оферти 47 · 12 извън пазара · $1.2 млрд. стойност',
    'hero.scroll':        'Превърти',

    /* — Listings — */
    'listings.eyebrow':   'Портфолиото',
    'listings.kicker':    '§ 02 — Актуални имоти',
    'listings.title1':    'Шест дома,',
    'listings.title2':    'рядко показвани.',
    'listings.lede':      'Малък подбор от резиденции, отворени за частно посещение този сезон. Имоти извън пазара, реставрирани забележителности и архитектурни домове — по покана.',
    'listings.all':       'Виж всички домове',
    'listings.viewMore':  'Запитване',

    /* — Founder — */
    'founder.vlabel':     '§ 02 — Основателят',
    'founder.eyebrow':    'Писмо от основателя',
    'founder.title1':     'Започнах с една',
    'founder.titleEm':    'къща.',
    'founder.p1':         'Средиземноморски имот от 1924 г. на тиха пресечка в Бел Еър. Собствениците не искаха да го пуснат на пазара. Искаха да намери правилното семейство.',
    'founder.p2a':        'Десет години и деветдесет и три резиденции по-късно, AK Real Estate е същата практика. Ние не публикуваме обяви. Ние ',
    'founder.p2em':       'представяме.',
    'founder.p3':         'Голяма част от портфолиото е извън пазара. Повечето клиенти идват с препоръка. Всички домове се разглеждат тихо, по уговорка, никога в групи.',
    'founder.cta':        'Прочети историята',
    'founder.imgcap':     'А. Кейн · Основател',
    'founder.imgsub':     'Снимка: Лила Вериер  ·  Брентууд, 2024',

    /* — Concierge — */
    'conc.vlabel':        '§ 03 — Защо с нас',
    'conc.eyebrowNum':    'Практиката',
    'conc.titleA':        'Четири услуги.',
    'conc.titleB':        'Едно',
    'conc.titleEm':       'ръкостискане.',
    'conc.lede':          'От първия тих оглед до сезона, в който се наема градинарят, един партньор е до вас. Не предаваме клиентите на екип. Екипът е партньорът.',
    'conc.s1t':           'Придобиване',
    'conc.s1b':           'Намиране на оферти извън пазара, реставрирани забележителности и архитектурно значими резиденции в Калифорния и отвъд нея.',
    'conc.s2t':           'Консиерж услуга',
    'conc.s2b':           'Една точка на контакт за целия процес — огледи, проверки, дизайн, персонал и предаване.',
    'conc.s3t':           'Дискретна продажба',
    'conc.s3b':           'Продажба без табела. Подбран кръг от купувачи, частни огледи и сделка, която никога не достига до пресата.',
    'conc.s4t':           'Поддръжка',
    'conc.s4b':           'Целогодишно наблюдение на резиденциите от портфолиото — поддръжка, реставрации и сезонни отваряния.',
    'conc.imgEyebrow':    'Частен оглед',
    'conc.imgTitleA':     'По уговорка.',
    'conc.imgTitleB':     'Никога в',
    'conc.imgTitleEm':    'групи.',
    'conc.ctaText':       'Започнете тих разговор.',
    'conc.ctaBtn':        'Заявка за консултация →',

    /* — Editorial — */
    'ed.eyebrow':         'Брой 14 · Бележки от полето',
    'ed.title':           'Бележки от тихия пазар',
    'ed.body':            'Месечно писмо за архитектура, реставрация и домовете, които минават през нашите ръце. Чете се от колекционери, реставратори и от време на време от клиент.',
    'ed.cta':             'Абонирай се',

    /* — Press — */
    'press.eyebrow':      'В печата',
    'press.title':        'Споменати в.',
    'press.body':         'Подбрани публикации, разговори и материали от изданията, на които се доверяваме най-много.',

    /* — AppPromo — */
    'app.eyebrow':        'Приложението',
    'app.title':          'Портфолиото — в джоба ви.',
    'app.body':           'Разгледайте актуалните имоти, насрочете частен оглед и получавайте новите попълнения веднага щом се появят.',
    'app.cta':            'Заявка за бета достъп',

    /* — Journal — */
    'journal.eyebrow':    'Дневникът',
    'journal.title':      'Бележки от полето.',
    'journal.body':       'Дълги есета за архитектура, реставрация и дисциплината на частната практика.',
    'journal.cta':        'Прочети всички броеве',

    /* — Contact — */
    'contact.eyebrow':    'Тихо писмо',
    'contact.titleA':     'Започнете с едно',
    'contact.titleEm':    'писмо.',
    'contact.body':       'Кажете ни кои сте и какво търсите. Отговаряме в рамките на четиридесет и осем часа.',
    'contact.name':       'Вашето име',
    'contact.email':      'Имейл адрес',
    'contact.message':    'Вашето съобщение',
    'contact.send':       'Изпрати писмо',
    'contact.la':         'Лос Анджелис',
    'contact.montecito':  'Монтесито',
    'contact.direct':     'Директно',

    /* — Footer — */
    'ft.tagline':         'Тиха практика',
    'ft.tagBody':         'Частна агенция за луксозни имоти, основана през 2014 г. Работим с малък брой клиенти върху малък брой домове всяка година, само по покана.',
    'ft.subscribe':       'Абонирай се за дневника',
    'ft.g1':              'Портфолио',
    'ft.g1.1':            'Избрани оферти',
    'ft.g1.2':            'Извън пазара',
    'ft.g1.3':            'Реставрирани',
    'ft.g1.4':            'Архитектурни',
    'ft.g1.5':            'Продадени',
    'ft.g2':              'Практика',
    'ft.g2.1':            'Ипотечен консултант',
    'ft.g2.2':            'Ремонт до ключ',
    'ft.g2.3':            'Интериорен дизайн',
    'ft.g2.4':            'Придобиване',
    'ft.g2.5':            'Дискретна продажба',
    'ft.g3':              'Дневник',
    'ft.g3.1':            'Бележки',
    'ft.g3.2':            'Архитектура',
    'ft.g3.3':            'Пазар',
    'ft.g3.4':            'Архив на броевете',
    'ft.g4':              'Контакт',
    'ft.g4.1':            'Лос Анджелис',
    'ft.g4.2':            'Монтесито',
    'ft.g4.3':            'Директно',
    'ft.g4.4':            'Бюлетин',
    'ft.copy':            '© 2026 AK Real Estate, Inc.',
    'ft.privacy':         'Поверителност',
    'ft.terms':           'Условия',
    'ft.access':          'Достъпност',
    'ft.fair':            'Равни възможности',
    'ft.motto':           'По-спокоен вид лукс',

    /* — Services page — */
    'sv.heroVLabel':      '§ — Цялостни решения за дома',
    'sv.heroEyebrow':     'Практиката · Отвъд ключовете',
    'sv.heroTitle':       'Услуги',
    'sv.heroLeadA':       'Цялостни решения за дома — от финансиране до ',
    'sv.heroLeadEm':      'завършен интериор.',
    'sv.heroBody':        'Кратък списък от дисциплини, които управляваме сами, с един и същи партньор, който ви съпровожда от началото. Тихо, обмислено, от край до край.',
    'sv.threeDisc':       'Три дисциплини',
    'sv.indexList':       'I · Ипотека  ·  II · Ремонт  ·  III · Интериор',

    'sv.s1title':         'Ипотечен консултант',
    'sv.s1eyebrow':       'Финансиране · Консултация',
    'sv.s1body':          'Професионална подкрепа при избора на подходящо финансиране, сравнение на банкови оферти и водене на клиента през целия процес на одобрение.',
    'sv.s1cap':           'Кредитна консултация · Частни ангажименти',
    'sv.s1enquire':       'Запитване за ипотека',

    'sv.s2title':         'Ремонт до ключ',
    'sv.s2eyebrow':       'Проект · Строеж',
    'sv.s2body':          'Пълна организация и управление на ремонтния процес — от планиране и материали до изпълнение и финално предаване.',
    'sv.s2cap':           'Управление на занаятчии · Един партньор',
    'sv.s2enquire':       'Запитване за ремонт',

    'sv.s3title':         'Интериорен дизайн',
    'sv.s3eyebrow':       'Дизайн · Ателие',
    'sv.s3body':          'Индивидуални интериорни решения, изградени около пространството, стила и начина на живот на клиента.',
    'sv.s3cap':           'Уникален интериор · По уговорка',
    'sv.s3enquire':       'Запитване за интериор',

    'sv.disc':            'Дисциплина',
    'sv.of':              'от',

    'sv.ctaEyebrow':      'Започнете разговора',
    'sv.ctaTitleA':       'Започнете с',
    'sv.ctaTitleEm':      'частна',
    'sv.ctaTitleB':       'консултация.',
    'sv.ctaBody':         'Едно писмо, едно обаждане. Отговаряме в рамките на четиридесет и осем часа с дискретна препоръка коя от трите дисциплини е най-подходяща за дома и момента.',
    'sv.ctaBtn':          'Заявка за консултация →',
    'sv.ctaReturn':       'Обратно към портфолиото',
    'sv.ctaMeta':         'Лос Анджелис  ·  Монтесито  ·  Само по уговорка',
    'sv.ctaMotto':        'По-спокоен вид лукс',
  },
};

const AkLangContext = React.createContext({ lang: 'en', setLang: () => {} });

function AkLangProvider({ children }) {
  const [lang, setLangState] = React.useState(() => {
    try { return localStorage.getItem('ak.lang') || 'en'; } catch (e) { return 'en'; }
  });
  const setLang = React.useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem('ak.lang', l); } catch (e) {}
    document.documentElement.setAttribute('lang', l);
  }, []);
  React.useEffect(() => { document.documentElement.setAttribute('lang', lang); }, [lang]);
  return (
    <AkLangContext.Provider value={{ lang, setLang }}>
      {children}
    </AkLangContext.Provider>
  );
}

function useT() {
  const { lang } = React.useContext(AkLangContext);
  return React.useCallback((key) => {
    const table = AK_TRANSLATIONS[lang] || AK_TRANSLATIONS.en;
    return table[key] !== undefined ? table[key] : (AK_TRANSLATIONS.en[key] !== undefined ? AK_TRANSLATIONS.en[key] : key);
  }, [lang]);
}

function useLang() {
  return React.useContext(AkLangContext);
}

/* Language switcher — twin labels EN / BG with crimson underline on active. */
function LangSwitcher({ style }) {
  const { lang, setLang } = useLang();
  const items = [{ id: 'en', label: 'EN' }, { id: 'bg', label: 'BG' }];
  return (
    <div role="group" aria-label="Language"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 10px',
        border: '1px solid var(--hairline-light)',
        ...style,
      }}>
      {items.map((it, i) => {
        const active = lang === it.id;
        return (
          <React.Fragment key={it.id}>
            {i > 0 && <span style={{ width: 1, height: 10, background: 'var(--hairline-light)' }}></span>}
            <button onClick={() => setLang(it.id)} type="button"
              style={{
                background: 'transparent', border: 0, cursor: 'pointer',
                padding: '2px 4px',
                fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: active ? 'var(--ak-crimson)' : 'var(--fg)',
                position: 'relative',
                transition: 'color .28s var(--ease)',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--ak-crimson)'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--fg)'; }}>
              {it.label}
              {active && (
                <span style={{ position: 'absolute', left: 4, right: 4, bottom: -2,
                  height: 1, background: 'var(--ak-crimson)' }}></span>
              )}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

Object.assign(window, { AkLangProvider, useT, useLang, LangSwitcher });

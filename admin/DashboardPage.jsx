// DashboardPage — section title + 4 stat cards + latest listings + activity.

function getImageUrl(image) {
  if (!image) return '';
  let raw = typeof image === 'string' ? image
    : (image.url || image.publicUrl || image.public_url || image.image_url || image.src || image.path || '');
  if (!raw) return '';
  if (raw.startsWith('blob:') || raw.startsWith('data:')) return raw;
  if (raw.startsWith('http')) return raw;
  const base = (window.AK_SUPABASE_URL || 'https://ylyilqwoiyirodigshgd.supabase.co').replace(/\/$/, '');
  if (raw.includes('/storage/v1/object/public/')) return base + raw.substring(raw.indexOf('/storage/v1/object/public/'));
  if (raw.includes('/')) return base + '/storage/v1/object/public/' + raw;
  return base + '/storage/v1/object/public/listing-images/' + raw;
}

const DASH_T = {
  bg: {
    'Admin · Overview':       'Администрация · Преглед',
    'The portfolio,':         'Портфолиото,',
    'quietly.':               'тихо.',
    '＋ New Listing':          '＋ Нов имот',
    'Total Listings':         'Всички имоти',
    'all statuses':           'всички статуси',
    'Active':                 'Активен',
    'visible publicly':       'публично видими',
    'Draft':                  'Чернова',
    'admin-only':             'само администратор',
    'Sold / Rented':          'Продадени / Отдадени',
    'closed deals':           'приключени сделки',
    'Featured':               'Препоръчани',
    'on home page':           'на началната страница',
    'Active Portfolio Value': 'Стойност на активните',
    'sum of active':          'сума на активните',
    'Avg. Price':             'Средна цена',
    'all listings':           'всички имоти',
    'Cities':                 'Градове',
    'markets covered':        'покрити пазари',
    'Latest Listings':        'Последни имоти',
    'View All ↗':             'Виж всички ↗',
    'Recent Activity':        'Последна активност',
    'Full Activity Log →':    'Виж всички имоти →',
    'published':              'публикуван',
    'price updated':          'с обновена цена',
    'marked sold':            'отбелязан продаден',
    'saved as draft':         'запазен като чернова',
    'published for rent':     'публикуван под наем',
    // status badge labels
    'Sold':                   'Продаден',
    'Rented':                 'Отдаден',
    'Edit':                   'Редакция',
    'No activity yet.':       'Все още няма активност.',
  },
  en: {
    'Admin · Overview':       'Admin · Overview',
    'The portfolio,':         'The portfolio,',
    'quietly.':               'quietly.',
    '＋ New Listing':          '＋ New Listing',
    'Total Listings':         'Total Listings',
    'all statuses':           'all statuses',
    'Active':                 'Active',
    'visible publicly':       'visible publicly',
    'Draft':                  'Draft',
    'admin-only':             'admin-only',
    'Sold / Rented':          'Sold / Rented',
    'closed deals':           'closed deals',
    'Featured':               'Featured',
    'on home page':           'on home page',
    'Active Portfolio Value': 'Active Portfolio Value',
    'sum of active':          'sum of active',
    'Avg. Price':             'Avg. Price',
    'all listings':           'all listings',
    'Cities':                 'Cities',
    'markets covered':        'markets covered',
    'Latest Listings':        'Latest Listings',
    'View All ↗':             'View All ↗',
    'Recent Activity':        'Recent Activity',
    'Full Activity Log →':    'View all listings →',
    'published':              'published',
    'price updated':          'price updated',
    'marked sold':            'marked sold',
    'saved as draft':         'saved as draft',
    'published for rent':     'published for rent',
    // status badge labels
    'Sold':                   'Sold',
    'Rented':                 'Rented',
    'Edit':                   'Edit',
    'No activity yet.':       'No activity yet.',
  },
};

function useDashLang() {
  const read = () => localStorage.getItem('ak-admin-locale') || 'bg';
  const [lang, setLang] = React.useState(read);

  React.useEffect(() => {
    const sync = () => setLang(read());
    window.addEventListener('storage', sync);
    window.addEventListener('ak-admin-locale-change', sync);
    window.addEventListener('focus', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('ak-admin-locale-change', sync);
      window.removeEventListener('focus', sync);
    };
  }, []);

  const t = (key) => (DASH_T[lang] && DASH_T[lang][key]) || key;
  return { t, lang };
}

function translateStatus(status, t) {
  return t(status);
}

// Local status badge — mirrors atoms.jsx StatusBadge styling, text goes through t().
function DashStatusBadge({ status }) {
  const { t } = useDashLang();
  const map = {
    Active:  { bg: 'var(--ak-crimson)', fg: '#fff', border: 'transparent' },
    Draft:   { bg: 'transparent', fg: 'var(--fg-2)', border: 'var(--hairline-light)' },
    Sold:    { bg: 'rgba(176,24,28,.15)', fg: 'var(--ak-crimson-bright)', border: 'rgba(176,24,28,.40)' },
    Rented:  { bg: 'rgba(255,255,255,.05)', fg: 'var(--fg)', border: 'var(--hairline-light)' },
  };
  const s = map[status] || map.Draft;
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px',
      background: s.bg, color: s.fg, border: `1px solid ${s.border}`,
      fontSize: 9, fontWeight: 500, letterSpacing: '0.20em',
      textTransform: 'uppercase', borderRadius: 0,
    }}>{translateStatus(status, t)}</span>
  );
}

function DashboardPage() {
  const { t } = useDashLang();
  const listings = useListings();

  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 980
  );
  React.useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 980);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  const total = listings.length;
  const active = listings.filter(l => l.status === 'Active').length;
  const draft = listings.filter(l => l.status === 'Draft').length;
  const closed = listings.filter(l => l.status === 'Sold' || l.status === 'Rented').length;
  const featured = listings.filter(l => l.featured).length;
  const totalValue = listings.filter(l => l.status === 'Active').reduce((s, l) => s + (l.price || 0), 0);

  const latest = [...listings].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 5);

  return (
    <div className="ak-rise">
      <SectionTitle
        n="00"
        label={t('Admin · Overview')}
        title={t('The portfolio,')}
        accent={t('quietly.')}
        action={<Btn variant="primary" as="a" href="/admin/listings/new">{t('＋ New Listing')}</Btn>}
      />

      {/* stat row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'clamp(12px, 1.4vw, 20px)',
      }}>
        <StatCard label={t('Total Listings')}   value={total}    sub={t('all statuses')} accent="crimson" />
        <StatCard label={t('Active')}           value={active}   sub={t('visible publicly')} />
        <StatCard label={t('Draft')}            value={draft}    sub={t('admin-only')} />
        <StatCard label={t('Sold / Rented')}    value={closed}   sub={t('closed deals')} />
      </div>

      {/* secondary row */}
      <div style={{
        marginTop: 'clamp(12px, 1.4vw, 20px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'clamp(12px, 1.4vw, 20px)',
      }}>
        <StatCard label={t('Featured')}              value={featured} sub={t('on home page')} emphasis="muted" />
        <StatCard label={t('Active Portfolio Value')} value={'$' + (totalValue / 1_000_000).toFixed(1) + 'M'} sub={t('sum of active')} emphasis="muted" />
        <StatCard label={t('Avg. Price')}             value={total ? '$' + Math.round(listings.reduce((s, l) => s + (l.price || 0), 0) / total / 1_000_000) + 'M' : '—'} sub={t('all listings')} emphasis="muted" />
        <StatCard label={t('Cities')}                 value={new Set(listings.map(l => l.city)).size} sub={t('markets covered')} emphasis="muted" />
      </div>

      {/* latest + activity */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 72px)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.4fr) minmax(0, 1fr)',
        gap: 'clamp(20px, 2.4vw, 40px)',
      }}>
        <LatestListings listings={latest} />
        <ActivityPanel listings={listings} />
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, accent, emphasis }) {
  const isCrimson = accent === 'crimson';
  return (
    <div style={{
      position: 'relative',
      background: 'var(--ak-charcoal)',
      border: '1px solid var(--hairline-light)',
      borderTop: `2px solid ${isCrimson ? 'var(--ak-crimson)' : 'transparent'}`,
      padding: 'clamp(20px, 2vw, 28px) clamp(20px, 2vw, 28px)',
      display: 'flex', flexDirection: 'column', gap: 14,
      transition: 'border-color .22s var(--ease)',
      minHeight: 140,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RedSquare size={6} />
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-2)' }}>{label}</span>
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 200,
        fontSize: emphasis === 'muted' ? 'clamp(28px, 3vw, 44px)' : 'clamp(40px, 4.6vw, 64px)',
        lineHeight: 1, letterSpacing: '0.04em',
        color: isCrimson ? 'var(--ak-crimson)' : 'var(--fg)',
        marginTop: 'auto',
      }}>
        {value}
      </div>

      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--fg-3)' }}>
        {sub}
      </div>
    </div>
  );
}

function LatestListings({ listings }) {
  const { t } = useDashLang();
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'end', gap: 16, marginBottom: 18 }}>
        <Eyebrow>{t('Latest Listings')}</Eyebrow>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
        <a href="/admin/listings" style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--fg-2)', textDecoration: 'none',
          borderBottom: '1px solid var(--ak-crimson)', paddingBottom: 2,
        }}>{t('View All ↗')}</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {listings.map(l => <LatestRow key={l.id} listing={l} />)}
      </div>
    </section>
  );
}

function LatestRow({ listing }) {
  const [hover, setHover] = React.useState(false);
  const [isPhone, setIsPhone] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 640
  );
  React.useEffect(() => {
    const fn = () => setIsPhone(window.innerWidth < 640);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const thumb = listing.images ? getImageUrl(listing.images[listing.mainImage]) : '';
  const thumbEl = (size) => (
    <div style={{ width: size, height: size, flexShrink: 0, overflow: 'hidden',
      background: 'var(--ak-graphite)', borderRadius: 2, position: 'relative' }}>
      {thumb && <img src={thumb} alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', filter: 'saturate(.9)' }} />}
    </div>
  );

  if (isPhone) {
    return (
      <a href={`/admin/listings/${listing.id}/edit`}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px', textDecoration: 'none', color: 'var(--fg)',
          borderBottom: '1px solid var(--hairline-light)',
          background: hover ? 'rgba(255,255,255,.02)' : 'transparent',
          transition: 'background .2s var(--ease)',
        }}>
        {thumbEl(48)}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 15,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {listing.title}
          </div>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 3 }}>
            {listing.area} · {listing.city}
          </div>
        </div>
        <DashStatusBadge status={listing.status} />
      </a>
    );
  }

  return (
    <a href={`/admin/listings/${listing.id}/edit`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid', gridTemplateColumns: '64px 1fr auto auto auto',
        gap: 18, alignItems: 'center', padding: '14px 12px',
        textDecoration: 'none', color: 'var(--fg)',
        borderBottom: '1px solid var(--hairline-light)',
        background: hover ? 'rgba(255,255,255,.02)' : 'transparent',
        transition: 'background .2s var(--ease)',
      }}>
      {thumbEl(64)}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 18,
            letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap',
            overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {listing.title}
          </span>
          {listing.featured && <span style={{ color: 'var(--ak-crimson)', fontSize: 12 }}>▪</span>}
        </div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--fg-3)' }}>
          {listing.area} · {listing.city}
        </div>
      </div>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 18,
        color: 'var(--fg)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
        {formatPrice(listing.price, listing.currency, listing.listingType)}
      </span>
      <DashStatusBadge status={listing.status} />
      <span style={{ color: hover ? 'var(--ak-crimson)' : 'var(--fg-3)',
        transition: 'color .2s var(--ease)' }}>›</span>
    </a>
  );
}

function relativeTime(dateStr, lang) {
  if (!dateStr) return lang === 'en' ? 'recently' : 'наскоро';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return lang === 'en' ? 'recently' : 'наскоро';
  const diffMs = Date.now() - d.getTime();
  if (diffMs < 0) return lang === 'en' ? 'recently' : 'наскоро';
  const mins   = Math.floor(diffMs / 60000);
  const hours  = Math.floor(mins / 60);
  const days   = Math.floor(hours / 24);
  const weeks  = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  if (lang === 'en') {
    if (mins  < 2)  return 'just now';
    if (mins  < 60) return `${mins} min ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days  < 7)  return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (weeks < 5)  return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }
  if (mins  < 2)  return 'току-що';
  if (mins  < 60) return `преди ${mins} мин.`;
  if (hours < 24) return `преди ${hours} ${hours === 1 ? 'час' : 'часа'}`;
  if (days  < 7)  return `преди ${days} ${days === 1 ? 'ден' : 'дни'}`;
  if (weeks < 5)  return `преди ${weeks} ${weeks === 1 ? 'седмица' : 'седмици'}`;
  return `преди ${months} ${months === 1 ? 'месец' : 'месеца'}`;
}

function activityLabel(listing, lang) {
  const { status, listingType } = listing;
  if (status === 'Active' && listingType === 'Sale') return lang === 'en' ? 'published for sale'  : 'публикуван за продажба';
  if (status === 'Active' && listingType === 'Rent') return lang === 'en' ? 'published for rent'  : 'публикуван под наем';
  if (status === 'Draft')   return lang === 'en' ? 'saved as draft' : 'запазен като чернова';
  if (status === 'Sold')    return lang === 'en' ? 'marked sold'    : 'отбелязан продаден';
  if (status === 'Rented')  return lang === 'en' ? 'marked rented'  : 'отбелязан отдаден';
  return lang === 'en' ? 'updated' : 'обновен';
}

function ActivityPanel({ listings }) {
  const { t, lang } = useDashLang();

  const items = React.useMemo(() => {
    return [...listings]
      .sort((a, b) => {
        const da = a.updatedAt || a.createdAt || '';
        const db = b.updatedAt || b.createdAt || '';
        return db.localeCompare(da);
      })
      .slice(0, 5);
  }, [listings]);

  return (
    <aside style={{
      background: 'var(--ak-charcoal)',
      border: '1px solid var(--hairline-light)',
      padding: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <RedSquare size={6} />
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg)' }}>{t('Recent Activity')}</span>
      </div>

      {items.length === 0 ? (
        <p style={{ margin: '18px 0 0', color: 'var(--fg-3)', fontSize: 13,
          fontWeight: 300, letterSpacing: '0.04em' }}>
          {t('No activity yet.')}
        </p>
      ) : (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0,
          display: 'flex', flexDirection: 'column', gap: 0 }}>
          {items.map((l) => (
            <li key={l.id} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr',
              gap: 16, padding: '14px 0',
              borderTop: '1px solid var(--hairline-light)',
            }}>
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: (l.status === 'Sold' || l.status === 'Rented') ? 'var(--ak-crimson-bright)' :
                       l.status === 'Active' ? 'var(--fg)' : 'var(--fg-3)',
              }}>{translateStatus(l.status, t)}</span>
              <div>
                <div style={{ fontSize: 13, color: 'var(--fg)', fontWeight: 300, lineHeight: 1.4 }}>
                  {l.title} {activityLabel(l, lang)}
                </div>
                <div style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.18em',
                  textTransform: 'uppercase', marginTop: 4 }}>
                  {relativeTime(l.updatedAt || l.createdAt, lang)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--hairline-light)' }}>
        <a href="/admin/listings" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--fg-2)', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          borderBottom: '1px solid var(--ak-crimson)', paddingBottom: 2 }}>
          {t('Full Activity Log →')}
        </a>
      </div>
    </aside>
  );
}

Object.assign(window, { DashboardPage, StatCard });

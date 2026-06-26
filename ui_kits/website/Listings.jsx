// Listings — masonry property grid.
// featuredOnly=true  → home page: Supabase fetch (Active+featured), AKStore fallback, no filter chips.
// featuredOnly=false → full listings page: all public listings via AKStore with filter chips.

// ─── Normalize a row from Supabase (snake_case) or AKStore (camelCase) ───────
function normalizeListing(row) {
  return {
    id:          row.id,
    title:       row.title          || '',
    city:        row.city           || '',
    area:        row.area           || '',
    status:      row.status         || 'Active',
    featured:    row.featured       ?? false,
    listingType: row.listingType    || row.listing_type    || 'Sale',
    price:       row.price          || 0,
    currency:    row.currency       || 'USD',
    bedrooms:    row.bedrooms       || '',
    bathrooms:   row.bathrooms      || '',
    areaSqm:     row.areaSqm        || row.area_sqm        || '',
    mainImage:   row.mainImage      != null ? row.mainImage
                 : row.main_image  != null ? row.main_image : 0,
    images:      row.images         || [],
    createdAt:   row.createdAt      || row.created_at      || '',
  };
}

// ─── AKStore hook (full listing page) ────────────────────────────────────────
function useStoreListings() {
  const [list, setList] = React.useState(window.AKStore.publicListings());
  React.useEffect(() => {
    const fn = () => setList(window.AKStore.publicListings());
    return window.AKStore.on(fn);
  }, []);
  return list;
}

// ─── Main component ───────────────────────────────────────────────────────────
function Listings({ featuredOnly = false, lang = 'bg' }) {
  const all = useStoreListings();
  const isBg = lang !== 'en';

  // Filter definitions — id is the key, label is the translated display text
  const filters = [
    { id: 'All',           label: isBg ? 'Всички'      : 'All',           test: () => true },
    { id: 'For Sale',      label: isBg ? 'Продажба'    : 'For Sale',      test: l => l.listingType === 'Sale' },
    { id: 'For Rent',      label: isBg ? 'Под наем'    : 'For Rent',      test: l => l.listingType === 'Rent' },
    { id: 'Featured',      label: isBg ? 'Препоръчани' : 'Featured',      test: l => l.featured },
    { id: 'Recently Sold', label: isBg ? 'Продадени'   : 'Recently Sold', test: l => l.status === 'Sold' || l.status === 'Rented' },
  ];

  const [filter, setFilter] = React.useState('All');

  // Supabase featured fetch — only active when featuredOnly=true
  const [sbList,  setSbList]  = React.useState(null);
  const [sbReady, setSbReady] = React.useState(false);

  React.useEffect(() => {
    if (!featuredOnly) return;
    let cancelled = false;

    async function fetchFeatured() {
      // 1. Try Supabase with the public anon/publishable key
      if (window.akSupabase) {
        try {
          const { data, error } = await window.akSupabase
            .from('listings')
            .select('*')
            .eq('status', 'Active')
            .eq('featured', true)
            .order('created_at', { ascending: false });
          if (!error && data && data.length > 0 && !cancelled) {
            setSbList(data.map(normalizeListing));
            setSbReady(true);
            return;
          }
        } catch (_) { /* fall through to AKStore */ }
      }
      // 2. Fall back to AKStore (localStorage seed / same-browser admin saves)
      if (!cancelled) {
        const fallback = window.AKStore.publicListings()
          .filter(l => l.status === 'Active' && l.featured)
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setSbList(fallback);
        setSbReady(true);
      }
    }

    fetchFeatured();
    return () => { cancelled = true; };
  }, [featuredOnly]);

  // ── Derive display list ────────────────────────────────────────────────────
  let displayList, activeCount;

  if (featuredOnly) {
    displayList = sbReady ? (sbList || []) : [];
    activeCount = displayList.length;
  } else {
    const current = filters.find(f => f.id === filter) || filters[0];
    displayList = all
      .filter(current.test)
      .sort((a, b) => {
        if (!!b.featured - !!a.featured !== 0) return (!!b.featured) - (!!a.featured);
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      });
    activeCount = all.filter(l => l.status === 'Active').length;
  }

  const top  = displayList.slice(0, 6);
  const rest = displayList.slice(6);
  const spans = [
    { cols: 'span 8', rows: 'span 3' },
    { cols: 'span 4', rows: 'span 4' },
    { cols: 'span 4', rows: 'span 2' },
    { cols: 'span 4', rows: 'span 2' },
    { cols: 'span 5', rows: 'span 3' },
    { cols: 'span 7', rows: 'span 3' },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section style={{ background: 'var(--ak-ink)', color: 'var(--fg)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>

      {/* header */}
      <header className="r-stack-640" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32,
        alignItems: 'end', marginBottom: 'clamp(48px, 6vw, 96px)' }}>
        <div>
          <SectionNumeral n="01" label={isBg ? 'Избрани имоти' : 'Featured Portfolio'} />
          <h2 style={{
            margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 0.96,
            letterSpacing: '0.06em', textTransform: 'uppercase', maxWidth: 900,
          }}>
            {isBg
              ? <>Имоти, които<br/>намират своите <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>хора.</em></>
              : <>Houses that<br />find their <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>people.</em></>
            }
          </h2>
        </div>

        {/* Filter chips — full listing page only */}
        {!featuredOnly && (
          <div style={{ display: 'flex', gap: 24, paddingBottom: 12, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <FilterChip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</FilterChip>
            ))}
          </div>
        )}
      </header>

      {/* Empty state */}
      {top.length === 0 && (
        <div style={{
          padding: '80px 24px', textAlign: 'center',
          border: '1px dashed var(--hairline-light)', background: 'var(--ak-charcoal)',
        }}>
          <span style={{ width: 8, height: 8, background: 'var(--ak-crimson)', display: 'inline-block', marginBottom: 18 }}></span>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28,
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
            {featuredOnly
              ? (isBg ? 'Няма препоръчани имоти в момента.' : 'No featured properties at this time.')
              : (isBg ? 'Портфолиото е тихо за момента.'   : 'The portfolio is quiet at the moment.')}
          </div>
          <p style={{ margin: '0 auto', maxWidth: 460, fontSize: 13, color: 'var(--fg-2)',
            fontWeight: 300, lineHeight: 1.6 }}>
            {featuredOnly
              ? (isBg ? 'Нови имоти се добавят редовно. Напишете ни, за да получавате актуална информация.'
                      : 'New residences are curated continuously. Write to receive the next dispatch.')
              : (isBg ? 'Няма имоти, отговарящи на избрания филтър. Свържете се с нас за актуална информация.'
                      : 'No residences match this filter. New listings are released by invitation — write to receive the next dispatch.')}
          </p>
        </div>
      )}

      {/* Masonry grid — top 6 */}
      {top.length > 0 && (
        <div className="r-masonry" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '180px',
          gap: 'clamp(12px, 1.6vw, 22px)',
        }}>
          {top.map((l, i) => (
            <PropertyCard key={l.id} listing={l} lang={lang}
              cols={spans[i % spans.length].cols}
              rows={spans[i % spans.length].rows} />
          ))}
        </div>
      )}

      {/* Overflow as smaller cards */}
      {rest.length > 0 && (
        <div className="r-overflow-2" style={{
          marginTop: 'clamp(20px, 2.4vw, 32px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'clamp(12px, 1.6vw, 22px)',
        }}>
          {rest.map(l => (
            <PropertyCard key={l.id} listing={l} lang={lang} compact />
          ))}
        </div>
      )}

      {/* Footer strip */}
      <div className="r-listings-foot" style={{ marginTop: 'clamp(48px, 6vw, 80px)', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          ▪ {activeCount} {featuredOnly
            ? (isBg ? 'препоръчани · актуализирано' : 'featured · updated continuously')
            : (isBg ? 'активни · актуализирано'     : 'active · updated continuously')}
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)', minWidth: 40 }}></span>
        <Btn variant="secondary" as="a" href="/listings">
          {isBg ? 'Всички имоти →' : 'All Listings →'}
        </Btn>
      </div>
    </section>
  );
}

function FilterChip({ children, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'transparent', border: 0, cursor: 'pointer',
        padding: '6px 0', position: 'relative',
        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: active ? 'var(--ak-crimson)' : (hover ? 'var(--fg)' : 'var(--fg-2)'),
        transition: 'color .28s var(--ease)',
        borderBottom: active ? '1px solid var(--ak-crimson)' : '1px solid transparent',
      }}>
      {children}
    </button>
  );
}

function getImageUrl(image) {
  if (!image) return '';
  let raw = typeof image === 'string' ? image
    : (image.url || image.publicUrl || image.public_url || image.image_url || image.src || image.path || '');
  if (!raw) return '';
  if (raw.startsWith('blob:') || raw.startsWith('data:')) return raw;
  if (raw.startsWith('http')) return raw.replace(/^http:\/\//i, 'https://');
  const base = (window.AK_SUPABASE_URL || 'https://ylyilqwoiyirodigshgd.supabase.co').replace(/\/$/, '');
  if (raw.includes('/storage/v1/object/public/')) return base + raw.substring(raw.indexOf('/storage/v1/object/public/'));
  if (raw.includes('/')) return base + '/storage/v1/object/public/' + raw;
  return base + '/storage/v1/object/public/listing-images/' + raw;
}

function PropertyCard({ listing, cols, rows, compact, lang = 'bg', 'aria-label': ariaLabel }) {
  const [hover, setHover] = React.useState(false);
  const img = getImageUrl((listing.images && listing.images[listing.mainImage]) || (listing.images && listing.images[0]));
  const isClosed = listing.status === 'Sold' || listing.status === 'Rented';
  const isBg = lang !== 'en';

  let tag = null;
  if (listing.status === 'Sold')        tag = { label: isBg ? 'Продаден'  : 'Sold',     bg: 'rgba(176,24,28,.92)', fg: '#fff' };
  else if (listing.status === 'Rented') tag = { label: isBg ? 'Отдаден'   : 'Rented',   bg: 'rgba(0,0,0,.65)',    fg: '#fff' };
  else if (listing.featured)            tag = { label: isBg ? 'Препоръчан': 'Featured',  bg: 'var(--ak-crimson)',  fg: '#fff' };

  const isRecent = listing.createdAt && (Date.now() - new Date(listing.createdAt).getTime() < 30 * 86400000);
  if (!tag && isRecent && listing.status === 'Active') {
    tag = { label: isBg ? 'Нов' : 'New', bg: 'var(--ak-crimson)', fg: '#fff' };
  }

  return (
    <a href={'/listing?id=' + listing.id}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      aria-label={`${listing.title}${listing.area ? ', ' + listing.area : ''}${listing.city ? ', ' + listing.city : ''}`}
      style={{
        gridColumn: cols, gridRow: rows,
        position: 'relative', overflow: 'hidden', borderRadius: 4,
        background: 'var(--ak-charcoal)', textDecoration: 'none', color: 'var(--fg)',
        display: 'block', cursor: 'pointer',
        aspectRatio: compact ? '4/5' : undefined,
        minHeight: compact ? 320 : undefined,
        opacity: isClosed ? 0.92 : 1,
      }}>
      {/* image */}
      {img && (
        <img src={img} alt={listing.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                   objectFit: 'cover', transform: hover ? 'scale(1.05)' : 'scale(1)',
                   transition: 'transform .9s var(--ease)',
                   filter: isClosed ? 'saturate(.55) contrast(1.04) brightness(.85)' : 'saturate(.9) contrast(1.04)' }} />
      )}
      {/* scrim */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.10) 40%, rgba(0,0,0,.85) 100%)' }}></div>

      {/* sold/rented diagonal stamp */}
      {isClosed && !compact && (
        <span style={{
          position: 'absolute', top: 24, right: -36,
          background: listing.status === 'Sold' ? 'var(--ak-crimson)' : 'rgba(0,0,0,.8)',
          color: '#fff', padding: '6px 50px', transform: 'rotate(35deg)',
          fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 14,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,.20)', pointerEvents: 'none',
        }}>{listing.status === 'Sold' ? (isBg ? 'Продаден' : 'Sold') : (isBg ? 'Отдаден' : 'Rented')}</span>
      )}

      {/* corner tag */}
      {tag && (
        <span style={{ position: 'absolute', top: 16, right: 16,
          background: tag.bg, color: tag.fg,
          fontSize: 9, fontWeight: 500, letterSpacing: '0.20em',
          textTransform: 'uppercase', padding: '5px 10px', borderRadius: 0,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          {listing.featured && tag.label === (isBg ? 'Препоръчан' : 'Featured') && <span>★</span>}
          {tag.label}
        </span>
      )}

      {/* meta block */}
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18 }}>
        {/* location + listing type */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RedSquare size={6} />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-2)' }}>{listing.area || listing.city || '—'}</span>
          </div>
          {listing.listingType && (
            <span style={{
              fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              padding: '3px 7px', border: '1px solid rgba(245,241,234,.25)', color: 'var(--fg-2)',
            }}>
              {listing.listingType === 'Rent'
                ? (isBg ? 'Наем' : 'For Rent')
                : (isBg ? 'Продажба' : 'For Sale')}
            </span>
          )}
        </div>

        <h3 style={{
          margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: compact ? 'clamp(20px,1.8vw,26px)' : 'clamp(22px, 2.6vw, 38px)', lineHeight: 1.0,
          letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg)',
        }}>{listing.title || '—'}</h3>

        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 12,
          paddingTop: 12, borderTop: '1px solid rgba(245,241,234,.20)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--fg-2)' }}>
              {listing.bedrooms ? `${listing.bedrooms} ${isBg ? 'ст' : 'br'}` : '—'}
              {' · '}
              {listing.areaSqm ? `${listing.areaSqm} m²` : '—'}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: compact ? 16 : 'clamp(18px, 1.8vw, 24px)', color: 'var(--fg)',
              letterSpacing: '0.04em', marginTop: 4,
              textDecoration: isClosed ? 'line-through' : 'none',
              textDecorationColor: 'rgba(255,255,255,.35)' }}>
              {window.formatPrice(listing.price, listing.currency, listing.listingType)}
            </div>
          </div>
          <span style={{
            fontSize: 9, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: hover ? 'var(--ak-crimson)' : 'var(--fg-3)',
            transition: 'color .3s var(--ease)', flexShrink: 0, marginLeft: 12,
          }}>
            {isBg ? 'Виж →' : 'View →'}
          </span>
        </div>

        {/* hover crimson hairline */}
        <span style={{ position: 'absolute', left: 0, bottom: -8, height: 1,
          width: hover ? '28%' : 0, background: 'var(--ak-crimson)',
          transition: 'width .6s var(--ease)' }}></span>
      </div>
    </a>
  );
}

Object.assign(window, { Listings, PropertyCard, FilterChip });

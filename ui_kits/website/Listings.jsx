// Listings — masonry-style grid driven by the shared AKStore.
// - Active listings show normally
// - Sold/Rented listings stay visible with a status badge
// - Draft listings are NEVER shown publicly
// - Featured listings are pinned to the front of the grid

function useStoreListings() {
  const [list, setList] = React.useState(window.AKStore.publicListings());
  React.useEffect(() => {
    const fn = () => setList(window.AKStore.publicListings());
    return window.AKStore.on(fn);
  }, []);
  return list;
}

function Listings() {
  const all = useStoreListings();

  // Filter chips
  const [filter, setFilter] = React.useState('All');
  const filters = [
    { id: 'All',          test: () => true },
    { id: 'For Sale',     test: l => l.listingType === 'Sale' },
    { id: 'For Rent',     test: l => l.listingType === 'Rent' },
    { id: 'Featured',     test: l => l.featured },
    { id: 'Recently Sold', test: l => l.status === 'Sold' || l.status === 'Rented' },
  ];

  const current = filters.find(f => f.id === filter) || filters[0];
  // Featured first, then by createdAt desc
  const filtered = all
    .filter(current.test)
    .sort((a, b) => {
      if (!!b.featured - !!a.featured !== 0) return (!!b.featured) - (!!a.featured);
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });

  // Counts shown publicly
  const activeCount = all.filter(l => l.status === 'Active').length;

  // Determine masonry spans deterministically from index — we want a max of 6 cards
  // shown in the marquee; the rest fall into a smaller grid below.
  const top = filtered.slice(0, 6);
  const rest = filtered.slice(6);
  const spans = [
    { cols: 'span 8', rows: 'span 3' },
    { cols: 'span 4', rows: 'span 4' },
    { cols: 'span 4', rows: 'span 2' },
    { cols: 'span 4', rows: 'span 2' },
    { cols: 'span 5', rows: 'span 3' },
    { cols: 'span 7', rows: 'span 3' },
  ];

  return (
    <section style={{ background: 'var(--ak-ink)', color: 'var(--fg)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>
      {/* header */}
      <header className="r-stack-640" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32,
        alignItems: 'end', marginBottom: 'clamp(48px, 6vw, 96px)' }}>
        <div>
          <SectionNumeral n="01" label="Featured Portfolio" />
          <h2 style={{
            margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 0.96,
            letterSpacing: '0.06em', textTransform: 'uppercase', maxWidth: 900,
          }}>
            Houses that<br/>find their <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>people.</em>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 24, paddingBottom: 12, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <FilterChip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.id}</FilterChip>
          ))}
        </div>
      </header>

      {top.length === 0 && (
        <div style={{
          padding: '80px 24px', textAlign: 'center',
          border: '1px dashed var(--hairline-light)', background: 'var(--ak-charcoal)',
        }}>
          <span style={{ width: 8, height: 8, background: 'var(--ak-crimson)', display: 'inline-block', marginBottom: 18 }}></span>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28,
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
            The portfolio is quiet at the moment.
          </div>
          <p style={{ margin: '0 auto', maxWidth: 460, fontSize: 13, color: 'var(--fg-2)',
            fontWeight: 300, lineHeight: 1.6 }}>
            No residences match this filter. New listings are released by invitation — write to receive the next dispatch.
          </p>
        </div>
      )}

      {/* masonry grid */}
      {top.length > 0 && (
        <div className="r-masonry" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '180px',
          gap: 'clamp(12px, 1.6vw, 22px)',
        }}>
          {top.map((l, i) => (
            <PropertyCard key={l.id} listing={l}
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
            <PropertyCard key={l.id} listing={l} compact />
          ))}
        </div>
      )}

      <div className="r-listings-foot" style={{ marginTop: 'clamp(48px, 6vw, 80px)', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          ▪ {activeCount} active &nbsp; · &nbsp; updated continuously
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)', minWidth: 40 }}></span>
        <Btn variant="secondary">All Listings →</Btn>
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

function PropertyCard({ listing, cols, rows, compact }) {
  const [hover, setHover] = React.useState(false);
  const img = (listing.images && listing.images[listing.mainImage]) || (listing.images && listing.images[0]);
  const isClosed = listing.status === 'Sold' || listing.status === 'Rented';

  // Status badge / tag on the card
  let tag = null;
  if (listing.status === 'Sold')   tag = { label: 'Sold',     bg: 'rgba(176,24,28,.92)', fg: '#fff' };
  else if (listing.status === 'Rented') tag = { label: 'Rented', bg: 'rgba(0,0,0,.65)',    fg: '#fff' };
  else if (listing.featured)        tag = { label: 'Featured', bg: 'var(--ak-crimson)',   fg: '#fff' };

  // Recently created (last 30 days) gets "New" badge if not closed/featured
  const isRecent = listing.createdAt && (Date.now() - new Date(listing.createdAt).getTime() < 30 * 86400000);
  if (!tag && isRecent && listing.status === 'Active') {
    tag = { label: 'New', bg: 'var(--ak-crimson)', fg: '#fff' };
  }

  return (
    <a href="#" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
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

      {/* sold/rented diagonal stamp on closed cards */}
      {isClosed && !compact && (
        <span style={{
          position: 'absolute', top: 24, right: -36,
          background: listing.status === 'Sold' ? 'var(--ak-crimson)' : 'rgba(0,0,0,.8)',
          color: '#fff',
          padding: '6px 50px',
          transform: 'rotate(35deg)',
          fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 14,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,.20)',
          pointerEvents: 'none',
        }}>{listing.status}</span>
      )}

      {/* corner tag */}
      {tag && (
        <span style={{ position: 'absolute', top: 16, right: 16,
          background: tag.bg, color: tag.fg,
          fontSize: 9, fontWeight: 500, letterSpacing: '0.20em',
          textTransform: 'uppercase', padding: '5px 10px', borderRadius: 0,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          {listing.featured && tag.label === 'Featured' && <span>★</span>}
          {tag.label}
        </span>
      )}

      {/* meta block */}
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <RedSquare size={6} />
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--fg-2)' }}>{listing.area || listing.city}</span>
        </div>
        <h3 style={{
          margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: compact ? 'clamp(20px,1.8vw,26px)' : 'clamp(22px, 2.6vw, 38px)', lineHeight: 1.0,
          letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg)',
        }}>{listing.title}</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 12,
          paddingTop: 12, borderTop: '1px solid rgba(245,241,234,.20)' }}>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--fg-2)', flex: 1 }}>
            {listing.bedrooms || '—'} BR &nbsp;·&nbsp; {listing.bathrooms || '—'} BA &nbsp;·&nbsp; {listing.areaSqm ? listing.areaSqm + ' m²' : '—'}
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: compact ? 16 : 'clamp(18px, 1.8vw, 24px)', color: 'var(--fg)',
            letterSpacing: '0.04em', textDecoration: isClosed ? 'line-through' : 'none',
            textDecorationColor: 'rgba(255,255,255,.35)' }}>
            {window.formatPrice(listing.price, listing.currency, listing.listingType)}
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

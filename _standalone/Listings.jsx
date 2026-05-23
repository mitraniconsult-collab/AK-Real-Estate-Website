// Listings — masonry-style grid of featured properties.

const LISTING_IMGS = {
  a: (window.__resources && window.__resources.imgListA),
  b: (window.__resources && window.__resources.imgListB),
  c: (window.__resources && window.__resources.imgListC),
  d: (window.__resources && window.__resources.imgListD),
  e: (window.__resources && window.__resources.imgListE),
  f: (window.__resources && window.__resources.imgListF),
};

const LISTINGS = [
  { id: 1, img: LISTING_IMGS.a, name: 'Maison Argentine', area: 'Bel Air',     beds: 7, baths: 9,  sqft: '12,400', price: '$24.8M', tag: 'New',         span: 'wide' },
  { id: 2, img: LISTING_IMGS.b, name: 'The Glass Pavilion', area: 'Malibu',    beds: 5, baths: 6,  sqft: '8,200',  price: '$38M',   tag: 'Off-Market',  span: 'tall' },
  { id: 3, img: LISTING_IMGS.c, name: 'Villa di Pietra',  area: 'Montecito',   beds: 8, baths: 12, sqft: '14,200', price: '$14.8M', tag: 'Restored 1924' },
  { id: 4, img: LISTING_IMGS.d, name: 'Casa del Lago',    area: 'Lake Arrowhead', beds: 4, baths: 5, sqft: '6,300', price: '$9.2M' },
  { id: 5, img: LISTING_IMGS.e, name: 'Atelier 12',       area: 'Beverly Hills', beds: 6, baths: 7, sqft: '9,800', price: '$18.5M', tag: 'New' },
  { id: 6, img: LISTING_IMGS.f, name: 'The Ravine House', area: 'Hollywood Hills', beds: 5, baths: 6, sqft: '7,600', price: '$12.4M' },
];

function Listings() {
  const t = useT();
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Off-Market', 'New', 'Restored', 'Architectural'];
  return (
    <section style={{ background: 'var(--ak-ink)', color: 'var(--fg)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>
      {/* header */}
      <header style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32,
        alignItems: 'end', marginBottom: 'clamp(48px, 6vw, 96px)' }}>
        <div>
          <SectionNumeral n="01" label={t('listings.eyebrow')} />
          <h2 style={{
            margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 0.96,
            letterSpacing: '0.06em', textTransform: 'uppercase', maxWidth: 900,
          }}>
            {t('listings.title1')}<br/>{t('listings.title2').split(' ').slice(0, -1).join(' ')} <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>{t('listings.title2').split(' ').slice(-1)}</em>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 24, paddingBottom: 12 }}>
          {filters.map(f => (
            <FilterChip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</FilterChip>
          ))}
        </div>
      </header>

      {/* masonry-ish grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: '180px',
        gap: 'clamp(12px, 1.6vw, 22px)',
      }}>
        <PropertyCard listing={LISTINGS[0]} cols="span 8" rows="span 3" />
        <PropertyCard listing={LISTINGS[1]} cols="span 4" rows="span 4" />
        <PropertyCard listing={LISTINGS[2]} cols="span 4" rows="span 2" />
        <PropertyCard listing={LISTINGS[3]} cols="span 4" rows="span 2" />
        <PropertyCard listing={LISTINGS[4]} cols="span 5" rows="span 3" />
        <PropertyCard listing={LISTINGS[5]} cols="span 7" rows="span 3" />
      </div>

      <div style={{ marginTop: 'clamp(48px, 6vw, 80px)', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          ▪ 47 active &nbsp; · &nbsp; updated weekly
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
        <Btn variant="secondary">{t('listings.all')} →</Btn>
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

function PropertyCard({ listing, cols, rows }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: cols, gridRow: rows,
        position: 'relative', overflow: 'hidden', borderRadius: 4,
        background: 'var(--ak-charcoal)', textDecoration: 'none', color: 'var(--fg)',
        display: 'block', cursor: 'pointer',
      }}>
      {/* image */}
      <img src={listing.img} alt={listing.name}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', transform: hover ? 'scale(1.05)' : 'scale(1)',
                 transition: 'transform .9s var(--ease)',
                 filter: 'saturate(.9) contrast(1.04)' }} />
      {/* scrim */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.10) 40%, rgba(0,0,0,.85) 100%)' }}></div>

      {/* tag */}
      {listing.tag && (
        <span style={{ position: 'absolute', top: 16, right: 16,
          background: 'var(--ak-crimson)', color: '#fff',
          fontSize: 9, fontWeight: 500, letterSpacing: '0.20em',
          textTransform: 'uppercase', padding: '5px 10px', borderRadius: 0 }}>
          {listing.tag}
        </span>
      )}

      {/* meta block */}
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <RedSquare size={6} />
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--fg-2)' }}>{listing.area}</span>
        </div>
        <h3 style={{
          margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'clamp(22px, 2.6vw, 38px)', lineHeight: 1.0,
          letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg)',
        }}>{listing.name}</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 12,
          paddingTop: 12, borderTop: '1px solid rgba(245,241,234,.20)' }}>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--fg-2)', flex: 1 }}>
            {listing.beds} BR &nbsp;·&nbsp; {listing.baths} BA &nbsp;·&nbsp; {listing.sqft} SQ FT
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(18px, 1.8vw, 24px)', color: 'var(--fg)',
            letterSpacing: '0.04em' }}>{listing.price}</span>
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

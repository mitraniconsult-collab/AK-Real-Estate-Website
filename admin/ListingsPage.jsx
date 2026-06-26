// ListingsPage — filter bar + table view + actions.

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

// Defensive shaping for the listings list view. This is the only admin route that
// fan-out renders EVERY record, so one malformed row (bad images, null title,
// out-of-range mainImage, non-numeric price) must not crash the whole page.
function normalizeListing(l) {
  const src = (l && typeof l === 'object') ? l : {};
  const images = Array.isArray(src.images) ? src.images : [];

  let mainImage = Number(src.mainImage);
  if (!Number.isInteger(mainImage) || mainImage < 0 || mainImage >= images.length) {
    mainImage = 0;
  }

  const priceNum = (src.price === '' || src.price == null) ? null : Number(src.price);

  return {
    ...src,
    id:           src.id != null ? String(src.id) : '',
    title:        src.title == null ? '' : String(src.title),
    city:         src.city == null ? '' : String(src.city),
    area:         src.area == null ? '' : String(src.area),
    propertyType: src.propertyType == null ? '' : String(src.propertyType),
    status:       src.status || 'Draft',
    listingType:  src.listingType || 'Sale',
    price:        Number.isNaN(priceNum) ? null : priceNum,
    featured:     !!src.featured,
    images,
    mainImage,
  };
}

function csvEscape(val) {
  const s = val == null ? '' : String(val);
  if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replaceAll('"', '""') + '"';
  }
  return s;
}

function ListingsPage() {
  const { t } = React.useContext(AdminLangContext);
  const route = useRoute();
  const rawListings = useListings();
  const listings = (Array.isArray(rawListings) ? rawListings : [])
    .filter(Boolean)
    .map(normalizeListing);

  // On mobile (<1024px) always use card view — table is unusable on small screens.
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 1024
  );
  const [view, setView] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 1024 ? 'cards' : 'table'
  );
  React.useEffect(() => {
    const fn = () => {
      const m = window.innerWidth < 1024;
      setIsMobile(m);
      if (m) setView('cards');
    };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const [q, setQ] = React.useState(route.search || '');

React.useEffect(() => {
  setQ(route.search || '');
}, [route.search]);
  
  const [status, setStatus] = React.useState('All');
  const [listingType, setListingType] = React.useState('All');
  const [confirmDel, setConfirmDel] = React.useState(null);

  const counts = React.useMemo(() => ({
    All:    listings.length,
    Active: listings.filter(l => l.status === 'Active').length,
    Draft:  listings.filter(l => l.status === 'Draft').length,
    Sold:   listings.filter(l => l.status === 'Sold').length,
    Rented: listings.filter(l => l.status === 'Rented').length,
  }), [listings]);

  const filtered = listings.filter(l => {
    if (status !== 'All' && l.status !== status) return false;
    if (listingType !== 'All' && l.listingType !== listingType) return false;
    if (q && !(l.title + ' ' + l.city + ' ' + l.area).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  function handleExportCsv() {
    const cols = [
      { header: 'id',           get: l => l.id },
      { header: 'title',        get: l => l.title },
      { header: 'status',       get: l => l.status },
      { header: 'listingType',  get: l => l.listingType },
      { header: 'propertyType', get: l => l.propertyType },
      { header: 'city',         get: l => l.city },
      { header: 'area',         get: l => l.area },
      { header: 'price',        get: l => l.price },
      { header: 'currency',     get: l => l.currency },
      { header: 'bedrooms',     get: l => l.bedrooms },
      { header: 'bathrooms',    get: l => l.bathrooms },
      { header: 'sqm',          get: l => l.areaSqm },
      { header: 'featured',     get: l => l.featured ? 'true' : 'false' },
      { header: 'createdAt',    get: l => l.createdAt },
    ];
    const header = cols.map(c => csvEscape(c.header)).join(',');
    const rows = filtered.map(l => cols.map(c => csvEscape(c.get(l))).join(','));
    const csv = '﻿' + [header, ...rows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ak-real-estate-listings-' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="ak-rise">
      <SectionTitle
        n="01"
        label={t('Manage · Listings')}
        title={t('The portfolio')}
        accent={t('register.')}
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="secondary" onClick={handleExportCsv}>↓ {t('Export CSV')}</Btn>
            <Btn variant="primary" as="a" href="/admin/listings/new">＋ {t('New Listing')}</Btn>
          </div>
        }
      />

      {/* Filter bar */}
      <div style={{
        background: 'var(--ak-charcoal)',
        border: '1px solid var(--hairline-light)',
        padding: '18px 20px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18,
        marginBottom: 24,
      }}>
        {/* Status chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          {['All', 'Active', 'Draft', 'Sold', 'Rented'].map(s => (
            <FilterChip key={s} active={status === s} onClick={() => setStatus(s)} count={counts[s]}>
              {t(s)}
            </FilterChip>
          ))}
        </div>

        <span style={{ width: 1, height: 22, background: 'var(--hairline-light)' }}></span>

        {/* Listing type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {['All', 'Sale', 'Rent'].map(opt => (
            <SmallToggle key={opt} active={listingType === opt} onClick={() => setListingType(opt)}>{t(opt)}</SmallToggle>
          ))}
        </div>

        <span style={{ flex: 1 }}></span>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: '1px solid var(--hairline-light)', padding: '2px 0', minWidth: 220 }}>
          <Icon name="search" size={14} style={{ color: 'var(--fg-3)' }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search title, city, area…')}
            style={{ background: 'transparent', border: 0, outline: 'none', color: 'var(--fg)',
              fontSize: 13, fontWeight: 300, flex: 1, padding: '6px 0', fontFamily: 'var(--font-body)' }} />
        </div>

        {/* View toggle — hidden on mobile (always card view) */}
        {!isMobile && (
          <div style={{ display: 'flex', border: '1px solid var(--hairline-light)' }}>
            <ViewToggle active={view === 'table'} onClick={() => setView('table')} title={t('Table view')}>≣</ViewToggle>
            <ViewToggle active={view === 'cards'} onClick={() => setView('cards')} title={t('Card view')}>▦</ViewToggle>
          </div>
        )}
      </div>

      {/* Result count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
        fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase',
        color: 'var(--fg-2)' }}>
        <RedSquare size={5} />
        {t('Showing')} {filtered.length} {t('of')} {listings.length}
        {status !== 'All' && <span style={{ color: 'var(--fg-3)' }}>· {t('Status')}: {t(status)}</span>}
        {listingType !== 'All' && <span style={{ color: 'var(--fg-3)' }}>· {t(listingType)}</span>}
        {q && <span style={{ color: 'var(--fg-3)' }}>· "{q}"</span>}
      </div>

      {/* Body */}
      {view === 'table'
        ? <ListingsTable listings={filtered} onDelete={setConfirmDel} />
        : <ListingsCards listings={filtered} onDelete={setConfirmDel} />}

      {filtered.length === 0 && <EmptyState />}

      {/* Delete confirm */}
      {confirmDel && (
        <ConfirmDialog
          title={t('Delete listing?')}
          body={`${confirmDel.title} (${confirmDel.id}) ${t('will be permanently removed.')}`}
          danger={t('Delete')}
          onCancel={() => setConfirmDel(null)}
          onConfirm={() => { Store.remove(confirmDel.id); setConfirmDel(null); }}
        />
      )}
    </div>
  );
}

function FilterChip({ active, children, onClick, count }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: active ? 'var(--ak-crimson)' : (hover ? 'rgba(255,255,255,.04)' : 'transparent'),
        color: active ? '#fff' : 'var(--fg)',
        border: 0, padding: '8px 14px', cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase', borderRadius: 0,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        transition: 'all .2s var(--ease)',
      }}>
      {children}
      <span style={{
        fontSize: 9, padding: '2px 6px',
        background: active ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.06)',
        color: active ? '#fff' : 'var(--fg-2)',
      }}>{count}</span>
    </button>
  );
}

function SmallToggle({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: active ? 'var(--ak-crimson)' : 'transparent',
      color: active ? '#fff' : 'var(--fg-2)',
      border: active ? 'none' : '1px solid var(--hairline-light)',
      padding: '7px 12px', cursor: 'pointer',
      fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 500,
      letterSpacing: '0.22em', textTransform: 'uppercase', borderRadius: 0,
    }}>{children}</button>
  );
}

function ViewToggle({ active, children, onClick, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      background: active ? 'var(--ak-crimson)' : 'transparent',
      color: active ? '#fff' : 'var(--fg-2)',
      border: 0, padding: '8px 12px', cursor: 'pointer',
      fontSize: 14, lineHeight: 1, borderRadius: 0,
    }}>{children}</button>
  );
}

function ListingsTable({ listings, onDelete }) {
  const { t } = React.useContext(AdminLangContext);
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--hairline-light)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1080 }}>
        <thead>
          <tr style={{ background: 'var(--ak-charcoal)' }}>
            <Th>▪ {t('Property')}</Th>
            <Th>{t('Location')}</Th>
            <Th align="right">{t('Price')}</Th>
            <Th>{t('Type')}</Th>
            <Th>{t('Status')}</Th>
            <Th>{t('Featured')}</Th>
            <Th align="right">{t('Actions')}</Th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l, i) => <ListingRow key={l.id} listing={l} odd={i % 2 === 1} onDelete={onDelete} />)}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, align = 'left' }) {
  return (
    <th style={{
      padding: '14px 16px', textAlign: align,
      fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
      textTransform: 'uppercase', color: 'var(--fg-2)',
      borderBottom: '1px solid var(--hairline-light)', whiteSpace: 'nowrap',
    }}>{children}</th>
  );
}
function Td({ children, align = 'left', style }) {
  return (
    <td style={{
      padding: '16px',
      borderBottom: '1px solid var(--hairline-light)',
      verticalAlign: 'middle', textAlign: align, color: 'var(--fg)',
      ...style,
    }}>{children}</td>
  );
}

function ListingRow({ listing, odd, onDelete }) {
  const { t } = React.useContext(AdminLangContext);
  const [hover, setHover] = React.useState(false);
  return (
    <tr onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'rgba(255,255,255,.025)' : (odd ? 'rgba(255,255,255,.012)' : 'transparent'),
        transition: 'background .15s var(--ease)',
      }}>
      <Td>
        <a href={`/admin/listings/${listing.id}/edit`} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          textDecoration: 'none', color: 'var(--fg)',
        }}>
          <div style={{ width: 56, height: 56, overflow: 'hidden',
            background: 'var(--ak-graphite)', borderRadius: 2, position: 'relative', flexShrink: 0 }}>
            {listing.images && getImageUrl(listing.images[listing.mainImage]) && (
              <img src={getImageUrl(listing.images[listing.mainImage])} alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                         objectFit: 'cover', filter: 'saturate(.9)' }} />
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 17,
                letterSpacing: '0.04em', textTransform: 'uppercase' }}>{listing.title}</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 4 }}>
              {listing.id} · {listing.bedrooms} BR · {listing.areaSqm} m² · {listing.propertyType}
            </div>
          </div>
        </a>
      </Td>
      <Td>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, color: 'var(--fg)' }}>{listing.area}</span>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--fg-3)' }}>{listing.city}</span>
        </div>
      </Td>
      <Td align="right">
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 18,
          color: 'var(--fg)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          {formatPrice(listing.price, listing.currency, listing.listingType)}
        </span>
      </Td>
      <Td><ListingTypeBadge type={listing.listingType} /></Td>
      <Td><ListingStatusBadge status={listing.status} /></Td>
      <Td>
        <button onClick={() => Store.toggleFeatured(listing.id)} title={t('Toggle featured')} style={{
          background: 'transparent', border: 0, cursor: 'pointer', padding: 4,
          fontSize: 16, color: listing.featured ? 'var(--ak-crimson)' : 'var(--fg-3)',
          transition: 'color .2s var(--ease)',
        }}>
          {listing.featured ? '★' : '☆'}
        </button>
      </Td>
      <Td align="right">
        <ListingRowActions listing={listing} onDelete={onDelete} />
      </Td>
    </tr>
  );
}

function ListingRowActions({ listing, onDelete }) {
  const { t } = React.useContext(AdminLangContext);
  const next = listing.status === 'Active' ? 'Draft' : 'Active';
  return (
    <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center', justifyContent: 'flex-end' }}>
    <ActionBtn title={t('View')} href={`/listing?id=${encodeURIComponent(listing.id)}`} disabled={listing.status !== 'Active'}>
        <Icon name="eye" size={14} />
      </ActionBtn>
      <ActionBtn title={t('Edit')} href={`/admin/listings/${listing.id}/edit`}>
        <Icon name="pencil" size={14} />
      </ActionBtn>
      <ActionBtn title={listing.status === 'Active' ? t('Deactivate') : t('Activate')}
        onClick={() => Store.setStatus(listing.id, next)}>
        {listing.status === 'Active' ? <Icon name="circle-pause" size={14} /> : <Icon name="circle-play" size={14} />}
      </ActionBtn>
      <ActionBtn title={t('Delete')} danger onClick={() => onDelete(listing)}>
        <Icon name="trash-2" size={14} />
      </ActionBtn>
    </div>
  );
}

// Translated badges — mirror atoms.jsx StatusBadge/TypeBadge styling, but route the
// label through t(). Data values (status/type) stay English; only display changes.
function ListingStatusBadge({ status }) {
  const { t } = React.useContext(AdminLangContext);
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
    }}>{t(status)}</span>
  );
}

function ListingTypeBadge({ type }) {
  const { t } = React.useContext(AdminLangContext);
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px',
      background: type === 'Sale' ? 'rgba(255,255,255,.05)' : 'transparent',
      color: 'var(--fg)',
      border: '1px solid var(--hairline-light)',
      fontSize: 9, fontWeight: 500, letterSpacing: '0.20em',
      textTransform: 'uppercase',
    }}>{type === 'Sale' ? t('For Sale') : t('For Rent')}</span>
  );
}

function ActionBtn({ children, title, onClick, href, disabled, danger }) {
  const [hover, setHover] = React.useState(false);
  const style = {
    background: 'transparent',
    color: disabled ? 'var(--fg-3)' :
           (hover ? (danger ? 'var(--ak-crimson-bright)' : 'var(--ak-crimson)') :
             'var(--fg-2)'),
    border: '1px solid ' + (hover && !disabled ? 'var(--ak-crimson)' : 'var(--hairline-light)'),
    padding: '7px 10px', cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 0, transition: 'all .2s var(--ease)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', opacity: disabled ? 0.5 : 1,
  };
  if (href) {
    return <a href={href} title={title} target={href.startsWith('../') ? '_blank' : undefined}
      rel="noopener" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={style} onClick={disabled ? (e) => e.preventDefault() : undefined}>{children}</a>;
  }
  return <button type="button" onClick={onClick} title={title} disabled={disabled}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={style}>{children}</button>;
}

function ListingsCards({ listings, onDelete }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 'clamp(14px, 1.6vw, 24px)',
    }}>
      {listings.map(l => <AdminListingCard key={l.id} listing={l} onDelete={onDelete} />)}
    </div>
  );
}

function AdminListingCard({ listing, onDelete }) {
  const { t } = React.useContext(AdminLangContext);
  return (
    <article style={{
      background: 'var(--ak-charcoal)',
      border: '1px solid var(--hairline-light)',
      display: 'flex', flexDirection: 'column',
      transition: 'border-color .22s var(--ease)',
    }}>
      <a href={`/admin/listings/${listing.id}/edit`} style={{
        position: 'relative', aspectRatio: '4/3', overflow: 'hidden', display: 'block',
        textDecoration: 'none',
      }}>
        {listing.images && getImageUrl(listing.images[listing.mainImage]) && (
          <img src={getImageUrl(listing.images[listing.mainImage])} alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                     objectFit: 'cover', filter: 'saturate(.9) contrast(1.05)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.60) 100%)' }}></div>
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <ListingStatusBadge status={listing.status} />
          {listing.featured && <span style={{
            background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)',
            color: 'var(--ak-crimson)', padding: '4px 8px',
            fontSize: 9, fontWeight: 500, letterSpacing: '0.20em', textTransform: 'uppercase',
          }}>★ {t('Featured')}</span>}
        </div>
        <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <RedSquare size={5} />
            <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-2)' }}>{listing.area}</span>
          </div>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 22, lineHeight: 1, letterSpacing: '0.04em',
            textTransform: 'uppercase', color: '#fff' }}>{listing.title}</h3>
        </div>
      </a>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--fg-3)' }}>
            {listing.bedrooms} BR · {listing.bathrooms} BA · {listing.areaSqm} m²
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 18,
            color: 'var(--fg)', letterSpacing: '0.04em' }}>
            {formatPrice(listing.price, listing.currency, listing.listingType)}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, paddingTop: 10,
          borderTop: '1px solid var(--hairline-light)' }}>
          <ListingRowActions listing={listing} onDelete={onDelete} />
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  const { t } = React.useContext(AdminLangContext);
  return (
    <div style={{
      padding: '80px 24px', textAlign: 'center',
      border: '1px dashed var(--hairline-light)', background: 'var(--ak-charcoal)',
    }}>
      <RedSquare style={{ display: 'inline-block', marginBottom: 18 }} />
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28,
        letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
        {t('Nothing to show.')}
      </div>
      <p style={{ margin: '0 auto 28px', maxWidth: 400, fontSize: 13, color: 'var(--fg-2)',
        fontWeight: 300, lineHeight: 1.6 }}>
        {t("No listings match the current filters. Adjust your search, or start a new listing — we'll keep it as a draft until you're ready to publish.")}
      </p>
      <Btn variant="primary" as="a" href="/admin/listings/new">＋ {t('New Listing')}</Btn>
    </div>
  );
}

function ConfirmDialog({ title, body, danger, onCancel, onConfirm }) {
  const { t } = React.useContext(AdminLangContext);
  return (
    <div role="dialog" style={{
      position: 'fixed', inset: 0, zIndex: 80,
      background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: 440,
        background: 'var(--ak-charcoal)',
        border: '1px solid var(--hairline-light)',
        padding: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <RedSquare size={6} />
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--ak-crimson-bright)' }}>{t('Confirm')}</span>
        </div>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 26, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.1 }}>{title}</h3>
        <p style={{ margin: '14px 0 28px', fontSize: 13, color: 'var(--fg-2)',
          fontWeight: 300, lineHeight: 1.6 }}>{body}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn variant="secondary" onClick={onCancel}>{t('Cancel')}</Btn>
          <Btn variant="primary" onClick={onConfirm}>{danger || t('Confirm')}</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ListingsPage, ListingsTable, AdminListingCard, ConfirmDialog });

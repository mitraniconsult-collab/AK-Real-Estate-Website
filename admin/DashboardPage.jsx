// DashboardPage — section title + 4 stat cards + latest listings + activity.

function DashboardPage() {
  const listings = useListings();
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
        label="Admin · Overview"
        title="The portfolio,"
        accent="quietly."
        action={<Btn variant="primary" as="a" href="#/listings/new">＋ New Listing</Btn>}
      />

      {/* stat row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'clamp(12px, 1.4vw, 20px)',
      }}>
        <StatCard label="Total Listings"   value={total}    sub="all statuses" accent="crimson" />
        <StatCard label="Active"           value={active}   sub="visible publicly" />
        <StatCard label="Draft"            value={draft}    sub="admin-only" />
        <StatCard label="Sold / Rented"    value={closed}   sub="closed deals" />
      </div>

      {/* secondary row */}
      <div style={{
        marginTop: 'clamp(12px, 1.4vw, 20px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'clamp(12px, 1.4vw, 20px)',
      }}>
        <StatCard label="Featured"          value={featured} sub="on home page" emphasis="muted" />
        <StatCard label="Active Portfolio Value" value={'$' + (totalValue / 1_000_000).toFixed(1) + 'M'} sub="sum of active" emphasis="muted" />
        <StatCard label="Avg. Price"        value={total ? '$' + Math.round(listings.reduce((s, l) => s + (l.price || 0), 0) / total / 1_000_000) + 'M' : '—'} sub="all listings" emphasis="muted" />
        <StatCard label="Cities"            value={new Set(listings.map(l => l.city)).size} sub="markets covered" emphasis="muted" />
      </div>

      {/* latest + activity */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 72px)',
        display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
        gap: 'clamp(20px, 2.4vw, 40px)',
      }}>
        <LatestListings listings={latest} />
        <ActivityPanel />
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
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'end', gap: 16, marginBottom: 18 }}>
        <Eyebrow>Latest Listings</Eyebrow>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
        <a href="#/listings" style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--fg-2)', textDecoration: 'none',
          borderBottom: '1px solid var(--ak-crimson)', paddingBottom: 2,
        }}>View All ↗</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {listings.map(l => <LatestRow key={l.id} listing={l} />)}
      </div>
    </section>
  );
}

function LatestRow({ listing }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={`#/listings/${listing.id}/edit`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid', gridTemplateColumns: '64px 1fr auto auto auto',
        gap: 18, alignItems: 'center', padding: '14px 12px',
        textDecoration: 'none', color: 'var(--fg)',
        borderBottom: '1px solid var(--hairline-light)',
        background: hover ? 'rgba(255,255,255,.02)' : 'transparent',
        transition: 'background .2s var(--ease)',
      }}>
      <div style={{ width: 64, height: 64, overflow: 'hidden',
        background: 'var(--ak-graphite)', borderRadius: 2, position: 'relative' }}>
        {listing.images && listing.images[listing.mainImage] && (
          <img src={listing.images[listing.mainImage]} alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                     objectFit: 'cover', filter: 'saturate(.9)' }} />
        )}
      </div>
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
      <StatusBadge status={listing.status} />
      <span style={{ color: hover ? 'var(--ak-crimson)' : 'var(--fg-3)',
        transition: 'color .2s var(--ease)' }}>›</span>
    </a>
  );
}

function ActivityPanel() {
  const items = [
    { mark: 'Active', txt: 'Maison Argentine published',          ago: '2 hours ago' },
    { mark: 'Edit',   txt: 'Villa di Pietra price updated',       ago: '5 hours ago' },
    { mark: 'Sold',   txt: 'The Ravine House marked sold',        ago: '3 days ago' },
    { mark: 'Draft',  txt: 'Atelier 12 saved as draft',           ago: '4 days ago' },
    { mark: 'Active', txt: 'Casa del Lago published for rent',    ago: '6 days ago' },
  ];
  return (
    <aside style={{
      background: 'var(--ak-charcoal)',
      border: '1px solid var(--hairline-light)',
      padding: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <RedSquare size={6} />
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg)' }}>Recent Activity</span>
      </div>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0,
        display: 'flex', flexDirection: 'column', gap: 0 }}>
        {items.map((a, i) => (
          <li key={i} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr',
            gap: 16, padding: '14px 0',
            borderTop: i === 0 ? '1px solid var(--hairline-light)' : '1px solid var(--hairline-light)',
          }}>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: a.mark === 'Sold' ? 'var(--ak-crimson-bright)' :
                     a.mark === 'Active' ? 'var(--fg)' :
                     'var(--fg-3)' }}>{a.mark}</span>
            <div>
              <div style={{ fontSize: 13, color: 'var(--fg)', fontWeight: 300, lineHeight: 1.4 }}>{a.txt}</div>
              <div style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.18em',
                textTransform: 'uppercase', marginTop: 4 }}>{a.ago}</div>
            </div>
          </li>
        ))}
      </ol>
      <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--hairline-light)' }}>
        <a href="#" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--fg-2)', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          borderBottom: '1px solid var(--ak-crimson)', paddingBottom: 2 }}>
          Full Activity Log →
        </a>
      </div>
    </aside>
  );
}

Object.assign(window, { DashboardPage, StatCard });

// Hero — full-bleed cinematic image, asymmetric right-justified headline,
// vertical edge label, eyebrow + dual CTA.

// Darker, more cinematic interior — restored landmark, low light
const HERO_IMG = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=80&auto=format&fit=crop";

function Hero({ lang = 'bg' }) {
  const [stats, setStats] = React.useState({ activeCount: 0, offMarketCount: 0, portfolioValue: '€0' });

  React.useEffect(() => {
    if (!window.AKStore) return;
    return window.AKStore.on(function(listings) {
      const active = listings.filter(l => l.status === 'Active');
      const offMarket = listings.filter(l => l.status !== 'Active' && l.status !== 'Draft');
      const total = active.reduce((s, l) => s + (Number(l.price) || 0), 0);
      let val = '€0';
      if (total >= 1e9) val = '€' + (total / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
      else if (total >= 1e6) val = '€' + (total / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
      else if (total >= 1000) val = '€' + Math.round(total / 1000) + 'K';
      else if (total > 0) val = '€' + total;
      setStats({ activeCount: active.length, offMarketCount: offMarket.length, portfolioValue: val });
    });
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: 'min(92vh, 820px)',
      background: 'var(--ak-black)',
      overflow: 'hidden',
    }}>
      {/* photographic layer */}
      <img src={HERO_IMG} alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                 filter: 'saturate(.75) contrast(1.10) brightness(.55)' }} />
      {/* cinematic scrim — deeper top + bottom to anchor headline */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,.70) 0%, rgba(0,0,0,.35) 35%, rgba(0,0,0,.55) 65%, rgba(0,0,0,.92) 100%)' }}></div>
      {/* left-side vignette so vertical label reads */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,.15) 100%)' }}></div>
      {/* diagonal grain */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><line x1='0' y1='0' x2='0' y2='6' stroke='white' stroke-width='.5' opacity='.08' transform='rotate(35)'/></svg>\")",
        mixBlendMode: 'overlay', opacity: .6 }}></div>
      {/* decorative outline ring */}
      <div style={{ position: 'absolute', left: '6vw', bottom: '-12vw',
        width: '38vw', height: '38vw', maxWidth: 560, maxHeight: 560,
        borderRadius: '50%', border: '1px solid rgba(245,241,234,.10)', pointerEvents: 'none' }}></div>

      {/* content */}
      <div className="r-stack-640-keep-label" style={{
        position: 'relative', minHeight: 'min(92vh, 820px)',
        padding: 'calc(var(--section-y) * 0.55) var(--gutter) calc(var(--section-y) * 0.7)',
        display: 'grid', gridTemplateColumns: 'auto 1fr',
        gap: 'clamp(20px, 4vw, 64px)', alignItems: 'center',
      }}>
        {/* vertical label */}
        <div className="r-edge-label" style={{ display: 'flex', alignItems: 'flex-end', height: '100%', paddingBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 1, height: 60, background: 'var(--ak-crimson)' }}></div>
            <VLabel>§ 01 — A Private Portfolio</VLabel>
            <div style={{ width: 1, height: 80, background: 'rgba(245,241,234,.20)' }}></div>
          </div>
        </div>

        {/* headline block, right-justified */}
        <div className="ak-rise r-text-left-mobile" style={{ textAlign: 'right', maxWidth: 960, justifySelf: 'end' }}>
          <Eyebrow style={{ marginBottom: 28 }}>Since 2014 · Los Angeles · Off-Market</Eyebrow>
          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(56px, 10vw, 168px)', lineHeight: 0.92,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--fg)',
          }}>
            A quieter<br/>kind of <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>luxury.</em>
          </h1>
          <p style={{
            marginTop: 36, marginLeft: 'auto', maxWidth: 460,
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300, lineHeight: 1.7,
            color: 'var(--fg-2)',
          }}>
            A private portfolio of residences for those who would rather not be seen looking.
            Off-market listings, restored landmarks, and the kind of houses found by being told.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 24, justifyContent: 'flex-end', alignItems: 'center' }}>
            <a href="#" style={{
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg)',
              textDecoration: 'none', borderBottom: '1px solid var(--ak-crimson)', paddingBottom: 4,
            }}>View Portfolio</a>
            <Btn variant="primary">Request Private Access</Btn>
          </div>
        </div>
      </div>

      {/* bottom hairline strip with marquee-style meta */}
      <div className="r-hero-strip" style={{
        position: 'absolute', left: 'var(--gutter)', right: 'var(--gutter)', bottom: 24,
        display: 'flex', alignItems: 'center', gap: 24, opacity: .8,
      }}>
        <RedSquare size={6} />
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          {lang === 'en'
            ? `${stats.activeCount} active listings · ${stats.offMarketCount} off-market · ${stats.portfolioValue} portfolio value`
            : `${stats.activeCount} активни имота · ${stats.offMarketCount} скрити оферти · ${stats.portfolioValue} стойност на портфолиото`}
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          Scroll
        </span>
        <span style={{ color: 'var(--fg-2)' }}>↓</span>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });

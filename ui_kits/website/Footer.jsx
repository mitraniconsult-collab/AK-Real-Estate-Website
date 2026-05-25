// Footer — dark, four-column sitemap, legal strip, brand mark.

function Footer() {
  const groups = [
    { title: 'Portfolio',  links: ['Featured Listings', 'Off-Market', 'Restored Landmarks', 'Architectural', 'Sold'] },
    { title: 'Practice',   links: ['The Founder', 'Concierge', 'Discreet Sale', 'Stewardship', 'Press'] },
    { title: 'Journal',    links: ['Field Notes', 'Architecture', 'Market', 'Issue Archive'] },
    { title: 'Contact',    links: ['Los Angeles', 'Montecito', 'Direct', 'Newsletter'] },
  ];
  return (
    <footer style={{ background: 'var(--ak-black)', color: 'var(--fg)',
      padding: 'clamp(80px,8vw,140px) var(--gutter) 36px', position: 'relative' }}>
      {/* big wordmark */}
      <div className="r-footer-head" style={{ display: 'flex', alignItems: 'center', gap: 32,
        marginBottom: 'clamp(56px, 6vw, 96px)', paddingBottom: 36,
        borderBottom: '1px solid var(--hairline-light)' }}>
        <Logo size="lg" />
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
        <Btn variant="secondary">Subscribe to the Journal</Btn>
      </div>

      {/* sitemap + tagline */}
      <div className="r-cols-2" style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)',
        gap: 'clamp(24px, 3vw, 56px)', marginBottom: 80 }}>
        <div>
          <Eyebrow style={{ marginBottom: 18 }}>A Quieter Practice</Eyebrow>
          <p style={{ margin: 0, maxWidth: 320, fontSize: 14, lineHeight: 1.65,
            fontWeight: 300, color: 'var(--fg-2)' }}>
            A private real estate practice founded in 2014. We work with a small number of
            clients on a small number of houses, every year, by introduction only.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
            <SocialIcon glyph="Ig" />
            <SocialIcon glyph="Yt" />
            <SocialIcon glyph="In" />
            <SocialIcon glyph="Pt" />
          </div>
        </div>
        {groups.map(g => (
          <div key={g.title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <RedSquare size={5} />
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--fg)' }}>{g.title}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.links.map(l => (
                <li key={l}>
                  <a href="#" style={{ fontSize: 13, fontWeight: 300, color: 'var(--fg-2)',
                    textDecoration: 'none', letterSpacing: '0.02em',
                    transition: 'color .2s var(--ease)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ak-crimson)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-2)'}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* legal strip */}
      <div className="r-legal" style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24,
        borderTop: '1px solid var(--hairline-light)',
        fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--fg-3)' }}>
        <span>© 2026 AK Real Estate, Inc.</span>
        <span style={{ color: 'var(--ak-crimson)' }}>▪</span>
        <span>DRE #01988201</span>
        <span className="r-spacer" style={{ color: 'var(--hairline-light)' }}>·</span>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>Privacy</a>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>Terms</a>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>Accessibility</a>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>Fair Housing</a>
        <span className="r-spacer" style={{ flex: 1 }}></span>
        <span>A Quieter Kind of Luxury</span>
      </div>
    </footer>
  );
}

function SocialIcon({ glyph }) {
  return (
    <a href="#" style={{ width: 36, height: 36, border: '1px solid var(--hairline-light)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--fg-2)', textDecoration: 'none',
      fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 300,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      transition: 'all .2s var(--ease)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--ak-crimson)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-2)'; e.currentTarget.style.borderColor = 'var(--hairline-light)'; }}
    >{glyph}</a>
  );
}

Object.assign(window, { Footer, SocialIcon });

// Press — minimal media-feature strip. Quotes + outlets.

const PRESS = [
  { outlet: 'Architectural Digest',         quote: 'The most discreet practice in California real estate.', date: 'Mar 2026' },
  { outlet: 'Financial Times — How To Spend It', quote: 'A house finder for people who already have a house.',  date: 'Jan 2026' },
  { outlet: 'Wallpaper*',                   quote: 'Less a listing service than a quiet introduction.',     date: 'Nov 2025' },
  { outlet: 'The World of Interiors',       quote: 'Restraint, in a market that has forgotten what that word means.', date: 'Sep 2025' },
];

function Press() {
  return (
    <section style={{ background: 'var(--ak-ink)', color: 'var(--fg)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>
      <header className="r-press-head" style={{ display: 'flex', alignItems: 'end', gap: 24,
        marginBottom: 'clamp(48px,5vw,80px)' }}>
        <SectionNumeral n="05" label="Press & Features" />
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)',
          marginBottom: 12 }}></span>
        <a href="#" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-2)', textDecoration: 'none',
          paddingBottom: 4, borderBottom: '1px solid var(--ak-crimson)', marginBottom: 12 }}>
          Press Inquiries ↗
        </a>
      </header>

      <div className="r-cols-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(24px,3vw,48px) clamp(40px,5vw,96px)' }}>
        {PRESS.map(p => <PressItem key={p.outlet} {...p} />)}
      </div>
    </section>
  );
}

function PressItem({ outlet, quote, date }) {
  return (
    <blockquote style={{ margin: 0, padding: '32px 0',
      borderTop: '1px solid var(--hairline-light)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <RedSquare size={6} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 18, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--fg)' }}>{outlet}</span>
        <span style={{ flex: 1 }}></span>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--fg-3)' }}>{date}</span>
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 200,
        fontSize: 'clamp(22px, 2.4vw, 34px)', lineHeight: 1.2,
        letterSpacing: '0.02em', color: 'var(--fg)' }}>
        <span style={{ color: 'var(--ak-crimson)' }}>—</span> {quote}
      </p>
    </blockquote>
  );
}

Object.assign(window, { Press, PressItem });

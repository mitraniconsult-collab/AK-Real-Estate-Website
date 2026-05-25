// Journal — news & insights + social strip.

const J_IMGS = {
  a: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=900&q=80&auto=format&fit=crop",
  b: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80&auto=format&fit=crop",
  c: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
};

const SOCIAL = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80&auto=format&fit=crop",
];

const POSTS = [
  { img: J_IMGS.a, tag: 'Field Notes',  title: 'The drought that taught us to choose trees.',         date: 'May 12, 2026', read: '8 min' },
  { img: J_IMGS.b, tag: 'Architecture', title: 'A 1924 Mediterranean, four years later.',             date: 'Apr 24, 2026', read: '12 min' },
  { img: J_IMGS.c, tag: 'Market',       title: 'Off-market is not a strategy. It is a manner.',        date: 'Apr 02, 2026', read: '6 min' },
];

function Journal() {
  return (
    <section style={{ background: 'var(--ak-ink)', color: 'var(--fg)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>
      <header className="r-press-head" style={{ display: 'flex', alignItems: 'end',
        gap: 24, marginBottom: 'clamp(40px,5vw,72px)' }}>
        <SectionNumeral n="06" label="News & Insights" />
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)', marginBottom: 12 }}></span>
        <a href="#" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-2)', textDecoration: 'none',
          paddingBottom: 4, borderBottom: '1px solid var(--ak-crimson)', marginBottom: 12 }}>
          All Journal Entries ↗
        </a>
      </header>

      <div className="r-journal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'clamp(20px, 2.4vw, 36px)', marginBottom: 'clamp(64px,7vw,110px)' }}>
        {POSTS.map((p, i) => <JournalCard key={i} {...p} />)}
      </div>

      {/* Social — Instagram-style strip */}
      <div className="r-cols-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
        {SOCIAL.map((src, i) => (
          <a key={i} href="#" style={{ position: 'relative', aspectRatio: '1/1',
            overflow: 'hidden', display: 'block' }}>
            <img src={src} alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                       objectFit: 'cover', filter: 'saturate(.85) brightness(.85)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.30)',
              display: 'flex', alignItems: 'flex-end', padding: 12 }}>
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: '#fff' }}>
                @ak.realestate
              </span>
            </div>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
        <RedSquare size={6} />
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          Follow on Instagram — @ak.realestate · 84k
        </span>
      </div>
    </section>
  );
}

function JournalCard({ img, tag, title, date, read }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'block', textDecoration: 'none', color: 'var(--fg)' }}>
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden',
        borderRadius: 4, background: 'var(--ak-charcoal)' }}>
        <img src={img} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                   objectFit: 'cover', transform: hover ? 'scale(1.05)' : 'scale(1)',
                   transition: 'transform .9s var(--ease)',
                   filter: 'saturate(.85) contrast(1.05)' }} />
        <div style={{ position: 'absolute', top: 14, left: 14,
          background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)',
          color: '#fff', fontSize: 9, fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', padding: '5px 10px' }}>{tag}</div>
      </div>
      <div style={{ marginTop: 20 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'clamp(20px,1.9vw,28px)', lineHeight: 1.12,
          letterSpacing: '0.04em', textTransform: 'uppercase' }}>{title}</h3>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--fg-2)' }}>
          <span>{date}</span>
          <span style={{ width: 12, height: 1, background: 'var(--ak-crimson)' }}></span>
          <span>{read} read</span>
        </div>
      </div>
    </a>
  );
}

Object.assign(window, { Journal, JournalCard });

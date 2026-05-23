// Founder — light editorial section, portrait left, narrow text column right.

const FOUNDER_IMG = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&auto=format&fit=crop";

function Founder() {
  return (
    <section style={{ background: 'var(--ak-bone)', color: 'var(--fg-on-light)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>
      <div style={{ display: 'grid',
        gridTemplateColumns: 'minmax(48px, auto) minmax(0, 1.05fr) minmax(0, 1fr)',
        gap: 'clamp(24px, 5vw, 96px)', alignItems: 'start' }}>

        {/* vertical edge label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18,
          flexDirection: 'column', paddingTop: 60 }}>
          <div style={{ width: 1, height: 80, background: 'var(--ak-crimson)' }}></div>
          <VLabel style={{ color: 'var(--fg-on-light-3)' }}>§ 02 — The Founder</VLabel>
        </div>

        {/* portrait + caption */}
        <div>
          <div style={{ position: 'relative', aspectRatio: '4 / 5',
            borderRadius: 4, overflow: 'hidden', background: '#1c1c1c',
            boxShadow: '0 24px 60px -20px rgba(20,18,14,.30)' }}>
            <img src={FOUNDER_IMG} alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                       objectFit: 'cover', filter: 'saturate(.85) contrast(1.04)' }} />
            <div style={{ position: 'absolute', left: 18, bottom: 16,
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <RedSquare size={6} />
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: '#fff' }}>A. Kane · Founder</span>
            </div>
          </div>
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-on-light-3)' }}>
              Photographed by Lila Verriér &nbsp;·&nbsp; Brentwood, 2024
            </span>
          </div>
        </div>

        {/* text column */}
        <div style={{ paddingTop: 40 }}>
          <Eyebrow light style={{ marginBottom: 28 }}>A Letter from the Founder</Eyebrow>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(40px, 5vw, 84px)', lineHeight: 0.96,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--fg-on-light)',
          }}>
            I started with one <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>house.</em>
          </h2>
          <div style={{ marginTop: 32, columns: 1, maxWidth: 460 }}>
            <p style={{ margin: '0 0 18px', fontSize: 16, lineHeight: 1.7,
              fontWeight: 300, color: 'var(--ak-pewter)' }}>
              A 1924 Mediterranean on a one-block lane in Bel Air. The owners did not want
              it on the market. They wanted it to find the right family.
            </p>
            <p style={{ margin: '0 0 18px', fontSize: 16, lineHeight: 1.7,
              fontWeight: 300, color: 'var(--ak-pewter)' }}>
              Ten years and ninety-three residences later, AK Real Estate is the same
              practice. We do not list. We <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic' }}>introduce.</em>
            </p>
            <p style={{ margin: '0 0 28px', fontSize: 16, lineHeight: 1.7,
              fontWeight: 300, color: 'var(--ak-pewter)' }}>
              Most of our portfolio is off-market. Most of our clients are referred. All of
              our houses are seen on a quiet afternoon, by appointment, never in groups.
            </p>
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 24 }}>
              <Btn variant="primary">Read the Story</Btn>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
                fontSize: 18, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--fg-on-light)' }}>A. Kane</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Founder });

// AppPromo — split panel, app screen mock on one side, copy + community values on other.

const APP_BG = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80&auto=format&fit=crop";

function AppPromo() {
  return (
    <section style={{ background: 'var(--ak-bone)', color: 'var(--fg-on-light)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,5vw,96px)',
        alignItems: 'center' }}>

        {/* app mock — phone */}
        <div style={{ position: 'relative', justifySelf: 'center' }}>
          <div style={{ position: 'absolute', inset: '-40px -60px', borderRadius: '50%',
            border: '1px solid rgba(0,0,0,.06)', pointerEvents: 'none' }}></div>
          <div style={{ width: 280, aspectRatio: '9/19', borderRadius: 32,
            background: 'var(--ak-black)', padding: 12,
            boxShadow: '0 60px 100px -40px rgba(20,18,14,.45)' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 22, overflow: 'hidden',
              background: 'var(--ak-ink)', position: 'relative', color: 'var(--fg)' }}>
              <img src={APP_BG} alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '60%',
                         objectFit: 'cover', filter: 'saturate(.85) brightness(.85)' }} />
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,.30) 0%, rgba(0,0,0,.10) 30%, rgba(10,10,10,1) 60%)' }}></div>
              <div style={{ position: 'absolute', inset: 0, padding: 18,
                display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 9, color: 'var(--fg-2)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
                  9:41 <span style={{ flex: 1 }}></span> 5G &nbsp; •••
                </div>
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Logo size="sm" />
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <Eyebrow style={{ fontSize: 8, marginBottom: 8 }}>Off-Market · Bel Air</Eyebrow>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
                    fontSize: 28, lineHeight: 1, letterSpacing: '0.06em',
                    textTransform: 'uppercase' }}>Maison<br/>Argentine</div>
                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(245,241,234,.15)',
                    display: 'flex', alignItems: 'center', fontSize: 9, letterSpacing: '.16em',
                    textTransform: 'uppercase', color: 'var(--fg-2)' }}>
                    <span>7 BR · 9 BA</span>
                    <span style={{ flex: 1 }}></span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--fg)' }}>$24.8M</span>
                  </div>
                  <div style={{ marginTop: 12, background: 'var(--ak-crimson)', color: '#fff',
                    textAlign: 'center', fontSize: 9, letterSpacing: '0.22em',
                    textTransform: 'uppercase', fontWeight: 500, padding: '10px 0' }}>
                    Request Viewing
                  </div>
                </div>
                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-around',
                  fontSize: 8, color: 'var(--fg-2)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
                  <span style={{ color: 'var(--ak-crimson)' }}>▪ Portfolio</span>
                  <span>Journal</span>
                  <span>Saved</span>
                  <span>Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* copy */}
        <div>
          <Eyebrow light style={{ marginBottom: 28 }}>The AK Companion · Coming 2026</Eyebrow>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(40px, 5vw, 84px)', lineHeight: 0.96,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--fg-on-light)' }}>
            The portfolio,<br/>in your <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>pocket.</em>
          </h2>
          <p style={{ marginTop: 28, maxWidth: 460, fontSize: 16, lineHeight: 1.7,
            fontWeight: 300, color: 'var(--ak-pewter)' }}>
            A private application for our clients. Off-market listings before they leave the office.
            Saved residences. A direct line to your principal. Released in invitation waves
            beginning this spring.
          </p>

          {/* values mini grid */}
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '24px 36px', borderTop: '1px solid rgba(0,0,0,.10)', paddingTop: 24 }}>
            {[
              ['Discretion', 'Off-market is the default, not a feature.'],
              ['Restraint', 'No notifications. No urgency. The right house finds you.'],
              ['Stewardship', 'We share 1% of every commission with restored-landmark conservancies.'],
              ['Direct', 'One principal. One number. One handshake.'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <RedSquare size={5} />
                  <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: 'var(--fg-on-light)' }}>{k}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, fontWeight: 300, color: 'var(--ak-pewter)' }}>{v}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 20, alignItems: 'center' }}>
            <Btn variant="primary">Request Invitation</Btn>
            <a href="#" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--fg-on-light)', textDecoration: 'none',
              borderBottom: '1px solid var(--ak-crimson)', paddingBottom: 4 }}>
              About the App ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AppPromo });

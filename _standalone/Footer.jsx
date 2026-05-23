// Footer — dark, four-column sitemap, legal strip, brand mark.

function Footer() {
  const t = useT();
  const groups = [
    { title: t('ft.g1'),  links: [t('ft.g1.1'), t('ft.g1.2'), t('ft.g1.3'), t('ft.g1.4'), t('ft.g1.5')] },
    { title: t('ft.g2'),  links: [t('ft.g2.1'), t('ft.g2.2'), t('ft.g2.3'), t('ft.g2.4'), t('ft.g2.5')] },
    { title: t('ft.g3'),  links: [t('ft.g3.1'), t('ft.g3.2'), t('ft.g3.3'), t('ft.g3.4')] },
    { title: t('ft.g4'),  links: [t('ft.g4.1'), t('ft.g4.2'), t('ft.g4.3'), t('ft.g4.4')] },
  ];
  return (
    <footer style={{ background: 'var(--ak-black)', color: 'var(--fg)',
      padding: 'clamp(80px,8vw,140px) var(--gutter) 36px', position: 'relative' }}>
      {/* big wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32,
        marginBottom: 'clamp(56px, 6vw, 96px)', paddingBottom: 36,
        borderBottom: '1px solid var(--hairline-light)' }}>
        <Logo size="lg" />
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
        <Btn variant="secondary">{t('ft.subscribe')}</Btn>
      </div>

      {/* sitemap + tagline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)',
        gap: 'clamp(24px, 3vw, 56px)', marginBottom: 80 }}>
        <div>
          <Eyebrow style={{ marginBottom: 18 }}>{t('ft.tagline')}</Eyebrow>
          <p style={{ margin: 0, maxWidth: 320, fontSize: 14, lineHeight: 1.65,
            fontWeight: 300, color: 'var(--fg-2)' }}>
            {t('ft.tagBody')}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24,
        borderTop: '1px solid var(--hairline-light)',
        fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--fg-3)' }}>
        <span>{t('ft.copy')}</span>
        <span style={{ color: 'var(--ak-crimson)' }}>▪</span>
        <span>DRE #01988201</span>
        <span style={{ color: 'var(--hairline-light)' }}>·</span>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>{t('ft.privacy')}</a>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>{t('ft.terms')}</a>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>{t('ft.access')}</a>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>{t('ft.fair')}</a>
        <span style={{ flex: 1 }}></span>
        <span>{t('ft.motto')}</span>
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

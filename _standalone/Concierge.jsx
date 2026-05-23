// Concierge — dark cinematic section, three-service grid + supporting image.

const CONCIERGE_IMG = (window.__resources && window.__resources.imgConcierge);

const SERVICES_CONC = (t) => [
  { n: '01', title: t('conc.s1t'), body: t('conc.s1b') },
  { n: '02', title: t('conc.s2t'), body: t('conc.s2b') },
  { n: '03', title: t('conc.s3t'), body: t('conc.s3b') },
  { n: '04', title: t('conc.s4t'), body: t('conc.s4b') },
];

function Concierge() {
  const t = useT();
  const SERVICES = SERVICES_CONC(t);
  return (
    <section style={{ background: 'var(--ak-black)', color: 'var(--fg)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative', overflow: 'hidden' }}>
      {/* faint texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><line x1='0' y1='0' x2='0' y2='6' stroke='white' stroke-width='.5' opacity='.06' transform='rotate(35)'/></svg>\")",
        mixBlendMode: 'overlay', opacity: .8 }}></div>

      {/* circular ornament */}
      <div style={{ position: 'absolute', right: '-20vw', top: '-10vw',
        width: '50vw', height: '50vw', maxWidth: 720, maxHeight: 720,
        borderRadius: '50%', border: '1px solid rgba(245,241,234,.05)', pointerEvents: 'none' }}></div>

      <div style={{ position: 'relative', display: 'grid',
        gridTemplateColumns: 'minmax(48px,auto) 1fr', gap: 'clamp(24px,4vw,72px)' }}>

        {/* vertical label */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 18, paddingTop: 60 }}>
          <div style={{ width: 1, height: 80, background: 'var(--ak-crimson)' }}></div>
          <VLabel>{t('conc.vlabel')}</VLabel>
        </div>

        <div>
          {/* header */}
          <header style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr',
            gap: 'clamp(32px, 6vw, 96px)', marginBottom: 'clamp(60px, 7vw, 110px)' }}>
            <div>
              <SectionNumeral n="03" label={t('conc.eyebrowNum')} />
              <h2 style={{ margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200,
                fontSize: 'clamp(40px, 5vw, 92px)', lineHeight: 0.96,
                letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t('conc.titleA')}<br/>{t('conc.titleB')} <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>{t('conc.titleEm')}</em>
              </h2>
            </div>
            <p style={{ margin: '70px 0 0', maxWidth: 460, alignSelf: 'end',
              fontSize: 16, lineHeight: 1.7, fontWeight: 300, color: 'var(--fg-2)' }}>
              {t('conc.lede')}
            </p>
          </header>

          {/* services grid + image */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,3vw,48px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(24px, 3vw, 56px) clamp(24px, 3vw, 48px)' }}>
              {SERVICES.map(s => <ServiceTile key={s.n} {...s} />)}
            </div>
            <div style={{ position: 'relative', minHeight: 480, borderRadius: 4, overflow: 'hidden' }}>
              <img src={CONCIERGE_IMG} alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                         objectFit: 'cover', filter: 'saturate(.85) contrast(1.06)' }} />
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.65) 100%)' }}></div>
              <div style={{ position: 'absolute', left: 24, bottom: 24 }}>
                <Eyebrow style={{ marginBottom: 14 }}>{t('conc.imgEyebrow')}</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 200,
                  fontSize: 28, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#fff', lineHeight: 1 }}>
                  {t('conc.imgTitleA')}<br/>{t('conc.imgTitleB')} <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>{t('conc.imgTitleEm')}</em>
                </div>
              </div>
            </div>
          </div>

          {/* CTA strip */}
          <div style={{ marginTop: 'clamp(48px,6vw,96px)', display: 'flex',
            alignItems: 'center', gap: 24, paddingTop: 24,
            borderTop: '1px solid var(--hairline-light)' }}>
            <RedSquare />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(22px, 2.4vw, 32px)', letterSpacing: '0.06em',
              textTransform: 'uppercase' }}>
              {t('conc.ctaText')}
            </span>
            <span style={{ flex: 1 }}></span>
            <Btn variant="secondary">{t('conc.ctaBtn')}</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceTile({ n, title, body }) {
  return (
    <article style={{ position: 'relative', paddingTop: 24,
      borderTop: '1px solid var(--hairline-light)' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 14,
        color: 'var(--ak-crimson)', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
        {n} ▪
      </span>
      <h3 style={{ margin: '14px 0 12px', fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: 'clamp(22px,2.2vw,30px)', letterSpacing: '0.06em', textTransform: 'uppercase',
        lineHeight: 1.08 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, fontWeight: 300, color: 'var(--fg-2)' }}>
        {body}
      </p>
    </article>
  );
}

Object.assign(window, { Concierge, ServiceTile });

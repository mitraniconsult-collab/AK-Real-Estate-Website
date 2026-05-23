// Services — dark editorial page with three alternating service blocks.
// Matches the homepage language: cinematic imagery with scrim, vertical edge
// labels, large condensed display type, crimson accent details.

const SERVICES_IMGS = window.__resources || {};

const SERVICE_LIST = [
  {
    n: '01',
    title: 'Mortgage Consultant',
    eyebrow: 'Financing · Advisory',
    lead: 'Professional support in choosing the right financing option, comparing bank offers, and guiding the client through the entire approval process.',
    image: SERVICES_IMGS.imgServiceMortgage,
    caption: 'Lending advisory · Private engagements',
  },
  {
    n: '02',
    title: 'Turnkey Renovation',
    eyebrow: 'Project · Build',
    lead: 'Full organization and management of the renovation process — from planning and materials to execution and final handover.',
    image: SERVICES_IMGS.imgServiceRenovation,
    caption: 'Trades managed · Single principal',
  },
  {
    n: '03',
    title: 'Interior Design',
    eyebrow: 'Design · Atelier',
    lead: 'Tailored interior solutions designed around the space, style, and lifestyle of the client.',
    image: SERVICES_IMGS.imgServiceInterior,
    caption: 'Bespoke interiors · By appointment',
  },
];

function ServicesPage({ onNav }) {
  const t = useT();
  const SERVICE_LIST_LOCAL = [
    {
      n: '01',
      title: t('sv.s1title'),
      eyebrow: t('sv.s1eyebrow'),
      lead: t('sv.s1body'),
      image: SERVICES_IMGS.imgServiceMortgage,
      caption: t('sv.s1cap'),
      enquire: t('sv.s1enquire'),
    },
    {
      n: '02',
      title: t('sv.s2title'),
      eyebrow: t('sv.s2eyebrow'),
      lead: t('sv.s2body'),
      image: SERVICES_IMGS.imgServiceRenovation,
      caption: t('sv.s2cap'),
      enquire: t('sv.s2enquire'),
    },
    {
      n: '03',
      title: t('sv.s3title'),
      eyebrow: t('sv.s3eyebrow'),
      lead: t('sv.s3body'),
      image: SERVICES_IMGS.imgServiceInterior,
      caption: t('sv.s3cap'),
      enquire: t('sv.s3enquire'),
    },
  ];
  return (
    <>
      <ServicesHero />
      {SERVICE_LIST_LOCAL.map((s, i) => (
        <ServiceBlock key={s.n} {...s} reverse={i % 2 === 1} index={i} total={SERVICE_LIST_LOCAL.length} />
      ))}
      <ServicesCTA onNav={onNav} />
    </>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */
function ServicesHero() {
  const t = useT();
  return (
    <section style={{
      position: 'relative',
      background: 'var(--ak-black)',
      padding: 'calc(var(--section-y) * 1.1) var(--gutter) calc(var(--section-y) * 0.55)',
      overflow: 'hidden',
      borderBottom: '1px solid var(--hairline-light)',
    }}>
      {/* diagonal grain texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><line x1='0' y1='0' x2='0' y2='6' stroke='white' stroke-width='.5' opacity='.06' transform='rotate(35)'/></svg>\")",
        mixBlendMode: 'overlay', opacity: .8 }}></div>
      {/* decorative outline ring */}
      <div style={{ position: 'absolute', right: '-12vw', top: '20%',
        width: '42vw', height: '42vw', maxWidth: 640, maxHeight: 640,
        borderRadius: '50%', border: '1px solid rgba(245,241,234,.05)', pointerEvents: 'none' }}></div>

      <div style={{ position: 'relative', display: 'grid',
        gridTemplateColumns: 'minmax(48px, auto) 1fr', gap: 'clamp(24px, 4vw, 72px)',
        paddingTop: 'clamp(60px, 8vw, 120px)' }}>

        {/* vertical edge label */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 18, paddingTop: 60 }}>
          <div style={{ width: 1, height: 80, background: 'var(--ak-crimson)' }}></div>
          <VLabel>{t('sv.heroVLabel')}</VLabel>
        </div>

        <div className="ak-rise">
          <Eyebrow style={{ marginBottom: 28 }}>{t('sv.heroEyebrow')}</Eyebrow>
          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(72px, 13vw, 220px)', lineHeight: 0.92,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--fg)',
          }}>
            {(() => {
              const title = t('sv.heroTitle');
              const mid = Math.floor(title.length / 2);
              return (
                <>{title.slice(0, mid)}<em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>{title[mid]}</em>{title.slice(mid + 1)}</>
              );
            })()}
          </h1>

          <div style={{ marginTop: 40, display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: 'clamp(24px, 5vw, 96px)', alignItems: 'end' }}>
            <p style={{
              margin: 0, maxWidth: 620,
              fontFamily: 'var(--font-display)', fontWeight: 200,
              fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.25,
              letterSpacing: '0.04em',
              color: 'var(--fg)',
            }}>
              {t('sv.heroLeadA')}
              <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>
                {t('sv.heroLeadEm')}
              </em>
            </p>
            <p style={{
              margin: 0, maxWidth: 420,
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 300, lineHeight: 1.7,
              color: 'var(--fg-2)',
            }}>
              {t('sv.heroBody')}
            </p>
          </div>

          {/* index strip */}
          <div style={{ marginTop: 'clamp(56px, 7vw, 96px)', display: 'flex',
            alignItems: 'center', gap: 28, paddingTop: 24,
            borderTop: '1px solid var(--hairline-light)' }}>
            <RedSquare size={6} />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-2)' }}>{t('sv.threeDisc')}</span>
            <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-3)' }}>
              {t('sv.indexList')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Service Block ───────────────────────── */
function ServiceBlock({ n, title, eyebrow, lead, image, caption, enquire, reverse, index, total }) {
  const t = useT();
  const altBg = index === 1 ? 'var(--ak-charcoal)' : 'var(--ak-ink)';
  return (
    <section style={{
      background: altBg,
      padding: 'var(--section-y) var(--gutter)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'grid',
        gridTemplateColumns: 'minmax(48px,auto) 1fr',
        gap: 'clamp(24px, 4vw, 64px)' }}>

        {/* vertical edge label */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 18, paddingTop: 60 }}>
          <div style={{ width: 1, height: 80, background: 'var(--ak-crimson)' }}></div>
          <VLabel>{`§ 0${index + 1} — ${title}`}</VLabel>
        </div>

        {/* alternating two-column body */}
        <div style={{ display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
          gap: 'clamp(32px, 5vw, 96px)',
          alignItems: 'center',
          direction: reverse ? 'rtl' : 'ltr',
        }}>
          {/* text column */}
          <div style={{ direction: 'ltr' }}>
            <SectionNumeral n={n} label={eyebrow} />

            <h2 style={{
              margin: '28px 0 0',
              fontFamily: 'var(--font-display)', fontWeight: 200,
              fontSize: 'clamp(40px, 5.4vw, 92px)', lineHeight: 0.96,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--fg)',
            }}>
              {title.split(' ').map((w, i, arr) => (
                <React.Fragment key={i}>
                  {i === arr.length - 1
                    ? <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>{w}</em>
                    : <>{w}<br/></>}
                </React.Fragment>
              ))}
            </h2>

            <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ width: 36, height: 1, background: 'var(--ak-crimson)' }}></span>
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--fg-3)' }}>
                {t('sv.disc')} {n} {t('sv.of')} 0{total}
              </span>
            </div>

            <p style={{
              margin: '28px 0 0', maxWidth: 480,
              fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300, lineHeight: 1.75,
              color: 'var(--fg-2)',
            }}>
              {lead}
            </p>

            <div style={{ marginTop: 40, display: 'inline-flex', alignItems: 'center', gap: 14,
              paddingBottom: 6, borderBottom: '1px solid var(--ak-crimson)',
              fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--fg)', cursor: 'pointer' }}>
              <span>{enquire}</span>
              <span style={{ color: 'var(--ak-crimson)' }}>→</span>
            </div>
          </div>

          {/* image column */}
          <div style={{ direction: 'ltr', position: 'relative',
            aspectRatio: '4 / 5', overflow: 'hidden',
            background: '#1c1c1c',
            boxShadow: '0 24px 60px -20px rgba(0,0,0,.55), 0 4px 12px rgba(0,0,0,.18)' }}>
            <img src={image} alt={title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                       objectFit: 'cover', filter: 'saturate(.85) contrast(1.08) brightness(.85)' }} />
            {/* subtle dark scrim — homepage card overlay */}
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.30) 45%, rgba(0,0,0,.78) 100%)' }}></div>

            {/* corner index card */}
            <div style={{ position: 'absolute', top: 18, left: 18,
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px', background: 'rgba(0,0,0,.55)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
              <RedSquare size={6} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
                fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: '#fff' }}>{n} / 0{total}</span>
            </div>

            {/* big outline numeral */}
            <span style={{ position: 'absolute', right: 12, top: -10,
              fontFamily: 'var(--font-display)', fontWeight: 200,
              fontSize: 'clamp(120px, 16vw, 240px)', lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(245,241,234,.18)',
              pointerEvents: 'none' }}>{n}</span>

            {/* caption */}
            <div style={{ position: 'absolute', left: 18, bottom: 18,
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 18, height: 1, background: 'var(--ak-crimson)' }}></span>
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: '#fff' }}>{caption}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA Block ─────────────────────────── */
function ServicesCTA({ onNav }) {
  const t = useT();
  return (
    <section style={{
      background: 'var(--ak-black)',
      padding: 'clamp(80px, 9vw, 140px) var(--gutter)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid var(--hairline-light)',
    }}>
      {/* faint texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><line x1='0' y1='0' x2='0' y2='6' stroke='white' stroke-width='.5' opacity='.06' transform='rotate(35)'/></svg>\")",
        mixBlendMode: 'overlay', opacity: .7 }}></div>
      {/* outline circle */}
      <div style={{ position: 'absolute', left: '-14vw', bottom: '-14vw',
        width: '38vw', height: '38vw', maxWidth: 520, maxHeight: 520,
        borderRadius: '50%', border: '1px solid rgba(245,241,234,.06)', pointerEvents: 'none' }}></div>

      <div style={{ position: 'relative', display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
        gap: 'clamp(40px, 6vw, 96px)', alignItems: 'end' }}>
        <div>
          <Eyebrow style={{ marginBottom: 28 }}>{t('sv.ctaEyebrow')}</Eyebrow>
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(40px, 5.6vw, 96px)', lineHeight: 0.96,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--fg)',
          }}>
            {t('sv.ctaTitleA')} <br/>
            <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>{t('sv.ctaTitleEm')}</em> {t('sv.ctaTitleB')}
          </h2>
        </div>
        <div style={{ paddingBottom: 6 }}>
          <p style={{ margin: '0 0 32px', maxWidth: 440,
            fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300, lineHeight: 1.7,
            color: 'var(--fg-2)' }}>
            {t('sv.ctaBody')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <Btn variant="primary" onClick={() => onNav && onNav('contact')}>
              {t('sv.ctaBtn')}
            </Btn>
            <a href="#/" onClick={(e) => { e.preventDefault(); onNav && onNav('listings'); }}
              style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--fg)', textDecoration: 'none',
                borderBottom: '1px solid var(--ak-crimson)', paddingBottom: 4 }}>
              {t('sv.ctaReturn')}
            </a>
          </div>
        </div>
      </div>

      {/* bottom hairline meta */}
      <div style={{ position: 'relative', marginTop: 'clamp(60px, 7vw, 96px)',
        display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24,
        borderTop: '1px solid var(--hairline-light)' }}>
        <RedSquare size={6} />
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          {t('sv.ctaMeta')}
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-3)' }}>
          {t('sv.ctaMotto')}
        </span>
      </div>
    </section>
  );
}

Object.assign(window, { ServicesPage });

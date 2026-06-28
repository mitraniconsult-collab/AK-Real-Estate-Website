// Concierge — dark cinematic section, four-service grid + editorial panel.

const SERVICES_BG = [
  { n: '01', title: 'Кредитен консултант',   body: 'Финансово насочване и съдействие при избор на подходящо кредитиране.' },
  { n: '02', title: 'Имотно посредничество', body: 'Съдействие при намиране, покупка и продажба на имот според нуждите на клиента.' },
  { n: '03', title: 'Интериорен дизайн',     body: 'Концепция, стил и завършен интериор, съобразен с начина на живот.' },
  { n: '04', title: 'Ремонт от А до Я',      body: 'Организация и управление на ремонтния процес от първия оглед до финалното предаване.' },
];

const SERVICES_EN = [
  { n: '01', title: 'Credit Consulting',  body: 'Financial guidance and support in choosing the right mortgage and financing solution.' },
  { n: '02', title: 'Real Estate Agency', body: 'Assistance finding, buying and selling property — tailored process from first viewing to signed deal.' },
  { n: '03', title: 'Interior Design',    body: 'Concept, style and a finished interior matched precisely to your way of life.' },
  { n: '04', title: 'Full Renovation',    body: 'Organisation and management of the renovation process from first visit to final handover.' },
];

function Concierge({ lang = 'bg' }) {
  const isBg = lang !== 'en';
  const SERVICES = isBg ? SERVICES_BG : SERVICES_EN;
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

      <div className="r-stack-980-keep-label" style={{ position: 'relative', display: 'grid',
        gridTemplateColumns: 'minmax(48px,auto) 1fr', gap: 'clamp(24px,4vw,72px)' }}>

        {/* vertical label */}
        <div className="r-edge-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 18, paddingTop: 60 }}>
          <div style={{ width: 1, height: 80, background: 'var(--ak-crimson)' }}></div>
          <VLabel>{isBg ? '§ 03 — Защо AK' : '§ 03 — Why AK'}</VLabel>
        </div>

        <div>
          {/* header */}
          <header className="r-stack-640" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr',
            gap: 'clamp(32px, 6vw, 96px)', marginBottom: 'clamp(60px, 7vw, 110px)' }}>
            <div>
              <SectionNumeral n="03" label={isBg ? 'Услуги' : 'The Practice'} />
              <h2 style={{ margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200,
                fontSize: 'clamp(40px, 5vw, 92px)', lineHeight: 0.96,
                letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {lang === 'en'
                  ? <>Four services.<br/>One <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>handshake.</em></>
                  : <>Четири услуги.<br/>Един <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>процес.</em></>
                }
              </h2>
            </div>
            <p style={{ margin: '70px 0 0', maxWidth: 460, alignSelf: 'end',
              fontSize: 16, lineHeight: 1.7, fontWeight: 300, color: 'var(--fg-2)' }}>
              {isBg
                ? 'От първата консултация до финалното предаване — един екип до вас. Подреждаме процеса ясно, лично и без излишно усложняване.'
                : 'From first consultation to final handover — one team beside you. We keep the process clear, personal and free of unnecessary complexity.'
              }
            </p>
          </header>

          {/* services grid + image */}
          <div className="r-stack-980" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,3vw,48px)' }}>
            <div className="r-services" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(24px, 3vw, 56px) clamp(24px, 3vw, 48px)' }}>
              {SERVICES.map(s => <ServiceTile key={s.n} {...s} />)}
            </div>
            {/* Editorial placeholder panel — local assets only, no hotlinks */}
            <div style={{
              position: 'relative', minHeight: 480, overflow: 'hidden',
              background: 'radial-gradient(circle at 28% 28%, rgba(176,24,28,.18), transparent 58%), linear-gradient(160deg, #1c1c1c 0%, #080808 100%)',
              border: '1px solid var(--hairline-light)',
            }}>
              {/* grain overlay */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: "url('assets/grain.svg')", backgroundSize: '6px 6px',
                mixBlendMode: 'overlay', opacity: .35,
              }}></div>
              {/* decorative ring */}
              <div style={{
                position: 'absolute', right: '-14%', bottom: '-20%',
                width: '80%', height: '80%',
                backgroundImage: "url('assets/ring.svg')", backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', backgroundSize: 'contain', opacity: .10,
              }}></div>
              {/* monogram */}
              <img src="assets/logo-monogram.svg" alt=""
                style={{ position: 'absolute', top: 28, left: 28, width: 42, height: 'auto', opacity: .48 }} />
              {/* caption */}
              <div style={{ position: 'absolute', left: 24, bottom: 24, right: 24 }}>
                <Eyebrow style={{ marginBottom: 14 }}>
                  {lang === 'en' ? 'AK · Services' : 'AK · Услуги'}
                </Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 200,
                  fontSize: 28, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#fff', lineHeight: 1 }}>
                  {lang === 'en'
                    ? <>Personal.<br/>Not <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>delegated.</em></>
                    : <>Лично.<br/>Не <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>прехвърлено.</em></>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* CTA strip */}
          <div className="r-flex-wrap" style={{ marginTop: 'clamp(48px,6vw,96px)', display: 'flex',
            alignItems: 'center', gap: 24, paddingTop: 24,
            borderTop: '1px solid var(--hairline-light)' }}>
            <RedSquare />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(22px, 2.4vw, 32px)', letterSpacing: '0.06em',
              textTransform: 'uppercase' }}>
              {isBg ? 'Започнете разговор.' : 'Begin a quiet conversation.'}
            </span>
            <span style={{ flex: 1 }}></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Btn variant="primary" as="a" href="/services" style={{ textDecoration: 'none' }}>
                {isBg ? 'Всички услуги →' : 'All services →'}
              </Btn>
              <Btn variant="secondary" as="a" href="/contact" style={{ textDecoration: 'none' }}>
                {isBg ? 'Запитване' : 'Get in touch'}
              </Btn>
            </div>
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

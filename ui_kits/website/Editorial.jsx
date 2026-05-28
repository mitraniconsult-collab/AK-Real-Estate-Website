// Editorial — light section, interior/architecture image pair + editorial columns.

const ED_IMG_HERO  = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=80&auto=format&fit=crop";
const ED_IMG_INSET = "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=900&q=80&auto=format&fit=crop";

function Editorial({ lang = 'bg' }) {
  const isBg = lang !== 'en';
  return (
    <section style={{ background: 'var(--ak-bone)', color: 'var(--fg-on-light)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>

      <header className="r-stack-640" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(24px,5vw,80px)', alignItems: 'end',
        marginBottom: 'clamp(48px,5vw,80px)' }}>
        <div>
          <SectionNumeral n="04" label={isBg ? 'Завършен проект' : 'Completed Project'} light />
          <h2 style={{ margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(48px, 7vw, 124px)', lineHeight: 0.92,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--fg-on-light)' }}>
            {isBg
              ? <>По-тихата улица,<br/>по-силен<br/>е <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>домът.</em></>
              : <>The quieter<br/>the street,<br/>the louder<br/>the <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>house.</em></>
            }
          </h2>
        </div>
        <div style={{ alignSelf: 'end', paddingBottom: 8 }}>
          <Eyebrow light style={{ marginBottom: 14 }}>
            {isBg ? 'AK Studio · 2025' : 'AK Studio · 2025'}
          </Eyebrow>
          <p style={{ margin: 0, maxWidth: 420, fontSize: 16, lineHeight: 1.7,
            fontWeight: 300, color: 'var(--ak-pewter)' }}>
            {isBg
              ? 'Снимки и детайлен материал за завършен ремонт и интериор — материали, процес и финален резултат.'
              : 'Photographs and an in-depth piece on a completed renovation and interior — materials, process and the final result.'
            }
          </p>
        </div>
      </header>

      {/* image composition: large + inset */}
      <div className="r-stack-640" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(16px,2.5vw,40px)',
        alignItems: 'stretch' }}>
        <figure style={{ margin: 0, position: 'relative', borderRadius: 4, overflow: 'hidden',
          aspectRatio: '4/3', boxShadow: '0 24px 60px -20px rgba(20,18,14,.25)' }}>
          <img src={ED_IMG_HERO} alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                     objectFit: 'cover', filter: 'saturate(.85) contrast(1.06)' }} />
          <figcaption style={{ position: 'absolute', left: 20, bottom: 18,
            display: 'flex', alignItems: 'center', gap: 10 }}>
            <RedSquare size={6} />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#fff' }}>
              {isBg ? 'Интериор · Лозенец · 2025' : 'Interior · Lozenets · 2025'}
            </span>
          </figcaption>
        </figure>

        <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: 'clamp(16px,2.5vw,32px)' }}>
          <figure style={{ margin: 0, position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
            <img src={ED_IMG_INSET} alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                       objectFit: 'cover', filter: 'saturate(.85) contrast(1.06)' }} />
          </figure>

          <div className="r-edit-inset-copy" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontWeight: 300, color: 'var(--ak-pewter)' }}>
              {isBg
                ? 'Четири месеца планиране, материали и координация. Когато ремонтът приключи, пространството беше преобразено до неузнаваемост.'
                : 'Four months of planning, materials and coordination. When the renovation was complete, the space was transformed beyond recognition.'
              }
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontWeight: 300, color: 'var(--ak-pewter)' }}>
              {isBg
                ? <>Клиентът влезе в деня на предаването. <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic' }}>"Точно това исках", каза тя.</em> Оттам нататък всяко решение придоби смисъл.</>
                : <>The client walked in on handover day. <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic' }}>"This is exactly what I wanted," she said.</em> And from that point, every decision made sense.</>
              }
            </p>
          </div>
        </div>
      </div>

      <div className="r-flex-wrap" style={{ marginTop: 'clamp(40px,5vw,72px)', display: 'flex',
        alignItems: 'center', gap: 24 }}>
        <RedLine />
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-on-light-3)' }}>
          {isBg ? 'Завършен проект · Лозенец · 2025' : 'Completed project · Lozenets · 2025'}
        </span>
        <span style={{ flex: 1 }}></span>
        <Btn variant="primary" as="a" href="/services" style={{ textDecoration: 'none' }}>
          {isBg ? 'Виж услугите' : 'View Services'}
        </Btn>
      </div>
    </section>
  );
}

Object.assign(window, { Editorial });

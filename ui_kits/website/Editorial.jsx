// Editorial — light section, lifestyle/architecture full-bleed half, editorial columns half.

const ED_IMG_HERO  = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=80&auto=format&fit=crop";
const ED_IMG_INSET = "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=900&q=80&auto=format&fit=crop";

function Editorial() {
  return (
    <section style={{ background: 'var(--ak-bone)', color: 'var(--fg-on-light)',
      padding: 'var(--section-y) var(--gutter)', position: 'relative' }}>

      <header className="r-stack-640" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(24px,5vw,80px)', alignItems: 'end',
        marginBottom: 'clamp(48px,5vw,80px)' }}>
        <div>
          <SectionNumeral n="04" label="Lifestyle Magazine Feature" light />
          <h2 style={{ margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(48px, 7vw, 124px)', lineHeight: 0.92,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--fg-on-light)' }}>
            The quieter<br/>the street,<br/>the louder<br/>the <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>house.</em>
          </h2>
        </div>
        <div style={{ alignSelf: 'end', paddingBottom: 8 }}>
          <Eyebrow light style={{ marginBottom: 14 }}>Issue 07 — Spring 2026</Eyebrow>
          <p style={{ margin: 0, maxWidth: 420, fontSize: 16, lineHeight: 1.7,
            fontWeight: 300, color: 'var(--ak-pewter)' }}>
            Photographs and a long read from inside the seven-year restoration of an estate
            in Montecito's avocado country — by writer L. Verriér and photographer S. Demir.
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
              Villa di Pietra · Montecito · Restored 2024
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
              For four years the house was empty. The orchard was not. Through three drought
              seasons a single caretaker walked it twice a week and decided which trees were
              worth the water.
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontWeight: 300, color: 'var(--ak-pewter)' }}>
              When the new owner finally arrived in late October, the avocados were still on
              the branch. <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic' }}>"They waited," she said.</em>
            </p>
          </div>
        </div>
      </div>

      <div className="r-flex-wrap" style={{ marginTop: 'clamp(40px,5vw,72px)', display: 'flex',
        alignItems: 'center', gap: 24 }}>
        <RedLine />
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg-on-light-3)' }}>
          4,800 words · 22 photographs · The AK Journal
        </span>
        <span style={{ flex: 1 }}></span>
        <Btn variant="primary">Read the Feature</Btn>
      </div>
    </section>
  );
}

Object.assign(window, { Editorial });

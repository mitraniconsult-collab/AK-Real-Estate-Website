// Contact — full-bleed dark cinematic, asymmetric headline + minimal form.

const CONTACT_IMG = (window.__resources && window.__resources.imgContact);

function Contact() {
  const t = useT();
  const [sent, setSent] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [interest, setInterest] = React.useState('Acquisition');
  const [message, setMessage] = React.useState('');

  return (
    <section style={{ position: 'relative', background: 'var(--ak-black)', color: 'var(--fg)',
      overflow: 'hidden' }}>
      <img src={CONTACT_IMG} alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', filter: 'saturate(.8) brightness(.55) contrast(1.05)' }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,.65) 0%, rgba(0,0,0,.45) 30%, rgba(0,0,0,.85) 100%)' }}></div>
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><line x1='0' y1='0' x2='0' y2='6' stroke='white' stroke-width='.5' opacity='.06' transform='rotate(35)'/></svg>\")",
        mixBlendMode: 'overlay', opacity: .8, pointerEvents: 'none' }}></div>

      <div style={{ position: 'relative', padding: 'var(--section-y) var(--gutter)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,96px)',
        alignItems: 'start' }}>
        {/* left — headline */}
        <div>
          <Eyebrow style={{ marginBottom: 28 }}>{t('contact.eyebrow')}</Eyebrow>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(48px, 7vw, 140px)', lineHeight: 0.92,
            letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {t('contact.titleA')}<br/><em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>{t('contact.titleEm')}</em>
          </h2>
          <p style={{ marginTop: 32, maxWidth: 460, fontSize: 16, lineHeight: 1.7,
            fontWeight: 300, color: 'var(--fg-2)' }}>
            {t('contact.body')}
          </p>

          <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <ContactLine label={t('contact.la')}   value="9000 Sunset Boulevard, West Hollywood, CA 90069" />
            <ContactLine label={t('contact.montecito')}     value="By appointment — 805 555 0142" />
            <ContactLine label={t('contact.direct')}        value="a.kane@ak.realestate" />
            <ContactLine label="Press"         value="press@ak.realestate" />
          </div>
        </div>

        {/* right — form */}
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          style={{ background: 'rgba(20,20,20,.6)', backdropFilter: 'blur(14px)',
            border: '1px solid var(--hairline-light)', padding: 'clamp(28px,3.2vw,48px)',
            display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <RedSquare />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Request Access
            </span>
          </div>

          {!sent && <>
            <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
            <Field label="Email" value={email} onChange={setEmail} placeholder="you@private.estate" />

            <div>
              <label style={fieldLabelStyle}>Area of Interest</label>
              <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Acquisition', 'Discreet Sale', 'Concierge', 'Press'].map(opt => (
                  <button key={opt} type="button" onClick={() => setInterest(opt)}
                    style={{
                      background: interest === opt ? 'var(--ak-crimson)' : 'transparent',
                      color: interest === opt ? '#fff' : 'var(--fg)',
                      border: interest === opt ? 'none' : '1px solid var(--hairline-light)',
                      padding: '10px 14px', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
                      letterSpacing: '0.22em', textTransform: 'uppercase', borderRadius: 0,
                      transition: 'all .2s var(--ease)',
                    }}>{opt}</button>
                ))}
              </div>
            </div>

            <Field label="A note" value={message} onChange={setMessage}
              placeholder="A quiet street, a stone wall, a garden." textarea />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
              <Btn variant="primary" as="button" type="submit">{t('contact.send')}</Btn>
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--fg-2)' }}>
                ▪ Responded to within one business day
              </span>
            </div>
          </>}

          {sent && (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <RedSquare style={{ display: 'block', margin: '0 auto 18px' }} />
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
                fontSize: 32, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Quietly received.
              </div>
              <p style={{ marginTop: 16, fontSize: 14, color: 'var(--fg-2)' }}>
                A principal will be in touch within one business day, {name || 'friend'}.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

const fieldLabelStyle = {
  fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
  letterSpacing: '0.28em', textTransform: 'uppercase',
  color: 'var(--fg-2)',
};

function Field({ label, value, onChange, placeholder, textarea }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div>
      <label style={fieldLabelStyle}>{label}</label>
      <Tag
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={textarea ? 4 : undefined}
        style={{
          marginTop: 10, display: 'block', width: '100%',
          background: 'transparent', color: 'var(--fg)',
          fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
          border: 0, borderBottom: '1px solid var(--hairline-light)',
          padding: '10px 0', outline: 'none', resize: 'vertical',
        }}
      />
    </div>
  );
}

function ContactLine({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24,
      alignItems: 'baseline', paddingBottom: 14,
      borderBottom: '1px solid var(--hairline-light)' }}>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: 'var(--fg-2)' }}>▪ {label}</div>
      <div style={{ fontSize: 15, fontWeight: 300, color: 'var(--fg)' }}>{value}</div>
    </div>
  );
}

Object.assign(window, { Contact });

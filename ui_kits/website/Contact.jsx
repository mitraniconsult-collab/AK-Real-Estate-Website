// Contact — full-bleed dark cinematic, asymmetric headline + minimal form.

const CONTACT_IMG = "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=2200&q=80&auto=format&fit=crop";

// Stable, language-neutral interest keys + their displayed labels per language.
const INTEREST_OPTIONS = [
  { key: 'buy',        bg: 'Покупка на имот',     en: 'Buying property' },
  { key: 'sell',       bg: 'Продажба на имот',    en: 'Selling property' },
  { key: 'credit',     bg: 'Кредитен консултант', en: 'Credit consultation' },
  { key: 'interior',   bg: 'Интериорен дизайн',   en: 'Interior design' },
  { key: 'renovation', bg: 'Ремонт от А до Я',    en: 'Renovation' },
];

function Contact({ lang = 'bg' }) {
  const isBg = lang !== 'en';
  const [sent, setSent] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [budget, setBudget] = React.useState('');
  const [interest, setInterest] = React.useState('buy'); // stores the stable key
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(''); // '' | 'validation' | 'network'
  const [errorMsg, setErrorMsg] = React.useState(''); // specific message; falls back to generic text
  const [honeypot, setHoneypot] = React.useState(''); // bots fill this; humans never see it
  const mountedAt = React.useRef(Date.now());

  // Maps a Supabase/Postgres error to a more specific, user-readable message.
  // Returns '' when no specific match is found (caller shows the generic text).
  const resolveErrorMsg = (err) => {
    const code = err && err.code ? String(err.code) : '';
    const msg = (err && err.message ? String(err.message) : '').toLowerCase();

    // relation/table missing — 42P01
    if (code === '42P01' || msg.includes('does not exist') || msg.includes('could not find the table')) {
      return isBg
        ? 'Таблицата за запитвания липсва. Моля, свържете се с нас директно.'
        : 'The inquiries table is missing. Please contact us directly.';
    }
    // permission / RLS denied — 42501 or PostgREST RLS message
    if (code === '42501' || msg.includes('row-level security') || msg.includes('permission denied')) {
      return isBg
        ? 'Изпращането не е разрешено в момента. Моля, свържете се с нас директно.'
        : 'Submission is not permitted right now. Please contact us directly.';
    }
    // check constraint violation — 23514
    if (code === '23514' || msg.includes('check constraint') || msg.includes('violates check')) {
      return isBg
        ? 'Някои данни не са валидни. Моля, проверете полетата и опитайте отново.'
        : 'Some details are invalid. Please check the fields and try again.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorMsg('');

    // Spam guard 1 — honeypot filled → silently show success, never insert.
    if (honeypot.trim()) { setSent(true); return; }

    // Spam guard 2 — submitted suspiciously fast → silently show success, never insert.
    if (Date.now() - mountedAt.current < 2000) { setSent(true); return; }

    const nm = name.trim();
    const ph = phone.trim();

    // Validation — require at least name + phone.
    if (!nm || !ph) { setError('validation'); return; }

    if (!window.akSupabase) {
      console.error('Contact insert: window.akSupabase is not available.');
      setError('network');
      setErrorMsg(isBg
        ? 'Услугата не е достъпна. Моля, свържете се с нас директно.'
        : 'Service unavailable. Please contact us directly.');
      return;
    }

    const selected = INTEREST_OPTIONS.find(o => o.key === interest) || INTEREST_OPTIONS[0];
    const interestLabel = isBg ? selected.bg : selected.en;

    const payload = {
      name: nm,
      phone: ph,
      budget: budget.trim(),
      interest: selected.key,
      interest_label: interestLabel,
      message: message.trim(),
      lang,
      source: 'website_contact',
      user_agent: navigator.userAgent,
    };

    setLoading(true);
    // No .select() — anon has INSERT but not SELECT; chaining .select() would
    // trigger an RLS/permission error on an otherwise successful insert.
    const { error: insErr } = await window.akSupabase
      .from('contact_inquiries')
      .insert(payload);
    setLoading(false);

    if (insErr) {
      // Log only non-personal diagnostic fields (no submitted form values).
      console.error('Contact insert error:', {
        code: insErr.code, message: insErr.message, hint: insErr.hint,
      });
      setError('network'); // form values are preserved
      setErrorMsg(resolveErrorMsg(insErr)); // '' → generic text shown
      return;
    }

    setSent(true);
  };

  return (
    <section id="contact" style={{ position: 'relative', background: 'var(--ak-black)', color: 'var(--fg)',
      overflow: 'hidden' }}>
      <img src={CONTACT_IMG} alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', filter: 'saturate(.8) brightness(.55) contrast(1.05)' }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,.65) 0%, rgba(0,0,0,.45) 30%, rgba(0,0,0,.85) 100%)' }}></div>
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><line x1='0' y1='0' x2='0' y2='6' stroke='white' stroke-width='.5' opacity='.06' transform='rotate(35)'/></svg>\")",
        mixBlendMode: 'overlay', opacity: .8, pointerEvents: 'none' }}></div>

      <div className="r-stack-980" style={{ position: 'relative', padding: 'var(--section-y) var(--gutter)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,96px)',
        alignItems: 'start' }}>
        {/* left — headline */}
        <div>
          <Eyebrow style={{ marginBottom: 28 }}>
            {isBg ? 'Свържете се с нас' : 'Begin a Conversation'}
          </Eyebrow>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 200,
            fontSize: 'clamp(48px, 7vw, 140px)', lineHeight: 0.92,
            letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {isBg
              ? <>Започнете<br/>с <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>разговор.</em></>
              : <>Quietly.<br/>By <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>introduction.</em></>
            }
          </h2>
          <p style={{ marginTop: 32, maxWidth: 460, fontSize: 16, lineHeight: 1.7,
            fontWeight: 300, color: 'var(--fg-2)' }}>
            {isBg
              ? 'Разкажете ни какъв имот или проект планирате. Ще ви върнем ясен първи отговор и следваща стъпка.'
              : 'We respond to every message within one business day. No assistants, no automations.'
            }
          </p>

          <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <ContactLine label={isBg ? 'София' : 'Sofia'} value="ул. Димитър Хаджикоцев 15, Лозенец" />
            <ContactLine label={isBg ? 'Телефон' : 'Phone'}
              value={<a href="tel:+359879684460" style={{ color: 'var(--fg)', textDecoration: 'none' }}>+359 87 968 4460</a>} />
            <ContactLine label={isBg ? 'Имейл' : 'Email'}
              value={<a href="mailto:office@akrealestatebg.com" style={{ color: 'var(--fg)', textDecoration: 'none' }}>office@akrealestatebg.com</a>} />
          </div>

          {/* Direct action links */}
          <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="tel:+359879684460" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', border: '1px solid var(--hairline-light)',
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--fg-2)', textDecoration: 'none',
              transition: 'border-color .2s var(--ease), color .2s var(--ease)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ak-crimson)'; e.currentTarget.style.color = 'var(--fg)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hairline-light)'; e.currentTarget.style.color = 'var(--fg-2)'; }}>
              ☎ {isBg ? 'Обади се' : 'Call us'}
            </a>
            <a href="mailto:office@akrealestatebg.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', border: '1px solid var(--hairline-light)',
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--fg-2)', textDecoration: 'none',
              transition: 'border-color .2s var(--ease), color .2s var(--ease)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ak-crimson)'; e.currentTarget.style.color = 'var(--fg)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hairline-light)'; e.currentTarget.style.color = 'var(--fg-2)'; }}>
              ✉ {isBg ? 'Пиши ни' : 'Email us'}
            </a>
          </div>
        </div>

        {/* right — form */}
        <form onSubmit={handleSubmit}
          style={{ background: 'rgba(20,20,20,.6)', backdropFilter: 'blur(14px)',
            border: '1px solid var(--hairline-light)', padding: 'clamp(28px,3.2vw,48px)',
            display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <RedSquare />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {isBg ? 'Изпрати запитване' : 'Send inquiry'}
            </span>
          </div>

          {!sent && <>
            <Field label={isBg ? 'Вашето име' : 'Your name'} value={name} onChange={setName}
              placeholder={isBg ? 'Три имена' : 'Full name'} />
            <Field label={isBg ? 'Телефон' : 'Phone'} value={phone} onChange={setPhone}
              placeholder={isBg ? '+359 …' : '+1 / +44 …'} type="tel" />
            <Field label={isBg ? 'Бюджет (ориентировъчно)' : 'Budget (approx.)'} value={budget} onChange={setBudget}
              placeholder={isBg ? 'напр. 150 000 €' : 'e.g. €150,000'} />

            <div>
              <label style={fieldLabelStyle}>{isBg ? 'Тема' : 'Area of Interest'}</label>
              <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {INTEREST_OPTIONS.map(opt => {
                  const label = isBg ? opt.bg : opt.en;
                  const active = interest === opt.key;
                  return (
                    <button key={opt.key} type="button" onClick={() => setInterest(opt.key)}
                      style={{
                        background: active ? 'var(--ak-crimson)' : 'transparent',
                        color: active ? '#fff' : 'var(--fg)',
                        border: active ? 'none' : '1px solid var(--hairline-light)',
                        padding: '10px 14px', cursor: 'pointer',
                        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
                        letterSpacing: '0.22em', textTransform: 'uppercase', borderRadius: 0,
                        transition: 'all .2s var(--ease)',
                      }}>{label}</button>
                  );
                })}
              </div>
            </div>

            <Field label={isBg ? 'Съобщение' : 'A note'} value={message} onChange={setMessage}
              placeholder={isBg
                ? 'Разкажете ни за вашия проект или запитване...'
                : 'A quiet street, a stone wall, a garden.'
              } textarea />

            {/* Honeypot — hidden from humans; only bots fill it. */}
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
            />

            {error === 'validation' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 14px', background: 'rgba(176,24,28,.10)',
                border: '1px solid rgba(176,24,28,.40)',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--ak-crimson-bright)' }}>
                <RedSquare size={6} /> {isBg ? 'Моля, попълнете име и телефон.' : 'Please enter your name and phone.'}
              </div>
            )}

            {error === 'network' && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 14px', background: 'rgba(176,24,28,.10)',
                border: '1px solid rgba(176,24,28,.40)',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
                lineHeight: 1.6, color: 'var(--ak-crimson-bright)' }}>
                <RedSquare size={6} style={{ marginTop: 4, flexShrink: 0 }} />
                <span>
                  {errorMsg
                    ? errorMsg
                    : (isBg
                        ? 'Възникна грешка. Опитайте отново или ни пишете директно.'
                        : 'Something went wrong. Please try again or contact us directly.')}
                  {' '}
                  <a href="mailto:office@akrealestatebg.com"
                    style={{ color: 'var(--fg)', textDecoration: 'underline' }}>
                    office@akrealestatebg.com
                  </a>
                </span>
              </div>
            )}

            <div className="r-flex-wrap" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
              <Btn variant="primary" as="button" type="submit" disabled={loading}>
                {loading
                  ? (isBg ? 'Изпращане…' : 'Sending…')
                  : (isBg ? 'Изпрати запитване' : 'Send inquiry')}
              </Btn>
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--fg-2)' }}>
                ▪ {isBg ? 'Отговаряме в работния ден' : 'Responded to within one business day'}
              </span>
            </div>
          </>}

          {sent && (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <RedSquare style={{ display: 'block', margin: '0 auto 18px' }} />
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300,
                fontSize: 32, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {isBg ? 'Получено.' : 'Quietly received.'}
              </div>
              <p style={{ marginTop: 16, fontSize: 14, color: 'var(--fg-2)' }}>
                {isBg
                  ? `Ще се свържем с теб скоро${name ? ', ' + name : ''}.`
                  : `A principal will be in touch within one business day${name ? ', ' + name : ', friend'}.`
                }
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

function Field({ label, value, onChange, placeholder, textarea, type = 'text' }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div>
      <label style={fieldLabelStyle}>{label}</label>
      <Tag
        value={value}
        type={textarea ? undefined : type}
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
    <div className="r-contact-line" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24,
      alignItems: 'baseline', paddingBottom: 14,
      borderBottom: '1px solid var(--hairline-light)' }}>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: 'var(--fg-2)' }}>▪ {label}</div>
      <div style={{ fontSize: 15, fontWeight: 300, color: 'var(--fg)', lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { Contact });

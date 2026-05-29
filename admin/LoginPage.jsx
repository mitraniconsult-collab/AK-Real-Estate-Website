// LoginPage — full-screen cinematic dark, centered card with hairline-bottom inputs.

const LOGIN_BG = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=80&auto=format&fit=crop";

function LoginPage({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [resetLoading, setResetLoading] = React.useState(false);
  const [notice, setNotice] = React.useState(null); // { type: 'success' | 'error', text }

  const submit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError('Email and password are required.');
    return;
  }

  if (!window.akSupabase) {
    setError('Authentication service is not configured.');
    return;
  }

  setError('');
  setNotice(null);
  setLoading(true);

  const { data, error } = await window.akSupabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    setError('Invalid email or password.');
    return;
  }

  onSubmit(email, password, data);
};

  const handleForgot = async (e) => {
    e.preventDefault();
    setError('');
    setNotice(null);

    if (!email) {
      setNotice({ type: 'error', text: 'Въведете имейл адрес, за да възстановите паролата.' });
      return;
    }

    if (!window.akSupabase) {
      setNotice({ type: 'error', text: 'Authentication service is not configured.' });
      return;
    }

    setResetLoading(true);

    // redirectTo resolves to the production origin in deployment
    // (https://akrealestatebg.com/admin/login) and must be in Supabase's
    // allowed redirect URLs.
    const redirectTo = window.location.origin + '/admin/login';

    const { error } = await window.akSupabase.auth.resetPasswordForEmail(email, { redirectTo });

    setResetLoading(false);

    if (error) {
      setNotice({ type: 'error', text: error.message || 'Неуспешно изпращане на имейл. Опитайте отново.' });
      return;
    }

    setNotice({ type: 'success', text: 'Изпратихме имейл за възстановяване на паролата.' });
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '1.2fr 1fr', background: 'var(--ak-black)' }}>

      {/* LEFT — cinematic image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={LOGIN_BG} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                   objectFit: 'cover', filter: 'saturate(.75) contrast(1.1) brightness(.5)' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,.65) 0%, rgba(0,0,0,.30) 40%, rgba(0,0,0,.85) 100%)' }}></div>
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><line x1='0' y1='0' x2='0' y2='6' stroke='white' stroke-width='.5' opacity='.08' transform='rotate(35)'/></svg>\")",
          mixBlendMode: 'overlay', opacity: .6, pointerEvents: 'none' }}></div>

        {/* decorative ring */}
        <div style={{ position: 'absolute', left: '-10vw', bottom: '-15vw',
          width: '50vw', height: '50vw', borderRadius: '50%',
          border: '1px solid rgba(245,241,234,.08)', pointerEvents: 'none' }}></div>

        {/* content */}
        <div style={{ position: 'relative', height: '100%', minHeight: '100vh',
          padding: 'clamp(32px, 5vw, 80px)', display: 'flex', flexDirection: 'column' }}>
          <Logo size="md" />

          {/* vertical label */}
          <div style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 1, height: 80, background: 'var(--ak-crimson)' }}></div>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.42em',
              textTransform: 'uppercase', writingMode: 'vertical-rl',
              transform: 'rotate(180deg)', color: 'var(--fg-2)' }}>
              § 00 — Admin Console
            </span>
            <div style={{ width: 1, height: 80, background: 'rgba(245,241,234,.20)' }}></div>
          </div>

          <div style={{ marginTop: 'auto', maxWidth: 580 }}>
            <Eyebrow style={{ marginBottom: 24 }}>Restricted Access</Eyebrow>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 200,
              fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.94,
              letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              A quieter<br/>back <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>office.</em>
            </h1>
            <p style={{ marginTop: 28, maxWidth: 420, fontSize: 14, lineHeight: 1.7,
              fontWeight: 300, color: 'var(--fg-2)' }}>
              Manage the portfolio. Move listings between Draft, Active, Sold, and Rented.
              The site reflects your edits the moment you save.
            </p>
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 14,
              fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-3)' }}>
              <RedSquare size={6} />
              <span>Authorized personnel only · v2.4.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — login form */}
      <div style={{ background: 'var(--ak-ink)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(32px, 5vw, 80px)' }}>
        <form onSubmit={submit} style={{
          width: '100%', maxWidth: 420,
          display: 'flex', flexDirection: 'column', gap: 28,
        }}>
          <div>
            <Eyebrow>Sign In</Eyebrow>
            <h2 style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200,
              fontSize: 'clamp(32px, 3.6vw, 48px)', lineHeight: 1,
              letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Welcome <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>back.</em>
            </h2>
            <p style={{ marginTop: 14, fontSize: 13, color: 'var(--fg-2)', fontWeight: 300, lineHeight: 1.55 }}>
              Use your AK Real Estate administrator credentials.
            </p>
          </div>

          <Field label="Email Address" required>
            <TextInput value={email} onChange={setEmail} placeholder="you@ak.realestate" type="email" autoFocus />
          </Field>

          <Field label="Password" required>
            <TextInput value={password} onChange={setPassword} placeholder="••••••••••" type="password" />
          </Field>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', background: 'rgba(176,24,28,.10)',
              border: '1px solid rgba(176,24,28,.40)',
              fontSize: 11, fontWeight: 500, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--ak-crimson-bright)' }}>
              <RedSquare size={6} /> {error}
            </div>
          )}

          {notice && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px',
              background: notice.type === 'success' ? 'rgba(245,241,234,.06)' : 'rgba(176,24,28,.10)',
              border: '1px solid ' + (notice.type === 'success' ? 'var(--hairline-light)' : 'rgba(176,24,28,.40)'),
              fontSize: 11, fontWeight: 500, letterSpacing: '0.16em',
              lineHeight: 1.5,
              color: notice.type === 'success' ? 'var(--fg)' : 'var(--ak-crimson-bright)' }}>
              <RedSquare size={6} /> {notice.text}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <span style={{
                width: 16, height: 16,
                border: '1px solid ' + (remember ? 'var(--ak-crimson)' : 'var(--hairline-light)'),
                background: remember ? 'var(--ak-crimson)' : 'transparent',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: '#fff', transition: 'all .2s var(--ease)',
              }}>{remember && '✓'}</span>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                style={{ display: 'none' }} />
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--fg-2)' }}>Remember me</span>
            </label>
            <button type="button" onClick={handleForgot} disabled={resetLoading}
              style={{ background: 'none', border: 0, cursor: resetLoading ? 'default' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--fg-2)',
              borderBottom: '1px solid var(--ak-crimson)', paddingBottom: 2, padding: '0 0 2px',
              opacity: resetLoading ? 0.6 : 1 }}>
              {resetLoading ? 'Sending…' : 'Forgot?'}
            </button>
          </div>

          <Btn type="submit" variant="primary" disabled={loading} style={{
            justifyContent: 'space-between', padding: '15px 22px',
          }}>
            <span>{loading ? 'Signing In…' : 'Sign In'}</span>
            <span>→</span>
          </Btn>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14,
            paddingTop: 24, borderTop: '1px solid var(--hairline-light)' }}>
            <RedSquare size={6} />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--fg-3)' }}>
              Authorized admin credentials required
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

Object.assign(window, { LoginPage });

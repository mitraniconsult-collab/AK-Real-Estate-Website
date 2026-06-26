// AccountPage — current user email, secure password change, and sign out.
// Renders inside AdminShell (only when signed in). Uses the existing Supabase
// client (window.akSupabase). Passwords are never logged or sent anywhere but
// supabase.auth.updateUser.

const ACCOUNT_T = {
  bg: {
    'Manage · Account':  'Управление · Профил',
    'Your':              'Вашият',
    'account.':          'профил.',
    'Signed in as':      'Влезли сте като',
    'Session':           'Сесия',
    'Active session':    'Активна сесия',
    'Change password':   'Смени паролата',
    'New password':      'Нова парола',
    'Confirm new password': 'Повтори новата парола',
    'Use the new password the next time you sign in.':
      'След смяна на паролата използвайте новата парола при следващо влизане.',
    'Password changed successfully.': 'Паролата е сменена успешно.',
    'Password could not be changed. Please try again.':
      'Паролата не беше сменена. Моля, опитайте отново.',
    'New password is required.':     'Моля, въведете нова парола.',
    'Password must be at least 8 characters.': 'Паролата трябва да е поне 8 символа.',
    'Passwords do not match.':       'Паролите не съвпадат.',
    'Saving…':           'Запазване…',
    'Sign out':          'Изход',
    'Loading…':          'Зареждане…',
  },
  en: {
    'Manage · Account':  'Manage · Account',
    'Your':              'Your',
    'account.':          'account.',
    'Signed in as':      'Signed in as',
    'Session':           'Session',
    'Active session':    'Active session',
    'Change password':   'Change password',
    'New password':      'New password',
    'Confirm new password': 'Confirm new password',
    'Use the new password the next time you sign in.':
      'Use the new password the next time you sign in.',
    'Password changed successfully.': 'Password changed successfully.',
    'Password could not be changed. Please try again.':
      'Password could not be changed. Please try again.',
    'New password is required.':     'New password is required.',
    'Password must be at least 8 characters.': 'Password must be at least 8 characters.',
    'Passwords do not match.':       'Passwords do not match.',
    'Saving…':           'Saving…',
    'Sign out':          'Sign out',
    'Loading…':          'Loading…',
  },
};

function useAccountLang() {
  const read = () => localStorage.getItem('ak-admin-locale') || 'bg';
  const [lang, setLang] = React.useState(read);
  React.useEffect(() => {
    const sync = () => setLang(read());
    window.addEventListener('storage', sync);
    window.addEventListener('ak-admin-locale-change', sync);
    window.addEventListener('focus', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('ak-admin-locale-change', sync);
      window.removeEventListener('focus', sync);
    };
  }, []);
  const t = (k) => (ACCOUNT_T[lang] && ACCOUNT_T[lang][k]) || k;
  return { t, lang };
}

function AccountPasswordInput({ value, onChange, autoFocus }) {
  const [f, setF] = React.useState(false);
  return (
    <input
      type="password"
      autoComplete="new-password"
      autoFocus={autoFocus}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setF(true)}
      onBlur={() => setF(false)}
      style={{
        width: '100%', background: 'transparent', border: 0,
        borderBottom: '1px solid ' + (f ? 'var(--ak-crimson)' : 'var(--hairline-light)'),
        color: 'var(--fg)', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
        padding: '10px 0', outline: 'none', borderRadius: 0,
        transition: 'border-color .22s var(--ease)',
      }}
    />
  );
}

function AccountPage({ onSignOut }) {
  const { t } = useAccountLang();
  const [email, setEmail] = React.useState('');
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [pw, setPw] = React.useState('');
  const [pw2, setPw2] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!window.akSupabase) return;
        const { data } = await window.akSupabase.auth.getUser();
        if (mounted && data && data.user) setEmail(data.user.email || '');
      } catch (e) {
        // Session may have expired — the global auth listener handles redirect.
      } finally {
        if (mounted) setLoadingUser(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!pw) { setError(t('New password is required.')); return; }
    if (pw.length < 8) { setError(t('Password must be at least 8 characters.')); return; }
    if (pw !== pw2) { setError(t('Passwords do not match.')); return; }

    setSaving(true);
    try {
      const { error: err } = await window.akSupabase.auth.updateUser({ password: pw });
      if (err) throw err;
      setPw('');
      setPw2('');
      setSuccess(t('Password changed successfully.'));
    } catch (err) {
      // Log a sanitized message only — never the password.
      console.error('Password change failed:', (err && err.message) ? err.message : 'unknown error');
      setError(t('Password could not be changed. Please try again.'));
    } finally {
      setSaving(false);
    }
  };

  const cardStyle = {
    background: 'var(--ak-charcoal)',
    border: '1px solid var(--hairline-light)',
    padding: 'clamp(20px, 2.6vw, 32px)',
  };
  const labelStyle = {
    display: 'block', fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
    textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 10,
  };

  return (
    <div className="ak-rise">
      <SectionTitle
        n="·"
        label={t('Manage · Account')}
        title={t('Your')}
        accent={t('account.')}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'clamp(20px, 2.6vw, 32px)', maxWidth: 560 }}>

        {/* Current user */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <RedSquare size={6} />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-2)' }}>{t('Signed in as')}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(20px, 2.4vw, 28px)',
            letterSpacing: '0.02em', color: 'var(--fg)', wordBreak: 'break-all' }}>
            {loadingUser ? t('Loading…') : (email || '—')}
          </div>
        </div>

        {/* Change password */}
        <form style={cardStyle} onSubmit={submit} noValidate>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Icon name="lock" size={14} style={{ color: 'var(--ak-crimson)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22,
              letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg)' }}>
              {t('Change password')}
            </span>
          </div>

          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>{t('New password')}</label>
            <AccountPasswordInput value={pw} onChange={(v) => { setPw(v); setError(''); setSuccess(''); }} />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>{t('Confirm new password')}</label>
            <AccountPasswordInput value={pw2} onChange={(v) => { setPw2(v); setError(''); setSuccess(''); }} />
          </div>

          {error && (
            <div style={{ marginBottom: 18, padding: '12px 16px',
              background: 'rgba(176,24,28,.10)', border: '1px solid rgba(176,24,28,.35)',
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <RedSquare size={6} />
              <span style={{ fontSize: 12, color: 'var(--fg)', fontWeight: 300 }}>{error}</span>
            </div>
          )}
          {success && (
            <div style={{ marginBottom: 18, padding: '12px 16px',
              background: 'rgba(255,255,255,.04)', border: '1px solid var(--hairline-light)',
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, background: 'var(--ak-crimson)', display: 'inline-block', flexShrink: 0 }}></span>
              <span style={{ fontSize: 12, color: 'var(--fg)', fontWeight: 300 }}>{success}</span>
            </div>
          )}

          <p style={{ margin: '0 0 22px', fontSize: 11, color: 'var(--fg-3)', fontWeight: 300, lineHeight: 1.6 }}>
            {t('Use the new password the next time you sign in.')}
          </p>

          <Btn variant="primary" type="submit" disabled={saving}>
            {saving ? t('Saving…') : t('Change password')}
          </Btn>
        </form>

        {/* Sign out */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Btn variant="secondary" onClick={() => onSignOut && onSignOut()}>
            {t('Sign out')} ›
          </Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AccountPage, useAccountLang });

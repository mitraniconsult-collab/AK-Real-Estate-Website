// InquiriesPage — admin view of public contact form submissions.
// Reads public.contact_inquiries via the authenticated Supabase client.
// SELECT requires an authenticated RLS read policy; status updates require an
// authenticated UPDATE policy. No .select() is chained after update.

const INQ_T = {
  bg: {
    'Manage · Inquiries': 'Управление · Запитвания',
    'Inquiries':          'Запитвания',
    'received.':          'получени.',
    'Refresh':            'Обнови',
    'All':                'Всички',
    'New':                'Нови',
    'Read':               'Прочетени',
    'Archived':           'Архив',
    'Search name, phone, message…': 'Търси име, телефон, съобщение…',
    'Showing':            'Показани',
    'of':                 'от',
    'Loading inquiries…': 'Зареждане на запитвания…',
    'Could not load inquiries.': 'Грешка при зареждане на запитванията.',
    'Update failed. Please try again.': 'Неуспешна промяна. Опитайте отново.',
    'No inquiries yet.':  'Все още няма запитвания.',
    'No inquiries match the current filters.': 'Няма запитвания за избраните филтри.',
    'When': 'Дата', 'Name': 'Име', 'Phone': 'Телефон', 'Interest': 'Тема',
    'Budget': 'Бюджет', 'Message': 'Съобщение', 'Status': 'Статус', 'Actions': 'Действия',
    'Mark read': 'Маркирай', 'Archive': 'Архивирай', 'Call': 'Обади се',
    'Interest:': 'Тема:', 'All interests': 'Всички теми',
    buy: 'Покупка', sell: 'Продажба', credit: 'Кредит', interior: 'Интериор', renovation: 'Ремонт',
    'new': 'Ново', 'read': 'Прочетено', 'archived': 'Архив',
  },
  en: {
    'Manage · Inquiries': 'Manage · Inquiries',
    'Inquiries':          'Inquiries',
    'received.':          'received.',
    'Refresh':            'Refresh',
    'All':                'All',
    'New':                'New',
    'Read':               'Read',
    'Archived':           'Archived',
    'Search name, phone, message…': 'Search name, phone, message…',
    'Showing':            'Showing',
    'of':                 'of',
    'Loading inquiries…': 'Loading inquiries…',
    'Could not load inquiries.': 'Could not load inquiries.',
    'Update failed. Please try again.': 'Update failed. Please try again.',
    'No inquiries yet.':  'No inquiries yet.',
    'No inquiries match the current filters.': 'No inquiries match the current filters.',
    'When': 'When', 'Name': 'Name', 'Phone': 'Phone', 'Interest': 'Interest',
    'Budget': 'Budget', 'Message': 'Message', 'Status': 'Status', 'Actions': 'Actions',
    'Mark read': 'Mark read', 'Archive': 'Archive', 'Call': 'Call',
    'Interest:': 'Interest:', 'All interests': 'All interests',
    buy: 'Buy', sell: 'Sell', credit: 'Credit', interior: 'Interior', renovation: 'Renovation',
    'new': 'New', 'read': 'Read', 'archived': 'Archived',
  },
};

function useInqLang() {
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
  const t = (key) => (INQ_T[lang] && INQ_T[lang][key]) || key;
  return { t, lang };
}

const INTEREST_KEYS = ['buy', 'sell', 'credit', 'interior', 'renovation'];

function formatWhen(iso, lang) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  const locale = lang === 'en' ? 'en-GB' : 'bg-BG';
  return d.toLocaleString(locale, {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function InqStatusBadge({ status, t }) {
  const map = {
    new:      { bg: 'var(--ak-crimson)', fg: '#fff', border: 'transparent' },
    read:     { bg: 'transparent', fg: 'var(--fg-2)', border: 'var(--hairline-light)' },
    archived: { bg: 'rgba(255,255,255,.04)', fg: 'var(--fg-3)', border: 'var(--hairline-light)' },
  };
  const s = map[status] || map.new;
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px',
      background: s.bg, color: s.fg, border: `1px solid ${s.border}`,
      fontSize: 9, fontWeight: 500, letterSpacing: '0.20em',
      textTransform: 'uppercase', borderRadius: 0, whiteSpace: 'nowrap',
    }}>{t(status)}</span>
  );
}

function InquiriesPage() {
  const { t, lang } = useInqLang();

  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState(false);
  const [actionError, setActionError] = React.useState(false);

  const [status, setStatus] = React.useState('all');
  const [interest, setInterest] = React.useState('all');
  const [q, setQ] = React.useState('');

  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.innerWidth < 1024
  );
  React.useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const load = React.useCallback(async () => {
    if (!window.akSupabase) { setLoadError(true); setLoading(false); return; }
    setLoading(true);
    setLoadError(false);
    const { data, error } = await window.akSupabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Inquiries load error:', { code: error.code, message: error.message, hint: error.hint });
      setLoadError(true);
      setRows([]);
    } else {
      setRows(data || []);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => { load(); }, [load]);

  async function updateStatus(id, nextStatus) {
    setActionError(false);
    const prev = rows;
    // Optimistic update
    setRows(rs => rs.map(r => r.id === id ? { ...r, status: nextStatus } : r));
    const { error } = await window.akSupabase
      .from('contact_inquiries')
      .update({ status: nextStatus })
      .eq('id', id);
    if (error) {
      console.error('Inquiry update error:', { code: error.code, message: error.message, hint: error.hint });
      setRows(prev); // roll back
      setActionError(true);
    }
  }

  const counts = React.useMemo(() => ({
    all:      rows.length,
    new:      rows.filter(r => (r.status || 'new') === 'new').length,
    read:     rows.filter(r => r.status === 'read').length,
    archived: rows.filter(r => r.status === 'archived').length,
  }), [rows]);

  const filtered = rows.filter(r => {
    const st = r.status || 'new';
    if (status !== 'all' && st !== status) return false;
    if (interest !== 'all' && r.interest !== interest) return false;
    if (q) {
      const hay = [r.name, r.phone, r.message, r.interest_label].join(' ').toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="ak-rise">
      <SectionTitle
        n="02"
        label={t('Manage · Inquiries')}
        title={t('Inquiries')}
        accent={t('received.')}
        action={<Btn variant="secondary" onClick={load}>↻ {t('Refresh')}</Btn>}
      />

      {/* Filter bar */}
      <div style={{
        background: 'var(--ak-charcoal)',
        border: '1px solid var(--hairline-light)',
        padding: '18px 20px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18,
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          {['all', 'new', 'read', 'archived'].map(s => (
            <InqChip key={s} active={status === s} onClick={() => setStatus(s)} count={counts[s]}>
              {t(s === 'all' ? 'All' : s === 'new' ? 'New' : s === 'read' ? 'Read' : 'Archived')}
            </InqChip>
          ))}
        </div>

        <span style={{ width: 1, height: 22, background: 'var(--hairline-light)' }}></span>

        <div style={{ minWidth: 170 }}>
          <Select value={interest} onChange={setInterest}
            options={[{ value: 'all', label: t('All interests') }].concat(
              INTEREST_KEYS.map(k => ({ value: k, label: t(k) }))
            )} />
        </div>

        <span style={{ flex: 1 }}></span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: '1px solid var(--hairline-light)', padding: '2px 0', minWidth: 220 }}>
          <Icon name="search" size={14} style={{ color: 'var(--fg-3)' }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search name, phone, message…')}
            style={{ background: 'transparent', border: 0, outline: 'none', color: 'var(--fg)',
              fontSize: 13, fontWeight: 300, flex: 1, padding: '6px 0', fontFamily: 'var(--font-body)' }} />
        </div>
      </div>

      {/* Result count */}
      {!loading && !loadError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
          fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--fg-2)' }}>
          <RedSquare size={5} />
          {t('Showing')} {filtered.length} {t('of')} {rows.length}
        </div>
      )}

      {/* Action error banner */}
      {actionError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          padding: '12px 14px', background: 'rgba(176,24,28,.10)',
          border: '1px solid rgba(176,24,28,.40)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ak-crimson-bright)' }}>
          <RedSquare size={6} /> {t('Update failed. Please try again.')}
        </div>
      )}

      {/* States */}
      {loading && <InqState text={t('Loading inquiries…')} />}
      {!loading && loadError && <InqState text={t('Could not load inquiries.')} />}
      {!loading && !loadError && rows.length === 0 && <InqState text={t('No inquiries yet.')} />}
      {!loading && !loadError && rows.length > 0 && filtered.length === 0 &&
        <InqState text={t('No inquiries match the current filters.')} />}

      {/* Body */}
      {!loading && !loadError && filtered.length > 0 && (
        isMobile
          ? <InqCards rows={filtered} t={t} lang={lang} onStatus={updateStatus} />
          : <InqTable rows={filtered} t={t} lang={lang} onStatus={updateStatus} />
      )}
    </div>
  );
}

function InqChip({ active, children, onClick, count }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: active ? 'var(--ak-crimson)' : (hover ? 'rgba(255,255,255,.04)' : 'transparent'),
        color: active ? '#fff' : 'var(--fg)',
        border: 0, padding: '8px 14px', cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase', borderRadius: 0,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        transition: 'all .2s var(--ease)',
      }}>
      {children}
      <span style={{ fontSize: 9, padding: '2px 6px',
        background: active ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.06)',
        color: active ? '#fff' : 'var(--fg-2)' }}>{count}</span>
    </button>
  );
}

function InqState({ text }) {
  return (
    <div style={{ padding: '60px 24px', textAlign: 'center',
      border: '1px dashed var(--hairline-light)', background: 'var(--ak-charcoal)',
      fontSize: 11, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
      color: 'var(--fg-2)' }}>
      <RedSquare style={{ display: 'inline-block', marginBottom: 14 }} /><br />
      {text}
    </div>
  );
}

function RowActions({ row, t, onStatus, stacked }) {
  const st = row.status || 'new';
  return (
    <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center',
      justifyContent: stacked ? 'stretch' : 'flex-end',
      flexDirection: stacked ? 'column' : 'row', width: stacked ? '100%' : undefined }}>
      {st !== 'read' && (
        <Btn variant="secondary" onClick={() => onStatus(row.id, 'read')}
          style={{ padding: '8px 12px', fontSize: 9, width: stacked ? '100%' : undefined, justifyContent: 'center' }}>
          {t('Mark read')}
        </Btn>
      )}
      {st !== 'archived' && (
        <Btn variant="secondary" onClick={() => onStatus(row.id, 'archived')}
          style={{ padding: '8px 12px', fontSize: 9, width: stacked ? '100%' : undefined, justifyContent: 'center' }}>
          {t('Archive')}
        </Btn>
      )}
      {row.phone && (
        <Btn variant="primary" as="a" href={'tel:' + String(row.phone).replace(/\s+/g, '')}
          style={{ padding: '8px 12px', fontSize: 9, textDecoration: 'none', width: stacked ? '100%' : undefined, justifyContent: 'center' }}>
          ☎ {t('Call')}
        </Btn>
      )}
    </div>
  );
}

function InqTable({ rows, t, lang, onStatus }) {
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--hairline-light)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1080 }}>
        <thead>
          <tr style={{ background: 'var(--ak-charcoal)' }}>
            <ITh>{t('When')}</ITh>
            <ITh>{t('Name')}</ITh>
            <ITh>{t('Phone')}</ITh>
            <ITh>{t('Interest')}</ITh>
            <ITh>{t('Budget')}</ITh>
            <ITh>{t('Message')}</ITh>
            <ITh>{t('Status')}</ITh>
            <ITh align="right">{t('Actions')}</ITh>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} style={{ background: i % 2 ? 'rgba(255,255,255,.012)' : 'transparent' }}>
              <ITd><span style={{ whiteSpace: 'nowrap', color: 'var(--fg-2)', fontSize: 12 }}>{formatWhen(r.created_at, lang)}</span></ITd>
              <ITd><span style={{ fontWeight: 400 }}>{r.name || '—'}</span></ITd>
              <ITd>{r.phone
                ? <a href={'tel:' + String(r.phone).replace(/\s+/g, '')} style={{ color: 'var(--fg)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{r.phone}</a>
                : '—'}</ITd>
              <ITd>{r.interest_label || (r.interest ? t(r.interest) : '—')}</ITd>
              <ITd>{r.budget || '—'}</ITd>
              <ITd><span style={{ display: 'block', maxWidth: 320, color: 'var(--fg-2)', fontSize: 13,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.message || '—'}</span></ITd>
              <ITd><InqStatusBadge status={r.status || 'new'} t={t} /></ITd>
              <ITd align="right"><RowActions row={r} t={t} onStatus={onStatus} /></ITd>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ITh({ children, align = 'left' }) {
  return (
    <th style={{ padding: '14px 16px', textAlign: align,
      fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase',
      color: 'var(--fg-2)', borderBottom: '1px solid var(--hairline-light)', whiteSpace: 'nowrap' }}>{children}</th>
  );
}
function ITd({ children, align = 'left' }) {
  return (
    <td style={{ padding: '16px', borderBottom: '1px solid var(--hairline-light)',
      verticalAlign: 'middle', textAlign: align, color: 'var(--fg)' }}>{children}</td>
  );
}

function InqCards({ rows, t, lang, onStatus }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 'clamp(14px, 1.6vw, 24px)' }}>
      {rows.map(r => (
        <article key={r.id} style={{ background: 'var(--ak-charcoal)',
          border: '1px solid var(--hairline-light)', padding: 18,
          display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--fg-3)' }}>{formatWhen(r.created_at, lang)}</span>
            <InqStatusBadge status={r.status || 'new'} t={t} />
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20,
            letterSpacing: '0.04em', textTransform: 'uppercase' }}>{r.name || '—'}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--fg-2)' }}>
            {r.phone && <div><span style={{ color: 'var(--fg-3)' }}>{t('Phone')}: </span>
              <a href={'tel:' + String(r.phone).replace(/\s+/g, '')} style={{ color: 'var(--fg)', textDecoration: 'none' }}>{r.phone}</a></div>}
            <div><span style={{ color: 'var(--fg-3)' }}>{t('Interest:')} </span>{r.interest_label || (r.interest ? t(r.interest) : '—')}</div>
            {r.budget && <div><span style={{ color: 'var(--fg-3)' }}>{t('Budget')}: </span>{r.budget}</div>}
          </div>

          {r.message && (
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--fg-2)',
              borderTop: '1px solid var(--hairline-light)', paddingTop: 12 }}>{r.message}</p>
          )}

          <div style={{ paddingTop: 6 }}>
            <RowActions row={r} t={t} onStatus={onStatus} stacked />
          </div>
        </article>
      ))}
    </div>
  );
}

Object.assign(window, { InquiriesPage });

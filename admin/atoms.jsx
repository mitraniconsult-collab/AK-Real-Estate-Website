/* =========================================================
   Admin atoms — reused brand pieces + admin-specific tokens.
   ========================================================= */

// ----- Brand atoms (mirrored from ui_kits/website/atoms.jsx) -----

function Logo({ size = 'md', light = false }) {
  const sizes = {
    sm: { ak: 16, lbl: 9, gap: 8, sq: 5 },
    md: { ak: 22, lbl: 11, gap: 10, sq: 7 },
    lg: { ak: 32, lbl: 14, gap: 12, sq: 8 },
  };
  const s = sizes[size];
  const color = light ? 'var(--ak-ink)' : 'var(--fg)';
  const mute = light ? 'var(--fg-on-light-3)' : 'var(--fg-2)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap, whiteSpace: 'nowrap', flexShrink: 0 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: s.ak, letterSpacing: '0.18em', color, lineHeight: 1 }}>AK</span>
      <span style={{ width: s.sq, height: s.sq, background: 'var(--ak-crimson)', flexShrink: 0 }}></span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: s.lbl, letterSpacing: '0.32em', lineHeight: 1, textTransform: 'uppercase', color: mute }}>REAL ESTATE</span>
    </span>
  );
}

function Eyebrow({ children, light, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
      letterSpacing: '0.28em', textTransform: 'uppercase',
      color: light ? 'var(--fg-on-light-3)' : 'var(--fg-2)',
      ...style,
    }}>
      <span style={{ width: 8, height: 8, background: 'var(--ak-crimson)', display: 'inline-block', flexShrink: 0 }}></span>
      {children}
    </span>
  );
}

function RedSquare({ size = 8, style }) {
  return <span style={{ width: size, height: size, background: 'var(--ak-crimson)', display: 'inline-block', flexShrink: 0, ...style }}></span>;
}

function Btn({ children, variant = 'primary', as = 'button', href, onClick, type, disabled, style, ...rest }) {
  const base = {
    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.18em', textTransform: 'uppercase',
    padding: '12px 20px', border: 0, cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 10,
    textDecoration: 'none', transition: 'all .22s var(--ease)',
    borderRadius: 0, opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary: { background: 'var(--ak-crimson)', color: '#fff' },
    secondary: { background: 'transparent', color: 'currentColor', border: '1px solid var(--hairline-light)' },
    secondaryLight: { background: 'transparent', color: 'var(--fg-on-light)', border: '1px solid rgba(0,0,0,.18)' },
    ghost: { background: 'transparent', color: 'var(--fg-2)', padding: '8px 12px' },
    danger: { background: 'transparent', color: 'var(--ak-crimson-bright)', border: '1px solid var(--ak-crimson)' },
  };
  const [hover, setHover] = React.useState(false);
  let s = { ...base, ...variants[variant] };
  if (hover && !disabled) {
    if (variant === 'primary') s.background = 'var(--ak-crimson-deep)';
    if (variant === 'secondary') { s.borderColor = 'var(--ak-crimson)'; s.color = 'var(--ak-crimson-bright)'; }
    if (variant === 'secondaryLight') { s.borderColor = 'var(--ak-crimson)'; s.color = 'var(--ak-crimson)'; }
    if (variant === 'ghost') s.color = 'var(--fg)';
    if (variant === 'danger') { s.background = 'var(--ak-crimson)'; s.color = '#fff'; }
  }
  const Tag = as;
  return (
    <Tag href={href} type={type} onClick={onClick} disabled={disabled} style={{ ...s, ...style }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {children}
    </Tag>
  );
}

// ----- Admin-specific atoms -----

function SectionTitle({ n, label, title, accent, action }) {
  return (
    <header style={{ display: 'flex', alignItems: 'end', gap: 24, marginBottom: 'clamp(28px, 3vw, 48px)' }}>
      <div>
        {n && <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 36, color: 'var(--ak-crimson)', letterSpacing: '0.04em', lineHeight: 1 }}>{n}</span>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>{label}</span>
        </div>}
        {!n && label && <Eyebrow>{label}</Eyebrow>}
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 'clamp(32px, 3.4vw, 52px)', lineHeight: 1, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {title} {accent && <em style={{ color: 'var(--ak-crimson)', fontStyle: 'italic', fontWeight: 400 }}>{accent}</em>}
        </h1>
      </div>
      <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)', marginBottom: 12 }}></span>
      {action && <div style={{ marginBottom: 6 }}>{action}</div>}
    </header>
  );
}

// Hairline-bottom input — matches public site form style
function Field({ label, hint, error, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{
        fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: error ? 'var(--ak-crimson-bright)' : 'var(--fg-2)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        {label}
        {required && <span style={{ color: 'var(--ak-crimson)' }}>▪</span>}
      </label>
      {children}
      {(hint || error) && (
        <span style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: error ? 'var(--ak-crimson-bright)' : 'var(--fg-3)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}

const inputBase = {
  background: 'transparent', color: 'var(--fg)',
  fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
  border: 0, borderBottom: '1px solid var(--hairline-light)',
  padding: '10px 0', outline: 'none', width: '100%',
  borderRadius: 0,
  transition: 'border-color .22s var(--ease)',
};

function TextInput({ value, onChange, placeholder, type = 'text', autoFocus }) {
  const [f, setF] = React.useState(false);
  return (
    <input
      autoFocus={autoFocus}
      type={type}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setF(true)}
      onBlur={() => setF(false)}
      style={{ ...inputBase, borderBottomColor: f ? 'var(--ak-crimson)' : 'var(--hairline-light)' }}
    />
  );
}

function NumberInput({ value, onChange, placeholder, min, max, step, suffix }) {
  const [f, setF] = React.useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12,
      borderBottom: `1px solid ${f ? 'var(--ak-crimson)' : 'var(--hairline-light)'}`,
      transition: 'border-color .22s var(--ease)' }}>
      <input type="number" min={min} max={max} step={step}
        value={value ?? ''} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ ...inputBase, border: 0, padding: '10px 0', flex: 1 }} />
      {suffix && <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{suffix}</span>}
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows = 5 }) {
  const [f, setF] = React.useState(false);
  return (
    <textarea
      value={value ?? ''} placeholder={placeholder} rows={rows}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ ...inputBase, borderBottomColor: f ? 'var(--ak-crimson)' : 'var(--hairline-light)',
        resize: 'vertical', lineHeight: 1.6 }}
    />
  );
}

function Select({ value, onChange, options }) {
  const [f, setF] = React.useState(false);
  return (
    <div style={{
      position: 'relative',
      borderBottom: `1px solid ${f ? 'var(--ak-crimson)' : 'var(--hairline-light)'}`,
      transition: 'border-color .22s var(--ease)',
    }}>
      <select value={value ?? ''} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{
          width: '100%', background: 'transparent', color: 'var(--fg)',
          fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
          border: 0, padding: '10px 32px 10px 0', outline: 'none',
          appearance: 'none', borderRadius: 0, cursor: 'pointer',
        }}>
        {options.map(o => {
          const v = typeof o === 'string' ? o : o.value;
          const l = typeof o === 'string' ? o : o.label;
          return <option key={v} value={v} style={{ background: 'var(--ak-charcoal)', color: 'var(--fg)' }}>{l}</option>;
        })}
      </select>
      <span style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
        color: 'var(--fg-2)', fontSize: 10, pointerEvents: 'none' }}>▼</span>
    </div>
  );
}

// Segmented chip group — used for Listing Type, Status, Property Type
function ChipGroup({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
      {options.map(opt => {
        const v = typeof opt === 'string' ? opt : opt.value;
        const l = typeof opt === 'string' ? opt : opt.label;
        const active = value === v;
        return (
          <button key={v} type="button" onClick={() => onChange(v)}
            style={{
              background: active ? 'var(--ak-crimson)' : 'transparent',
              color: active ? '#fff' : 'var(--fg)',
              border: active ? 'none' : '1px solid var(--hairline-light)',
              padding: '9px 14px', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase', borderRadius: 0,
              transition: 'all .2s var(--ease)',
            }}>{l}</button>
        );
      })}
    </div>
  );
}

// Toggle — for boolean fields (parking, elevator, furnished, featured)
function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
      <span style={{
        position: 'relative', width: 44, height: 22,
        background: checked ? 'var(--ak-crimson)' : 'rgba(255,255,255,.10)',
        border: '1px solid', borderColor: checked ? 'var(--ak-crimson)' : 'var(--hairline-light)',
        transition: 'all .22s var(--ease)',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: checked ? 23 : 2,
          width: 16, height: 16, background: '#fff',
          transition: 'left .22s var(--ease)',
        }}></span>
      </span>
      <span style={{ fontSize: 13, fontWeight: 300, color: 'var(--fg)' }}>{label}</span>
    </label>
  );
}

// Status badge — Active (crimson), Draft (smoke), Sold (gold-ish iron), Rented (outline)
function StatusBadge({ status }) {
  const map = {
    Active:  { bg: 'var(--ak-crimson)', fg: '#fff', border: 'transparent' },
    Draft:   { bg: 'transparent', fg: 'var(--fg-2)', border: 'var(--hairline-light)' },
    Sold:    { bg: 'rgba(176,24,28,.15)', fg: 'var(--ak-crimson-bright)', border: 'rgba(176,24,28,.40)' },
    Rented:  { bg: 'rgba(255,255,255,.05)', fg: 'var(--fg)', border: 'var(--hairline-light)' },
  };
  const s = map[status] || map.Draft;
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px',
      background: s.bg, color: s.fg, border: `1px solid ${s.border}`,
      fontSize: 9, fontWeight: 500, letterSpacing: '0.20em',
      textTransform: 'uppercase', borderRadius: 0,
    }}>{status}</span>
  );
}

function TypeBadge({ type }) {
  // Sale / Rent
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px',
      background: type === 'Sale' ? 'rgba(255,255,255,.05)' : 'transparent',
      color: 'var(--fg)',
      border: '1px solid var(--hairline-light)',
      fontSize: 9, fontWeight: 500, letterSpacing: '0.20em',
      textTransform: 'uppercase',
    }}>{type === 'Sale' ? 'For Sale' : 'For Rent'}</span>
  );
}

// Icon — uses Lucide-static font (CDN). Falls back to text glyph if not loaded.
function Icon({ name, size = 16, style }) {
  return <i className={`icon-${name}`} style={{ fontSize: size, lineHeight: 1, display: 'inline-block', ...style }} />;
}

Object.assign(window, {
  Logo, Eyebrow, RedSquare, Btn,
  SectionTitle, Field, TextInput, NumberInput, TextArea, Select, ChipGroup, Toggle,
  StatusBadge, TypeBadge, Icon,
  inputBase,
});

// Shared brand atoms used across the AK Real Estate site.

const akAtomStyles = {
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500,
    letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-2)',
  },
  eyebrowLight: { color: 'var(--fg-on-light-3)' },
  sq: { width: 8, height: 8, background: 'var(--ak-crimson)', display: 'inline-block', flexShrink: 0 },
  vlabel: {
    fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 11,
    letterSpacing: '0.42em', textTransform: 'uppercase',
    writingMode: 'vertical-rl', transform: 'rotate(180deg)',
    color: 'var(--fg-2)',
  },
};

function Eyebrow({ children, light, style }) {
  return (
    <span style={{ ...akAtomStyles.eyebrow, ...(light ? akAtomStyles.eyebrowLight : null), ...style }}>
      <span style={akAtomStyles.sq}></span>
      {children}
    </span>
  );
}

function VLabel({ children, style }) {
  return <span style={{ ...akAtomStyles.vlabel, ...style }}>{children}</span>;
}

function RedSquare({ size = 8, style }) {
  return <span style={{ width: size, height: size, background: 'var(--ak-crimson)', display: 'inline-block', flexShrink: 0, ...style }}></span>;
}

function RedLine({ width = 36, style }) {
  return <span style={{ height: 1, width, background: 'var(--ak-crimson)', display: 'inline-block', ...style }}></span>;
}

function SectionNumeral({ n, label, light }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 56,
        color: 'var(--ak-crimson)', letterSpacing: '0.04em', lineHeight: 1,
      }}>{n}</span>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: light ? 'var(--fg-on-light-3)' : 'var(--fg-2)',
      }}>{label}</span>
    </div>
  );
}

function Btn({ children, variant = 'primary', as = 'button', href, onClick, style, ...rest }) {
  const base = {
    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.18em', textTransform: 'uppercase',
    padding: '14px 22px', border: 0, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 12,
    textDecoration: 'none', transition: 'all .28s var(--ease)',
    borderRadius: 0,
  };
  const variants = {
    primary: { background: 'var(--ak-crimson)', color: '#fff' },
    primaryHover: { background: 'var(--ak-crimson-deep)' },
    secondary: { background: 'transparent', color: 'currentColor', border: '1px solid currentColor' },
    secondaryLight: { background: 'transparent', color: 'var(--fg-on-light)', border: '1px solid var(--fg-on-light)' },
    tertiary: { background: 'transparent', color: 'currentColor', padding: '6px 0', borderBottom: '1px solid var(--ak-crimson)' },
  };
  const [hover, setHover] = React.useState(false);
  let s = { ...base, ...variants[variant] };
  if (variant === 'primary' && hover) s = { ...s, ...variants.primaryHover };
  if (variant === 'secondary' && hover) s = { ...s, color: 'var(--ak-crimson)', borderColor: 'var(--ak-crimson)' };
  const Tag = as;
  return (
    <Tag href={href} onClick={onClick} style={{ ...s, ...style }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {children}
    </Tag>
  );
}

function Logo({ size = 'md', light = false }) {
  const sizes = {
    sm: { ak: 16, lbl: 9, gap: 8, sq: 5 },
    md: { ak: 22, lbl: 11, gap: 10, sq: 7 },
    lg: { ak: 36, lbl: 16, gap: 14, sq: 9 },
  };
  const s = sizes[size];
  const color = light ? 'var(--ak-ink)' : 'var(--fg)';
  const mute = light ? 'var(--fg-on-light-3)' : 'var(--fg-2)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap, whiteSpace: 'nowrap', flexShrink: 0 }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: s.ak, letterSpacing: '0.18em', color, lineHeight: 1,
      }}>AK</span>
      <span style={{ width: s.sq, height: s.sq, background: 'var(--ak-crimson)', flexShrink: 0 }}></span>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: s.lbl, letterSpacing: '0.32em', lineHeight: 1,
        textTransform: 'uppercase', color: mute,
      }}>REAL ESTATE</span>
    </span>
  );
}

// Reusable cinematic image with gradient scrim — pass src + scrim ("hero"|"card"|"flat"|null)
function CineImage({ src, scrim = 'card', alt = '', children, style }) {
  const overlays = {
    hero: 'linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.30) 40%, rgba(0,0,0,.85) 100%)',
    card: 'linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.75) 100%)',
    flat: 'rgba(0,0,0,.45)',
  };
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.9) contrast(1.05)' }} />
      {scrim && <div style={{ position: 'absolute', inset: 0, background: overlays[scrim] }}></div>}
      <div style={{ position: 'relative', height: '100%' }}>{children}</div>
    </div>
  );
}

Object.assign(window, { Eyebrow, VLabel, RedSquare, RedLine, SectionNumeral, Btn, Logo, CineImage });

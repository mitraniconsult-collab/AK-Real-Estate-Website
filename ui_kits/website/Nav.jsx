// Top navigation — fixed, blurs on scroll, crimson square CTA.

function Nav({ active = 'listings', onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { id: 'listings', label: 'Listings' },
    { id: 'founder', label: 'The Founder' },
    { id: 'concierge', label: 'Concierge' },
    { id: 'journal', label: 'Journal' },
    { id: 'press', label: 'Press' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: 'clamp(18px, 2.2vw, 28px) var(--gutter)',
      display: 'flex', alignItems: 'center', gap: 32,
      background: scrolled ? 'rgba(0,0,0,.55)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--hairline-light)' : '1px solid transparent',
      transition: 'all .4s var(--ease)',
    }}>
      <a href="#" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNav && onNav('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <Logo size="md" />
      </a>
      <div style={{
        marginLeft: 'auto', display: 'flex', gap: 'clamp(18px, 2.4vw, 36px)', alignItems: 'center',
        flexShrink: 0,
      }}>
        {links.map(l => (
          <NavLink key={l.id} active={active === l.id} onClick={() => onNav && onNav(l.id)}>{l.label}</NavLink>
        ))}
      </div>
      <Btn variant="primary" style={{ padding: '11px 18px', fontSize: 10 }}>
        Request Access
      </Btn>
    </nav>
  );
}

function NavLink({ children, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  const color = active ? 'var(--ak-crimson)' : (hover ? 'var(--ak-crimson)' : 'var(--fg)');
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
       onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       style={{
         fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
         letterSpacing: '0.28em', textTransform: 'uppercase',
         color, textDecoration: 'none', transition: 'color .28s var(--ease)',
         position: 'relative', paddingBottom: 4,
       }}>
      {children}
      {active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: 'var(--ak-crimson)' }}></span>}
    </a>
  );
}

Object.assign(window, { Nav, NavLink });

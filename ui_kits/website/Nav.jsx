// Top navigation — fixed, blurs on scroll, crimson square CTA.
// On phone, the link list collapses into a hamburger that opens a full-bleed
// dark sheet. On desktop the original horizontal layout shows.

function Nav({ active = 'listings', onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 880px)').matches
  );
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    const mq = window.matchMedia('(max-width: 880px)');
    const onMq = (e) => { setIsMobile(e.matches); if (!e.matches) setOpen(false); };
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('scroll', fn);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  // Lock scroll while mobile sheet is open
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const links = [
    { id: 'listings',  label: 'Обяви'  },
    { id: 'concierge', label: 'Услуги' },
    { id: 'contact',   label: 'Свържи се с нас', cta: true },
  ];

  const onPick = (id) => {
    onNav && onNav(id);
    setOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: 'clamp(14px, 2.2vw, 28px) var(--gutter)',
        display: 'flex', alignItems: 'center', gap: 16,
        background: scrolled || open ? 'rgba(0,0,0,.55)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(18px)' : 'none',
        borderBottom: scrolled || open ? '1px solid var(--hairline-light)' : '1px solid transparent',
        transition: 'all .4s var(--ease)',
      }}>
        <a href="#" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onPick('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Logo size="md" />
        </a>

        {!isMobile && (
          <div style={{
            marginLeft: 'auto', display: 'flex', gap: 'clamp(18px, 2.4vw, 36px)', alignItems: 'center',
            flexShrink: 0,
          }}>
            {links.filter(l => !l.cta).map(l => (
              <NavLink key={l.id} active={active === l.id} onClick={() => onPick(l.id)}>{l.label}</NavLink>
            ))}
          </div>
        )}

        {!isMobile && (
          <Btn variant="primary" as="a" href="mailto:homesectoronline@gmail.com"
            style={{ padding: '11px 18px', fontSize: 10, textDecoration: 'none', flexShrink: 0 }}>
            Свържи се с нас
          </Btn>
        )}

        {isMobile && (
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
            style={{
              marginLeft: 'auto',
              background: 'transparent', border: 0, padding: 8,
              cursor: 'pointer', color: 'var(--fg)',
              display: 'flex', flexDirection: 'column', gap: 5,
              width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
            }}>
            <span style={{
              width: 22, height: 1, background: 'currentColor',
              transition: 'transform .3s var(--ease), opacity .2s var(--ease)',
              transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
            }}></span>
            <span style={{
              width: 22, height: 1, background: 'currentColor',
              transition: 'opacity .2s var(--ease)',
              opacity: open ? 0 : 1,
            }}></span>
            <span style={{
              width: 22, height: 1, background: 'currentColor',
              transition: 'transform .3s var(--ease), opacity .2s var(--ease)',
              transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }}></span>
          </button>
        )}
      </nav>

      {/* Mobile sheet */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 49,
          background: 'rgba(0,0,0,.96)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          padding: '90px var(--gutter) 40px',
          display: 'flex', flexDirection: 'column',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity .4s var(--ease), transform .4s var(--ease)',
          overflowY: 'auto',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 36, paddingBottom: 18,
            borderBottom: '1px solid var(--hairline-light)',
          }}>
            <span style={{ width: 6, height: 6, background: 'var(--ak-crimson)' }}></span>
            <span style={{
              fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-2)',
            }}>Navigation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map((l, i) => (
              <a key={l.id}
                href={l.cta ? 'mailto:homesectoronline@gmail.com' : '#'}
                onClick={l.cta ? () => setOpen(false) : (e) => { e.preventDefault(); onPick(l.id); }}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 16,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)', fontWeight: 200,
                  fontSize: 'clamp(34px, 9vw, 56px)', lineHeight: 1.1,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: l.cta ? 'var(--ak-crimson)' : (active === l.id ? 'var(--ak-crimson)' : 'var(--fg)'),
                  padding: '10px 0',
                  borderBottom: '1px solid var(--hairline-light)',
                }}>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
                  letterSpacing: '0.28em',
                  color: l.cta ? 'var(--ak-crimson)' : 'var(--fg-3)',
                  minWidth: 28,
                }}>0{i + 1}</span>
                <span style={{ flex: 1 }}>{l.label}</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 40 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-3)',
            }}>
              <span style={{ width: 6, height: 6, background: 'var(--ak-crimson)' }}></span>
              <span>A. Kane · LA · Montecito</span>
            </div>
          </div>
        </div>
      )}
    </>
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

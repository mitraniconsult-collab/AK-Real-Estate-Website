// AdminShell — left sidebar nav + top bar + main content.
// Responsive: sidebar collapses to top-bar drawer below 1024px.

function AdminShell({ active, onSignOut, children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
      background: 'var(--ak-ink)', color: 'var(--fg)',
    }}>
      {/* sidebar */}
      {!isMobile && <Sidebar active={active} onSignOut={onSignOut} />}
      {isMobile && mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 60,
          background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(8px)',
        }} onClick={() => setMobileOpen(false)}>
          <div style={{ width: 280, height: '100%', background: 'var(--ak-black)' }} onClick={(e) => e.stopPropagation()}>
            <Sidebar active={active} onSignOut={() => { setMobileOpen(false); onSignOut(); }} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* main */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar isMobile={isMobile} onMenu={() => setMobileOpen(true)} />
        <div style={{ flex: 1, minWidth: 0, padding: 'clamp(20px, 3vw, 48px) clamp(20px, 3vw, 48px) 80px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active, onSignOut, onNavigate }) {
  const items = [
    { id: 'dashboard',   label: 'Dashboard',  icon: 'layout-dashboard', to: '/dashboard' },
    { id: 'listings',    label: 'Listings',   icon: 'home',             to: '/listings' },
    { id: 'listing-new', label: 'New Listing', icon: 'plus',            to: '/listings/new' },
  ];
  return (
    <aside style={{
      background: 'var(--ak-black)',
      borderRight: '1px solid var(--hairline-light)',
      display: 'flex', flexDirection: 'column',
      padding: '28px 0', minHeight: '100vh',
      position: 'sticky', top: 0, height: '100vh',
    }}>
      {/* logo */}
      <div style={{ padding: '0 24px 24px', borderBottom: '1px solid var(--hairline-light)' }}>
        <Logo size="md" />
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <RedSquare size={5} />
          <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
            Admin Console
          </span>
        </div>
      </div>

      {/* nav */}
      <nav style={{ padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ padding: '0 12px 12px', fontSize: 9, fontWeight: 500, letterSpacing: '0.32em',
          textTransform: 'uppercase', color: 'var(--fg-3)' }}>▪ Manage</div>
        {items.map(it => (
          <NavItem key={it.id} item={it} active={active === it.id || (it.id === 'listings' && active === 'listing-edit')} onNavigate={onNavigate} />
        ))}
      </nav>

      <div style={{ marginTop: 'auto', padding: '24px', borderTop: '1px solid var(--hairline-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, background: 'var(--ak-graphite)',
            border: '1px solid var(--hairline-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 14,
            letterSpacing: '0.06em', color: 'var(--fg)' }}>AK</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--fg)', letterSpacing: '0.02em' }}>A. Kane</div>
            <div style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Founder</div>
          </div>
        </div>
        <button onClick={onSignOut} style={{
          background: 'transparent', border: '1px solid var(--hairline-light)',
          color: 'var(--fg-2)', padding: '10px 14px', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', borderRadius: 0,
          width: '100%', textAlign: 'left', transition: 'all .2s var(--ease)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--ak-crimson)'; e.currentTarget.style.color = 'var(--ak-crimson-bright)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--hairline-light)'; e.currentTarget.style.color = 'var(--fg-2)'; }}>
          Sign Out <span>›</span>
        </button>
        <a href="../ui_kits/website/index.html" target="_blank" rel="noopener" style={{
          marginTop: 12, display: 'block', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)',
          textDecoration: 'none', textAlign: 'center',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ak-crimson)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-3)'}>
          ↗ View Public Site
        </a>
      </div>
    </aside>
  );
}

function NavItem({ item, active, onNavigate }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={'#' + item.to}
      onClick={() => onNavigate && onNavigate()}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 12px',
        textDecoration: 'none',
        fontSize: 11, fontWeight: 500, letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: active ? 'var(--fg)' : (hover ? 'var(--fg)' : 'var(--fg-2)'),
        background: active ? 'rgba(176,24,28,.10)' : 'transparent',
        borderLeft: active ? '2px solid var(--ak-crimson)' : '2px solid transparent',
        transition: 'all .2s var(--ease)',
      }}>
      <Icon name={item.icon} size={14} style={{ color: active ? 'var(--ak-crimson)' : 'currentColor' }} />
      <span>{item.label}</span>
    </a>
  );
}

function TopBar({ isMobile, onMenu }) {
  const [search, setSearch] = React.useState('');

  function submitSearch() {
    const q = search.trim();

    if (!q) {
      location.hash = '/listings';
      return;
    }

    location.hash = `/listings?search=${encodeURIComponent(q)}`;
  }

  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '14px clamp(20px, 3vw, 48px)',
      borderBottom: '1px solid var(--hairline-light)',
      background: 'var(--ak-ink)',
      position: 'sticky', top: 0, zIndex: 30,
    }}>
      {isMobile && (
        <button onClick={onMenu} style={{
          background: 'transparent', border: '1px solid var(--hairline-light)',
          color: 'var(--fg)', padding: '6px 10px', cursor: 'pointer', borderRadius: 0,
        }}>
          <Icon name="menu" size={16} />
        </button>
      )}
      {isMobile && <Logo size="sm" />}

      <Breadcrumbs />

      <span style={{ flex: 1 }}></span>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid var(--hairline-light)',
        padding: '4px 0', minWidth: 220,
      }}>
        <Icon name="search" size={14} style={{ color: 'var(--fg-3)' }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submitSearch();
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
              e.preventDefault();
              e.currentTarget.focus();
            }
          }}
          placeholder="Search listings…"
          style={{
            background: 'transparent', border: 0, outline: 'none',
            color: 'var(--fg)', fontSize: 12, fontWeight: 300, flex: 1, padding: '4px 0',
            fontFamily: 'var(--font-body)',
          }}
        />
        <button
          onClick={submitSearch}
          title="Search"
          style={{
            background: 'transparent',
            border: 0,
            color: 'var(--fg-3)',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <kbd style={{
            fontSize: 9, fontWeight: 500, letterSpacing: '0.18em',
            color: 'var(--fg-3)', border: '1px solid var(--hairline-light)',
            padding: '2px 6px', borderRadius: 0, fontFamily: 'var(--font-body)',
          }}>↵</kbd>
        </button>
      </div>

      <span style={{ width: 1, height: 20, background: 'var(--hairline-light)' }}></span>

      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--fg-2)', whiteSpace: 'nowrap' }}>
        <span style={{ color: 'var(--ak-crimson)' }}>▪</span>&nbsp; All systems quiet
      </span>
    </header>
  );
}

function Breadcrumbs() {
  const route = useRoute();
  const crumbs = [];
  crumbs.push({ label: 'Admin', to: '/dashboard' });
  if (route.name === 'dashboard') crumbs.push({ label: 'Dashboard' });
  if (route.name === 'listings') crumbs.push({ label: 'Listings' });
  if (route.name === 'listing-new') {
    crumbs.push({ label: 'Listings', to: '/listings' });
    crumbs.push({ label: 'New Listing' });
  }
  if (route.name === 'listing-edit') {
    crumbs.push({ label: 'Listings', to: '/listings' });
    crumbs.push({ label: 'Edit · ' + (route.id || '') });
  }
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {c.to ? (
            <a href={'#' + c.to} style={{
              color: 'var(--fg-2)', textDecoration: 'none',
              transition: 'color .2s var(--ease)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ak-crimson)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-2)'}>{c.label}</a>
          ) : (
            <span style={{ color: 'var(--fg)' }}>{c.label}</span>
          )}
          {i < crumbs.length - 1 && <span style={{ color: 'var(--fg-3)' }}>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

Object.assign(window, { AdminShell, Sidebar, TopBar, Breadcrumbs, NavItem });

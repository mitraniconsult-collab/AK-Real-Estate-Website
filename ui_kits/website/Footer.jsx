// Footer — dark, five-column sitemap with real AK Real Estate company info.

function Footer() {
  const navLinks = [
    { label: 'Начало',            href: '/' },
    { label: 'Обяви',             href: '/listings' },
    { label: 'Услуги',            href: '/services' },
    { label: 'Свържи се с нас',   href: 'mailto:office@akrealestatebg.com' },
  ];
  const serviceLinks = [
    { label: 'Кредитен консултант',    href: '/services' },
    { label: 'Имотно посредничество',  href: '/services' },
    { label: 'Интериорен дизайн',      href: '/services' },
    { label: 'Ремонт от А до Я',       href: '/services' },
  ];
  const legalLinks = [
    { label: 'Общи условия',                 href: '#' },
    { label: 'Политика за поверителност',    href: '#' },
    { label: 'Политика за бисквитки',        href: '#' },
    { label: 'Защита на личните данни',      href: '#' },
  ];

  const linkStyle = {
    fontSize: 13, fontWeight: 300, color: 'var(--fg-2)',
    textDecoration: 'none', letterSpacing: '0.02em',
    transition: 'color .2s var(--ease)',
  };
  const onHover = (e) => e.currentTarget.style.color = 'var(--ak-crimson)';
  const offHover = (e) => e.currentTarget.style.color = 'var(--fg-2)';

  const ColHead = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
      <RedSquare size={5} />
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: 'var(--fg)' }}>{children}</span>
    </div>
  );

  const LinkList = ({ items }) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0,
      display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map(item => (
        <li key={item.label}>
          <a href={item.href} style={linkStyle} onMouseEnter={onHover} onMouseLeave={offHover}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer style={{ background: 'var(--ak-black)', color: 'var(--fg)',
      padding: 'clamp(80px,8vw,140px) var(--gutter) 36px', position: 'relative' }}>

      {/* wordmark divider */}
      <div className="r-footer-head" style={{ display: 'flex', alignItems: 'center', gap: 32,
        marginBottom: 'clamp(56px, 6vw, 96px)', paddingBottom: 36,
        borderBottom: '1px solid var(--hairline-light)' }}>
        <Logo size="lg" />
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)' }}></span>
      </div>

      {/* 5-column sitemap */}
      <div className="r-cols-2" style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr)',
        gap: 'clamp(24px, 3vw, 56px)', marginBottom: 64 }}>

        {/* Column 1 — brand + description */}
        <div>
          <Eyebrow style={{ marginBottom: 18 }}>AK Real Estate</Eyebrow>
          <p style={{ margin: 0, maxWidth: 360, fontSize: 14, lineHeight: 1.7,
            fontWeight: 300, color: 'var(--fg-2)' }}>
            AK Real Estate е бутикова консултантска практика за недвижими имоти, създадена през 2026 г.
            Работим с внимателно подбрани имоти и клиенти, като съчетаваме посредничество, финансиране,
            интериорен дизайн и ремонт в един подреден процес.
          </p>
        </div>

        {/* Column 2 — navigation */}
        <div>
          <ColHead>Навигация</ColHead>
          <LinkList items={navLinks} />
        </div>

        {/* Column 3 — services */}
        <div>
          <ColHead>Услуги</ColHead>
          <LinkList items={serviceLinks} />
        </div>

        {/* Column 4 — company */}
        <div>
          <ColHead>Компания</ColHead>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: 10,
            fontSize: 13, fontWeight: 300, color: 'var(--fg-2)',
            letterSpacing: '0.02em', lineHeight: 1.5 }}>
            <li>АК РИЙЛ ЕСТЕЙТ</li>
            <li>ЕИК: 208779452</li>
            <li>ул. Димитър Хаджикоцев 15,<br/>Лозенец, София</li>
            <li><a href="tel:+359879684460" style={linkStyle} onMouseEnter={onHover} onMouseLeave={offHover}>+359 87 968 4460</a></li>
            <li><a href="mailto:office@akrealestatebg.com" style={linkStyle} onMouseEnter={onHover} onMouseLeave={offHover}>office@akrealestatebg.com</a></li>
          </ul>
        </div>

        {/* Column 5 — legal */}
        <div>
          <ColHead>Правна информация</ColHead>
          <LinkList items={legalLinks} />
        </div>
      </div>

      {/* legal strip */}
      <div className="r-legal" style={{ display: 'flex', alignItems: 'center', gap: 18, paddingTop: 24,
        borderTop: '1px solid var(--hairline-light)', flexWrap: 'wrap',
        fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--fg-3)' }}>
        <span>© 2026 AK Real Estate. Всички права запазени.</span>
        <span style={{ color: 'var(--ak-crimson)' }}>▪</span>
        <span>АК РИЙЛ ЕСТЕЙТ · ЕИК 208779452</span>
        <span className="r-spacer" style={{ flex: 1 }}></span>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>Общи условия</a>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>Политика за поверителност</a>
        <a href="#" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>Бисквитки</a>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });

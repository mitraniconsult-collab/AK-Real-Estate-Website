// QuickSearch — compact property search/filter strip between Hero and Listings.
// Submits to /listings with query params; no backend call from this component.

function QuickSearch({ lang = 'bg' }) {
  const isBg = lang !== 'en';
  const [deal,   setDeal]   = React.useState('');
  const [ptype,  setPtype]  = React.useState('');
  const [query,  setQuery]  = React.useState('');

  const dealOpts = isBg
    ? [{ v: '', l: 'Всички' }, { v: 'Sale', l: 'Продажба' }, { v: 'Rent', l: 'Наем' }]
    : [{ v: '', l: 'All' },    { v: 'Sale', l: 'For Sale' }, { v: 'Rent', l: 'For Rent' }];

  const typeOpts = isBg
    ? [{ v: '', l: 'Всички типове' }, { v: 'Apartment', l: 'Апартамент' }, { v: 'House', l: 'Къща' }, { v: 'Villa', l: 'Вила' }, { v: 'Office', l: 'Офис' }, { v: 'Land', l: 'Парцел' }]
    : [{ v: '', l: 'All types' },     { v: 'Apartment', l: 'Apartment' },  { v: 'House', l: 'House' }, { v: 'Villa', l: 'Villa' }, { v: 'Office', l: 'Office' }, { v: 'Land', l: 'Land'  }];

  function handleSearch(e) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (query)  p.set('search', query);
    if (deal)   p.set('deal',   deal);
    if (ptype)  p.set('type',   ptype);
    const qs = p.toString();
    window.location.href = '/listings' + (qs ? '?' + qs : '');
  }

  const labelSt = {
    display: 'block', fontFamily: 'var(--font-body)',
    fontSize: 9, fontWeight: 500, letterSpacing: '0.28em',
    textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8,
  };
  const inputSt = {
    display: 'block', width: '100%', background: 'transparent', color: 'var(--fg)',
    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 300,
    border: 0, borderBottom: '1px solid var(--hairline-light)',
    padding: '10px 0', outline: 'none',
  };
  const selectSt = {
    ...inputSt,
    cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
    fontSize: 12, paddingRight: 14,
  };

  return (
    <section aria-label={isBg ? 'Търсене на имот' : 'Property search'}
      style={{
        background: 'var(--ak-charcoal)',
        borderTop: '1px solid var(--hairline-light)',
        borderBottom: '1px solid var(--hairline-light)',
        padding: 'clamp(20px, 2.8vw, 36px) var(--gutter)',
      }}>
      <form onSubmit={handleSearch} role="search" style={{
        display: 'flex', flexWrap: 'wrap',
        gap: 'clamp(12px, 1.6vw, 20px)', alignItems: 'flex-end',
        maxWidth: 1320, margin: '0 auto',
      }}>
        <div style={{ flex: '2 1 180px', minWidth: 120 }}>
          <label style={labelSt}>{isBg ? 'Търси' : 'Search'}</label>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder={isBg ? 'Квартал, град, имот…' : 'District, city, property…'}
            style={inputSt}
            aria-label={isBg ? 'Търси имот' : 'Search property'} />
        </div>

        <div style={{ flex: '1 1 110px', minWidth: 90 }}>
          <label style={labelSt}>{isBg ? 'Сделка' : 'Deal'}</label>
          <select value={deal} onChange={e => setDeal(e.target.value)} style={selectSt}
            aria-label={isBg ? 'Тип сделка' : 'Deal type'}>
            {dealOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>

        <div style={{ flex: '1 1 120px', minWidth: 100 }}>
          <label style={labelSt}>{isBg ? 'Тип имот' : 'Property type'}</label>
          <select value={ptype} onChange={e => setPtype(e.target.value)} style={selectSt}
            aria-label={isBg ? 'Тип имот' : 'Property type'}>
            {typeOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>

        <Btn variant="primary" as="button" type="submit"
          style={{ alignSelf: 'flex-end', padding: '11px 28px', flexShrink: 0 }}>
          {isBg ? 'Търси →' : 'Search →'}
        </Btn>
      </form>
    </section>
  );
}

Object.assign(window, { QuickSearch });

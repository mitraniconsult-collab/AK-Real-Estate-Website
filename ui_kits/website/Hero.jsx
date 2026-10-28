// Compact introduction: property search follows immediately below.
const HERO_IMG = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80&auto=format&fit=crop';
function Hero({ lang = 'bg' }) {
  const bg = lang !== 'en';
  return <section className="home-hero" aria-label={bg ? 'Начална страница' : 'Homepage'}>
    <img className="home-hero-image" src={HERO_IMG} alt="" fetchPriority="high" loading="eager" />
    <div className="home-hero-shade" />
    <div className="home-hero-content">
      <Eyebrow>{bg ? 'AK Real Estate · София и околностите' : 'AK Real Estate · Sofia and the surrounding area'}</Eyebrow>
      <h1>{bg ? <>Подбрани имоти.<br/><em>Лично отношение.</em></> : <>Selected properties.<br/><em>Personal attention.</em></>}</h1>
      <p>{bg ? 'Покупка, продажба и наем на имоти. Съдействие при финансиране, интериорен дизайн и ремонт — според нуждите на вашия проект.' : 'Buy, sell or rent a property. Support with financing, interior design and renovation, tailored to your project.'}</p>
      <div className="home-actions">
        <Btn variant="primary" as="a" href="/listings">{bg ? 'Разгледай имотите' : 'Explore properties'}</Btn>
        <Btn variant="secondary" as="a" href="/sell">{bg ? 'Продай своя имот' : 'Sell your property'}</Btn>
      </div>
    </div>
  </section>;
}
Object.assign(window, { Hero });

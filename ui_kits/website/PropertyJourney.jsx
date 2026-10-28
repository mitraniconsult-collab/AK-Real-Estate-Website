function PropertyJourney({ lang = 'bg', seller = false }) {
  const bg = lang !== 'en';
  const steps = seller ? (bg ? [
    ['Първи разговор', 'Цели, срок и основни характеристики на имота.'],
    ['Подготовка и представяне', 'Обсъждане на офертна цена, нужните документи и представянето на имота.'],
    ['Огледи и следващи стъпки', 'Координация на интереса, обратна връзка и съдействие в процеса на продажба.'],
  ] : [
    ['An initial conversation', 'Your goals, timeframe and the key details of your property.'],
    ['Preparation and presentation', 'Discussing an asking price, the documents needed and how to present the property.'],
    ['Viewings and next steps', 'Coordinating interest, sharing feedback and supporting the sale process.'],
  ]) : (bg ? [
    ['Разговор за вашите нужди', 'Какъв имот търсите или продавате, с какъв бюджет и в какъв срок.'],
    ['Ясни следващи стъпки', 'Подбор на предложения или план за представяне на вашия имот.'],
    ['Съдействие по пътя', 'Организация на огледи и обсъждане на финансиране, интериор или ремонт при нужда.'],
  ] : [
    ['A conversation about your needs', 'What you want to buy or sell, your budget and your timeframe.'],
    ['Clear next steps', 'A selection of properties or a plan to present your own property.'],
    ['Support along the way', 'Coordinating viewings and discussing financing, interiors or renovation when needed.'],
  ]);
  return <section className="home-process" aria-labelledby={seller ? 'seller-process-heading' : 'home-process-heading'}>
    <Eyebrow>{bg ? 'Как протича работата' : 'How the process works'}</Eyebrow>
    <h2 id={seller ? 'seller-process-heading' : 'home-process-heading'}>{bg ? 'Личен контакт. Ясни стъпки.' : 'Personal contact. Clear steps.'}</h2>
    <ol>{steps.map(([title, body], i) => <li key={title}><span className="home-step-number">0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
    {!seller && <a className="home-text-link" href="/contact">{bg ? 'Свържи се с AK Real Estate →' : 'Contact AK Real Estate →'}</a>}
  </section>;
}
function SellerIntro({ lang = 'bg' }) {
  const bg = lang !== 'en';
  return <><section className="seller-intro">
    <Eyebrow>{bg ? 'За собственици' : 'For property owners'}</Eyebrow>
    <h1>{bg ? <>Вашият имот.<br/><em>Следващата стъпка.</em></> : <>Your property.<br/><em>The next step.</em></>}</h1>
    <p>{bg ? 'Представете имота си на AK Real Estate. Първият разговор е за вашите цели, състоянието на имота и възможния подход към продажбата.' : 'Introduce your property to AK Real Estate. The first conversation covers your goals, the condition of the property and a possible approach to selling.'}</p>
    <div className="home-actions"><Btn variant="primary" as="a" href="#contact">{bg ? 'Обсъди продажбата' : 'Discuss your sale'}</Btn><a className="home-text-link" href="tel:+359879684460">+359 87 968 4460</a></div>
    <p className="seller-pricing-note">{bg ? 'Офертната цена се обсъжда според местоположението, състоянието, документите и сравними предложения. Условията за работа се уточняват индивидуално.' : 'An asking price is discussed based on location, condition, documentation and comparable listings. Service terms are agreed individually.'}</p>
  </section><PropertyJourney lang={lang} seller /></>;
}
Object.assign(window, { PropertyJourney, SellerIntro });

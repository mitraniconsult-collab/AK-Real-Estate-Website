function Concierge({ lang = 'bg' }) {
  const bg = lang !== 'en';
  const services = bg ? [
    ['Имотно посредничество', 'Покупка, продажба и наем с внимание към вашите изисквания.'],
    ['Кредитно консултиране', 'Обсъждане на възможностите за финансиране и следващите стъпки.'],
    ['Интериорен дизайн', 'Разпределение и стил, съобразени с начина ви на живот.'],
    ['Ремонт от А до Я', 'Обсъждане на обхвата и организацията на ремонта.'],
  ] : [
    ['Real estate brokerage', 'Buying, selling and renting with attention to your requirements.'],
    ['Mortgage consulting', 'Discuss financing options and the next steps.'],
    ['Interior design', 'Layouts and style built around the way you live.'],
    ['Renovation', 'Discuss the scope and organisation of your renovation.'],
  ];
  return <section className="home-services">
    <Eyebrow>{bg ? 'Услуги' : 'Services'}</Eyebrow>
    <h2>{bg ? 'От избора до новия дом.' : 'From choosing a property to making a home.'}</h2>
    <div>{services.map(([title, body], i) => <a href="/services" key={title}><span className="home-step-number">0{i+1}</span><h3>{title}</h3><p>{body}</p><span className="home-text-link">{bg ? 'Научи повече →' : 'Learn more →'}</span></a>)}</div>
  </section>;
}
Object.assign(window, { Concierge });

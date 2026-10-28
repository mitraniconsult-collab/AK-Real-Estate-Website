// Reference photography is labelled as inspiration, never as an agency project.
const ED_IMG_HERO = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop';
function Editorial({ lang = 'bg' }) {
  const bg = lang !== 'en';
  return <section className="home-inspiration">
    <figure>
      <img src={ED_IMG_HERO} loading="lazy" decoding="async" width="1200" height="900" alt={bg ? 'Интериорно вдъхновение: светла дневна с естествени материали' : 'Interior inspiration: a bright living space with natural materials'} />
      <figcaption>{bg ? 'Интериорно вдъхновение · Референтна снимка от Unsplash' : 'Interior inspiration · Reference photograph from Unsplash'}</figcaption>
    </figure>
    <div>
      <Eyebrow light>{bg ? 'Интериор и ремонт' : 'Interior design and renovation'}</Eyebrow>
      <h2>{bg ? <>След имота идва<br/><em>вашият дом.</em></> : <>A property becomes<br/><em>your home.</em></>}</h2>
      <p>{bg ? 'Планирайте следващата стъпка още при избора на имот. Обсъдете разпределението, стила и обхвата на ремонта според бюджета и начина си на живот.' : 'Plan the next step while choosing your property. Discuss the layout, style and scope of renovation around your budget and the way you live.'}</p>
      <a className="home-text-link" href="/services">{bg ? 'Разгледай услугите →' : 'Explore our services →'}</a>
    </div>
  </section>;
}
Object.assign(window, { Editorial });

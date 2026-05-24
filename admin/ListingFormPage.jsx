// ListingFormPage — Add new / Edit existing listing.

const FORM_T = {
  bg: {
    // header
    'New Listing':        'Нов имот',
    'Edit':               'Редактиране',
    'A new':              'Нов',
    'address.':           'адрес.',
    'Refine the':         'Прецизирай',
    'record.':            'записа.',
    // buttons
    'Cancel':             'Отказ',
    'Delete':             'Изтрий',
    'Save Draft':         'Запази чернова',
    'Save Changes':       'Запази промените',
    'Save & Publish':     'Запази и публикувай',
    'Publish Now':        'Публикувай',
    // saved banner
    'Saved · returning to listings…': 'Запазено · връщане към списъка…',
    // section titles
    'Property Details':   'Детайли на имота',
    'Location':           'Местоположение',
    'Pricing':            'Ценообразуване',
    'Specifications':     'Спецификации',
    'Photography':        'Снимки',
    // field labels
    'Title':              'Заглавие',
    'Description':        'Описание',
    'Property Type':      'Вид имот',
    'Listing Type':       'Вид оферта',
    'City':               'Град',
    'Area / Neighborhood':'Район / Квартал',
    'Full Address':       'Пълен адрес',
    'Price':              'Цена',
    'Currency':           'Валута',
    'Bedrooms':           'Спални',
    'Bathrooms':          'Бани',
    'Area':               'Площ',
    'Floor':              'Етаж',
    'Total Floors':       'Общо етажи',
    'Year Built':         'Година на строеж',
    'Features':           'Характеристики',
    // field hints
    'A long-form narrative — appears on the listing page.':
      'Описателен текст — показва се на страницата на имота.',
    'Shown to verified clients only.':
      'Видим само за верифицирани клиенти.',
    'Per month':          'На месец',
    'List price':         'Продажна цена',
    'Comma-separated · e.g. Pool · Library · Cellar':
      'Разделени с точка · напр. Басейн · Библиотека · Мазе',
    // property type chips
    'Apartment':          'Апартамент',
    'House':              'Къща',
    'Villa':              'Вила',
    'Office':             'Офис',
    'Land':               'Земя',
    // listing type chips
    'Sale':               'Продажба',
    'Rent':               'Наем',
    // status chips
    'Draft':              'Чернова',
    'Active':             'Активен',
    'Sold':               'Продаден',
    'Rented':             'Отдаден',
    // status hints
    'Admin-only · not visible publicly':
      'Само за администратор · не е публичен',
    'Visible on the public Listings page':
      'Видим на публичната страница с имоти',
    'Closed deal · shown with a badge':
      'Приключена сделка · показва се с етикет',
    // toggles
    'Parking':            'Паркинг',
    'Elevator':           'Асансьор',
    'Furnished':          'Обзаведен',
    'Featured on home page': 'Препоръчан на начална страница',
    'Featured listings appear in the home-page portfolio strip and "Featured Portfolio" section.':
      'Препоръчаните имоти се показват в началната страница и раздела "Препоръчано портфолио".',
    // side panels
    'Status':             'Статус',
    'Live Preview':       'Преглед',
    'Record':             'Запис',
    // meta rows
    'ID':                 'ID',
    'Created':            'Създаден',
    // preview footer
    '▪ Approximation · public layout may differ':
      '▪ Приближение · публичният изглед може да се различава',
    // image manager
    'Drop images here':   'Пуснете снимките тук',
    'JPG or PNG · 4:3 or 16:9 preferred · max 8 MB per file. The first image becomes the main image automatically.':
      'JPG или PNG · 4:3 или 16:9 · макс. 8 MB. Първата снимка автоматично се задава като основна.',
    '＋ Choose Files':    '＋ Избери файлове',
    'Add Stock':          'Добави примерна',
  },
  en: {
    'New Listing':        'New Listing',
    'Edit':               'Edit',
    'A new':              'A new',
    'address.':           'address.',
    'Refine the':         'Refine the',
    'record.':            'record.',
    'Cancel':             'Cancel',
    'Delete':             'Delete',
    'Save Draft':         'Save Draft',
    'Save Changes':       'Save Changes',
    'Save & Publish':     'Save & Publish',
    'Publish Now':        'Publish Now',
    'Saved · returning to listings…': 'Saved · returning to listings…',
    'Property Details':   'Property Details',
    'Location':           'Location',
    'Pricing':            'Pricing',
    'Specifications':     'Specifications',
    'Photography':        'Photography',
    'Title':              'Title',
    'Description':        'Description',
    'Property Type':      'Property Type',
    'Listing Type':       'Listing Type',
    'City':               'City',
    'Area / Neighborhood':'Area / Neighborhood',
    'Full Address':       'Full Address',
    'Price':              'Price',
    'Currency':           'Currency',
    'Bedrooms':           'Bedrooms',
    'Bathrooms':          'Bathrooms',
    'Area':               'Area',
    'Floor':              'Floor',
    'Total Floors':       'Total Floors',
    'Year Built':         'Year Built',
    'Features':           'Features',
    'A long-form narrative — appears on the listing page.':
      'A long-form narrative — appears on the listing page.',
    'Shown to verified clients only.':
      'Shown to verified clients only.',
    'Per month':          'Per month',
    'List price':         'List price',
    'Comma-separated · e.g. Pool · Library · Cellar':
      'Comma-separated · e.g. Pool · Library · Cellar',
    'Apartment':          'Apartment',
    'House':              'House',
    'Villa':              'Villa',
    'Office':             'Office',
    'Land':               'Land',
    'Sale':               'Sale',
    'Rent':               'Rent',
    'Draft':              'Draft',
    'Active':             'Active',
    'Sold':               'Sold',
    'Rented':             'Rented',
    'Admin-only · not visible publicly':
      'Admin-only · not visible publicly',
    'Visible on the public Listings page':
      'Visible on the public Listings page',
    'Closed deal · shown with a badge':
      'Closed deal · shown with a badge',
    'Parking':            'Parking',
    'Elevator':           'Elevator',
    'Furnished':          'Furnished',
    'Featured on home page': 'Featured on home page',
    'Featured listings appear in the home-page portfolio strip and "Featured Portfolio" section.':
      'Featured listings appear in the home-page portfolio strip and "Featured Portfolio" section.',
    'Status':             'Status',
    'Live Preview':       'Live Preview',
    'Record':             'Record',
    'ID':                 'ID',
    'Created':            'Created',
    '▪ Approximation · public layout may differ':
      '▪ Approximation · public layout may differ',
    'Drop images here':   'Drop images here',
    'JPG or PNG · 4:3 or 16:9 preferred · max 8 MB per file. The first image becomes the main image automatically.':
      'JPG or PNG · 4:3 or 16:9 preferred · max 8 MB per file. The first image becomes the main image automatically.',
    '＋ Choose Files':    '＋ Choose Files',
    'Add Stock':          'Add Stock',
  },
};

function useFormLang() {
  const read = () => localStorage.getItem('ak-admin-locale') || 'bg';
  const [lang, setLang] = React.useState(read);
  React.useEffect(() => {
    const sync = () => setLang(read());
    window.addEventListener('storage', sync);
    window.addEventListener('ak-admin-locale-change', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('ak-admin-locale-change', sync);
    };
  }, []);
  const t = (key) => (FORM_T[lang] && FORM_T[lang][key]) || key;
  return { lang, t };
}

const EMPTY = {
  title: '', description: '',
  propertyType: 'House', listingType: 'Sale', status: 'Draft', featured: false,
  city: '', area: '', address: '',
  price: '', currency: 'USD',
  bedrooms: '', bathrooms: '', areaSqm: '', floor: '', totalFloors: '', yearBuilt: '',
  parking: false, elevator: false, furnished: false,
  features: '',
  images: [], mainImage: 0,
};

function ListingFormPage({ mode, id }) {
  const { t } = useFormLang();
  const listings = useListings();
  const editing = mode === 'edit';
  const original = editing ? listings.find(l => l.id === id) : null;

  const [form, setForm] = React.useState(editing && original ? original : EMPTY);
  const [errors, setErrors] = React.useState({});
  const [saved, setSaved] = React.useState(false);
  const [confirmDel, setConfirmDel] = React.useState(false);

  // When editing record loads, reset form
  React.useEffect(() => {
    if (editing && original) setForm(original);
  }, [editing, original?.id]);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title) e.title = 'Title is required';
    if (!form.city) e.city = 'City is required';
    if (!form.price && form.price !== 0) e.price = 'Price is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async (publish) => {
    if (!validate()) return;
    const status = publish ? 'Active' : form.status;
    const payload = {
      ...form,
      status,
      id: editing ? form.id : Store.newId(),
      createdAt: editing ? form.createdAt : new Date().toISOString().slice(0, 10),
    };
    await Store.upsert(payload);
    setSaved(true);
    setTimeout(() => navigate('/listings'), 500);
  };

  if (editing && !original) {
    return (
      <div className="ak-rise">
        <SectionTitle label="Edit" title="Not" accent="found." />
        <p style={{ color: 'var(--fg-2)' }}>
          No listing with id "{id}". <a href="#/listings" style={{ color: 'var(--ak-crimson)' }}>Back to listings</a>.
        </p>
      </div>
    );
  }

  const propTypeOpts = ['Apartment', 'House', 'Villa', 'Office', 'Land']
    .map(v => ({ value: v, label: t(v) }));
  const listingTypeOpts = ['Sale', 'Rent']
    .map(v => ({ value: v, label: t(v) }));
  const statusOpts = ['Draft', 'Active', 'Sold', 'Rented']
    .map(v => ({ value: v, label: t(v) }));

  const statusHint =
    form.status === 'Draft'  ? t('Admin-only · not visible publicly') :
    form.status === 'Active' ? t('Visible on the public Listings page') :
                               t('Closed deal · shown with a badge');

  return (
    <div className="ak-rise">
      <SectionTitle
        n={editing ? '·' : '＋'}
        label={editing ? t('Edit') + ' · ' + form.id : t('New Listing')}
        title={editing ? t('Refine the') : t('A new')}
        accent={editing ? t('record.') : t('address.')}
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="secondary" as="a" href="#/listings">{t('Cancel')}</Btn>
            {editing && <Btn variant="danger" onClick={() => setConfirmDel(true)}>{t('Delete')}</Btn>}
            <Btn variant="secondary" onClick={() => save(false)}>
              {form.status === 'Draft' ? t('Save Draft') : t('Save Changes')}
            </Btn>
            <Btn variant="primary" onClick={() => save(true)}>
              {form.status === 'Active' ? t('Save & Publish') : t('Publish Now')}
            </Btn>
          </div>
        }
      />

      {saved && (
        <div style={{ marginBottom: 24, padding: '14px 18px',
          background: 'rgba(176,24,28,.10)', border: '1px solid rgba(176,24,28,.30)',
          display: 'flex', alignItems: 'center', gap: 12 }}>
          <RedSquare size={6} />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--fg)' }}>
            {t('Saved · returning to listings…')}
          </span>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 320px)',
        gap: 'clamp(20px, 2.4vw, 40px)',
      }}>
        {/* MAIN COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3vw, 48px)' }}>

          <FormSection n="01" title={t('Property Details')}>
            <Field label={t('Title')} required error={errors.title}>
              <TextInput value={form.title} onChange={(v) => set('title', v)}
                placeholder="e.g. Villa di Pietra" autoFocus={!editing} />
            </Field>
            <Field label={t('Description')} hint={t('A long-form narrative — appears on the listing page.')}>
              <TextArea value={form.description} onChange={(v) => set('description', v)}
                rows={5} placeholder="Tucked behind a stone wall on a one-block lane…" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Field label={t('Property Type')} required>
                <ChipGroup value={form.propertyType} onChange={(v) => set('propertyType', v)}
                  options={propTypeOpts} />
              </Field>
              <Field label={t('Listing Type')} required>
                <ChipGroup value={form.listingType} onChange={(v) => set('listingType', v)}
                  options={listingTypeOpts} />
              </Field>
            </div>
          </FormSection>

          <FormSection n="02" title={t('Location')}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Field label={t('City')} required error={errors.city}>
                <TextInput value={form.city} onChange={(v) => set('city', v)} placeholder="Los Angeles" />
              </Field>
              <Field label={t('Area / Neighborhood')}>
                <TextInput value={form.area} onChange={(v) => set('area', v)} placeholder="Bel Air" />
              </Field>
            </div>
            <Field label={t('Full Address')} hint={t('Shown to verified clients only.')}>
              <TextInput value={form.address} onChange={(v) => set('address', v)}
                placeholder="1421 Stone Canyon Rd, Los Angeles, CA 90077" />
            </Field>
          </FormSection>

          <FormSection n="03" title={t('Pricing')}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
              <Field label={t('Price')} required error={errors.price}
                hint={form.listingType === 'Rent' ? t('Per month') : t('List price')}>
                <NumberInput value={form.price} onChange={(v) => set('price', v)}
                  placeholder="24800000" min={0} step={1000} suffix={form.currency} />
              </Field>
              <Field label={t('Currency')}>
                <Select value={form.currency} onChange={(v) => set('currency', v)}
                  options={['USD', 'EUR', 'GBP', 'CHF', 'AED']} />
              </Field>
            </div>
          </FormSection>

          <FormSection n="04" title={t('Specifications')}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              <Field label={t('Bedrooms')}>
                <NumberInput value={form.bedrooms} onChange={(v) => set('bedrooms', v)} min={0} placeholder="7" />
              </Field>
              <Field label={t('Bathrooms')}>
                <NumberInput value={form.bathrooms} onChange={(v) => set('bathrooms', v)} min={0} placeholder="9" />
              </Field>
              <Field label={t('Area')}>
                <NumberInput value={form.areaSqm} onChange={(v) => set('areaSqm', v)} min={0} suffix="m²" placeholder="1152" />
              </Field>
              <Field label={t('Floor')}>
                <NumberInput value={form.floor} onChange={(v) => set('floor', v)} min={0} placeholder="0 = ground" />
              </Field>
              <Field label={t('Total Floors')}>
                <NumberInput value={form.totalFloors} onChange={(v) => set('totalFloors', v)} min={1} placeholder="3" />
              </Field>
              <Field label={t('Year Built')}>
                <NumberInput value={form.yearBuilt} onChange={(v) => set('yearBuilt', v)} min={1700} max={2030} placeholder="1924" />
              </Field>
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 24,
              paddingTop: 24, borderTop: '1px solid var(--hairline-light)' }}>
              <Toggle checked={form.parking}   onChange={(v) => set('parking', v)}   label={t('Parking')} />
              <Toggle checked={form.elevator}  onChange={(v) => set('elevator', v)}  label={t('Elevator')} />
              <Toggle checked={form.furnished} onChange={(v) => set('furnished', v)} label={t('Furnished')} />
            </div>

            <Field label={t('Features')} hint={t('Comma-separated · e.g. Pool · Library · Cellar')}>
              <TextArea value={form.features} onChange={(v) => set('features', v)} rows={3}
                placeholder="Motor court · Restored stone facade · Library · Cellar · Pool" />
            </Field>
          </FormSection>

          <FormSection n="05" title={t('Photography')}>
            <ImageManager
              images={form.images} mainImage={form.mainImage}
              onChange={(images, mainImage) => setForm(prev => ({ ...prev, images, mainImage }))}
            />
          </FormSection>
        </div>

        {/* SIDE COLUMN — meta + preview */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.4vw, 32px)',
          position: 'sticky', top: 90, alignSelf: 'start' }}>
          <SidePanel title={t('Status')}>
            <Field label={t('Status')} hint={statusHint}>
              <ChipGroup value={form.status} onChange={(v) => set('status', v)}
                options={statusOpts} />
            </Field>
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--hairline-light)' }}>
              <Toggle checked={form.featured} onChange={(v) => set('featured', v)}
                label={t('Featured on home page')} />
              <p style={{ margin: '12px 0 0', fontSize: 11, color: 'var(--fg-3)',
                lineHeight: 1.5, fontWeight: 300 }}>
                {t('Featured listings appear in the home-page portfolio strip and "Featured Portfolio" section.')}
              </p>
            </div>
          </SidePanel>

          <SidePanel title={t('Live Preview')}>
            <PreviewCard form={form} />
            <div style={{ marginTop: 14, fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--fg-3)', textAlign: 'center' }}>
              {t('▪ Approximation · public layout may differ')}
            </div>
          </SidePanel>

          {editing && (
            <SidePanel title={t('Record')}>
              <MetaRow label={t('ID')}      value={form.id} />
              <MetaRow label={t('Created')} value={form.createdAt} />
              <MetaRow label={t('Status')}  value={form.status} />
            </SidePanel>
          )}
        </aside>
      </div>

      {confirmDel && (
        <ConfirmDialog
          title="Delete listing?"
          body={`${form.title} (${form.id}) will be permanently removed.`}
          danger="Delete"
          onCancel={() => setConfirmDel(false)}
          onConfirm={async () => { await Store.remove(form.id); setConfirmDel(false); navigate('/listings'); }}
        />
      )}
    </div>
  );
}

function FormSection({ n, title, children }) {
  return (
    <section style={{
      background: 'var(--ak-charcoal)',
      border: '1px solid var(--hairline-light)',
      padding: 'clamp(22px, 2.4vw, 36px)',
    }}>
      <header style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28,
        paddingBottom: 18, borderBottom: '1px solid var(--hairline-light)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 28,
          color: 'var(--ak-crimson)', letterSpacing: '0.04em', lineHeight: 1 }}>{n}</span>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22,
          letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg)' }}>{title}</h2>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline-light)', alignSelf: 'center' }}></span>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>{children}</div>
    </section>
  );
}

function SidePanel({ title, children }) {
  return (
    <div style={{
      background: 'var(--ak-charcoal)', border: '1px solid var(--hairline-light)',
      padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        paddingBottom: 14, borderBottom: '1px solid var(--hairline-light)' }}>
        <RedSquare size={6} />
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--fg)' }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function MetaRow({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12,
      padding: '10px 0', borderBottom: '1px solid var(--hairline-light)' }}>
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--fg-3)' }}>{label}</span>
      <span style={{ fontSize: 12, color: 'var(--fg)', fontWeight: 400 }}>{value}</span>
    </div>
  );
}

function PreviewCard({ form }) {
  const img = form.images[form.mainImage];
  return (
    <div style={{ borderRadius: 4, overflow: 'hidden', background: '#0a0a0a' }}>
      <div style={{ position: 'relative', aspectRatio: '4/5', background: 'var(--ak-graphite)' }}>
        {img && <img src={img} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        {!img && (
          <div style={{ position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--fg-3)' }}>No image</div>
        )}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.85) 100%)' }}></div>
        <div style={{ position: 'absolute', left: 14, bottom: 12, right: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <RedSquare size={5} />
            <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-2)' }}>{form.area || '—'}</span>
          </div>
          <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 22, lineHeight: 1, letterSpacing: '0.04em',
            textTransform: 'uppercase', color: '#fff' }}>{form.title || 'Untitled'}</h4>
        </div>
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'baseline',
        justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--fg-3)' }}>
          {form.bedrooms || '—'} BR · {form.areaSqm || '—'} m²
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 16,
          color: 'var(--fg)' }}>
          {form.price ? formatPrice(Number(form.price), form.currency, form.listingType) : '—'}
        </span>
      </div>
    </div>
  );
}

const STOCK = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80&auto=format&fit=crop",
];

function ImageManager({ images, mainImage, onChange }) {
  const { lang, t } = useFormLang();
  const inputRef = React.useRef(null);

  const imgCount = (n) =>
    lang === 'bg'
      ? `${n} ${n === 1 ? 'снимка' : 'снимки'} · кликнете ★ за основна`
      : `${n} image${n === 1 ? '' : 's'} · click ★ to set the main image`;

  const handleFiles = async (files) => {
    if (!window.akSupabase) {
      alert('Supabase is not configured.');
      return;
    }

    const uploadedUrls = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop() || 'jpg';
      const safeName = file.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9.-]/g, '');

      const path = `listings/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName || `image.${ext}`}`;

      const { error: uploadError } = await window.akSupabase.storage
        .from('listing-images')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        alert(uploadError.message || 'Image upload failed.');
        continue;
      }

      const { data } = window.akSupabase.storage
        .from('listing-images')
        .getPublicUrl(path);

      if (data?.publicUrl) {
        uploadedUrls.push(data.publicUrl);
      }
    }

    if (uploadedUrls.length === 0) return;

    const next = [...images, ...uploadedUrls];
    onChange(next, images.length === 0 ? 0 : mainImage);
  };

  const addStock = () => {
    const url = STOCK[(images.length + Math.floor(Math.random() * 5)) % STOCK.length];
    onChange([...images, url], images.length === 0 ? 0 : mainImage);
  };

  const remove = (i) => {
    const next = images.filter((_, idx) => idx !== i);
    let nextMain = mainImage;
    if (i === mainImage) nextMain = 0;
    else if (i < mainImage) nextMain = mainImage - 1;
    if (nextMain >= next.length) nextMain = Math.max(0, next.length - 1);
    onChange(next, nextMain);
  };

  return (
    <div>
      {/* Upload zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current && inputRef.current.click()}
        style={{
          border: '1px dashed var(--hairline-light)',
          padding: '40px 24px', textAlign: 'center', cursor: 'pointer',
          background: 'rgba(255,255,255,.012)',
          transition: 'all .22s var(--ease)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--ak-crimson)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--hairline-light)'}>
        <RedSquare style={{ marginBottom: 14 }} />
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 24,
          letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
          {t('Drop images here')}
        </div>
        <p style={{ margin: '0 0 18px', fontSize: 12, color: 'var(--fg-2)',
          fontWeight: 300, lineHeight: 1.55 }}>
          {t('JPG or PNG · 4:3 or 16:9 preferred · max 8 MB per file. The first image becomes the main image automatically.')}
        </p>
        <div style={{ display: 'inline-flex', gap: 10 }}>
          <Btn variant="primary" as="span">{t('＋ Choose Files')}</Btn>
          <Btn variant="secondary" as="span" onClick={(e) => { e.stopPropagation(); addStock(); }}>
            {t('Add Stock')}
          </Btn>
        </div>
        <input ref={inputRef} type="file" multiple accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)} />
      </div>

      {/* Thumbs */}
      {images.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-2)' }}>
              {imgCount(images.length)}
            </span>
          </div>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 10 }}>
            {images.map((src, i) => (
              <ImageThumb key={i} src={src} isMain={i === mainImage}
                onMain={() => onChange(images, i)}
                onRemove={() => remove(i)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ImageThumb({ src, isMain, onMain, onRemove }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: '4/3', overflow: 'hidden',
      border: '1px solid ' + (isMain ? 'var(--ak-crimson)' : 'var(--hairline-light)'),
      background: 'var(--ak-graphite)',
    }}>
      <img src={src} alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover' }} />
      {isMain && (
        <div style={{ position: 'absolute', top: 6, left: 6,
          background: 'var(--ak-crimson)', color: '#fff',
          padding: '3px 7px', fontSize: 8, fontWeight: 500,
          letterSpacing: '0.20em', textTransform: 'uppercase' }}>★ Main</div>
      )}
      <div style={{ position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', justifyContent: 'flex-end', padding: 6, gap: 6,
        background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,.65) 100%)' }}>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
          {!isMain && (
            <button onClick={onMain} title="Set as main" style={{
              background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(4px)',
              border: '1px solid var(--hairline-light)', color: 'var(--fg)',
              padding: '4px 8px', fontSize: 11, cursor: 'pointer', lineHeight: 1,
            }}>★</button>
          )}
          <button onClick={onRemove} title="Remove" style={{
            background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(4px)',
            border: '1px solid var(--hairline-light)', color: 'var(--fg)',
            padding: '4px 8px', fontSize: 11, cursor: 'pointer', lineHeight: 1,
          }}>✕</button>
        </div>
      </div>
    </div>
  );
}

// Local Toggle overrides the atoms.jsx version: adds the hidden checkbox that
// wires label-click → onChange. Visual appearance is identical.
function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        position: 'relative', width: 44, height: 22,
        background: checked ? 'var(--ak-crimson)' : 'rgba(255,255,255,.10)',
        border: '1px solid', borderColor: checked ? 'var(--ak-crimson)' : 'var(--hairline-light)',
        transition: 'all .22s var(--ease)',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: checked ? 23 : 2,
          width: 16, height: 16, background: '#fff',
          transition: 'left .22s var(--ease)',
        }}></span>
      </span>
      <span style={{ fontSize: 13, fontWeight: 300, color: 'var(--fg)' }}>{label}</span>
    </label>
  );
}

Object.assign(window, { ListingFormPage, ImageManager, PreviewCard });

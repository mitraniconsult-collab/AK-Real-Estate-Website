// ListingFormPage — Add new / Edit existing listing.

// ─── BG/EN translations ──────────────────────────────────────────────────────
const FORM_TRANSLATIONS = {
  bg: {
    'New Listing':            'Нов имот',
    'Edit':                   'Редактиране',
    'A new':                  'Нов',
    'address.':               'адрес.',
    'Refine the':             'Редакция на',
    'record.':                'записа.',
    'Cancel':                 'Отказ',
    'Save Draft':             'Запази чернова',
    'Save Changes':           'Запази промените',
    'Publish Now':            'Публикувай',
    'Save & Publish':         'Запази и публикувай',
    'Delete':                 'Изтрий',
    'Property Details':       'Детайли за имота',
    'Title':                  'Заглавие',
    'Description':            'Описание',
    'A long-form narrative — appears on the listing page.': 'Дълго описание — показва се на страницата.',
    'Property Type':          'Тип имот',
    'Listing Type':           'Тип обява',
    'Location':               'Местоположение',
    'City':                   'Град',
    'Area / Neighborhood':    'Район / Квартал',
    'Full Address':           'Пълен адрес',
    'Shown to verified clients only.': 'Показва се само на верифицирани клиенти.',
    'Pricing':                'Ценообразуване',
    'Price':                  'Цена',
    'Per month':              'На месец',
    'List price':             'Обявена цена',
    'Currency':               'Валута',
    'Specifications':         'Характеристики',
    'Bedrooms':               'Спални',
    'Bathrooms':              'Бани',
    'Area':                   'Площ',
    'Floor':                  'Етаж',
    'Total Floors':           'Общо етажи',
    'Year Built':             'Година на строеж',
    'Parking':                'Паркинг',
    'Elevator':               'Асансьор',
    'Furnished':              'Обзаведен',
    'Features':               'Екстри',
    'Comma-separated · e.g. Pool · Library · Cellar': 'Разделени с точка · напр. Басейн · Библиотека · Изба',
    'Photography':            'Снимки',
    'Drop images here':       'Пуснете снимки тук',
    'Choose Files':           'Изберете файлове',
    'Add Stock':              'Добави снимка',
    'Status':                 'Статус',
    'Draft':                  'Чернова',
    'Active':                 'Активен',
    'Sold':                   'Продаден',
    'Rented':                 'Нает',
    'Admin-only · not visible publicly':   'Само за администратори · не е публично',
    'Visible on the public Listings page': 'Видимо в публичния списък',
    'Closed deal · shown with a badge':    'Сключена сделка · с индикатор',
    'Featured on home page':  'Показвай на началната страница',
    'Live Preview':           'Преглед',
    'Record':                 'Запис',
    'Saved · returning to listings…': 'Запазено · пренасочване…',
    'English content (optional)': 'Английско съдържание (по избор)',
    'Used on the English version of the site. Leave empty to fall back to the main fields.':
      'Използва се в английската версия на сайта. Оставете празно, за да се ползва основното поле.',
    'English Title':          'Заглавие на английски',
    'English Description':    'Описание на английски',
    'English City':           'Град на английски',
    'English Area':           'Район на английски',
    'English Address':        'Адрес на английски',
    'English Features':       'Особености на английски',
    'Uploaded images automatically receive a subtle AK Real Estate watermark.':
      'Качените снимки автоматично получават дискретен AK Real Estate watermark.',
    'Could not process watermark for this image. Please try another file.':
      'Watermark-ът на тази снимка не можа да се обработи. Моля, опитайте друг файл.',
  },
  en: {
    'New Listing':            'New Listing',
    'Edit':                   'Edit',
    'A new':                  'A new',
    'address.':               'address.',
    'Refine the':             'Refine the',
    'record.':                'record.',
    'Cancel':                 'Cancel',
    'Save Draft':             'Save Draft',
    'Save Changes':           'Save Changes',
    'Publish Now':            'Publish Now',
    'Save & Publish':         'Save & Publish',
    'Delete':                 'Delete',
    'Property Details':       'Property Details',
    'Title':                  'Title',
    'Description':            'Description',
    'A long-form narrative — appears on the listing page.': 'A long-form narrative — appears on the listing page.',
    'Property Type':          'Property Type',
    'Listing Type':           'Listing Type',
    'Location':               'Location',
    'City':                   'City',
    'Area / Neighborhood':    'Area / Neighborhood',
    'Full Address':           'Full Address',
    'Shown to verified clients only.': 'Shown to verified clients only.',
    'Pricing':                'Pricing',
    'Price':                  'Price',
    'Per month':              'Per month',
    'List price':             'List price',
    'Currency':               'Currency',
    'Specifications':         'Specifications',
    'Bedrooms':               'Bedrooms',
    'Bathrooms':              'Bathrooms',
    'Area':                   'Area',
    'Floor':                  'Floor',
    'Total Floors':           'Total Floors',
    'Year Built':             'Year Built',
    'Parking':                'Parking',
    'Elevator':               'Elevator',
    'Furnished':              'Furnished',
    'Features':               'Features',
    'Comma-separated · e.g. Pool · Library · Cellar': 'Comma-separated · e.g. Pool · Library · Cellar',
    'Photography':            'Photography',
    'Drop images here':       'Drop images here',
    'Choose Files':           'Choose Files',
    'Add Stock':              'Add Stock',
    'Status':                 'Status',
    'Draft':                  'Draft',
    'Active':                 'Active',
    'Sold':                   'Sold',
    'Rented':                 'Rented',
    'Admin-only · not visible publicly':   'Admin-only · not visible publicly',
    'Visible on the public Listings page': 'Visible on the public Listings page',
    'Closed deal · shown with a badge':    'Closed deal · shown with a badge',
    'Featured on home page':  'Featured on home page',
    'Live Preview':           'Live Preview',
    'Record':                 'Record',
    'Saved · returning to listings…': 'Saved · returning to listings…',
    'English content (optional)': 'English content (optional)',
    'Used on the English version of the site. Leave empty to fall back to the main fields.':
      'Used on the English version of the site. Leave empty to fall back to the main fields.',
    'English Title':          'English Title',
    'English Description':    'English Description',
    'English City':           'English City',
    'English Area':           'English Area',
    'English Address':        'English Address',
    'English Features':       'English Features',
    'Uploaded images automatically receive a subtle AK Real Estate watermark.':
      'Uploaded images automatically receive a subtle AK Real Estate watermark.',
    'Could not process watermark for this image. Please try another file.':
      'Could not process watermark for this image. Please try another file.',
  },
};

// Reads ak-admin-locale from localStorage, defaults to 'bg'.
// Reacts to both "storage" (cross-tab) and "ak-admin-locale-change" (same-tab).
function useFormLang() {
  const [lang, setLang] = React.useState(
    () => localStorage.getItem('ak-admin-locale') || 'bg'
  );
  React.useEffect(() => {
    const onStorage = () => setLang(localStorage.getItem('ak-admin-locale') || 'bg');
    const onCustom  = (e) => setLang(e.detail.lang);
    window.addEventListener('storage', onStorage);
    window.addEventListener('ak-admin-locale-change', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('ak-admin-locale-change', onCustom);
    };
  }, []);
  return (key) => (FORM_TRANSLATIONS[lang] && FORM_TRANSLATIONS[lang][key]) || key;
}

// ─── FormToggle — working toggle with hidden checkbox ────────────────────────
// Mirrors the visual of atoms.jsx Toggle exactly.
// atoms Toggle has no <input> so onChange never fires — this component fixes that.
function FormToggle({ checked, onChange, label }) {
  const uid = React.useRef('ftg-' + Math.random().toString(36).slice(2)).current;
  return (
    <label htmlFor={uid} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
      <input
        id={uid}
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0 }}
      />
      <span style={{
        position: 'relative', width: 44, height: 22, display: 'inline-block', flexShrink: 0,
        background: checked ? 'var(--ak-crimson)' : 'rgba(255,255,255,.10)',
        border: '1px solid', borderColor: checked ? 'var(--ak-crimson)' : 'var(--hairline-light)',
        transition: 'all .22s var(--ease)',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: checked ? 23 : 2,
          width: 16, height: 16, background: '#fff', display: 'block',
          transition: 'left .22s var(--ease)',
        }}></span>
      </span>
      <span style={{ fontSize: 13, fontWeight: 300, color: 'var(--fg)' }}>{label}</span>
    </label>
  );
}

// ─── Default form values ─────────────────────────────────────────────────────
const EMPTY = {
  title: '', description: '',
  propertyType: 'House', listingType: 'Sale', status: 'Draft', featured: false,
  city: '', area: '', address: '',
  price: '', currency: 'USD',
  bedrooms: '', bathrooms: '', areaSqm: '', floor: '', totalFloors: '', yearBuilt: '',
  parking: false, elevator: false, furnished: false,
  features: '',
  // Optional English fields — surfaced on the EN version of the public site.
  titleEn: '', descriptionEn: '', cityEn: '', areaEn: '', addressEn: '', featuresEn: '',
  images: [], mainImage: 0,
};

function ListingFormPage({ mode, id }) {
  const t = useFormLang();
  const listings = useListings();
  const editing = mode === 'edit';
  const original = editing ? listings.find(l => l.id === id) : null;

  const [form, setForm] = React.useState(editing && original ? original : EMPTY);
  const [errors, setErrors] = React.useState({});
  const [saved, setSaved] = React.useState(false);
  const [confirmDel, setConfirmDel] = React.useState(false);
  const [imagesUploading, setImagesUploading] = React.useState(false);

  // Responsive breakpoints — ≤860px stacks columns; ≤640px collapses grids
  const [isTablet, setIsTablet] = React.useState(false);
  const [isPhone,  setIsPhone]  = React.useState(false);
  React.useEffect(() => {
    const onResize = () => {
      setIsTablet(window.innerWidth <= 860);
      setIsPhone(window.innerWidth  <= 640);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // When editing record loads, reset form
  React.useEffect(() => {
    if (editing && original) setForm(original);
  }, [editing, original?.id]);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title) e.title = 'Title is required';
    if (!form.city)  e.city  = 'City is required';
    if (!form.price && form.price !== 0) e.price = 'Price is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = (publish) => {
    if (!validate()) return;
    if (imagesUploading) return;
    const status = publish ? 'Active' : form.status;
    const payload = {
      ...form,
      status,
      id: editing ? form.id : Store.newId(),
      createdAt: editing ? form.createdAt : new Date().toISOString().slice(0, 10),
    };
    Store.upsert(payload);
    setSaved(true);
    setTimeout(() => navigate('/listings'), 500);
  };

  // Single primary save action — shared between top (desktop) and bottom (mobile) bars.
  // Always saves the full form and sets status to Active (an already-Active listing stays Active).
  const publishLabel = t('Save & Publish');

  if (editing && !original) {
    return (
      <div className="ak-rise">
        <SectionTitle label="Edit" title="Not" accent="found." />
        <p style={{ color: 'var(--fg-2)' }}>
          No listing with id "{id}". <a href="/admin/listings" style={{ color: 'var(--ak-crimson)' }}>Back to listings</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="ak-rise">
      <SectionTitle
        n={editing ? '·' : '＋'}
        label={editing ? t('Edit') + ' · ' + form.id : t('New Listing')}
        title={t(editing ? 'Refine the' : 'A new')}
        accent={t(editing ? 'record.' : 'address.')}
        action={
          /* Desktop only — on tablet/phone the action bar renders at the bottom */
          !isTablet ? (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', rowGap: 8 }}>
              <Btn variant="secondary" as="a" href="/admin/listings">{t('Cancel')}</Btn>
              {editing && <Btn variant="danger" onClick={() => setConfirmDel(true)}>{t('Delete')}</Btn>}
              <Btn variant="primary"   onClick={() => save(true)} disabled={imagesUploading}>{publishLabel}</Btn>
            </div>
          ) : null
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
        gridTemplateColumns: isTablet ? '1fr' : 'minmax(0, 1.2fr) minmax(0, 320px)',
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
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '1fr 1fr', gap: 24 }}>
              <Field label={t('Property Type')} required>
                <ChipGroup value={form.propertyType} onChange={(v) => set('propertyType', v)}
                  options={['Apartment', 'House', 'Villa', 'Office', 'Land']} />
              </Field>
              <Field label={t('Listing Type')} required>
                <ChipGroup value={form.listingType} onChange={(v) => set('listingType', v)}
                  options={['Sale', 'Rent']} />
              </Field>
            </div>
          </FormSection>

          <FormSection n="02" title={t('English content (optional)')}>
            <p style={{ margin: '0 0 20px', fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6, fontWeight: 300 }}>
              {t('Used on the English version of the site. Leave empty to fall back to the main fields.')}
            </p>
            <Field label={t('English Title')}>
              <TextInput value={form.titleEn} onChange={(v) => set('titleEn', v)}
                placeholder="e.g. Villa di Pietra" />
            </Field>
            <Field label={t('English Description')}>
              <TextArea value={form.descriptionEn} onChange={(v) => set('descriptionEn', v)}
                rows={5} placeholder="Tucked behind a stone wall on a one-block lane…" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '1fr 1fr', gap: 24 }}>
              <Field label={t('English City')}>
                <TextInput value={form.cityEn} onChange={(v) => set('cityEn', v)} placeholder="Sofia" />
              </Field>
              <Field label={t('English Area')}>
                <TextInput value={form.areaEn} onChange={(v) => set('areaEn', v)} placeholder="Lozenets" />
              </Field>
            </div>
            <Field label={t('English Address')}>
              <TextInput value={form.addressEn} onChange={(v) => set('addressEn', v)}
                placeholder="15 Dimitar Hadzhikotsev St., Lozenets, Sofia" />
            </Field>
            <Field label={t('English Features')}>
              <TextArea value={form.featuresEn} onChange={(v) => set('featuresEn', v)} rows={3}
                placeholder="Motor court · Restored stone facade · Library · Cellar · Pool" />
            </Field>
          </FormSection>

          <FormSection n="03" title={t('Location')}>
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '1fr 1fr', gap: 24 }}>
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

          <FormSection n="04" title={t('Pricing')}>
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '2fr 1fr', gap: 24 }}>
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

          <FormSection n="05" title={t('Specifications')}>
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
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
              <FormToggle checked={form.parking}   onChange={(v) => set('parking', v)}   label={t('Parking')} />
              <FormToggle checked={form.elevator}  onChange={(v) => set('elevator', v)}  label={t('Elevator')} />
              <FormToggle checked={form.furnished} onChange={(v) => set('furnished', v)} label={t('Furnished')} />
            </div>

            <Field label={t('Features')} hint={t('Comma-separated · e.g. Pool · Library · Cellar')}>
              <TextArea value={form.features} onChange={(v) => set('features', v)} rows={3}
                placeholder="Motor court · Restored stone facade · Library · Cellar · Pool" />
            </Field>
          </FormSection>

          <FormSection n="06" title={t('Photography')}>
            <ImageManager
              images={form.images} mainImage={form.mainImage}
              onChange={(images, mainImage) => setForm(prev => ({ ...prev, images, mainImage }))}
              onUploadingChange={(n) => setImagesUploading(n > 0)}
              isPhone={isPhone}
            />
          </FormSection>
        </div>

        {/* SIDE COLUMN — meta + preview */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.4vw, 32px)',
          position: isTablet ? 'static' : 'sticky',
          top: isTablet ? undefined : 90,
          alignSelf: isTablet ? undefined : 'start' }}>
          <SidePanel title={t('Status')}>
            <Field label={t('Status')} hint={
              form.status === 'Draft'  ? t('Admin-only · not visible publicly')
              : form.status === 'Active' ? t('Visible on the public Listings page')
              : t('Closed deal · shown with a badge')
            }>
              <ChipGroup value={form.status} onChange={(v) => set('status', v)}
                options={[
                  { value: 'Draft',  label: t('Draft')  },
                  { value: 'Active', label: t('Active') },
                  { value: 'Sold',   label: t('Sold')   },
                  { value: 'Rented', label: t('Rented') },
                ]} />
            </Field>
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--hairline-light)' }}>
              <FormToggle checked={form.featured} onChange={(v) => set('featured', v)}
                label={t('Featured on home page')} />
              <p style={{ margin: '12px 0 0', fontSize: 11, color: 'var(--fg-3)',
                lineHeight: 1.5, fontWeight: 300 }}>
                Featured listings appear in the home-page portfolio strip and "Featured Portfolio" section.
              </p>
            </div>
          </SidePanel>

          <SidePanel title={t('Live Preview')}>
            <PreviewCard form={form} />
            <div style={{ marginTop: 14, fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--fg-3)', textAlign: 'center' }}>
              ▪ Approximation · public layout may differ
            </div>
          </SidePanel>

          {editing && (
            <SidePanel title={t('Record')}>
              <MetaRow label="ID"      value={form.id} />
              <MetaRow label="Created" value={form.createdAt} />
              <MetaRow label="Status"  value={form.status} />
            </SidePanel>
          )}
        </aside>
      </div>

      {/* ── Mobile bottom action bar (tablet + phone only) ────────────────────
          Shown instead of the top SectionTitle action, after all fields + sidebar. */}
      {isTablet && (
        <div style={{
          marginTop: 'clamp(20px, 3vw, 40px)',
          padding: 'clamp(18px, 3vw, 28px)',
          background: 'var(--ak-charcoal)',
          border: '1px solid var(--hairline-light)',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <Btn variant="primary" onClick={() => save(true)} disabled={imagesUploading}
            style={{ width: '100%', justifyContent: 'center' }}>
            {publishLabel}
          </Btn>
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn variant="secondary" as="a" href="/admin/listings"
              style={{ flex: 1, justifyContent: 'center' }}>
              {t('Cancel')}
            </Btn>
            {editing && (
              <Btn variant="danger" onClick={() => setConfirmDel(true)}
                style={{ flex: 1, justifyContent: 'center' }}>
                {t('Delete')}
              </Btn>
            )}
          </div>
        </div>
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Delete listing?"
          body={`${form.title} (${form.id}) will be permanently removed.`}
          danger="Delete"
          onCancel={() => setConfirmDel(false)}
          onConfirm={() => { Store.remove(form.id); setConfirmDel(false); navigate('/listings'); }}
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
  const img = getImageUrl(form.images[form.mainImage]);
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

// Resolves the display URL from an image entry that may be a plain string
// or an object with various URL fields (Supabase storage returns objects with
// url / publicUrl / public_url; older records may use src, path, or image_url).
function getImageUrl(image) {
  if (!image) return '';
  let raw = typeof image === 'string' ? image
    : (image.url || image.publicUrl || image.public_url || image.image_url || image.src || image.path || '');
  if (!raw) return '';
  if (raw.startsWith('blob:') || raw.startsWith('data:')) return raw;
  if (raw.startsWith('http')) return raw;
  const base = (window.AK_SUPABASE_URL || 'https://ylyilqwoiyirodigshgd.supabase.co').replace(/\/$/, '');
  if (raw.includes('/storage/v1/object/public/')) return base + raw.substring(raw.indexOf('/storage/v1/object/public/'));
  if (raw.includes('/')) return base + '/storage/v1/object/public/' + raw;
  return base + '/storage/v1/object/public/listing-images/' + raw;
}

// ─── Client-side watermarking ────────────────────────────────────────────────
// Every newly uploaded property photo is drawn to a canvas, lightly watermarked
// with the AK Real Estate wordmark (bottom-right), downscaled to a sane max width
// and re-encoded as JPEG before it is sent to Supabase Storage. Existing images and
// stock URLs are untouched — this only runs on real File uploads.
const WATERMARK_MAX_WIDTH = 2400;
const WATERMARK_JPEG_QUALITY = 0.88;

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image decode failed')); };
    img.src = url;
  });
}

function drawWatermark(ctx, width, height) {
  const text = 'AK REAL ESTATE';
  const pad = Math.round(width * 0.03);
  const fontSize = Math.max(18, Math.round(width * 0.032));

  ctx.save();
  ctx.font = '500 ' + fontSize + 'px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  // Letter-spacing is supported on modern canvas; degrade gracefully where it isn't.
  if ('letterSpacing' in ctx) { try { ctx.letterSpacing = Math.round(fontSize * 0.16) + 'px'; } catch (e) {} }

  const x = width - pad;
  const y = height - pad;
  const textW = ctx.measureText(text).width;

  // Wordmark — white, translucent, with a soft dark shadow for legibility on light photos.
  ctx.shadowColor = 'rgba(0,0,0,.55)';
  ctx.shadowBlur = Math.round(fontSize * 0.25);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.round(fontSize * 0.06);
  ctx.globalAlpha = 0.38;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, x, y);

  // Small red accent square just to the left of the wordmark.
  const sq = Math.round(fontSize * 0.52);
  const gap = Math.round(fontSize * 0.45);
  const sqX = x - textW - gap - sq;
  const sqY = y - Math.round(fontSize * 0.35) - Math.round(sq / 2);
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.globalAlpha = 0.42;
  ctx.fillStyle = '#b0181c';
  ctx.fillRect(sqX, sqY, sq, sq);

  ctx.restore();
}

function canvasToFile(canvas, originalFile) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) { reject(new Error('Canvas export failed')); return; }
      const base = ((originalFile && originalFile.name) || 'image').replace(/\.[^./\\]+$/, '');
      resolve(new File([blob], base + '.jpg', { type: 'image/jpeg' }));
    }, 'image/jpeg', WATERMARK_JPEG_QUALITY);
  });
}

async function watermarkImageFile(file) {
  if (!file || !/^image\//.test(file.type || '')) throw new Error('Not an image file');
  const img = await loadImageFromFile(file);
  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;
  if (!srcW || !srcH) throw new Error('Image has no dimensions');

  const scale = srcW > WATERMARK_MAX_WIDTH ? WATERMARK_MAX_WIDTH / srcW : 1;
  const w = Math.round(srcW * scale);
  const h = Math.round(srcH * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, w, h);
  drawWatermark(ctx, w, h);
  return canvasToFile(canvas, file);
}

function ImageManager({ images, mainImage, onChange, onUploadingChange, isPhone }) {
  const t = useFormLang();
  const inputRef = React.useRef(null);
  const [pending, setPending] = React.useState([]);
  const imagesRef = React.useRef(images);
  const mainImageRef = React.useRef(mainImage);
  React.useEffect(() => { imagesRef.current = images; }, [images]);
  React.useEffect(() => { mainImageRef.current = mainImage; }, [mainImage]);
  React.useEffect(() => {
    onUploadingChange && onUploadingChange(pending.length);
  }, [pending.length]);

  const handleFiles = async (files) => {
    const supabase = window.akSupabase;
    if (!supabase) return;
    const newPending = Array.from(files).map(f => ({
      id: crypto.randomUUID(),
      blobUrl: URL.createObjectURL(f),
      file: f,
    }));
    setPending(prev => [...prev, ...newPending]);
    for (const item of newPending) {
      try {
        // Process + watermark before upload. On failure, skip this image — never
        // fall back to uploading the un-watermarked original.
        let processed;
        try {
          processed = await watermarkImageFile(item.file);
        } catch (wmErr) {
          console.error('Watermark processing failed:', wmErr);
          alert(t('Could not process watermark for this image. Please try another file.'));
          setPending(prev => prev.filter(p => p.id !== item.id));
          URL.revokeObjectURL(item.blobUrl);
          continue;
        }
        const path = item.id + '.jpg';
        const { data, error } = await supabase.storage
          .from('listing-images')
          .upload(path, processed, { upsert: false, contentType: 'image/jpeg' });
        if (error) throw error;
        const { data: urlData } = supabase.storage
          .from('listing-images')
          .getPublicUrl(data.path);
        const curImages = imagesRef.current;
        const curMain = mainImageRef.current;
        onChange([...curImages, urlData.publicUrl], curImages.length === 0 ? 0 : curMain);
      } catch (err) {
        console.error('Image upload failed:', err);
      }
      setPending(prev => prev.filter(p => p.id !== item.id));
      URL.revokeObjectURL(item.blobUrl);
    }
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
          padding: isPhone ? '24px 16px' : '40px 24px', textAlign: 'center', cursor: 'pointer',
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
        <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--fg-2)',
          fontWeight: 300, lineHeight: 1.55 }}>
          JPG or PNG · 4:3 or 16:9 preferred · max 8 MB per file. The first image becomes the main image automatically.
        </p>
        <p style={{ margin: '0 0 18px', fontSize: 11, color: 'var(--fg-3)',
          fontWeight: 300, lineHeight: 1.5, display: 'flex', alignItems: 'center',
          gap: 8, justifyContent: 'center' }}>
          <RedSquare size={5} />
          {t('Uploaded images automatically receive a subtle AK Real Estate watermark.')}
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center',
          flexDirection: isPhone ? 'column' : 'row', alignItems: 'center' }}>
          <Btn variant="primary" as="span">＋ {t('Choose Files')}</Btn>
          <Btn variant="secondary" as="span" onClick={(e) => { e.stopPropagation(); addStock(); }}>
            {t('Add Stock')}
          </Btn>
        </div>
        <input ref={inputRef} type="file" multiple accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)} />
      </div>

      {/* Thumbs */}
      {(images.length > 0 || pending.length > 0) && (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-2)' }}>
              {images.length + pending.length} image{images.length + pending.length === 1 ? '' : 's'}
              {pending.length > 0
                ? ' · ' + pending.length + ' uploading…'
                : ' · Click ★ to set the main image'}
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
            {pending.map((item) => (
              <ImageThumbLoading key={item.id} blobUrl={item.blobUrl} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ImageThumb({ src, isMain, onMain, onRemove }) {
  const url = getImageUrl(src);
  return (
    <div style={{
      position: 'relative', aspectRatio: '4/3', overflow: 'hidden',
      border: '1px solid ' + (isMain ? 'var(--ak-crimson)' : 'var(--hairline-light)'),
      background: 'var(--ak-graphite)',
    }}>
      {url ? (
        <img src={url} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                   objectFit: 'cover' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 10, fontWeight: 500, letterSpacing: '0.20em',
          textTransform: 'uppercase', color: 'var(--fg-3)' }}>No image</div>
      )}
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

function ImageThumbLoading({ blobUrl }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: '4/3', overflow: 'hidden',
      border: '1px solid var(--hairline-light)',
      background: 'var(--ak-graphite)',
      opacity: 0.65,
    }}>
      {blobUrl && (
        <img src={blobUrl} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,.50)',
      }}>
        <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#fff' }}>Uploading…</span>
      </div>
    </div>
  );
}

Object.assign(window, { ListingFormPage, ImageManager, PreviewCard });

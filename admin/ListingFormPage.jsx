// ListingFormPage — Add new / Edit existing listing.

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

  return (
    <div className="ak-rise">
      <SectionTitle
        n={editing ? '·' : '＋'}
        label={editing ? 'Edit · ' + form.id : 'New Listing'}
        title={editing ? 'Refine the' : 'A new'}
        accent={editing ? 'record.' : 'address.'}
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="secondary" as="a" href="#/listings">Cancel</Btn>
            {editing && <Btn variant="danger" onClick={() => setConfirmDel(true)}>Delete</Btn>}
            <Btn variant="secondary" onClick={() => save(false)}>
              {form.status === 'Draft' ? 'Save Draft' : 'Save Changes'}
            </Btn>
            <Btn variant="primary" onClick={() => save(true)}>
              {form.status === 'Active' ? 'Save & Publish' : 'Publish Now'}
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
            Saved · returning to listings…
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

          <FormSection n="01" title="Property Details">
            <Field label="Title" required error={errors.title}>
              <TextInput value={form.title} onChange={(v) => set('title', v)}
                placeholder="e.g. Villa di Pietra" autoFocus={!editing} />
            </Field>
            <Field label="Description" hint="A long-form narrative — appears on the listing page.">
              <TextArea value={form.description} onChange={(v) => set('description', v)}
                rows={5} placeholder="Tucked behind a stone wall on a one-block lane…" />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Field label="Property Type" required>
                <ChipGroup value={form.propertyType} onChange={(v) => set('propertyType', v)}
                  options={['Apartment', 'House', 'Villa', 'Office', 'Land']} />
              </Field>
              <Field label="Listing Type" required>
                <ChipGroup value={form.listingType} onChange={(v) => set('listingType', v)}
                  options={['Sale', 'Rent']} />
              </Field>
            </div>
          </FormSection>

          <FormSection n="02" title="Location">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Field label="City" required error={errors.city}>
                <TextInput value={form.city} onChange={(v) => set('city', v)} placeholder="Los Angeles" />
              </Field>
              <Field label="Area / Neighborhood">
                <TextInput value={form.area} onChange={(v) => set('area', v)} placeholder="Bel Air" />
              </Field>
            </div>
            <Field label="Full Address" hint="Shown to verified clients only.">
              <TextInput value={form.address} onChange={(v) => set('address', v)}
                placeholder="1421 Stone Canyon Rd, Los Angeles, CA 90077" />
            </Field>
          </FormSection>

          <FormSection n="03" title="Pricing">
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
              <Field label="Price" required error={errors.price}
                hint={form.listingType === 'Rent' ? 'Per month' : 'List price'}>
                <NumberInput value={form.price} onChange={(v) => set('price', v)}
                  placeholder="24800000" min={0} step={1000} suffix={form.currency} />
              </Field>
              <Field label="Currency">
                <Select value={form.currency} onChange={(v) => set('currency', v)}
                  options={['USD', 'EUR', 'GBP', 'CHF', 'AED']} />
              </Field>
            </div>
          </FormSection>

          <FormSection n="04" title="Specifications">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              <Field label="Bedrooms">
                <NumberInput value={form.bedrooms} onChange={(v) => set('bedrooms', v)} min={0} placeholder="7" />
              </Field>
              <Field label="Bathrooms">
                <NumberInput value={form.bathrooms} onChange={(v) => set('bathrooms', v)} min={0} placeholder="9" />
              </Field>
              <Field label="Area">
                <NumberInput value={form.areaSqm} onChange={(v) => set('areaSqm', v)} min={0} suffix="m²" placeholder="1152" />
              </Field>
              <Field label="Floor">
                <NumberInput value={form.floor} onChange={(v) => set('floor', v)} min={0} placeholder="0 = ground" />
              </Field>
              <Field label="Total Floors">
                <NumberInput value={form.totalFloors} onChange={(v) => set('totalFloors', v)} min={1} placeholder="3" />
              </Field>
              <Field label="Year Built">
                <NumberInput value={form.yearBuilt} onChange={(v) => set('yearBuilt', v)} min={1700} max={2030} placeholder="1924" />
              </Field>
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 24,
              paddingTop: 24, borderTop: '1px solid var(--hairline-light)' }}>
              <Toggle checked={form.parking}   onChange={(v) => set('parking', v)}   label="Parking" />
              <Toggle checked={form.elevator}  onChange={(v) => set('elevator', v)}  label="Elevator" />
              <Toggle checked={form.furnished} onChange={(v) => set('furnished', v)} label="Furnished" />
            </div>

            <Field label="Features" hint="Comma-separated · e.g. Pool · Library · Cellar">
              <TextArea value={form.features} onChange={(v) => set('features', v)} rows={3}
                placeholder="Motor court · Restored stone facade · Library · Cellar · Pool" />
            </Field>
          </FormSection>

          <FormSection n="05" title="Photography">
            <ImageManager
              images={form.images} mainImage={form.mainImage}
              onChange={(images, mainImage) => setForm(prev => ({ ...prev, images, mainImage }))}
            />
          </FormSection>
        </div>

        {/* SIDE COLUMN — meta + preview */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.4vw, 32px)',
          position: 'sticky', top: 90, alignSelf: 'start' }}>
          <SidePanel title="Status">
            <Field label="Status" hint={
              form.status === 'Draft' ? 'Admin-only · not visible publicly'
              : form.status === 'Active' ? 'Visible on the public Listings page'
              : 'Closed deal · shown with a badge'
            }>
              <ChipGroup value={form.status} onChange={(v) => set('status', v)}
                options={['Draft', 'Active', 'Sold', 'Rented']} />
            </Field>
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--hairline-light)' }}>
              <Toggle checked={form.featured} onChange={(v) => set('featured', v)}
                label="Featured on home page" />
              <p style={{ margin: '12px 0 0', fontSize: 11, color: 'var(--fg-3)',
                lineHeight: 1.5, fontWeight: 300 }}>
                Featured listings appear in the home-page portfolio strip and "Featured Portfolio" section.
              </p>
            </div>
          </SidePanel>

          <SidePanel title="Live Preview">
            <PreviewCard form={form} />
            <div style={{ marginTop: 14, fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--fg-3)', textAlign: 'center' }}>
              ▪ Approximation · public layout may differ
            </div>
          </SidePanel>

          {editing && (
            <SidePanel title="Record">
              <MetaRow label="ID"         value={form.id} />
              <MetaRow label="Created"    value={form.createdAt} />
              <MetaRow label="Status"     value={form.status} />
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
  const inputRef = React.useRef(null);

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
          Drop images here
        </div>
        <p style={{ margin: '0 0 18px', fontSize: 12, color: 'var(--fg-2)',
          fontWeight: 300, lineHeight: 1.55 }}>
          JPG or PNG · 4:3 or 16:9 preferred · max 8 MB per file. The first image becomes the main image automatically.
        </p>
        <div style={{ display: 'inline-flex', gap: 10 }}>
          <Btn variant="primary" as="span">＋ Choose Files</Btn>
          <Btn variant="secondary" as="span" onClick={(e) => { e.stopPropagation(); addStock(); }}>
            Add Stock
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
              {images.length} image{images.length === 1 ? '' : 's'} · Click ★ to set the main image
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

Object.assign(window, { ListingFormPage, ImageManager, PreviewCard });

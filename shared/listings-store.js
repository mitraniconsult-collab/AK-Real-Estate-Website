// =========================================================
//  AK REAL ESTATE — Shared listings store
//  Used by BOTH the admin panel (admin/) and the public
//  website (ui_kits/website/). Persists to localStorage and
//  syncs across tabs via the `storage` event.
// =========================================================

(function () {
  const LS_KEY = 'ak.listings.v1';
  const TS_KEY = 'ak.listings.v1.touched';

  // Production never substitutes fictional properties for unavailable data.
  const SEED_LISTINGS = [];

// Optional English fields. Stored as snake_case *_en columns. They are only included
// in the payload when the admin actually fills them in, so installs whose `listings`
// table does not yet have these columns continue to save normally; a save that does
// include them will surface a clear Supabase error if the column is missing.
const EN_FIELD_MAP = {
  titleEn: 'title_en',
  descriptionEn: 'description_en',
  cityEn: 'city_en',
  areaEn: 'area_en',
  addressEn: 'address_en',
  featuresEn: 'features_en',
};

function toDb(listing) {
  const row = {
    id: listing.id,
    title: listing.title || '',
    description: listing.description || '',

    property_type: listing.propertyType || 'House',
    listing_type: listing.listingType || 'Sale',
    status: listing.status || 'Draft',
    featured: !!listing.featured,

    city: listing.city || '',
    area: listing.area || '',
    address: listing.address || '',

    price: listing.price === '' ? null : Number(listing.price),
    currency: listing.currency || 'EUR',

    bedrooms: listing.bedrooms === '' ? null : Number(listing.bedrooms),
    bathrooms: listing.bathrooms === '' ? null : Number(listing.bathrooms),
    area_sqm: listing.areaSqm === '' ? null : Number(listing.areaSqm),
    floor: listing.floor === '' ? null : Number(listing.floor),
    total_floors: listing.totalFloors === '' ? null : Number(listing.totalFloors),
    year_built: listing.yearBuilt === '' ? null : Number(listing.yearBuilt),

    parking: !!listing.parking,
    elevator: !!listing.elevator,
    furnished: !!listing.furnished,

    features: listing.features || '',

    images: Array.isArray(listing.images) ? listing.images : [],
    main_image: Number(listing.mainImage || 0),

    created_at: listing.createdAt || new Date().toISOString().slice(0, 10),
  };

  Object.keys(EN_FIELD_MAP).forEach(function (k) {
    const v = listing[k];
    if (v != null && String(v).trim() !== '') row[EN_FIELD_MAP[k]] = String(v);
  });

  return row;
}

function fromDb(row) {
  return {
    id: row.id,
    title: row.title || '',
    description: row.description || '',

    propertyType: row.property_type || 'House',
    listingType: row.listing_type || 'Sale',
    status: row.status || 'Draft',
    featured: !!row.featured,

    city: row.city || '',
    area: row.area || '',
    address: row.address || '',

    price: row.price ?? '',
    currency: row.currency || 'EUR',

    bedrooms: row.bedrooms ?? '',
    bathrooms: row.bathrooms ?? '',
    areaSqm: row.area_sqm ?? '',
    floor: row.floor ?? '',
    totalFloors: row.total_floors ?? '',
    yearBuilt: row.year_built ?? '',

    parking: !!row.parking,
    elevator: !!row.elevator,
    furnished: !!row.furnished,

    features: row.features || '',

    // Optional English fields (snake_case in DB; tolerate camelCase too). Absent → ''.
    titleEn:       row.title_en       ?? row.titleEn       ?? '',
    descriptionEn: row.description_en ?? row.descriptionEn ?? '',
    cityEn:        row.city_en        ?? row.cityEn        ?? '',
    areaEn:        row.area_en        ?? row.areaEn        ?? '',
    addressEn:     row.address_en     ?? row.addressEn     ?? '',
    featuresEn:    row.features_en    ?? row.featuresEn    ?? '',

    images: Array.isArray(row.images) ? row.images : [],
    mainImage: row.main_image ?? 0,

    createdAt: row.created_at || '',
  };
}

const Store = {
  listings: [...SEED_LISTINGS],
  subs: new Set(),
  ready: false,
  loadError: null,
  saveError: null,

  notify() {
    this.subs.forEach(fn => { try { fn(this.listings); } catch (e) {} });
  },

  on(fn) {
    this.subs.add(fn);
    fn(this.listings);
    return () => this.subs.delete(fn);
  },

  async load() {
    this.ready = false;
    this.loadError = null;
    this.notify();
    try {
      if (!window.akSupabase) throw new Error('service_unavailable');
      const { data, error } = await window.akSupabase
        .from('listings').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      this.listings = (data || []).map(fromDb);
    } catch (error) {
      console.error('Listings load failed:', error.code || 'network');
      this.loadError = true;
      this.listings = [];
    } finally {
      this.ready = true;
      this.notify();
    }
  },

  async upsert(listing) {
    this.saveError = null;
    try {
      if (!window.akSupabase) throw new Error('service_unavailable');
      const { error } = await window.akSupabase
        .from('listings').upsert(toDb(listing), { onConflict: 'id' });
      if (error) throw error;
      const exists = this.listings.some(l => l.id === listing.id);
      this.listings = exists
        ? this.listings.map(l => l.id === listing.id ? listing : l)
        : [listing, ...this.listings];
      this.notify();
      return true;
    } catch (error) {
      console.error('Listing save failed:', error.code || 'network');
      this.saveError = true;
      return false;
    }
  },

  async remove(id) {
    this.deleteError = null;
    try {
      if (!window.akSupabase) throw new Error('service_unavailable');
      const { data, error } = await window.akSupabase.from('listings')
        .delete().eq('id', id).select('id');
      if (error || !data?.some(row => row.id === id)) throw error || new Error('delete_not_confirmed');
      this.listings = this.listings.filter(row => row.id !== id);
      this.notify();
      return true;
    } catch (_) {
      this.deleteError = true;
      return false;
    }
  },

  async setStatus(id, status) {
    const l = this.listings.find(x => x.id === id);
    if (!l) return;
    if (!await this.upsert({ ...l, status })) alert(window.AKAdminLocale ? window.AKAdminLocale.translate('Change was not saved. Please try again.') : 'Change was not saved. Please try again.');
  },

  async toggleFeatured(id) {
    const l = this.listings.find(x => x.id === id);
    if (!l) return;
    if (!await this.upsert({ ...l, featured: !l.featured })) alert(window.AKAdminLocale ? window.AKAdminLocale.translate('Change was not saved. Please try again.') : 'Change was not saved. Please try again.');
  },

  newId() {
    const nums = this.listings.map(l => Number((l.id || 'L-0').split('-')[1] || 0)).filter(n => !isNaN(n));
    const next = (Math.max(0, ...nums) + 1).toString().padStart(3, '0');
    return 'L-' + next;
  },

  async reset() {
    this.listings = [...SEED_LISTINGS];
    this.notify();
  },

  publicListings() {
    return this.listings.filter(l => l.status !== 'Draft');
  },

  featured() {
    return this.publicListings().filter(l => l.featured);
  },
};


  // ----- Helpers -----
  function formatPrice(n, currency = 'USD', listingType) {
    if (n == null || isNaN(n)) return '—';
    const sym = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency + ' ';
    let formatted;
    if (n >= 1_000_000) formatted = sym + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + 'M';
    else if (n >= 1000) formatted = sym + n.toLocaleString();
    else formatted = sym + n;
    if (listingType === 'Rent') formatted += '/mo';
    return formatted;
  }

  // Export
  window.AKStore = Store;
  Store.load();
  window.SEED_LISTINGS = SEED_LISTINGS;
  window.formatPrice = formatPrice;
})();

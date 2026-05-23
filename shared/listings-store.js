// =========================================================
//  AK REAL ESTATE — Shared listings store
//  Used by BOTH the admin panel (admin/) and the public
//  website (ui_kits/website/). Persists to localStorage and
//  syncs across tabs via the `storage` event.
// =========================================================

(function () {
  const LS_KEY = 'ak.listings.v1';
  const TS_KEY = 'ak.listings.v1.touched';

  const SEED_LISTINGS = [
    {
      id: 'L-001',
      title: 'Maison Argentine',
      description: 'A 1924 Mediterranean restored over four years by Studio Argent. Behind a stone wall on a one-block lane.',
      propertyType: 'House', listingType: 'Sale', status: 'Active', featured: true,
      city: 'Los Angeles', area: 'Bel Air',
      address: '1421 Stone Canyon Road, Los Angeles, CA 90077',
      price: 24800000, currency: 'USD',
      bedrooms: 7, bathrooms: 9, areaSqm: 1152, floor: 0, totalFloors: 3, yearBuilt: 1924,
      parking: true, elevator: false, furnished: false,
      features: 'Motor court · Restored stone facade · Library · Cellar · Pool',
      images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop"],
      mainImage: 0, createdAt: '2026-04-12',
    },
    {
      id: 'L-002',
      title: 'The Glass Pavilion',
      description: 'A five-bedroom architectural by N. Marquis, set on a cliff above the cove. Cantilevered living room over the Pacific.',
      propertyType: 'Villa', listingType: 'Sale', status: 'Active', featured: true,
      city: 'Malibu', area: 'Encinal Bluffs',
      address: '32100 Pacific Coast Hwy, Malibu, CA 90265',
      price: 38000000, currency: 'USD',
      bedrooms: 5, bathrooms: 6, areaSqm: 762, floor: 0, totalFloors: 2, yearBuilt: 2018,
      parking: true, elevator: true, furnished: true,
      features: 'Off-market · Architectural · Pool · Direct beach access',
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop"],
      mainImage: 0, createdAt: '2026-04-02',
    },
    {
      id: 'L-003',
      title: 'Villa di Pietra',
      description: 'A restored 1924 Italianate on the avocado orchards of Montecito. Eight bedrooms, twelve baths, a chapel.',
      propertyType: 'Villa', listingType: 'Sale', status: 'Active', featured: false,
      city: 'Montecito', area: 'Hot Springs',
      address: '900 Hot Springs Rd, Montecito, CA 93108',
      price: 14800000, currency: 'USD',
      bedrooms: 8, bathrooms: 12, areaSqm: 1319, floor: 0, totalFloors: 3, yearBuilt: 1924,
      parking: true, elevator: false, furnished: false,
      features: 'Restored 1924 · Orchard · Chapel · Caretaker cottage',
      images: ["https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80&auto=format&fit=crop"],
      mainImage: 0, createdAt: '2026-03-18',
    },
    {
      id: 'L-004',
      title: 'Casa del Lago',
      description: 'A four-bedroom lake house with private dock. Original Frank Lloyd Wright influence, refreshed in 2022.',
      propertyType: 'House', listingType: 'Rent', status: 'Active', featured: false,
      city: 'Lake Arrowhead', area: 'North Shore',
      address: '28 Lakeshore Lane, Lake Arrowhead, CA 92352',
      price: 42000, currency: 'USD',
      bedrooms: 4, bathrooms: 5, areaSqm: 585, floor: 0, totalFloors: 2, yearBuilt: 1962,
      parking: true, elevator: false, furnished: true,
      features: 'Private dock · Boathouse · Seasonal · Furnished',
      images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&auto=format&fit=crop"],
      mainImage: 0, createdAt: '2026-05-01',
    },
    {
      id: 'L-005',
      title: 'Atelier 12',
      description: 'A six-bedroom contemporary on a flag lot. Currently being finished — listed in draft for review.',
      propertyType: 'House', listingType: 'Sale', status: 'Draft', featured: false,
      city: 'Beverly Hills', area: 'Flats',
      address: '906 Crescent Drive, Beverly Hills, CA 90210',
      price: 18500000, currency: 'USD',
      bedrooms: 6, bathrooms: 7, areaSqm: 911, floor: 0, totalFloors: 2, yearBuilt: 2025,
      parking: true, elevator: true, furnished: false,
      features: 'New construction · Gym · Wine room · Smart home',
      images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop"],
      mainImage: 0, createdAt: '2026-05-12',
    },
    {
      id: 'L-006',
      title: 'The Ravine House',
      description: 'A five-bedroom modernist in the Hollywood Hills, sold off-market in April 2026.',
      propertyType: 'House', listingType: 'Sale', status: 'Sold', featured: false,
      city: 'Los Angeles', area: 'Hollywood Hills',
      address: '7800 Mulholland Drive, Los Angeles, CA 90046',
      price: 12400000, currency: 'USD',
      bedrooms: 5, bathrooms: 6, areaSqm: 707, floor: 0, totalFloors: 3, yearBuilt: 1971,
      parking: true, elevator: false, furnished: false,
      features: 'Modernist · Pool · Canyon view',
      images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop"],
      mainImage: 0, createdAt: '2026-02-04',
    },
    {
      id: 'L-007',
      title: 'Atelier Loft No. 4',
      description: 'A two-bedroom downtown loft with east-facing light. Rented monthly.',
      propertyType: 'Apartment', listingType: 'Rent', status: 'Rented', featured: false,
      city: 'Los Angeles', area: 'Arts District',
      address: '800 Traction Ave #4B, Los Angeles, CA 90013',
      price: 18500, currency: 'USD',
      bedrooms: 2, bathrooms: 2, areaSqm: 167, floor: 4, totalFloors: 8, yearBuilt: 1923,
      parking: true, elevator: true, furnished: true,
      features: 'Loft · Concrete · Skyline view · Pet-friendly',
      images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80&auto=format&fit=crop"],
      mainImage: 0, createdAt: '2026-03-22',
    },
  ];

function toDb(listing) {
  return {
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

    images: Array.isArray(row.images) ? row.images : [],
    mainImage: row.main_image ?? 0,

    createdAt: row.created_at || '',
  };
}

const Store = {
  listings: [...SEED_LISTINGS],
  subs: new Set(),
  ready: false,

  notify() {
    this.subs.forEach(fn => { try { fn(this.listings); } catch (e) {} });
  },

  on(fn) {
    this.subs.add(fn);
    fn(this.listings);
    return () => this.subs.delete(fn);
  },

  async load() {
    if (!window.akSupabase) {
      console.warn('Supabase is not configured. Using seed listings.');
      this.listings = [...SEED_LISTINGS];
      this.ready = true;
      this.notify();
      return;
    }

    const { data, error } = await window.akSupabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Listings load error:', error);
      this.listings = [...SEED_LISTINGS];
    } else {
      this.listings = (data || []).map(fromDb);
    }

    this.ready = true;
    this.notify();
  },

  async upsert(listing) {
    if (!window.akSupabase) return;

    const row = toDb(listing);

    const { error } = await window.akSupabase
      .from('listings')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error('Listing save error:', error);
      alert(error.message || 'Listing save failed.');
      return;
    }

    const i = this.listings.findIndex(l => l.id === listing.id);
    if (i === -1) this.listings = [listing, ...this.listings];
    else this.listings = this.listings.map(l => l.id === listing.id ? listing : l);

    this.notify();
  },

  async remove(id) {
    if (!window.akSupabase) return;

    const { error } = await window.akSupabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Listing delete error:', error);
      alert(error.message || 'Listing delete failed.');
      return;
    }

    this.listings = this.listings.filter(l => l.id !== id);
    this.notify();
  },

  async setStatus(id, status) {
    const l = this.listings.find(x => x.id === id);
    if (!l) return;
    await this.upsert({ ...l, status });
  },

  async toggleFeatured(id) {
    const l = this.listings.find(x => x.id === id);
    if (!l) return;
    await this.upsert({ ...l, featured: !l.featured });
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


  window.addEventListener('storage', (e) => {
    if (e.key !== LS_KEY) return;
    const next = safeLoad();
    if (next) {
      Store.listings = next;
      Store.notify();
    }
  });

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

// admin/store.jsx — thin React layer on top of the shared AKStore.
// The actual Store + persistence lives in shared/listings-store.js.

const Store = window.AKStore;
const SEED_LISTINGS = window.SEED_LISTINGS;
const formatPrice = window.formatPrice;

function useListings() {
  const [list, setList] = React.useState(Store.listings);
  React.useEffect(() => Store.on(setList), []);
  return list;
}

// ----- Hash router -----
function parseHash() {
  const h = (location.hash || '#/dashboard').replace(/^#\/?/, '');
  const parts = h.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'dashboard' };
  if (parts[0] === 'dashboard') return { name: 'dashboard' };
  if (parts[0] === 'listings' && parts.length === 1) return { name: 'listings' };
  if (parts[0] === 'listings' && parts[1] === 'new') return { name: 'listing-new' };
  if (parts[0] === 'listings' && parts[2] === 'edit') return { name: 'listing-edit', id: parts[1] };
  return { name: 'dashboard' };
}

function useRoute() {
  const [route, setRoute] = React.useState(parseHash());
  React.useEffect(() => {
    const fn = () => setRoute(parseHash());
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return route;
}

function navigate(to) {
  location.hash = to;
}

// ----- Supabase auth -----
function useAuth() {
  const [signedIn, setSignedIn] = React.useState(false);
  const [checkingAuth, setCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    async function checkSession() {
      if (!window.akSupabase) {
        if (mounted) {
          setSignedIn(false);
          setCheckingAuth(false);
        }
        return;
      }

      const { data } = await window.akSupabase.auth.getSession();

      if (!mounted) return;

      const hasSession = !!data?.session;
      setSignedIn(hasSession);
      setCheckingAuth(false);

      if (hasSession && (!location.hash || location.hash === '#' || location.hash === '#/login')) {
        navigate('/dashboard');
      }
    }

    checkSession();

    const { data: listener } = window.akSupabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);

      if (session && (!location.hash || location.hash === '#' || location.hash === '#/login')) {
        navigate('/dashboard');
      }

      if (!session) {
        navigate('/login');
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return {
    signedIn,
    checkingAuth,

    signIn: async () => {
      setSignedIn(true);
      if (!location.hash || location.hash === '#' || location.hash === '#/login') {
        navigate('/dashboard');
      }
    },

    signOut: async () => {
      if (window.akSupabase) {
        await window.akSupabase.auth.signOut();
      }
      setSignedIn(false);
      navigate('/login');
    },
  };
}

Object.assign(window, { Store, useListings, useRoute, navigate, useAuth, formatPrice, SEED_LISTINGS });

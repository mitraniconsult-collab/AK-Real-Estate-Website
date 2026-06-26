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

// ----- Clean-path router -----
// Backward-compat shim: /admin/#/dashboard or /admin/foo#/bar → /admin/dashboard
if (location.hash && location.hash.startsWith('#/')) {
  history.replaceState(null, '', '/admin' + location.hash.slice(1));
}

function parsePath() {
  const raw = location.pathname;
  // Explicit prefix strip — avoids any regex ambiguity with optional slashes.
  let sub = '';
  if (raw === '/admin' || raw === '/admin/') {
    sub = '';
  } else if (raw.startsWith('/admin/')) {
    sub = raw.slice(7); // '/admin/'.length === 7
  }

  const search = new URLSearchParams(location.search).get('search') || '';
  const parts = sub.split('/').filter(Boolean);

  if (parts.length === 0)                                         return { name: 'dashboard',    search };
  if (parts[0] === 'dashboard')                                   return { name: 'dashboard',    search };
  if (parts[0] === 'login')                                       return { name: 'login',        search };
  if (parts[0] === 'account')                                     return { name: 'account',      search };
  if (parts[0] === 'inquiries')                                   return { name: 'inquiries',    search };
  if (parts[0] === 'listings' && parts.length === 1)              return { name: 'listings',     search };
  if (parts[0] === 'listings' && parts[1] === 'new')              return { name: 'listing-new',  search };
  if (parts[0] === 'listings' && parts[1] && parts[2] === 'edit') return { name: 'listing-edit', id: parts[1], search };

  return { name: 'dashboard', search };
}

function useRoute() {
  const [route, setRoute] = React.useState(parsePath());
  React.useEffect(() => {
    const fn = () => setRoute(parsePath());
    window.addEventListener('popstate', fn);
    return () => window.removeEventListener('popstate', fn);
  }, []);
  return route;
}

function navigate(to) {
  const path = to.startsWith('/') ? to : '/' + to;
  const full = path.startsWith('/admin') ? path : '/admin' + path;
  history.pushState(null, '', full);
  window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
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

      if (hasSession && (location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === '/admin/login')) {
        navigate('/dashboard');
      }
    }

    checkSession();

    const { data: listener } = window.akSupabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);

      if (session && (location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === '/admin/login')) {
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
      if (location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === '/admin/login') {
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

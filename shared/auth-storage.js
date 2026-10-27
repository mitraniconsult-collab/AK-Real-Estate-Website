// Used by all site clients so browsing the public site preserves session-only login.
(function () {
  const memory = new Map();
  window.AKAuthStorage = {
    getItem(key) {
      try { return sessionStorage.getItem(key) || localStorage.getItem(key); }
      catch (_) { return memory.get(key) || null; }
    },
    setItem(key, value) {
      try {
        const remember = localStorage.getItem('ak.auth.remember') !== 'false';
        const target = remember ? localStorage : sessionStorage;
        const other = remember ? sessionStorage : localStorage;
        target.setItem(key, value);
        other.removeItem(key);
      } catch (_) { memory.set(key, value); }
    },
    removeItem(key) {
      try { localStorage.removeItem(key); sessionStorage.removeItem(key); } catch (_) {}
      memory.delete(key);
    },
  };
})();

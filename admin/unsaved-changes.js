// Protect in-memory edits. No listing or personal data is stored in the browser.
(function () {
  if (window.AKUnsavedChanges) return;
  const owners = new Set();
  const busy = new Set();
  let index = Number.isInteger(history.state?.akAdminIndex) ? history.state.akAdminIndex : 0;
  let lastUrl = location.href;
  let reverting = false;
  history.replaceState({ ...history.state, akAdminIndex: index }, '', location.href);
  const dirty = () => owners.size > 0 || busy.size > 0;
  function allow() {
    if (busy.size) {
      const message = 'A save or upload is in progress. Please wait.';
      window.alert(window.AKAdminLocale ? window.AKAdminLocale.translate(message) : message);
      return false;
    }
    if (!dirty()) return true;
    const message = 'You have unsaved changes. Leave this page and discard them?';
    if (!window.confirm(window.AKAdminLocale ? window.AKAdminLocale.translate(message) : message)) return false;
    owners.clear();
    return true;
  }
  function acceptPop(event) {
    const next = event.state?.akAdminIndex;
    if (reverting) { reverting = false; return false; }
    if (dirty() && !allow()) {
      if (Number.isInteger(next) && next !== index) {
        reverting = true;
        history.go(index - next);
      } else {
        // Older entries may predate this router. Restore the last editor URL.
        history.pushState({ akAdminIndex: index }, '', lastUrl);
      }
      return false;
    }
    index = Number.isInteger(next) ? next : index;
    lastUrl = location.href;
    return true;
  }
  function push(url, force = false) {
    if (url === location.pathname + location.search + location.hash) return false;
    if (!force && !allow()) return false;
    if (force) { owners.clear(); busy.clear(); }
    index++;
    history.pushState({ akAdminIndex: index }, '', url);
    lastUrl = location.href;
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
    return true;
  }
  window.addEventListener('beforeunload', event => {
    if (!dirty()) return;
    event.preventDefault();
    event.returnValue = '';
  });
  document.addEventListener('click', event => {
    if (!dirty() || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (!/^https?:$/.test(url.protocol)) return;
    if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search) return;
    if (!allow()) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  window.AKUnsavedChanges = {
    dirty, allow, push, acceptPop,
    setDirty(owner, value) { if (value) owners.add(owner); else owners.delete(owner); },
    setBusy(owner, value) { if (value) busy.add(owner); else busy.delete(owner); },
    clear(owner) { owners.delete(owner); busy.delete(owner); },
  };
})();

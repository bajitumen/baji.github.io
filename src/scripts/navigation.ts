// Page-to-page navigation without full reloads (Astro's ClientRouter), tuned
// so the page never jumps: every navigation keeps the scroll position, and
// Back/Forward restore where you were. Loaded once by Base.astro; these
// listeners stay active across navigations.

// Scroll position to keep for the current navigation. Back/Forward
// ("traverse") are left to the router, which restores the saved position.
let keepScroll: { x: number; y: number } | null = null;

document.addEventListener('astro:before-preparation', (e) => {
  keepScroll = e.navigationType === 'traverse' ? null : { x: scrollX, y: scrollY };
});

document.addEventListener('astro:before-swap', (e) => {
  const doc = e.newDocument;
  // The router copies the new page's <html> attributes, which would drop the
  // theme; carry the current one over so the page never flashes.
  doc.documentElement.dataset.theme = document.documentElement.dataset.theme;
  // Show the tab named in the address (e.g. /#projects) before the new page
  // appears, so a restored scroll position isn't cut short by a shorter tab.
  selectTabIn(doc, e.to.hash.slice(1));
});

document.addEventListener('astro:after-swap', () => {
  if (keepScroll) scrollTo({ left: keepScroll.x, top: keepScroll.y, behavior: 'instant' });
  keepScroll = null;
});

// Mirrors select() in the home page's tab script, for a page that isn't
// on screen yet.
function selectTabIn(doc: Document, name: string) {
  const tabs = [...doc.querySelectorAll<HTMLElement>('[role="tab"]')];
  if (!tabs.some((t) => t.dataset.tab === name)) return;
  for (const t of tabs) {
    const on = t.dataset.tab === name;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    doc.getElementById(t.getAttribute('aria-controls')!)?.classList.toggle('hidden', !on);
  }
}

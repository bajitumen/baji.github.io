// Shared theme helpers for client scripts. The theme lives on
// <html data-theme="light|dark">; ThemeToggle changes it and fires
// "themechange" so charts can redraw with the right colors.

export type Theme = 'light' | 'dark';

export const currentTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

// Page colors for drawing charts, read from the CSS tokens in global.css.
// SVG presentation attributes can't use var(), so charts need real values.
export function pageColors() {
  const css = getComputedStyle(document.documentElement);
  const paper = css.getPropertyValue('--paper').trim();
  const ink = css.getPropertyValue('--ink').trim();
  const alpha = (a: number) => `color-mix(in srgb, ${ink} ${a * 100}%, transparent)`;
  return { paper, ink, muted: alpha(0.6), rule: alpha(0.3), faint: alpha(0.25) };
}

// Pass a signal to stop listening, e.g. when the page is swapped out.
export function onThemeChange(callback: () => void, signal?: AbortSignal) {
  document.addEventListener('themechange', callback, { signal });
}

// Runs `setup` for every matching element on each page (first load and every
// page swap). The signal passed to it aborts when the page is swapped out, so
// listeners and observers set up for that page can be cleaned up.
export function onEachPage(selector: string, setup: (el: HTMLElement, signal: AbortSignal) => void) {
  document.addEventListener('astro:page-load', () => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (!elements.length) return;
    const controller = new AbortController();
    document.addEventListener('astro:before-swap', () => controller.abort(), { once: true });
    for (const el of elements) setup(el, controller.signal);
  });
}

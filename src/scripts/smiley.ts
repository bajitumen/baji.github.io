// Morphs the header smiley's features between awake (light mode) and asleep
// (dark mode). Each feature path has the same sequence of numbers in both
// states, so the animation moves every number from where it is now to its
// target: dots stretch into arches, the smile curls into an "o". Starting from
// the current shape means a switch back mid-animation reverses smoothly.

const DURATION = 450; // ms
const NUMBER = /-?\d*\.?\d+/g;

const numbersIn = (d: string) => (d.match(NUMBER) ?? []).map(Number);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2); // ease-in-out

const running = new WeakMap<Element, number>();

export function animateSmiley(smiley: Element, dark: boolean) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  for (const el of smiley.querySelectorAll<SVGPathElement>('.smiley-feature')) {
    const targetD = (dark ? el.dataset.dDark : el.dataset.dLight)!;
    const targetW = Number(dark ? el.dataset.wDark : el.dataset.wLight);
    cancelAnimationFrame(running.get(el) ?? 0);
    if (reduce) {
      el.setAttribute('d', targetD);
      el.setAttribute('stroke-width', String(targetW));
      continue;
    }
    const from = numbersIn(el.getAttribute('d')!);
    const to = numbersIn(targetD);
    const fromW = Number(el.getAttribute('stroke-width'));
    // The target's text, with each number replaced in order by an
    // in-between value (the letters and spacing stay the same).
    const frame = (t: number) => {
      let i = 0;
      el.setAttribute('d', targetD.replace(NUMBER, () => (from[i] + (to[i] - from[i++]) * t).toFixed(2)));
      el.setAttribute('stroke-width', (fromW + (targetW - fromW) * t).toFixed(2));
    };
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      frame(ease(p));
      if (p < 1) running.set(el, requestAnimationFrame(step));
    };
    running.set(el, requestAnimationFrame(step));
  }
}

// Sets the face for `dark` right away, in a page that isn't shown yet (used
// by scripts/navigation.ts for the incoming page on a swap).
export function setSmileyIn(doc: Document, dark: boolean) {
  for (const el of doc.querySelectorAll<SVGPathElement>('.smiley-feature')) {
    el.setAttribute('d', (dark ? el.dataset.dDark : el.dataset.dLight)!);
    el.setAttribute('stroke-width', (dark ? el.dataset.wDark : el.dataset.wLight)!);
  }
}

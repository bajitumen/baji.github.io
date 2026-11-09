// Loads Observable Plot on demand. Charts call this when they first need to
// draw (i.e. when the projects tab is shown), so visitors who never open it
// never download the library, and nothing else on the page waits for it.

type PlotModule = typeof import('./plot-marks');

let loading: Promise<PlotModule> | undefined;
const latest = new WeakMap<HTMLElement, number>();

// Returns Plot for drawing into `el`, or null if a newer draw of the same chart
// started while Plot was loading (e.g. a resize or theme change), so a stale
// draw never overwrites a fresh one.
export async function plotFor(el: HTMLElement): Promise<PlotModule | null> {
  const id = (latest.get(el) ?? 0) + 1;
  latest.set(el, id);
  loading ??= import('./plot-marks');
  const Plot = await loading;
  return latest.get(el) === id ? Plot : null;
}

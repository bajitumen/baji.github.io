// Loads Observable Plot for the charts. The download starts as soon as the
// page loads (in the background, without blocking anything else, since the
// tab script runs first and doesn't depend on it), so the charts are ready to
// draw the moment the projects tab opens.

type PlotModule = typeof import('./plot-marks');

const loading: Promise<PlotModule> = import('./plot-marks');
const latest = new WeakMap<HTMLElement, number>();

// Returns Plot for drawing into `el`, or null if a newer draw of the same chart
// started while Plot was loading (e.g. a resize or theme change), so a stale
// draw never overwrites a fresh one.
export async function plotFor(el: HTMLElement): Promise<PlotModule | null> {
  const id = (latest.get(el) ?? 0) + 1;
  latest.set(el, id);
  const Plot = await loading;
  return latest.get(el) === id ? Plot : null;
}

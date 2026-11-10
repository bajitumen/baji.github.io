// The parts of Observable Plot the charts use. Loading this file instead of the
// whole package keeps the on-demand download small, because the bundler can
// leave out everything not listed here. Add to this list if a chart needs more.
export { plot, areaY, barX, dot, lineY, ruleX, ruleY, text, tip, pointer, pointerX } from '@observablehq/plot';

// Cumulative confirmed COVID-19 cases among incarcerated people, from the
// UCLA Law COVID Behind Bars Data Project's per-state time series files.
// Colors are categorical slots 1–3 of the validated chart palette, with the
// palette's own dark-mode steps.
import type { Series } from '../components/LineChart.astro';
import covidCsv from './ucla-covid-cumulative-cases.csv?raw';

export const covidSeries: Series[] = [
  { name: 'All State Prisons, AR', label: 'Arkansas prisons', color: '#2a78d6', colorDark: '#3987e5', points: [] },
  { name: 'Los Angeles Jails, CA', label: 'LA jails', color: '#eb6834', colorDark: '#d95926', points: [] },
  { name: 'Bellamy Creek Correctional Facility, MI', label: 'Bellamy Creek', color: '#1baf7a', colorDark: '#199e70', points: [] },
];

// The build stops on any row it can't read, rather than silently dropping it.
for (const line of covidCsv.trim().split(/\r?\n/).slice(1)) {
  const m = line.match(/^"?(.*?)"?,(\d{4}-\d{2}-\d{2}),(\d+)$/);
  if (!m) throw new Error(`Unreadable row in ucla-covid-cumulative-cases.csv: ${line}`);
  const target = covidSeries.find((s) => s.name === m[1]);
  if (!target) throw new Error(`Unknown series in ucla-covid-cumulative-cases.csv: ${m[1]}`);
  target.points.push({ date: m[2], value: Number(m[3]) });
}

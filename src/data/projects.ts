// The projects shown as cards on the projects tab, each with its own page at
// /projects/<slug>. Titles and summaries are drafts for Baji to edit.
import type { EmployerName } from '../components/Employer.astro';

export interface Project {
  slug: string; // page address: /projects/<slug>
  title: string;
  org: EmployerName; // shown in the organization's color
  orgHref: string; // where the organization name links on the project page
  years: string;
  summary: string; // one sentence, shown on the card and the project page
  thumb: 'grade' | 'felony' | 'covid'; // which preview drawing the card shows
}

export const projects: Project[] = [
  {
    slug: 'subject',
    title: 'Predicting student success',
    org: 'Subject',
    orgHref: 'https://subject.com',
    years: '2025–26',
    summary: 'A model that projects each student’s final grade as a range, so teachers can step in before a student falls behind.',
    thumb: 'grade',
  },
  {
    slug: 'felony-murder',
    title: 'Felony murder’s racial disparity',
    org: 'New Yorker',
    orgHref: 'https://www.newyorker.com/magazine/2023/12/18/felony-murder-laws',
    years: '2023',
    summary: 'Black Americans are many times more likely than white Americans to be incarcerated for felony murder, the focus of a Pulitzer Prize–winning New Yorker investigation.',
    thumb: 'felony',
  },
  {
    slug: 'covid-behind-bars',
    title: 'COVID-19 behind bars',
    org: 'UCLA',
    orgHref: 'https://uclaprisondata.org/',
    years: '2020–23',
    summary: 'How COVID-19 spread through U.S. prisons and jails, tracked from the case counts that agencies reported.',
    thumb: 'covid',
  },
];

export const projectBySlug = (slug: string) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project: ${slug}`);
  return p;
};

export interface Project {
  title: string;
  blurb: string;
  image?: string;
  video?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    title: 'Data Transparency During COVID',
    image: '/images/comparison1.png',
    blurb:
      'An audit of how state and county health agencies released COVID-19 case, hospitalization, and outcome data — and the gaps that emerged when reporting was disaggregated by race, income, and geography. The analysis surfaces where transparency broke down and which communities lost visibility in the data we relied on for policy decisions.',
  },
  {
    title: 'Whitus v. Georgia',
    blurb:
      'Whitus v. Georgia (1967) is the Supreme Court case that struck down jury-selection methods that systematically excluded Black jurors. This project applies the same statistical lens — comparing the demographic composition of jury pools to the eligible population — to a more recent set of cases, asking whether the patterns the Whitus court found troubling have actually disappeared.',
  },
  {
    title: 'Representation for the Working Class',
    image: '/images/rep12.png',
    blurb:
      'A look at how often working-class Americans are represented in the legislatures that pass laws affecting them. The project builds a dataset of legislator backgrounds across state houses and tests the relationship between descriptive representation and the policy outcomes that matter most to lower-income voters.',
  },
  {
    title: 'Medical Debt Litigation in Wisconsin',
    blurb:
      'Hospitals in Wisconsin file thousands of debt-collection lawsuits against patients each year. This project compiles court records to map who gets sued, which hospitals are most aggressive, and how outcomes vary by neighborhood — work intended to support consumer-rights advocates pushing for reform of medical billing and collections practices.',
  },
  {
    title: 'Solar Access for Lower-Income Residents',
    image: '/images/solar1.png',
    blurb:
      'Residential solar adoption is concentrated in higher-income neighborhoods even after federal incentives are factored in. This project quantifies the gap, identifies the financing and ownership barriers most responsible, and evaluates which existing equity programs are actually moving installations into underserved areas.',
  },
  {
    title: 'Flatnotes',
    video: 'https://www.youtube.com/embed/FchzzXBmzvs',
    blurb:
      'A personal creative project outside the data work — documented in the video.',
  },
];

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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Whitus v. Georgia',
    blurb:
      'Statistical analysis of jury racial composition. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Representation for the Working Class',
    image: '/images/rep12.png',
    blurb:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Medical Debt Litigation in Wisconsin',
    blurb:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Solar Access for Lower-Income Residents',
    image: '/images/solar1.png',
    blurb:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Flatnotes',
    video: 'https://www.youtube.com/embed/FchzzXBmzvs',
    blurb:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

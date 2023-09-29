import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import { IconType } from 'react-icons/lib';

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Skills',
    hash: '#skills',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

export const fontFormat = ['font-bold', 'italic', 'underline'] as const;

export const IntroData =
  '<span class="font-bold">Hello, I\'m John Doe.</span> I\'m a <span class="font-bold">superheroe </span> with <span class="font-bold">2 years</span> of experience. I enjoy saving <span class="italic">dogs & cats</span>. My focus is <span class="underline">Flying and Super-speed</span>.';

export const AboutData = `<p class="mb-3">
After earning a degree in <span class="font-bold">Computer Science</span>, 
I was fortunate to transition directly from my final-year internship into a role at TechCorp as a Backend Developer. 
What <span class="underline">excites</span> me the most about coding is the endless opportunity for innovation. 
There's nothing like the thrill of cracking a complex algorithm or optimizing a piece of code. 
My primary tech stack includes <span class="font-bold">Java, Spring Boot, Angular, MySQL, and AWS</span>. 
</p>
<p class="mb-3">
I'm always eager to explore new technologies and methodologies to stay ahead of the curve. 
Currently, I'm on the lookout for a challenging full-time role in software development.
</p>

<p>
<span class="italic">Outside of the coding world</span>, my interests are quite diverse. 
I'm an avid reader, particularly of science fiction and history. 
I also enjoy hiking and have recently taken up photography as a hobby. 
Currently, I'm diving into the world of machine learning to broaden my skill set.
</p>`;

export const projectsData = [
  {
    id: '1',
    position: 1,
    title: 'Play Today. Marketplace',
    description:
      "I was in charge of the full project. A marketplace to buy Golf players' NFTs.",
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Postgresql',
      'Firebase',
      'Zustand',
    ],
    url: ['https://marketplace.playtoday.cc'],
    imageUrl: '/marketplace.png',
  },
  {
    id: '2',
    position: 2,
    title: 'Play Today. App Showcase',
    description:
      "I was in charge of the full project. It's a website to showcase the Golf app we have made on React-Native.",
    tags: ['React', 'TypeScript', 'Postgresql', 'Firebase', 'Zustand'],
    url: ['https://app.playtoday.cc'],
    imageUrl: '/app.png',
  },
  {
    id: '3',
    position: 3,
    title: 'Play Today. Golf',
    description:
      'I was in charge of all the Wallet section (Show the badges, balance, purchase Crypto,...).',
    tags: ['React-Native', 'Mobx', 'Postgresql', 'Firebase', 'Polygon', 'AWS'],
    url: [
      'https://play.google.com/store/apps/details?id=cc.playtoday.golfapp',
      'https://apps.apple.com/au/app/play-today/id1631790603',
    ],
    imageUrl: '/golf.png',
  },
  {
    id: '4',
    position: 4,
    title: 'Play Today. Metaverse',
    description:
      'The React front-end initialises a Unity instance to render the WebGL project and handles user authentication, transferring the data to the WebGL build.',
    tags: ['React', 'TypeScript', 'Firebase', 'Zustand'],
    url: ['https://playtoday.cc'],
    imageUrl: '/metaverse.png',
  },
];

export const skillsData = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'React-Native',
  'Next.js',
  'Node.js',
  'Git',
  'Tailwind',
  'MongoDB',
  'Redux',
  'Mobx',
  'Firebase',
  'Zustand',
  'AWS',
  'Express',
  'PostgreSQL',
];

export type ExperienceIcons = 'LuGraduationCap' | 'CgWorkAlt' | 'FaReact';

export const experiencesDataIcons: { [key: string]: IconType } = {
  LuGraduationCap: LuGraduationCap,
  CgWorkAlt: CgWorkAlt,
  FaReact: FaReact,
};

export const experiencesData = [
  {
    title: 'Bachelor in Mobile App Development',
    location: 'Sydney, Australia',
    description: 'I graduated after 3 years of studying at AIT.',
    icon: 'LuGraduationCap',
    startYear: '2019',
    endYear: '2022',
  },
  {
    title: 'Full-Stack Developer',
    location: 'Sydney, Australia',
    description:
      "I've developed a CMS to organise and update the roster for a private company.",
    icon: 'CgWorkAlt',
    startYear: '2021',
  },
  {
    title: 'Full-stack Developer',
    location: 'Sydney, Australia',
    description:
      'I worked as a full-stack developer for 1 year for Mirk as a full-stack developer. After 8 months, I was promoted to Web Lead Developer.',
    icon: 'CgWorkAlt',
    startYear: '2022',
    endYear: '2023',
  },
  {
    title: 'Full-stack Developer',
    location: 'Sydney, Australia',
    description:
      "Looking for a new position. My stack includes React, React-Native, Next.js, TypeScript, Tailwind, MongoDB, Firebase, Postgresql, AWS. I'm open to full-time opportunities.",
    icon: 'FaReact',
    startYear: 'Present',
  },
];

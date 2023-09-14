import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import marketplaceImg from '@/public/marketplace.png';
import appImg from '@/public/app.png';
import metaverseImg from '@/public/metaverse.png';
import golfImg from '@/public/golf.png';

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

export const experiencesData = [
  {
    title: 'Bachelor in Mobile App Development',
    location: 'Sydney, Australia',
    description: 'I graduated after 3 years of studying at AIT.',
    icon: React.createElement(LuGraduationCap),
    date: '2019-2022',
  },
  {
    title: 'Full-Stack Developer',
    location: 'Sydney, Australia',
    description:
      "I've developed a CMS to organise and update the roster for a private company.",
    icon: React.createElement(CgWorkAlt),
    date: '2021',
  },
  {
    title: 'Full-stack Developer',
    location: 'Sydney, Australia',
    description:
      'I worked as a full-stack developer for 1 year for Mirk as a full-stack developer. After 8 months, I was promoted to Web Lead Developer.',
    icon: React.createElement(CgWorkAlt),
    date: '2022 - 2023',
  },
  {
    title: 'Full-stack Developer',
    location: 'Sydney, Australia',
    description:
      "Looking for a new position. My stack includes React, React-Native, Next.js, TypeScript, Tailwind, MongoDB, Firebase, Postgresql, AWS. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: 'Present',
  },
] as const;

export const projectsData = [
  {
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
    imageUrl: marketplaceImg,
  },
  {
    title: 'Play Today. App Showcase',
    description:
      "I was in charge of the full project. It's a website to showcase the Golf app we have made on React-Native.",
    tags: ['React', 'TypeScript', 'Postgresql', 'Firebase', 'Zustand'],
    url: ['https://app.playtoday.cc'],
    imageUrl: appImg,
  },
  {
    title: 'Play Today. Golf',
    description:
      'I was in charge of all the Wallet section (Show the badges, balance, purchase Crypto,...).',
    tags: ['React-Native', 'Mobx', 'Postgresql', 'Firebase', 'Polygon', 'AWS'],
    url: [
      'https://play.google.com/store/apps/details?id=cc.playtoday.golfapp',
      'https://apps.apple.com/au/app/play-today/id1631790603',
    ],
    imageUrl: golfImg,
  },
  {
    title: 'Play Today. Metaverse',
    description:
      'The React front-end initialises a Unity instance to render the WebGL project and handles user authentication, transferring the data to the WebGL build.',
    tags: ['React', 'TypeScript', 'Firebase', 'Zustand'],
    url: ['https://playtoday.cc'],
    imageUrl: metaverseImg,
  },
] as const;

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
] as const;

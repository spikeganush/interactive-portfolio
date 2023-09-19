'use client';

import About from '@/components/about';
import Contact from '@/components/contact';
import Experience from '@/components/experience';
import Intro from '@/components/intro';
import Projects from '@/components/projects';
import SectionDivider from '@/components/section-divider';
import Skill from '@/components/skills';
import { useParams } from 'next/navigation';
import React from 'react';

const PersonalPortfolio = () => {
  const params = useParams();

  return (
    <main className="flex flex-col items-center px-4">
      <Intro id={params?.id as string} />
      <SectionDivider />
      <About id={params?.id as string} />
      <Projects id={params?.id as string} />
      <Skill id={params?.id as string} />
      <Experience id={params?.id as string} />
      <Contact id={params?.id as string} />
    </main>
  );
};

export default PersonalPortfolio;

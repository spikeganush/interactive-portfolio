'use client';

import About from '@/components/about';
import Contact from '@/components/contact';
import Experience from '@/components/experience';
import Intro from '@/components/intro';
import Projects from '@/components/projects';
import SectionDivider from '@/components/section-divider';
import Skill from '@/components/skills';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import useConnexion from '@/hooks/useConnexion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PersonalPortfolio = () => {
  const { getServerSideProps } = useConnexion();
  const { data } = usePortfolioDataContext();
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    getServerSideProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.customUrl && data.customUrl !== pathName) {
      router.push(`/${data.customUrl}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.customUrl, pathName]);

  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skill />
      <Experience />
      <Contact />
    </main>
  );
};

export default PersonalPortfolio;

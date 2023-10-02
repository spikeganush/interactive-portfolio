'use client';

import { useEffect } from 'react';
import About from '@/components/about';
import Contact from '@/components/contact';
import Experience from '@/components/experience';
import Intro from '@/components/intro';
import Projects from '@/components/projects';
import SectionDivider from '@/components/section-divider';
import Skill from '@/components/skills';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id && pathName === '/') {
      // add the user id to the url
      router.push(`/${session?.user?.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id, pathName]);

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
}

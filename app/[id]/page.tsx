'use client';

import { useState, useEffect } from 'react';
import About from '@/components/about';
import Contact from '@/components/contact';
import Experience from '@/components/experience';
import Intro from '@/components/intro';
import Projects from '@/components/projects';
import SectionDivider from '@/components/section-divider';
import Skill from '@/components/skills';
import { useParams } from 'next/navigation';
import React from 'react';
import {
  AboutData,
  IntroData,
  experiencesData,
  projectsData,
  skillsData,
} from '@/lib/data';
import { useSession } from 'next-auth/react';
import { DataState } from '@/types/general';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';

const PersonalPortfolio = () => {
  const params = useParams();
  const { data: session } = useSession();
  const { data, setData } = usePortfolioDataContext();

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      userId: session?.user?.id!,
      email: session?.user?.email!,
    }));
  }, [session?.user?.id, session?.user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/portfolio/${params?.id}`);
        if (response.ok) {
          const data = await response.json();

          setData((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params?.id]);

  const handleSaveData = async () => {
    try {
      const response = await fetch('/api/portfolio/save', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Data saved');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col items-center px-4">
      {/* <button onClick={handleSaveData}>Test record data</button> */}
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

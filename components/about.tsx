'use client';

import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import { PageComponentProps } from '@/types/general';
import AboutSection from './intro/about-section';
import { useEditContext } from '@/context/edit-context';
import EditText from './edition/edit-text';
import ContainerSlide from './motion/container-slide';

const About = ({ id }: PageComponentProps) => {
  const { ref } = useSectionInView('About');
  const { edit } = useEditContext();

  return (
    <ContainerSlide
      ref={ref}
      className="mb-28 max-w-[50rem] w-full text-center leading-8 sm:mb-40 scroll-mt-28 px-2"
      id="about"
      slide="down-up"
      delay={0.175}
    >
      {edit.about ? (
        <div className="flex w-full">
          <EditText component="about" />
        </div>
      ) : (
        <AboutSection />
      )}
    </ContainerSlide>
  );
};

export default About;

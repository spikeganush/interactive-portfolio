'use client';

import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import { motion } from 'framer-motion';
import { PageComponentProps } from '@/types/general';
import AboutSection from './intro/about-section';
import { useEditContext } from '@/context/edit-context';
import EditText from './edition/edit-text';

const About = ({ id }: PageComponentProps) => {
  const { ref } = useSectionInView('About');
  const { edit } = useEditContext();

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[50rem] w-full text-center leading-8 sm:mb-40 scroll-mt-28 px-2"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      {edit.about ? (
        <div className="flex w-full">
          <EditText component="about" />
        </div>
      ) : (
        <AboutSection />
      )}
    </motion.section>
  );
};

export default About;

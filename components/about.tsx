'use client';

import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './section-heading';
import { AboutData } from '@/lib/data';
import sanitizeHtml from 'sanitize-html';
import { PageComponentProps } from '@/types/general';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';

const About = ({ id }: PageComponentProps) => {
  const { ref } = useSectionInView('About');
  const { data } = usePortfolioDataContext();

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <span
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(data?.about ?? AboutData, {
            allowedTags: ['p'],
            allowedAttributes: {
              p: ['class'],
            },
          }),
        }}
      ></span>
    </motion.section>
  );
};

export default About;

'use client';

import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './section-heading';

const About = () => {
  const { ref } = useSectionInView('About');

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
      <p className="mb-3">
        After graduating with a Bachelor in{' '}
        <span className="font-medium">Mobile App Development</span>, I had the
        chance to directly work at the end of my internship in the company{' '}
        <span className="font-medium">Mirk</span> as a{' '}
        <span className="font-medium">Full-Stack Developer</span>.{' '}
        <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem. My core stack
        is{' '}
        <span className="font-medium">
          TypeScript, React, Next.js, React-Native, Node.js, MongoDB, Postgresql
          and Firebase
        </span>
        . I am always looking to learn new technologies. I am currently looking
        for a <span className="font-medium">full-time position</span> as a
        software developer.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        video games, watching movies, and Rollerblading. I also enjoy{' '}
        <span className="font-medium">learning new things</span>. I am currently
        learning <span className="font-medium">Japanese</span>.
      </p>
    </motion.section>
  );
};

export default About;

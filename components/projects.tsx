'use client';

import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import { motion } from 'framer-motion';
import ProjectsSection from './projects/projects-section';
import { useEditContext } from '@/context/edit-context';
import EditProjects from './edition/edit-projects';

const Projects = () => {
  const { ref } = useSectionInView('Projects', 0.5);
  const { edit } = useEditContext();

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="scroll-mt-28 mb-28 max-w-[50rem] w-full"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      {edit.projects ? <EditProjects /> : <ProjectsSection />}
    </motion.section>
  );
};

export default Projects;

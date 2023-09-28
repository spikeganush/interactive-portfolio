'use client';

import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import ProjectsSection from './projects/projects-section';
import { useEditContext } from '@/context/edit-context';
import EditProjects from './edition/edit-projects';
import ContainerSlide from './motion/container-slide';

const Projects = () => {
  const { ref } = useSectionInView('Projects', 0.5);
  const { edit } = useEditContext();

  return (
    <ContainerSlide
      ref={ref}
      id="projects"
      className="scroll-mt-28 mb-28 max-w-[50rem] w-full"
      slide="down-up"
      delay={0.175}
    >
      {edit.projects ? <EditProjects /> : <ProjectsSection />}
    </ContainerSlide>
  );
};

export default Projects;

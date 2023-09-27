'use client';
import React from 'react';
import SectionHeading from '../section-heading';
import EditButton from '../edition/edit-button';
import Project from '../project';
import { projectsData } from '@/lib/data';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import ContainerSlide from '../motion/container-slide';

const ProjectsSection = () => {
  const { data } = usePortfolioDataContext();

  const projects =
    data.projects && data.projects.length > 0 ? data.projects : projectsData;

  return (
    <ContainerSlide className="projects w-full" slide="down-up">
      <SectionHeading>
        My projects
        <EditButton
          type="add"
          className="ml-2"
          component="projects"
          isAbsolute={false}
          animationType="spring"
          stiffness={125}
          delay={0.5}
          duration={0.7}
        />
      </SectionHeading>
      <div className="flex flex-col items-center">
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </ContainerSlide>
  );
};

export default ProjectsSection;

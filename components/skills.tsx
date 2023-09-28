'use client';

import React from 'react';
import SectionHeading from './section-heading';
import { skillsData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { PageComponentProps } from '@/types/general';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useEditContext } from '@/context/edit-context';
import ContainerSlide from './motion/container-slide';
import EditButton from './edition/edit-button';
import EditSkills from './edition/edit-skills';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const Skill = ({ id }: PageComponentProps) => {
  const { ref } = useSectionInView('Skills');
  const { data } = usePortfolioDataContext();
  const { edit } = useEditContext();

  const skills = data?.skills || skillsData;

  return (
    <ContainerSlide
      className="mb-28 max-w-[53rem] w-full scroll-mt-28 text-center sm:mb-40"
      ref={ref}
      id="skills"
      slide="down-up"
      delay={0.175}
    >
      {edit.skills ? (
        <EditSkills />
      ) : (
        <>
          <SectionHeading>
            My skills
            <EditButton
              className="ml-2"
              component="skills"
              isAbsolute={false}
              animationType="spring"
              stiffness={125}
              delay={0.5}
              duration={0.7}
            />
          </SectionHeading>
          <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
            {skills.map((skill, index) => (
              <motion.li
                className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
                key={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={index}
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </ContainerSlide>
  );
};

export default Skill;

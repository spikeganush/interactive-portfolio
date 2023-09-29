import React from 'react';
import DivGrow from '../motion/div-grow';
import { ExperienceIcons, experiencesDataIcons } from '@/lib/data';
import { motion } from 'framer-motion';

type ExperienceIconProps = {
  selectedIcon: ExperienceIcons | null;
  setIcon: (icon: ExperienceIcons) => void;
};

const iconsList = ['LuGraduationCap', 'CgWorkAlt', 'FaReact'];

const ExperienceIcon = ({ selectedIcon, setIcon }: ExperienceIconProps) => {
  return (
    <DivGrow
      className="flex flex-col justify-center items-center gap-2 mb-3 w-full"
      delay={0.4}
    >
      <motion.h1
        className="text-2xl my-3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 125,
          delay: 0.63,
          duration: 0.7,
        }}
      >
        Select icon
      </motion.h1>
      <DivGrow delay={0.65} className="flex gap-2">
        {iconsList.map((icon: string, index: number) => {
          return (
            <div
              key={index}
              className={`${
                icon === selectedIcon ? '!bg-blue-300 ' : ''
              }flex justify-center items-center rounded-full w-[60px] aspect-square border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 }`}
              onClick={() => setIcon(icon as ExperienceIcons)}
            >
              {React.createElement(experiencesDataIcons[icon], {
                style: { fontSize: '1.5rem' },
              })}
            </div>
          );
        })}
      </DivGrow>
    </DivGrow>
  );
};

export default ExperienceIcon;

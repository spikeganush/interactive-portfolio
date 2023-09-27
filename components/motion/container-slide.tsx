import React from 'react';
import { motion } from 'framer-motion';

type ContainerSlideProps = {
  children?: React.ReactNode;
  slide?: 'up-down' | 'down-up';
  delay?: number;
} & React.HTMLProps<HTMLDivElement>;

/**
 *
 * @param children  ReactNode
 *
 * @param slide up-down (-100) | down-up (100)
 * @default up-down
 *
 * @param delay number
 * @default 0.2
 *
 * @param rest all the div props
 */
const ContainerSlide = ({
  children,
  slide = 'up-down',
  delay = 0.2,
  ...rest // all the div props
}: ContainerSlideProps) => {
  const y = slide === 'up-down' ? -100 : 100;

  return (
    <motion.section
      {...(rest as any)}
      className={`${rest.className ?? 'my-5 w-full'}`}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
};

export default ContainerSlide;

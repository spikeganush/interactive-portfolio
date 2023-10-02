import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

type ContainerSlideProps = {
  children?: React.ReactNode;
  slide?: 'up-down' | 'down-up';
  delay?: number;
  id?: string;
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
} & React.HTMLProps<HTMLDivElement>;

type Ref = HTMLDivElement;

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
 * @param id string
 *
 * @param className string
 * @default my-5 w-full
 *
 * @param dangerouslySetInnerHTML string
 */
// eslint-disable-next-line react/display-name
const ContainerSlide = forwardRef<Ref, ContainerSlideProps>((props, ref) => {
  const {
    children,
    slide = 'up-down',
    delay = 0.2,
    id,
    className,
    dangerouslySetInnerHTML,
  } = props;
  const y = slide === 'up-down' ? -100 : 100;

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`${className ?? 'my-5 w-full'}`}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </motion.section>
  );
});

export default ContainerSlide;

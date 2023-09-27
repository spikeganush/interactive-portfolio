import React from 'react';
import { motion } from 'framer-motion';

type DivGrowProps = {
  children: React.ReactNode;
  className?: string;
  type?: 'spring' | 'tween';
  delay?: number;
  duration?: number;
  stiffness?: number;
};

/**
 *
 * @param children react node
 * @param className css class
 *
 * @param type animation type (spring or tween)
 * @default spring
 *
 * @param delay animation delay
 * @default 0.3
 *
 * @param duration animation duration
 * @default 0.7
 *
 * @param stiffness animation stiffness
 * @default 125
 *
 */
const DivGrow = ({
  children,
  className,
  type = 'spring',
  delay = 0.3,
  duration = 0.7,
  stiffness = 125,
}: DivGrowProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type,
        stiffness,
        delay,
        duration,
      }}
    >
      {children}
    </motion.div>
  );
};

export default DivGrow;

'use client';

import SectionHeading from '../section-heading';
import { AboutData } from '@/lib/data';
import EditButton from '../edition/edit-button';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const { data } = usePortfolioDataContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>
        About me
        <EditButton
          className="ml-2"
          component="about"
          isAbsolute={false}
          animationType="spring"
          stiffness={125}
          delay={0.5}
          duration={0.7}
        />
      </SectionHeading>

      <motion.span
        dangerouslySetInnerHTML={{
          __html: data?.about ?? AboutData,
        }}
      />
    </motion.div>
  );
};

export default AboutSection;

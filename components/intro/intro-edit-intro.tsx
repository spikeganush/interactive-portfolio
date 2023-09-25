'use client';

import { useEditContext } from '@/context/edit-context';
import { motion } from 'framer-motion';
import sanitizeHtml from 'sanitize-html';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { IntroData } from '@/lib/data';
import EditButton from '../edition/edit-button';
import EditText from '../edition/edit-text';

const IntroEditIntro = () => {
  const { edit } = useEditContext();
  const { data } = usePortfolioDataContext();

  return (
    <div className="relative w-full">
      {edit.intro ? (
        <EditText component="intro" />
      ) : (
        <motion.div
          className="portfolio-intro mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(data?.intro ?? IntroData, {
              allowedTags: ['span', 'strong', 'em', 'p', 'ins'],
              allowedAttributes: {
                span: ['class'],
              },
            }),
          }}
        />
      )}
      <EditButton
        component="intro"
        animationType="spring"
        position="higher"
        stiffness={125}
        delay={0.3}
        duration={0.7}
      />
    </div>
  );
};

export default IntroEditIntro;

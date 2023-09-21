import { useEditContext } from '@/context/edit-context';
import { useIsOwnerContext } from '@/context/is-owner-context';
import { motion } from 'framer-motion';
import sanitizeHtml from 'sanitize-html';
import EditIntro from '../edition/edit-intro';
import { FiEdit } from 'react-icons/fi';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { IntroData } from '@/lib/data';

const IntroEditIntro = () => {
  const { edit, setEdit } = useEditContext();
  const { isOwner } = useIsOwnerContext();
  const { data } = usePortfolioDataContext();

  return (
    <div className="relative">
      {edit.intro ? (
        <EditIntro />
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
      {isOwner && !edit.intro ? (
        <motion.button
          className="absolute top-1 -right-1 sm:top-4 sm:-right-5"
          onClick={() => setEdit((prev) => ({ ...prev, intro: true }))}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 125,
            delay: 0.1,
            duration: 0.7,
          }}
        >
          <FiEdit size="1.5rem" />
        </motion.button>
      ) : null}
    </div>
  );
};

export default IntroEditIntro;

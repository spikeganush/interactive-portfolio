import { motion, AnimatePresence } from 'framer-motion';
import CancelButton from './buttons/cancel-button';
import SaveButton from './buttons/save-button';

type ConsentModalProps = {
  title: string;
  description: string;
  onAccept: () => void;
  onDecline: () => void;
  open: boolean;
};

const ConsentModal = ({
  title,
  description,
  onAccept,
  onDecline,
  open,
}: ConsentModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/60 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{
            duration: 0.2,
          }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 bg-white rounded-2xl py-5 px-4"
            initial={{ scale: 0, x: '-50%', y: '-50%' }}
            animate={{ scale: open ? 1 : 0, x: '-50%', y: '-50%' }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.2,
              duration: 0.7,
            }}
          >
            <h1 className="text-center font-bold text-2xl mb-3">{title}</h1>
            <p className="w-5/6 text-center mx-auto mb-5">{description}</p>
            <div className="flex justify-center gap-2">
              <CancelButton onClick={onDecline} />
              <SaveButton onClick={onAccept} text="Ok" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsentModal;

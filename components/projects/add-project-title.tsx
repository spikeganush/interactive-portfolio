import { motion } from 'framer-motion';
import DivGrow from '../motion/div-grow';

type AddProjectTitleProps = {
  title: string;
  setTitle: (title: string) => void;
};

const AddProjectTitle = ({ title, setTitle }: AddProjectTitleProps) => {
  return (
    <>
      <motion.h1
        className="text-lg my-3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 125,
          delay: 0.63,
          duration: 0.7,
        }}
      >
        Title:
      </motion.h1>
      <DivGrow delay={0.65}>
        <input
          type="text"
          name="Title"
          placeholder={`Enter your project's title`}
          className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DivGrow>
    </>
  );
};

export default AddProjectTitle;

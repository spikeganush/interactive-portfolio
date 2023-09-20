import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillCloseCircle } from 'react-icons/ai';
import useCloseEdit from '@/hooks/useCloseEdit';

const EditIntro = () => {
  const { handleCloseEdit } = useCloseEdit();
  const [newText, setNewText] = useState('');

  return (
    <motion.section
      className="upload-photo my-5"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="flex justify-center items-center gap-2 mb-3 w-auto sm:w-[35rem]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 125,
          delay: 0.2,
          duration: 0.7,
        }}
      >
        <h1 className="text-lg">Edit Intro</h1>
        <button onClick={() => handleCloseEdit('intro')}>
          <AiFillCloseCircle size="2rem" />
        </button>
      </motion.div>
      <textarea
        name="Edit intro"
        className="bg-white border-gray-900 rounded-lg w-full !h-[160px] p-2 resize-none dark:bg-white/10"
        onChange={(e) => setNewText(e.target.value)}
      />
      <div className="flex justify-center gap-5">
        <button className="bg-red-600 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-red-700 active:scale-105 transition">
          Cancel
        </button>
        <button className="bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition">
          Save
        </button>
      </div>
    </motion.section>
  );
};

export default EditIntro;

import { motion } from 'framer-motion';
import { SetStateAction, Dispatch, useState } from 'react';
import SaveButton from '../buttons/save-button';
import CloseButton from '../buttons/close-buttons';

type AddTagProps = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

const AddTag = ({ tags, setTags }: AddTagProps) => {
  const [tag, setTag] = useState('');
  const handleAddTag = () => {
    setTags([...tags, tag]);
    setTag('');
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 125,
        delay: 0.7,
        duration: 0.7,
      }}
      className="mb-3 w-5/6 sm:w-3/6"
    >
      <h1 className="text-lg my-3">Add tag(s):</h1>
      <input
        type="text"
        name="Demo Website"
        placeholder={`Write tag and 👇🏻 Enter or 👇🏻 button`}
        className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTag();
          }
        }}
      />
      <div className="flex justify-center w-full mt-3">
        <SaveButton onClick={handleAddTag} />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex justify-center items-center gap-2 bg-gray-200 rounded-2xl py-2 px-4"
          >
            <p>{tag}</p>
            <CloseButton onClick={() => handleRemoveTag(tag)} size="1.5rem" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AddTag;

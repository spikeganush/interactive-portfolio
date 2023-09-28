import { SetStateAction, Dispatch, useState } from 'react';
import SaveButton from '../buttons/save-button';
import CloseButton from '../buttons/close-buttons';
import DivGrow from '../motion/div-grow';
import toast from 'react-hot-toast';

type AddTagProps = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

const AddTag = ({ tags, setTags }: AddTagProps) => {
  const [tag, setTag] = useState('');

  const handleAddTag = () => {
    if (!tag || tag.trim() === '') {
      setTag('');
      return toast.error('Tag cannot be empty');
    }
    setTags([...tags, tag]);
    setTag('');
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <DivGrow className="mb-3 w-5/6 sm:w-3/6" delay={0.7}>
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
    </DivGrow>
  );
};

export default AddTag;

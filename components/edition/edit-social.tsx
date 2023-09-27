'use client';

import { useState } from 'react';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { IoIosSave } from 'react-icons/io';
import SectionGrow from '../motion/section-grow';

type EditSocialProps = {
  name: 'linkedin' | 'github';
  delay: number;
};
const EditSocial = ({ name, delay }: EditSocialProps) => {
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  const { data, updateAndSaveOneKey } = usePortfolioDataContext();
  const [newValue, setNewValue] = useState(
    data[name] || `https://${name}.com/`
  );
  const [saved, setSaved] = useState(false);
  const updateSocial = async () => {
    setSaved(false);
    const updated = await updateAndSaveOneKey(newValue, name);
    setSaved(updated);
  };
  return (
    <SectionGrow className="upload-section w-full" delay={delay}>
      <h1 className="text-lg my-3">Edit {title} URL:</h1>
      <input
        type="text"
        name={name}
        placeholder={`Enter your ${title} URL`}
        className="w-5/6 sm:w-3/6 p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
      />
      <button title="Save" onClick={updateSocial}>
        <IoIosSave
          className={`social-button__save${saved ? ' saved' : ''}`}
          size={'2rem'}
        />
      </button>
    </SectionGrow>
  );
};

export default EditSocial;

import React from 'react';
import EditSocial from './edit-social';
import { useEditContext } from '@/context/edit-context';
import DivGrow from '../motion/div-grow';

const EditSocials = () => {
  const { updateEdit } = useEditContext();
  return (
    <>
      <EditSocial name={'linkedin'} delay={0.3} />
      <EditSocial name={'github'} delay={0.4} />
      <DivGrow delay={0.5}>
        <button
          aria-label="Cancel"
          className="bg-red-600 mt-3 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-red-700 active:scale-105 transition"
          onClick={() => updateEdit('buttons', false)}
        >
          Close
        </button>
      </DivGrow>
    </>
  );
};

export default EditSocials;

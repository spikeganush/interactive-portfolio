import React from 'react';
import ColorPicker from './color-picker';
import { FiEdit } from 'react-icons/fi';

const BgPicker = () => {
  return (
    <>
      <ColorPicker position="left" />
      <div className="flex flex-col w-3/6 sm:w-full">
        <div className="font-medium font text-[1rem] sm:text-[2rem]">
          Let's Customise
        </div>
        <div className="text-xs sm:text-sm">
          Follow the icons {<FiEdit size="1rem" className="inline-block" />} to
          update the corresponding section! 🚀
        </div>
      </div>
      <ColorPicker position="right" />
    </>
  );
};

export default BgPicker;

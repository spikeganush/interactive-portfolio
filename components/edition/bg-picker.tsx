import React from 'react';
import ColorPicker from './color-picker';

const BgPicker = () => {
  return (
    <>
      <ColorPicker position="left" />
      <div className="font-medium font text-[1rem] sm:text-[2rem]">
        Let's Customise
      </div>
      <ColorPicker position="right" />
    </>
  );
};

export default BgPicker;

import React from 'react';
import CloseButton from '../buttons/close-buttons';
import DivGrow from '../motion/div-grow';

type EditionProjectTitleProps = {
  onClick: () => void;
};

const EditionProjectTitle = ({ onClick }: EditionProjectTitleProps) => {
  return (
    <DivGrow
      className="flex justify-center items-center gap-2 mb-3 w-full"
      delay={0.4}
    >
      <h1 className="text-lg">Add Projects</h1>
      <CloseButton onClick={onClick} />
    </DivGrow>
  );
};

export default EditionProjectTitle;

import React from 'react';
import DivGrow from '../motion/div-grow';
import CloseButton from '../buttons/close-buttons';

type EditSkillsTitleProps = {
  onClick: () => void;
};

const EditSkillsTitle = ({ onClick }: EditSkillsTitleProps) => {
  return (
    <DivGrow
      className="flex justify-center items-center gap-2 mb-3 w-full"
      delay={0.4}
    >
      <h1 className="text-lg">Edit Skills</h1>
      <CloseButton onClick={onClick} />
    </DivGrow>
  );
};

export default EditSkillsTitle;

import React from 'react';
import DivGrow from '../motion/div-grow';
import CloseButton from '../buttons/close-buttons';

type EditTitleProps = {
  onClick: () => void;
  title: string;
  className?: string;
};
/**
 *
 * @param onClick () => void
 * @param title string
 * @param className string
 * @default 'flex justify-center items-center gap-2 mb-3 w-full'
 */
const EditTitle = ({
  onClick,
  title,
  className = 'flex justify-center items-center gap-2 mb-3 w-full',
}: EditTitleProps) => {
  return (
    <DivGrow className={className} delay={0.4}>
      <h1 className="text-3xl">{title}</h1>
      <CloseButton onClick={onClick} />
    </DivGrow>
  );
};

export default EditTitle;

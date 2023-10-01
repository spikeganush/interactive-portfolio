import React from 'react';
import { FiEdit } from 'react-icons/fi';
import CloseButton from './close-buttons';

type EditDeleteButtonsProps = {
  handleEdit: () => void;
  handleDelete: () => void;
};

const EditDeleteButtons = ({
  handleEdit,
  handleDelete,
}: EditDeleteButtonsProps) => {
  return (
    <div className="flex gap-2 absolute top-2 right-2 z-[5]">
      <FiEdit size="2rem" onClick={handleEdit} className="cursor-pointer" />
      <CloseButton onClick={handleDelete} />
    </div>
  );
};

export default EditDeleteButtons;

'use client';

import { useEditContext } from '@/context/edit-context';
import { FiEdit } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { EditStateKeys } from '@/types/general';
import { useIsOwnerContext } from '@/context/is-owner-context';
import { BiAddToQueue } from 'react-icons/bi';

/**
 * @component EditButton
 */
type EditButtonProps = {
  component: EditStateKeys;
  type?: 'edit' | 'add';
  iconSize?: string;
  position?: 'higher' | 'lower';
  animationType?: 'spring' | 'tween';
  delay?: number;
  duration?: number;
  stiffness?: number;
  isAbsolute?: boolean;
  className?: string;
};

/**
 * EditButton Component
 *
 * @param component Specifies the component that will be edited when the button is clicked.
 * @param type Specifies the type of the button. Default is 'edit'.
 * @param iconSize Specifies the size of the icon. Default is '1.5rem'.
 * @param position Determines the vertical position of the button. Default is 'lower'.
 * @param type Specifies the type of animation to use for the button. Default is 'spring'.
 * @param stiffness Specifies the stiffness of the spring animation. Default is 0.
 * @param delay Specifies the delay before the animation starts. Default is 0.
 * @param duration Specifies the duration of the animation. Default is 0.5.
 * @param isAbsolute Specifies whether the button should be absolutely positioned. Default is true.
 * @param className Specifies the class name of the button. Default is an empty string.
 */
const EditButton = ({
  component,
  type = 'edit',
  iconSize = '1.5rem',
  position = 'lower',
  animationType = 'spring',
  stiffness = 0,
  delay = 0,
  duration = 0.5,
  isAbsolute = true,
  className = '',
}: EditButtonProps) => {
  const { edit, updateEdit } = useEditContext();
  const { isOwner } = useIsOwnerContext();
  const handleEdit = () => {
    updateEdit(component, true);
  };

  const classNameTrimmed = `${className} ${isAbsolute ? 'absolute' : ''} ${
    position === 'lower'
      ? 'bottom-0 -right-6'
      : 'top-1 -right-2 sm:top-4 sm:-right-5'
  }`
    .trim()
    .replace('  ', ' ');

  return (
    <>
      {isOwner ? (
        edit[component] ? null : (
          <motion.button
            className={classNameTrimmed}
            onClick={handleEdit}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: animationType,
              stiffness,
              delay,
              duration,
            }}
          >
            {type === 'edit' ? (
              <FiEdit size={iconSize} />
            ) : (
              <BiAddToQueue size={iconSize} />
            )}
          </motion.button>
        )
      ) : null}
    </>
  );
};

export default EditButton;

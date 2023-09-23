import { AiFillCloseCircle } from 'react-icons/ai';

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
  size?: string;
};

/**
 *
 * @param onClick The function to be called when the button is clicked
 * @param className default: '' The className to be applied to the button
 * @param size default: '2rem' The size of the icon
 *
 *
 */
const CloseButton = ({
  onClick,
  className = '',
  size = '2rem',
}: CloseButtonProps) => {
  return (
    <button aria-label="Save" className={className} onClick={onClick}>
      <AiFillCloseCircle size={size} />
    </button>
  );
};

export default CloseButton;

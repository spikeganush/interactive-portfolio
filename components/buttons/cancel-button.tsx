type CancelButtonProps = {
  text?: string;
  onClick: () => void;
};

const CancelButton = ({ text, onClick }: CancelButtonProps) => {
  return (
    <button
      aria-label="Cancel"
      className="bg-red-600 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-red-700 active:scale-105 transition"
      onClick={onClick}
    >
      {text ?? 'Cancel'}
    </button>
  );
};

export default CancelButton;

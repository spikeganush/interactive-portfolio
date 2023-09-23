type SaveButtonProps = {
  onClick: () => void;
};
const SaveButton = ({ onClick }: SaveButtonProps) => {
  return (
    <button
      aria-label="Save"
      className="bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
      onClick={onClick}
    >
      Save
    </button>
  );
};

export default SaveButton;

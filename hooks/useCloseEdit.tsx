import { useEditContext } from '@/context/edit-context';

const useCloseEdit = () => {
  const { setEdit } = useEditContext();
  const handleCloseEdit = (key: string) => {
    setEdit((prev) => ({ ...prev, [key]: false }));
  };
  return { handleCloseEdit };
};

export default useCloseEdit;

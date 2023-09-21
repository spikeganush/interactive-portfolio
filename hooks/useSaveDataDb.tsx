import { DataState } from '@/types/general';
import toast from 'react-hot-toast';

const useSaveDataDb = () => {
  const saveDataDb = async (data: DataState): Promise<boolean> => {
    try {
      const response = await fetch('/api/portfolio/save', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success('Data save successfully!');
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { saveDataDb };
};

export default useSaveDataDb;

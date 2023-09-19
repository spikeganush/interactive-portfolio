import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import toast from 'react-hot-toast';

const useSaveDataDb = () => {
  const { data } = usePortfolioDataContext();

  const saveDataDb = async () => {
    try {
      const response = await fetch('/api/portfolio/save', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success('Data save successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { saveDataDb };
};

export default useSaveDataDb;

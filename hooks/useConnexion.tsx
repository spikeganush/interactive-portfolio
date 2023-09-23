import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

import { useEffect } from 'react';

const useConnexion = () => {
  const { data: session } = useSession();
  const params = useParams();
  const { setData } = usePortfolioDataContext();

  const getServerSideProps = async () => {
    try {
      if (!params?.id) return;
      const response = await fetch(`/api/portfolio/${params?.id}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();

        setData((prev) => ({
          ...prev,
          ...data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      userId: session?.user?.id!,
      email: session?.user?.email!,
    }));
  }, [session?.user?.id, session?.user?.email]);

  useEffect(() => {
    if (!params?.id) return;
    getServerSideProps();
  }, [params?.id]);

  return { getServerSideProps };
};

export default useConnexion;

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
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(params.id as string);
      const apiEndpoint = isObjectId
        ? `/api/portfolio/${params.id}`
        : `/api/portfolio/all/${params.id}`;

      // Fetch data from the API
      const response = await fetch(apiEndpoint, { method: 'GET' });

      if (response.ok) {
        const data = await response.json();

        // Update the state
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id, session?.user?.email]);

  useEffect(() => {
    if (!params?.id) return;
    getServerSideProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  return { getServerSideProps };
};

export default useConnexion;

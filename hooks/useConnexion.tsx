import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { useEffect } from 'react';

const useConnexion = () => {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const { setData } = usePortfolioDataContext();

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      userId: session?.user?.id!,
      email: session?.user?.email!,
    }));
  }, [session?.user?.id, session?.user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!params?.id) return;
        const response = await fetch(`/api/portfolio/${params?.id}`, {
          method: 'GET',
        });
        console.log(response);
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
    fetchData();
  }, [params?.id]);

  useEffect(() => {
    if (session?.user?.id && pathName === '/') {
      // add the user id to the url
      router.push(`/${session?.user?.id}`);
    }
  }, [session?.user?.id, pathName]);
};

export default useConnexion;

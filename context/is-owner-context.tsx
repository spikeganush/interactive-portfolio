'use client';

import { useSession } from 'next-auth/react';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { usePortfolioDataContext } from './portfolio-data-context';

type IsOwnerContextProviderProps = {
  children: React.ReactNode;
};

type IsOwnerContextType = {
  isOwner: boolean;
};

export const IsOwnerContext = createContext<IsOwnerContextType | null>(null);

export default function IsOwnerContextProvider({
  children,
}: IsOwnerContextProviderProps) {
  const [isOwner, setIsOwner] = useState(false);
  const { data: session } = useSession();
  const { data } = usePortfolioDataContext();

  useEffect(() => {
    if (!session?.user) return setIsOwner(false);
    if (session?.user?.id === data.creator) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user, data.creator]);

  return (
    <IsOwnerContext.Provider
      value={{
        isOwner,
      }}
    >
      {children}
    </IsOwnerContext.Provider>
  );
}

export function useIsOwnerContext() {
  const context = useContext(IsOwnerContext);

  if (context === null) {
    throw new Error(
      'useIsOwnerContext must be used within an IsOwnerContextProvider'
    );
  }

  return context;
}

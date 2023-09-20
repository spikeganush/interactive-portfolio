'use client';

import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useState, createContext, useContext, useEffect } from 'react';

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
  const params = useParams();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return setIsOwner(false);
    if (session?.user?.id === params.id) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [session?.user, params]);

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

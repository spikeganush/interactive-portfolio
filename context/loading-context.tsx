'use client';

import { EditState } from '@/types/general';
import React, { useState, createContext, useContext } from 'react';

type LoadingContextProviderProps = {
  children: React.ReactNode;
};

type LoadingContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType | null>(null);

export default function LoadingContextProvider({
  children,
}: LoadingContextProviderProps) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  const context = useContext(LoadingContext);

  if (context === null) {
    throw new Error(
      'useLoadingContext must be used within an LoadingContextProvider'
    );
  }

  return context;
}

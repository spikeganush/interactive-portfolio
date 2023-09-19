'use client';

import { DataState, EditState } from '@/types/general';
import React, { useState, createContext, useContext } from 'react';

type PortfolioDataContextProviderProps = {
  children: React.ReactNode;
};

type PortfolioDataContextType = {
  data: DataState;
  setData: React.Dispatch<React.SetStateAction<DataState>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  edit: EditState;
  setEdit: React.Dispatch<React.SetStateAction<EditState>>;
};

export const PortfolioDataContext =
  createContext<PortfolioDataContextType | null>(null);

export default function PortfolioDataContextProvider({
  children,
}: PortfolioDataContextProviderProps) {
  const [data, setData] = useState<DataState>({
    userId: null,
    leftLightBg: 'dbd7fb',
    rightLightBg: 'fbe2e3',
    leftDarkBg: '676394',
    rightDarkBg: '946263',
    photo: null,
    intro: null,
    resumeUrl: null,
    linkedinUrl: null,
    githubUrl: null,
    about: null,
    projects: null,
    skills: null,
    experiences: null,
    email: null,
  });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<EditState>({
    photo: false,
    leftColor: false,
    rightColor: false,
    intro: false,
    about: false,
    projects: false,
    skills: false,
    experiences: false,
    email: false,
  });

  return (
    <PortfolioDataContext.Provider
      value={{
        data,
        setData,
        loading,
        setLoading,
        edit,
        setEdit,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioDataContext() {
  const context = useContext(PortfolioDataContext);

  if (context === null) {
    throw new Error(
      'usePortfolioDataContext must be used within an PortfolioDataContextProvider'
    );
  }

  return context;
}

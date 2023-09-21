'use client';

import { BG_COLORS } from '@/constant/general';
import useSaveDataDb from '@/hooks/useSaveDataDb';
import { DataState } from '@/types/general';
import React, { useState, createContext, useContext, Key } from 'react';

type PortfolioDataContextProviderProps = {
  children: React.ReactNode;
};

type PortfolioDataContextType = {
  data: DataState;
  setData: React.Dispatch<React.SetStateAction<DataState>>;
  updateAndSaveOneKey: (newData: any, key: Key) => void;
};

export const PortfolioDataContext =
  createContext<PortfolioDataContextType | null>(null);

export default function PortfolioDataContextProvider({
  children,
}: PortfolioDataContextProviderProps) {
  const [data, setData] = useState<DataState>({
    userId: null,
    leftLightBg: BG_COLORS.LEFT_LIGHT,
    rightLightBg: BG_COLORS.RIGHT_LIGHT,
    leftDarkBg: BG_COLORS.LEFT_DARK,
    rightDarkBg: BG_COLORS.RIGHT_DARK,
    photo: null,
    intro: null,
    resume: null,
    linked: null,
    github: null,
    about: null,
    projects: null,
    skills: null,
    experiences: null,
    email: null,
  });

  const { saveDataDb } = useSaveDataDb();

  const updateAndSaveOneKey = (value: any, key: Key) => {
    setData((prev) => {
      saveDataDb({ ...prev, [key]: value });
      return { ...prev, [key]: value };
    });
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        data,
        setData,
        updateAndSaveOneKey,
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

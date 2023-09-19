'use client';

import type { SectionName } from '@/lib/types';
import React, { useState, createContext, useContext } from 'react';

type InfoBubbleContextProviderProps = {
  children: React.ReactNode;
};

type InfoBubbleContextType = {
  openBubble: boolean;
  setOpenBubble: React.Dispatch<React.SetStateAction<boolean>>;
  bubbleText: string;
  setBubbleText: React.Dispatch<React.SetStateAction<string>>;
  removeBubbleText: () => void;
};

export const InfoBubbleContext = createContext<InfoBubbleContextType | null>(
  null
);

export default function InfoBubbleContextProvider({
  children,
}: InfoBubbleContextProviderProps) {
  const [openBubble, setOpenBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const removeBubbleText = () => {
    setTimeout(() => {
      setBubbleText('');
    }, 310);
  };
  return (
    <InfoBubbleContext.Provider
      value={{
        openBubble,
        setOpenBubble,
        bubbleText,
        setBubbleText,
        removeBubbleText,
      }}
    >
      {children}
    </InfoBubbleContext.Provider>
  );
}

export function useInfoBubbleContext() {
  const context = useContext(InfoBubbleContext);

  if (context === null) {
    throw new Error(
      'useInfoBubbleContext must be used within an InfoBubbleContextProvider'
    );
  }

  return context;
}

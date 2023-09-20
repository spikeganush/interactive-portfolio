'use client';

import { EditState } from '@/types/general';
import React, { useState, createContext, useContext } from 'react';

type EditContextProviderProps = {
  children: React.ReactNode;
};

type EditContextType = {
  edit: EditState;
  setEdit: React.Dispatch<React.SetStateAction<EditState>>;
};

export const EditContext = createContext<EditContextType | null>(null);

export default function EditContextProvider({
  children,
}: EditContextProviderProps) {
  const [edit, setEdit] = useState<EditState>({
    photo: false,
    color: false,
    intro: false,
    about: false,
    projects: false,
    skills: false,
    experiences: false,
    email: false,
  });

  return (
    <EditContext.Provider
      value={{
        edit,
        setEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export function useEditContext() {
  const context = useContext(EditContext);

  if (context === null) {
    throw new Error(
      'useEditContext must be used within an EditContextProvider'
    );
  }

  return context;
}

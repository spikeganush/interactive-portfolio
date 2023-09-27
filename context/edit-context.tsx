'use client';

import { EditState } from '@/types/general';
import React, { useState, createContext, useContext } from 'react';

type EditContextProviderProps = {
  children: React.ReactNode;
};

type EditContextType = {
  edit: EditState;
  setEdit: React.Dispatch<React.SetStateAction<EditState>>;
  updateEdit: (key: keyof EditState, value: boolean) => void;
};

export const EditContext = createContext<EditContextType | null>(null);

export default function EditContextProvider({
  children,
}: EditContextProviderProps) {
  const [edit, setEdit] = useState<EditState>({
    photo: false,
    color: false,
    intro: false,
    buttons: false,
    about: false,
    projects: false,
    project: {},
    skills: false,
    experiences: false,
    email: false,
  });

  const updateEdit = (key: keyof EditState, value: boolean) => {
    setEdit((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <EditContext.Provider
      value={{
        edit,
        setEdit,
        updateEdit,
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

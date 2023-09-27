'use client';

import { BG_COLORS } from '@/constant/general';
import { DataState, project } from '@/types/general';
import React, {
  useState,
  createContext,
  useContext,
  Key,
  useEffect,
} from 'react';
import toast from 'react-hot-toast';

type PortfolioDataContextProviderProps = {
  children: React.ReactNode;
};

type PortfolioDataContextType = {
  data: DataState;
  setData: React.Dispatch<React.SetStateAction<DataState>>;
  updateAndSaveOneKey: (newData: any, key: Key) => Promise<boolean>;
  saveAProject: (project: project, userId: string) => Promise<boolean>;
  deleteAProject: (id: string, userId: string) => Promise<boolean>;
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
    linkedin: null,
    github: null,
    about: null,
    projects: null,
    skills: null,
    experiences: null,
    email: null,
  });

  useEffect(() => {
    console.log({ data });
  }, [data]);

  const updateAndSaveOneKey = async (
    value: any,
    key: Key
  ): Promise<boolean> => {
    try {
      const updatedData = { ...data, [key]: value };
      // Save to database and wait for it to complete
      const success = await await fetch('/api/portfolio/', {
        method: 'POST',
        body: JSON.stringify(updatedData),
      });
      if (success.status === 200) {
        // Update local state
        setData(updatedData);
        toast.success('Data saved successfully!');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const saveAProject = async (
    project: project,
    userId: string
  ): Promise<boolean> => {
    try {
      if (!project && !userId) return false;

      const success = await fetch(`/api/project/${userId}`, {
        method: 'POST',
        body: JSON.stringify(project),
      });
      if (success.status === 200) {
        const response = await fetch(`/api/portfolio/${userId}`, {
          method: 'GET',
        });
        if (response.status == 200) {
          const data = await response.json();

          setData((prev) => ({
            ...prev,
            ...data,
          }));
          toast.success('Project saved successfully!');
        }
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const deleteAProject = async (
    id: string,
    portfolioId: string
  ): Promise<boolean> => {
    try {
      const projectsWithoutTheId = data.projects?.filter(
        (project) => project.id !== id
      );

      const response = await fetch(`/api/project/${id}/${portfolioId}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        toast.success('Project deleted successfully!');
        setData((prev) => ({
          ...prev,
          projects: projectsWithoutTheId ?? null,
        }));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.trace();
      console.log(error);
      toast.error('Error deleting project');
      return false;
    }
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        data,
        setData,
        updateAndSaveOneKey,
        saveAProject,
        deleteAProject,
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

'use client';

import { BG_COLORS } from '@/constant/general';
import { DataState, experience, project } from '@/types/general';
import React, { useState, createContext, useContext, Key } from 'react';
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
  updateAProject: (project: project) => Promise<boolean>;
  updateSkill: (skill: string) => Promise<boolean>;
  deleteSkill: (skill: string) => Promise<boolean>;
  saveAnExperience: (
    experience: experience,
    userId: string
  ) => Promise<boolean>;
  deleteAnExperience: (id: string, userId: string) => Promise<boolean>;
  updateAnExperience: (experience: experience) => Promise<boolean>;
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

  const refetchData = async (userId: string): Promise<boolean> => {
    try {
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
    } catch (error) {
      return false;
    }
  };

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

  /**
   *
   * @param project
   * @param userId
   * @returns boolean
   */
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
        await refetchData(userId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('saveAProject error: ', error);
      return false;
    }
  };

  const deleteAProject = async (
    id: string,
    portfolioId: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`/api/project/${id}/${portfolioId}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        await refetchData(data.userId as string);
        toast.success('Project deleted successfully!');

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

  const updateAProject = async (project: project): Promise<boolean> => {
    try {
      const portfolioId = data._id;
      const projectId = project.id;

      const response = await fetch(`/api/project/${projectId}/${portfolioId}`, {
        method: 'PUT',
        body: JSON.stringify(project),
      });
      if (response.status === 200) {
        await refetchData(data.userId as string);
        toast.success('Project updated successfully!');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.trace();
      console.log(error);
      toast.error('Error updating project');
      return false;
    }
  };

  const updateSkill = async (skill: string): Promise<boolean> => {
    try {
      // Save to database and wait for it to complete
      const success = await await fetch(`/api/skill/${data._id}`, {
        method: 'PUT',
        body: JSON.stringify(skill),
      });
      if (success.status === 200) {
        // Update local state
        setData((prev) => {
          const newSkillsArray = prev.skills
            ? [...prev.skills, skill]
            : [skill];
          return {
            ...prev,
            skills: newSkillsArray,
          };
        });
        toast.success('Data saved successfully!');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const deleteSkill = async (skill: string): Promise<boolean> => {
    try {
      // Save to database and wait for it to complete
      const success = await await fetch(`/api/skill/${data._id}`, {
        method: 'DELETE',
        body: JSON.stringify(skill),
      });
      if (success.status === 200) {
        // Update local state
        setData((prev) => ({
          ...prev,
          skills: prev.skills ? prev.skills?.filter((s) => s !== skill) : [],
        }));
        toast.success('Data saved successfully!');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const saveAnExperience = async (
    experience: experience,
    userId: string
  ): Promise<boolean> => {
    try {
      if (!experience && !userId) return false;

      const success = await fetch(`/api/experience/${userId}`, {
        method: 'POST',
        body: JSON.stringify(experience),
      });
      console.log({ success });
      if (success.status === 200) {
        await refetchData(userId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const deleteAnExperience = async (
    id: string,
    portfolioId: string
  ): Promise<boolean> => {
    try {
      const experiencesWithoutTheId = data.experiences?.filter(
        (experience) => experience.id !== id
      );

      const response = await fetch(`/api/experience/${id}/${portfolioId}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        toast.success('Project deleted successfully!');
        setData((prev) => ({
          ...prev,
          experiences: experiencesWithoutTheId ?? null,
        }));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.trace();
      console.log(error);
      toast.error('Error deleting experience');
      return false;
    }
  };

  const updateAnExperience = async (
    experience: experience
  ): Promise<boolean> => {
    try {
      const portfolioId = data._id;
      const experienceId = experience.id;

      const response = await fetch(
        `/api/experience/${experienceId}/${portfolioId}`,
        {
          method: 'PUT',
          body: JSON.stringify(experience),
        }
      );
      if (response.status === 200) {
        await refetchData(data.userId as string);
        toast.success('Project updated successfully!');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.trace();
      console.log(error);
      toast.error('Error updating experience');
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
        updateAProject,
        updateSkill,
        deleteSkill,
        saveAnExperience,
        deleteAnExperience,
        updateAnExperience,
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
